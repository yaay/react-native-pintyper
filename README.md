# react-native-pintyper

Simple PIN input component for React Native apps.

## Installation

```sh
npm install react-native-pintyper
```

## Usage

```jsx
import React, { useState } from 'react';
import Pintyper from 'react-native-pintyper';

const YourComponent = () => {
  const handlePinEntered = (pin) => {
    console.log('PIN entered:', pin);
    // Your logic for handling the entered PIN
  };

  return (
    <Pintyper
      onPinEntered={handlePinEntered}
      numberOfDigits={5}
      containerProps={{ /* Additional View props */ }}
      containerStyle={{ /* Additional styles for the container */ }}
      inputProps={{ /* Additional TextInput props */ }}
      inputStyle={{ /* Additional styles for the TextInput */ }}
    />
  );
};

export default YourComponent;
```

## Props

- **`onPinEntered`** (required): Callback function triggered when the user enters the complete PIN. Receives the entered PIN as a string.

- **`numberOfDigits`** (optional, default: `5`): The number of digit boxes in the PIN input.

- **`containerProps`** (optional): Additional props to be passed to the outer `View` container.

- **`containerStyle`** (optional): Additional styles for the outer `View` container.

- **`inputProps`** (optional): Additional props to be passed to each `TextInput` component.

- **`inputStyle`** (optional): Additional styles for each `TextInput` component.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---