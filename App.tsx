import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import LanguageMenu from './src/components/LanguageMenu';
import AssestmentScreen from './src/screens/AssestmentScreen';
import PersonalScreen from './src/screens/PersonalScreen';
import ResultScreen from './src/screens/ResultScreen';
import VideoScreen from './src/screens/VideoScreen';
import { useLanguageStore } from './src/stores/languageStore';
import theme from './src/theme';
import { JawabanType } from './src/types';

export type RootStackParamList = {
  Personal: undefined;
  Video: undefined;
  Assestment: undefined;
  ResultScreen: {
    result: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { language, setLanguage } = useLanguageStore();
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Personal'>
          <Stack.Screen
            name='Personal'
            component={PersonalScreen}
            options={{
              title: 'UG Induction',
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
          <Stack.Screen
            name='Video'
            component={VideoScreen}
            options={{
              title: 'UG Induction',
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
          <Stack.Screen
            name='Assestment'
            component={AssestmentScreen}
            options={{
              title: 'UG Induction',
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
          <Stack.Screen
            name='ResultScreen'
            component={ResultScreen}
            options={{
              title: 'UG Induction',
              headerBackVisible: false,
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
