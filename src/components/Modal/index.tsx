import React, { ReactNode, SetStateAction } from 'react';
import { View } from '../../styles/GlobalStyle';
import { StyleSheet } from '../../utils';

interface PropsModal {
  children: ReactNode;
  visible: boolean;
  onRequestClose: (prev: SetStateAction<boolean>) => void;
}

const Modal: React.FC<PropsModal> = ({ children, visible, onRequestClose }) => {
  return (
    <>
      {visible && (
        <View
          onClick={(e) => {
            /// onRequestClose((prev) => !prev);
          }}
          style={styles.overlayModal}
        >
          <View style={styles.containerModal}>{children}</View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlayModal: {
    position: 'absolute',
    width: '100%',
    left: 0,
    height: '100%',
    top: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    background: 'white',
    borderRadius: 10,
  },
});

export default Modal;
