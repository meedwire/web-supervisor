import ModBus from 'modbus-tcp-ip';

export async function connect() {
  const configPLC = {
    port: 502,
    host: '192.168.86.192',
  };

  try {
    const conn = await ModBus(configPLC.host, configPLC.port, 1);

    console.log(conn);

    const myCoil = await conn.read('I1');
    // const myHoldingRegister = await conn.read('8193');

    console.log(myCoil, conn);
    return conn;

    // // Write
    // await conn.write('c0', true);
    // await conn.write('hr0', 15);
  } catch (error) {
    console.log(error);
  }
}
