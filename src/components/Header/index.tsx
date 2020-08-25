import React from 'react';
import { View, Text, Button } from '../../styles/GlobalStyle';
import { StyleSheet } from '../../utils';

const Header: React.FC = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '100%',
    backgroundColor: '#dadada',
    alignSelf: 'baseline',
  },
});

export { Header };
