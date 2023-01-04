import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  Alert,
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useRef } from 'react';
import { Dimensions } from 'react-native';

import { RootStackParamList } from '../../App';
import { useWatched } from '../hooks/useWatched';
import { useLanguageStore } from '../stores/languageStore';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function VideoIndonesiaScreen({ navigation }: Props) {
  const { language } = useLanguageStore();
  const video = useRef(null);
  const watched = useWatched();

  function setOrientation() {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  return (
    <ScrollView mx={4} mt={3}>
      <Heading size='lg'>
        {language === 'Indonesia' ? 'Video Indonesia' : 'English Video'}
      </Heading>

      <Alert my={5} w='100%' status='info'>
        <VStack space={2} flexShrink={1} w='100%'>
          <HStack flexShrink={1} space={2} justifyContent='space-between'>
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt='1' />
              <Text fontSize='md' color='coolGray.800' w='90%'>
                {language === 'Indonesia'
                  ? 'Anda harus menonton video sampai selesai untuk melanjutkan ke tahap selanjutnya'
                  : 'You need to watch the video until the end, to go to the next page'}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
      <Box width='full' height='72'>
        <Video
          ref={video}
          source={{
            uri:
              language === 'Indonesia'
                ? 'https://ptfi-lms.fmi.com/db/ug_visitor/videos/ID_UG_Induction_2022_HD.mp4'
                : 'https://ptfi-lms.fmi.com/db/ug_visitor/videos/EN_UG_Induction_2022_HD.mp4',
          }}
          useNativeControls
          //@ts-ignore
          resizeMode='contain'
          style={{ flex: 1, alignSelf: 'stretch' }}
          onFullscreenUpdate={setOrientation}
        />
      </Box>
      {watched && (
        <Button
          onPress={() => {
            navigation.navigate('Assestment');
          }}>
          Go to quis
        </Button>
      )}
    </ScrollView>
  );
}
