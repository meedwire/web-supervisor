import net from 'net';
import { parseAddress, parseResponse, makeDataPacket } from './helpers';

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
        tx: {
          funcCode: number,
          tid: number,
          address: string,
          hex: string
        },
      }
    }
    read: (address: string, callback: (err: null | string, value: number) => void) => void;
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
    if (typeof rtn.packets[tid].onResponce === 'function') {
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

    const buff = makeDataPacket({
      transId: tid,
      protoId: 0,
      unitId: 1,
      funcCode,
      address: tempAddress,
      data: null,
      length
    });

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

    const buff = makeDataPacket({
      transId: tid,
      protoId: 0,
      unitId: rtn.unitId,
      funcCode,
      address,
      data: value,
      length
    });

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
  const connect = (callback: () => void) => {
    client.connect(Number(rtn.port), rtn.ipAddress, () => {
      if (callback) { callback() }
    });
  };

  const getTid = () => {
    if (lastTid > rtn.packetBufferLength) { lastTid = 0 }
    return lastTid++;
  };

  return rtn;
}
