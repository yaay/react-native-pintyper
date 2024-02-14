import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pintyper } from 'react-native-pintyper';

export default function App() {
  const [pinStatus, setPin] = useState(false);

  const handlePinChange = (pin) => {
    console.log('Entered PIN:', pin);
    setPin(true);
  };

  return (
    <View style={styles.container}>
      {pinStatus ? (
        <Text>Welcome! Please wait...</Text>
      ) : (
        <Text>Please Entre your PIN Code</Text>
      )}
      <Pintyper onPinEntered={handlePinChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
