import React from 'react';
import { View, Button, Text, TextInput } from '../../styles/GlobalStyle';
import { useHistory } from 'react-router-dom';
import { StyleSheet } from '../../utils';
import { render } from 'react-dom';
import { Keyboard } from '../../components/Keyboard';

const ParametersDevice: React.FC = () => {
  const history = useHistory();

  function handleKeyboard(e) {
    const mainElement = document.createElement('div');
    const root = document.getElementById('root');
    mainElement.setAttribute('id', 'keyboard');
    root.appendChild(mainElement);
    return render(<Keyboard />, mainElement);
  }

  function hedleCloseKeyboard() {
    // const root = document.getElementById('root');
    // const keyborard = document.getElementById('keyboard');
    // root.removeChild(keyborard);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>PORTA DE COMUNICAÇÃO</Text>
        <Text>BAUD RATE</Text>
        <Text>STATUS CONEXÃO</Text>
      </View>
      <View style={styles.boxDeviceId}>
        <Text style={styles.textDeviceId}>
          ID DISPOSITIVO: <Text style={styles.deviceId}>10110</Text>
        </Text>
      </View>
      <View style={styles.containerContant}>
        <View>
          <Text>Frequência Mínima.</Text>
          <TextInput
            onFocus={handleKeyboard}
            onBlur={hedleCloseKeyboard}
            placeholder="Hz"
          />
        </View>
        <View>
          <Text>Frequência Máxima.</Text>
          <TextInput placeholder="Hz" />
        </View>
        <View>
          <Text>Corrente Máxima de Saída.</Text>
          <TextInput placeholder="Amperes" />
        </View>
        <View>
          <Text>Tensão Nominal.</Text>
          <TextInput placeholder="Volts" />
        </View>
        <View>
          <Text>Rampa de Aceleração.</Text>
          <TextInput placeholder="Segundos" />
        </View>
        <View>
          <Text>Rampa de desaceleração.</Text>
          <TextInput placeholder="Segundos" />
        </View>
      </View>
      <Button style={styles.buttonSave} onClick={() => {}}>
        SALVAR
      </Button>
      <Button style={styles.buttonClear} onClick={() => history.push('/')}>
        LIMPAR
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'calc(100vh - 60px)',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingTop: 10,
    color: 'white !important',
  },
  boxDeviceId: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  textDeviceId: { display: 'flex', flexDirection: 'row' },
  deviceId: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#e1e1e6',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 5,
  },
  containerContant: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: 20,
  },
  buttonSave: {
    backgroundColor: 'rgb(0, 255, 0)',
    color: 'white',
  },
  buttonClear: {
    backgroundColor: 'rgb(200, 30, 40)',
    color: 'white',
  },
});

export default ParametersDevice;
