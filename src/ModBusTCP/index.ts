import net from 'net';
import { parseAddress, parseResponse } from './helpers';

interface Rtn {
    ipAddress: string;
    port: string;
    unitId: number;
    online: boolean;
    timeout: number;
    packetBufferLength: number;
    packets:{
      [key: number]:{
        rx: Res;
        onResponce: (err: null | string, value: number) => void;
        promiseReject: (err: null | string) => void;
        promiseResolve: (value: number) => void;
      }
    }
    read: (address: srting, callback: void) => void;
}

interface Res{
  tid: number;
  pid: number;
  length: number;
  unitId: number;
  funcCode: number;
  byteCount: number;
  value: number;
  exceptionCode: string;
  hex: string;
}

export default function ModbusTcp(ipAddress: string, port: string, unitId: number): Rtn {
  const rtn: Rtn = {} as Rtn;

  const client = new net.Socket();

  client.setEncoding('hex');

  let lastTid = 1;
  rtn.ipAddress = ipAddress;
  rtn.port = port;
  rtn.unitId = unitId;
  rtn.online = false;
  rtn.timeout = 10000;
  rtn.packetBufferLength = 1000;
  rtn.packets = [];

  const sendTCP = (data: Buffer, callback) => {
    const buffer = Buffer.from(data.toString(), 'hex');
    if (client.writable) {
      client.write(buffer);
    } else {
      connect(() => { client.write(buffer) });
    }
  };

  client.on('data', (res) => {
    const buf = Buffer.from(res.toString(), 'hex');

    const modbusRes = parseResponse(buf);
    const value = modbusRes.value;
    const tid = modbusRes.tid;

    let err = null;
    if (modbusRes.exceptionCode) { err = 'Exception Code: 02 - Illegal Data Address' }

    rtn.packets[tid].rx = modbusRes;
    rtn.packets[tid].rx.hex = res.toString();
    if (typeof (rtn.packets[tid].onResponce) === 'function') {
      rtn.packets[tid].onResponce(err, value);
    }
    if (err) {
      rtn.packets[tid].promiseReject(err);
    } else {
      rtn.packets[tid].promiseResolve(value);
    }
  });

  client.on('close', () => {
    rtn.online = false;
  });

  client.on('connect', () => {
    rtn.online = true;
  });

  rtn.read = (address, callback) => {
    const parsedAddress = parseAddress(address);
    const funcCode = parsedAddress.fcRead;
    const length = parsedAddress.length;
    const tempAddress = parsedAddress.address;

    const tid = getTid();

    const buff = makeDataPacket(tid, 0, 1, funcCode, tempAddress, null, length);

    const packet = {
      onResponce: callback,
      tx: {
        funcCode: funcCode,
        tid: tid,
        address: tempAddress,
        hex: buff.toString('hex')
      },
      rx: null
    };

    rtn.packets[tid] = packet;

    sendTCP(buff, callback);

    return new Promise((resolve, reject) => {
      rtn.packets[tid].promiseResolve = resolve;
      rtn.packets[tid].promiseReject = reject;
    });
  };

  rtn.write = (address, value, callback) => {
    const parsedAddress = parseAddress(address);
    const funcCode = parsedAddress.fcWrite;
    const length = parsedAddress.length;
    address = parsedAddress.address;

    const tid = getTid();

    if (funcCode === 5 && value === true) { value = 65280 } // To force a coil on you send FF00 not 0001

    const buff = makeDataPacket(tid, 0, rtn.unitId, funcCode, address, value, length);

    const packet = {
      onResponce: callback,
      tx: {
        funcCode: funcCode,
        tid: tid,
        address: address,
        hex: buff.toString('hex')
      },
      rx: null
    };
    rtn.packets[tid] = packet;

    sendTCP(buff, callback);

    return new Promise((resolve, reject) => {
      rtn.packets[tid].promiseResolve = resolve;
      rtn.packets[tid].promiseReject = reject;
    });
  };
  const connect = (callback) => {
    client.connect(rtn.port, rtn.ipAddress, () => {
      if (callback) { callback() }
    });
  };

  const getTid = () => {
    if (lastTid > rtn.packetBufferLength) { lastTid = 0 }
    return lastTid++;
  };

  return rtn;
}

function makeDataPacket(transId, protoId, unitId, funcCode, address, data, length) {
  if (typeof (data) === 'boolean' && data) { data = 1 }
  if (typeof (data) === 'boolean' && !data) { data = 0 }

  if (address === 0) { address = 65535 } else { address = address - 1 }

  let dataBytes = 0;
  if (funcCode === 15) { dataBytes = length }
  if (funcCode === 16) { dataBytes = length * 2 }

  let bufferLength = 12;
  if (funcCode === 15 || funcCode === 16) { bufferLength = 13 + dataBytes }

  const byteCount = bufferLength - 6;

  const buf = Buffer.alloc(bufferLength);

  buf.writeUInt16BE(transId, 0);
  buf.writeUInt16BE(protoId, 2);
  buf.writeUInt16BE(byteCount, 4);
  buf.writeUInt8(unitId, 6);
  buf.writeUInt8(funcCode, 7);
  buf.writeUInt16BE(address, 8);

  if (funcCode === 1 || funcCode === 2 || funcCode === 3 || funcCode === 4) {
    buf.writeUInt16BE(length, 10);
  }
  if (funcCode === 5 || funcCode === 6) {
    buf.writeUInt16BE(data, 10);
  }
  if (funcCode === 15 || funcCode === 16) {
    buf.writeInt16BE(length, 10);
    buf.writeUInt8(dataBytes, 12);
    buf.writeInt32BE(data, 13);
  }

  return buf;
}
