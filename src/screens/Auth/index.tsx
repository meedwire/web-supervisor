import React, { useContext } from 'react';
import { View, Text, TextInput, Button } from '../../styles/GlobalStyle';
import { ContextAutenticate } from '../../contexts/Auth';
import { StyleSheet } from '../../utils';

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    minWidth: 400,
  },
  textLogin: {
    textAlign: 'center',
  },
});

const Auth: React.FC = () => {
  const { authenticate } = useContext(ContextAutenticate);

  function handleAuth() {
    authenticate();
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.textLogin}>CLIENTE LOGIN</Text>
        <TextInput placeholder="Usuário" />
        <TextInput placeholder="Senha" type="password" />
        <Button onClick={handleAuth}>ENTRAR</Button>
      </View>
    </View>
  );
};

export default Auth;
