import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from '../../utils';
import { BsBackspace } from 'react-icons/bs';
import { View, Text, Button } from '../../styles/GlobalStyle';

const Keyboard: React.FC = () => {
  const [value, setValue] = useState('');
  //   const [position, setPosition] = useState(0);
  const numeric = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const refInput = useRef<HTMLTextAreaElement>(null);

  function handleClick(i: string) {
    setValue((prev) => prev + i);
    refInput.current?.focus();
  }

  useEffect(() => {
    console.log(refInput.current?.selectionStart);
  }, [refInput.current]);

  function handleRemove() {
    if (refInput.current) {
      const position = refInput.current?.selectionStart;
      const arr = value.split('');
      const str = arr.filter((n, i) => i !== position - 1 && n).join('');
      const range = refInput.current.createTextRange();
      range.move('character', caretPos);
      range.select();
      refInput.current.focus();
      refInput.current.setSelectionRange(position, position);
      setValue(str);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxInput}>
        <textarea
          autoFocus={true}
          ref={refInput}
          {...{ value }}
          style={styles.input}
        />
        <Button onClick={handleRemove} style={styles.buttonClear} type="button">
          <BsBackspace size={'50%'} fill="#a9a9a9" />
        </Button>
      </View>
      <View style={styles.containerKeyboard}>
        {numeric.map((n) => (
          <View onClick={() => handleClick(n)} key={n} style={styles.button}>
            <Text>{n}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    margin: 20,
  },
  boxInput: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: '40vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClear: {
    height: '100%',
    width: '20%',
    margin: 0,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    fontSize: 40,
    borderRadius: 10,
    height: '40vh',
    width: '80%',
    outline: 'none',
    marginRight: 10,
  },
  containerKeyboard: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    marginTop: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    border: '1px solid #c1c1c1',
    margin: 5,
  },
});

export { Keyboard };
