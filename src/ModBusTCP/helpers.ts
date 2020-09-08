interface Rtn {
  address: number;
  type: string;
  length: number;
  fcRead: number;
  fcWrite: number;
}

interface MakeData {
  transId: number;
  protoId: number;
  unitId: number;
  funcCode: number;
  address: number;
  data: number | null;
  length: number;
}

interface Res {
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

export function parseAddress(address: string): Rtn {
  const rtn: Rtn = {} as Rtn;
  let tempAddress = '';

  const isRegister = address.includes('r');
  const isRange = address.includes('-');

  address = address.toLowerCase();

  if (isRegister) {
    tempAddress = address.substr(2);
    rtn.type = address.substr(0, 2);
  }

  if (!isRegister) {
    tempAddress = address.substr(1);
    rtn.type = address.substr(0, 1);
  }

  if (isRange) {
    const range = tempAddress.split('-');
    rtn.length = Number(range[0]) - Number(range[1]);

    if (rtn.length < 0) {
      tempAddress = range[0];
    }

    if (rtn.length > 0) {
      tempAddress = range[1];
    }

    rtn.length = Math.abs(rtn.length) + 1;
  }
  if (!isRange) {
    rtn.length = 1;
  }

  rtn.address = parseInt(tempAddress, 10);

  if (rtn.type === 'c') {
    rtn.fcRead = 1;
    rtn.fcWrite = 5;
  }
  if (rtn.type === 'i') {
    rtn.fcRead = 2;
  }
  if (rtn.type === 'hr' && !isRange) {
    rtn.fcRead = 3;
    rtn.fcWrite = 6;
  }
  if (rtn.type === 'hr' && isRange) {
    rtn.fcRead = 3;
    rtn.fcWrite = 16;
  }
  if (rtn.type === 'ir') {
    rtn.fcRead = 4;
  }

  return rtn;
}

export function parseResponse(buf: Buffer): Res {
  const res: Res = {} as Res;
  res.tid = buf.readUInt16BE(0); // Transaction Id - Bytes 0 and 1
  res.pid = buf.readUInt16BE(2); // Protocal Id    - Bytes 2 and 3
  res.length = buf.readUInt16BE(4); // Length         - Bytes 4 and 5
  res.unitId = buf.readInt8(6); // Unit Id        - Byte 6
  res.funcCode = buf.readInt8(7); // Function Code  - Byte 7
  res.byteCount = Math.abs(buf.readInt8(8)); // Byte Count     - Byte 8
  if (buf.length > 9) {
    res.value = buf.readIntBE(9, buf.length - 9); // Data           - Bytes 9+
  }

  return res;
}

export function makeDataPacket({
  transId,
  protoId,
  unitId,
  funcCode,
  address,
  data,
  length,
}: MakeData): Buffer {
  if (typeof data === 'boolean' && data) {
    data = 1;
  }
  if (typeof data === 'boolean' && !data) {
    data = 0;
  }

  if (address === 0) {
    address = 65535;
  } else {
    address = address - 1;
  }

  let dataBytes = 0;
  if (funcCode === 15) {
    dataBytes = length;
  }
  if (funcCode === 16) {
    dataBytes = length * 2;
  }

  let bufferLength = 12;
  if (funcCode === 15 || funcCode === 16) {
    bufferLength = 13 + dataBytes;
  }

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
    if (data) {
      buf.writeUInt16BE(data, 10);
    }
  }
  if (funcCode === 15 || funcCode === 16) {
    buf.writeInt16BE(length, 10);
    buf.writeUInt8(dataBytes, 12);

    if (data) {
      buf.writeInt32BE(data, 13);
    }
  }

  return buf;
}
