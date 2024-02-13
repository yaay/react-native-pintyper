import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type TextInputProps,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

interface PinInputProps {
  onPinEntered: (pin: string) => void;
  numberOfDigits?: number;
  inputProps?: Omit<TextInputProps, 'style'>;
  inputStyle?: StyleProp<TextStyle>;
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: StyleProp<ViewStyle>;
}

const PinInput: React.FC<PinInputProps> = ({
  containerProps = {},
  containerStyle,
  inputProps = {},
  inputStyle,
  onPinEntered,
  numberOfDigits = 5,
}) => {
  const [pin, setPin] = useState(Array(numberOfDigits).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>(
    Array(numberOfDigits).fill(null)
  );

  useEffect(() => {
    setPin(Array(numberOfDigits).fill(''));
    inputRefs.current = Array(numberOfDigits).fill(null);
  }, [numberOfDigits]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handlePinChange = (index: number, input: string) => {
    if (input.length <= 1) {
      const newPin = [...pin];
      newPin[index] = input;
      setPin(newPin);

      if (input.length === 1 && index < numberOfDigits - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (input.length === 0 && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (index === 0 && input.length === 0) {
        inputRefs.current[index]?.focus();
      }

      if (newPin.every((digit) => digit !== '')) {
        console.log(newPin.join(''));
        onPinEntered(newPin.join(''));
      }
    }
  };

  return (
    <View {...containerProps} style={[containerStyle, styles.pinContainer]}>
      {pin.map((digit, index) => (
        <TextInput
          {...inputProps}
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[inputStyle, styles.pinBox]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handlePinChange(index, text)}
          value={digit}
          cursorColor={'grey'}
          secureTextEntry
          onFocus={() => inputRefs.current[index]?.focus()}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
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
