import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState(() => {
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    const initial = typeof initialValue === "function" ? initialValue() : initialValue;
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  });

  const setStoredValue = (newValue) => {
    setValue((prevValue) => {
      const finalValue = typeof newValue === "function" ? newValue(prevValue) : newValue;
      localStorage.setItem(key, JSON.stringify(finalValue));
      return finalValue;
    });
  };

//   return [value, setStoredValue];
  return { get: value, set: setStoredValue, reset: () => setStoredValue(initialValue) };
}
