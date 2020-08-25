import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from '../../styles/GlobalStyle';
import IconInverter from '../../components/IconInverter';
import { StyleSheet } from '../../utils';
import Modal from '../../components/Modal';
import { FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [visibleModal, setVisibleModal] = useState(false);
  const history = useHistory();

  const [devices] = useState([...Array(4)]);

  useEffect(() => {
    const inscribe = window.addEventListener('resize', () =>
      setWidth(window.innerWidth)
    );
    return inscribe;
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        ...{
          gridTemplateColumns:
            width < 400 ? '1fr 1fr' : '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        },
      }}
    >
      {devices.map((_, i) =>
        i !== devices.length - 1 ? (
          <View
            onClick={() => history.push('/device')}
            key={String(i)}
            style={styles.boxDevices}
          >
            <IconInverter />
            <Text style={styles.textBoxDevice}>{'DEVICE ID:'}</Text>
            <Text style={styles.textDeviceId}>{'1022'}</Text>
          </View>
        ) : (
          <View
            onClick={() => setVisibleModal((prev) => !prev)}
            key={String(i)}
            style={styles.boxDevices}
          >
            <View style={styles.buttonAdd}>
              <Text>+</Text>
            </View>
            <Text style={styles.textBoxDevice}>ADD NEW</Text>
            <Text style={styles.textDeviceId}>DEVICE</Text>
          </View>
        )
      )}
      <Modal onRequestClose={setVisibleModal} visible={visibleModal}>
        <View style={styles.containerModal}>
          <View style={styles.modalHeader}>
            <Text>PARAMETROS DE CONEXÃO</Text>
            <Button
              onClick={() => setVisibleModal((prev) => !prev)}
              style={styles.buttonCloseModal}
            >
              <FiX />
            </Button>
          </View>
          <View>
            <Text>ID do Dispositivo</Text>
            <TextInput />
            <Text>Porta de Conexão</Text>
            <TextInput />
            <Text>BaudRate</Text>
            <TextInput />
            <Button style={styles.buttonAddNewDevice}>ADICIONAR</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    display: 'grid',
    padding: 10,
  },
  boxDevices: {
    display: 'flex',
    border: '1px solid #dadada',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: '-webkit-fit-content',
    height: '-webkit-fit-content',
    alignItems: 'center',
    cursor: 'pointer',
  },
  textBoxDevice: {
    marginTop: 10,
    textAlign: 'center',
    width: '-webkit-fit-content',
    height: '-webkit-fit-content',
  },
  textDeviceId: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '-webkit-fit-content',
    height: '-webkit-fit-content',
  },
  buttonAdd: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 50,
    background: '#c1c1c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    padding: '20px 32px',
  },
  modalHeader: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    margin: '0 20px',
    alignItems: 'center',
  },
  buttonCloseModal: {
    padding: 10,
    position: 'absolute',
    right: -68,
    top: -25,
    borderRadius: 9,
    border: 'none',
    outline: 'none',
    display: 'flex',
  },
  buttonAddNewDevice: {
    padding: 10,
    margin: '10px 20px',
    borderRadius: 50,
    border: 'none',
    outline: 'none',
  },
});

export default Home;
