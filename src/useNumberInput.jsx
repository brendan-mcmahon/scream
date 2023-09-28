import { useState } from 'react';

export default function useNumberInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const setNumberValue = (event) => {
    // Parse the value to a number and update the state
    setValue(Number(event.target.value));
  };

  return [value, setNumberValue];
}
