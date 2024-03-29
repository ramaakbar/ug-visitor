import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import CertificateMenu from './src/components/CertificateMenu';
import LanguageMenu from './src/components/LanguageMenu';
import AssestmentScreen from './src/screens/AssestmentScreen';
import CertificatesScreen from './src/screens/CertificatesScreen';
import LoginScreen from './src/screens/LoginScreen';
import PersonalScreen from './src/screens/PersonalScreen';
import ResultScreen from './src/screens/ResultScreen';
import VideoScreen from './src/screens/VideoScreen';
import { useLanguageStore } from './src/stores/languageStore';
import theme from './src/theme';

export type RootStackParamList = {
  Login: undefined;
  Personal: undefined;
  Video: undefined;
  Assestment: undefined;
  ResultScreen: {
    result: number;
  };
  CertificateScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { language, setLanguage } = useLanguageStore();
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor='#1F2122' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Personal'
            component={PersonalScreen}
            options={({ navigation }) => ({
              title: 'UG Visitor Induction',
              headerRight: () => (
                <>
                  <CertificateMenu
                    nav={() => navigation.navigate('CertificateScreen')}
                  />
                  <LanguageMenu language={language} setLanguage={setLanguage} />
                </>
              ),
            })}
          />
          <Stack.Screen
            name='Video'
            component={VideoScreen}
            options={{
              title: 'UG Visitor Induction',
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
          <Stack.Screen
            name='Assestment'
            component={AssestmentScreen}
            options={{
              title: 'UG Visitor Induction',
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
          <Stack.Screen
            name='ResultScreen'
            component={ResultScreen}
            options={{
              title: 'UG Visitor Induction',
              headerBackVisible: false,
              headerRight: () => (
                <LanguageMenu language={language} setLanguage={setLanguage} />
              ),
            }}
          />
          <Stack.Screen
            name='CertificateScreen'
            component={CertificatesScreen}
            options={{
              title: 'UG Visitor Induction',
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
