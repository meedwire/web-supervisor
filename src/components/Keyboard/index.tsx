import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from '../../utils/index';
import { BsBackspace, BsArrowReturnLeft } from 'react-icons/bs';
import { View, Text, Button } from '../../styles/GlobalStyle';

interface PropsKeyBoard {
  e: React.FocusEvent<HTMLInputElement>;
  type: 'numeric' | 'qwrt';
}

const Keyboard: React.FC<PropsKeyBoard> = ({ e, type }) => {
  const [value, setValue] = useState(e.target.value);

  const keyboardType =
    type === 'numeric'
      ? [
          { value: '0', element: '0' },
          { value: '1', element: '1' },
          { value: '2', element: '2' },
          { value: '3', element: '3' },
          { value: '4', element: '4' },
          { value: '5', element: '5' },
          { value: '6', element: '6' },
          { value: '7', element: '7' },
          { value: '8', element: '8' },
          { value: '9', element: '9' },
          { value: '.', element: '.' },
          { value: 'backspace', element: <BsBackspace /> },
        ]
      : [
          { value: 'q', element: 'q' },
          { value: 'w', element: 'w' },
          { value: 'e', element: 'e' },
          { value: 'r', element: 'r' },
          { value: 't', element: 't' },
          { value: 'y', element: 'y' },
          { value: 'u', element: 'u' },
          { value: 'i', element: 'i' },
          { value: 'o', element: 'o' },
          { value: 'p', element: 'p' },
          { value: 'a', element: 'a' },
          { value: 's', element: 's' },
          { value: 'd', element: 'd' },
          { value: 'f', element: 'f' },
          { value: 'g', element: 'g' },
          { value: 'h', element: 'h' },
          { value: 'j', element: 'j' },
          { value: 'k', element: 'k' },
          { value: 'l', element: 'l' },
          { value: '@', element: '@' },
          { value: 'z', element: 'z' },
          { value: 'x', element: 'x' },
          { value: 'c', element: 'c' },
          { value: 'v', element: 'v' },
          { value: 'b', element: 'b' },
          { value: 'n', element: 'n' },
          { value: 'm', element: 'm' },
          { value: '.com', element: '.com' },
          { value: 'backspace', element: <BsBackspace /> },
        ];

  const refInput = useRef<HTMLTextAreaElement>(null);

  function handleClose() {
    const root = document.getElementById('root');
    const keyborard = document.getElementById('keyboard');
    if (root && keyborard) {
      root.removeChild(keyborard);
    }
  }

  function handleClick(i: string) {
    if (i === 'backspace') {
      handleRemove();
      return;
    }
    setValue((prev) => prev + i);

    return refInput.current && refInput.current.focus();
  }

  useEffect(() => {
    console.log(refInput.current?.selectionStart);
  }, [refInput.current]);

  function handleRemove() {
    if (refInput.current) {
      const position = refInput.current?.selectionStart;
      const arr = value.split('');
      const str = arr.filter((n, i) => i !== position - 1 && n).join('');
      refInput.current.focus();
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
        <Button
          onClick={() => {
            e.target.value = value;
            handleClose();
          }}
          style={styles.buttonClear}
          type="button"
        >
          <BsArrowReturnLeft size={'50%'} fill="#a9a9a9" />
        </Button>
      </View>
      <View
        style={Object.assign(styles.containerKeyboard, {
          gridTemplateColumns:
            type === 'numeric'
              ? '1fr 1fr 1fr 1fr 1fr'
              : '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        })}
      >
        {keyboardType.map((keyType, i) => (
          <View
            onClick={() => handleClick(keyType.value)}
            key={keyType.value}
            style={styles.button}
          >
            <Text>{keyType.element}</Text>
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
    resize: 'none',
  },
  containerKeyboard: {
    display: 'grid',
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
