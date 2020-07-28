import React, { useContext } from 'react';
import { View, Text, TextInput, Button } from '../../styles/GlobalStyle';
import { ContextAutenticate } from '../../contexts/Auth';

interface StyleSheet {
  [property: string]: React.CSSProperties;
}

const styles: StyleSheet = {
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
  buttonLogin: {
    padding: 10,
    margin: '10px 20px',
    borderRadius: 50,
    border: 'none',
    outline: 'none',
  },
};

const Auth: React.FC = () => {
  const { authenticate } = useContext(ContextAutenticate);

  function handleAuth () {
    authenticate();
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.textLogin}>CLIENTE LOGIN</Text>
        <TextInput placeholder="Usuário" />
        <TextInput placeholder="Senha" type="password" />
        <Button style={styles.buttonLogin} onClick={handleAuth}>
          ENTRAR
        </Button>
      </View>
    </View>
  );
};

export default Auth;
