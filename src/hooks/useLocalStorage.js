import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [store, setStore] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStore(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

    } catch (error) {
      console.log(error);
    }
  };

  return [store, setStore];
}
