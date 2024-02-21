import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string) {
    // getting stored value
    const saved = localStorage.getItem(key);
    if(saved === null) 
        return defaultValue;
    else 
        return JSON.parse(saved);
  }

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useUrl = () => {
    return useLocalStorage('url', '');
}