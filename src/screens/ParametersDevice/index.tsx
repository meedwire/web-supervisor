import React from 'react';
import { View, Button, Text, TextInput } from '../../styles/GlobalStyle';
import { useHistory } from 'react-router-dom';
import { StyleSheet } from '../../utils';
import { KeyboardTouch } from '../../utils/KeyboardTouch';

const ParametersDevice: React.FC = () => {
  const history = useHistory();

  function handleKeyboard(e: React.FocusEvent<HTMLInputElement>) {
    KeyboardTouch.open(e, 'numeric');
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
          <TextInput onFocus={handleKeyboard} placeholder="Hz" />
        </View>
        <View>
          <Text>Frequência Máxima.</Text>
          <TextInput onFocus={handleKeyboard} placeholder="Hz" />
        </View>
        <View>
          <Text>Corrente Máxima de Saída.</Text>
          <TextInput onFocus={handleKeyboard} placeholder="Amperes" />
        </View>
        <View>
          <Text>Tensão Nominal.</Text>
          <TextInput onFocus={handleKeyboard} placeholder="Volts" />
        </View>
        <View>
          <Text>Rampa de Aceleração.</Text>
          <TextInput onFocus={handleKeyboard} placeholder="Segundos" />
        </View>
        <View>
          <Text>Rampa de desaceleração.</Text>
          <TextInput onFocus={handleKeyboard} placeholder="Segundos" />
        </View>
      </View>
      <View style={styles.boxButtons}>
        <Button style={styles.buttonSave} onClick={() => {}}>
          SALVAR
        </Button>
        <Button style={styles.buttonClear} onClick={() => history.push('/')}>
          LIMPAR
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'calc(100vh - 60px)',
    display: 'flex',
    flex: 1,
    color: 'white !important',
  },
  boxDeviceId: {
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
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
    gridTemplateColumns: '1fr 1fr',
    padding: '10px 20px 0px 20px',
    marginLeft: 20,
    marginRight: 20,
  },
  boxButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSave: {
    backgroundColor: 'rgb(0, 255, 0)',
    color: 'white',
    width: '40%',
  },
  buttonClear: {
    backgroundColor: 'rgb(200, 30, 40)',
    color: 'white',
    width: '40%',
  },
});

export default ParametersDevice;
