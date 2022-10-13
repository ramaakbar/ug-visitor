import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

const initialState = false;

export const useWatched = () => {
  const [watched, setWatched] = useState(initialState);
  useFocusEffect(
    useCallback(() => {
      setWatched(false);
      const timer = setTimeout(() => {
        setWatched(true);
      }, 1000);

      return () => clearTimeout(timer);
      // eslint-disable-next-line prettier/prettier
    }, [])
  );
  return watched;
};
