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
      }, 481000);

      return () => clearTimeout(timer);
    }, [])
  );
  return watched;
};
