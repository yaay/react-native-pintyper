import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface PinInputProps {
  onPinEntered: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ onPinEntered }) => {
  const [pin, setPin] = useState(['', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>(Array(5).fill(null));

  const handlePinChange = (index: number, input: string) => {
    if (input.length <= 1) {
      const newPin = [...pin];
      newPin[index] = input;
      setPin(newPin);

      if (input.length === 1 && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (input.length === 0 && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newPin.every((digit) => digit !== '')) {
        onPinEntered(newPin.reverse().join(''));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.pinBox}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handlePinChange(index, text)}
            value={digit}
            secureTextEntry
            onFocus={() => inputRefs.current[index]?.focus()}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
  },
  pinBox: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: 'grey',
    textAlign: 'center',
    fontSize: 20,
    marginRight: 10,
  },
});

export default PinInput;
