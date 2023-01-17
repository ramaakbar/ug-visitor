import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Box, Button, Heading, HStack, Text, VStack } from 'native-base';

import { RootStackParamList } from '../../App';
import PernyataanModal from '../components/PernyataanModal';
import { useLanguageStore } from '../stores/languageStore';
import { PersonalDataType, usePersonalStore } from '../stores/personalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ResultScreen'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { result } = route.params;
  const { language } = useLanguageStore();
  const { personal } = usePersonalStore();

  return (
    <VStack space={4} mx={4} mt={4}>
      <VStack>
        <Heading size='md' mb={5}>
          SELF ASSESSMENT UG VISITOR INDUCTION{' '}
          {language === 'Indonesia' ? '(BAHASA)' : '(ENGLISH)'}
        </Heading>
        {result !== 100 ? (
          <Alert w='100%' status='error'>
            <VStack space={2} flexShrink={1} w='100%'>
              <HStack
                flexShrink={1}
                space={1}
                alignItems='center'
                justifyContent='space-between'>
                <HStack space={2} flexShrink={1} alignItems='center'>
                  <Alert.Icon />
                  <Text
                    fontSize='md'
                    fontWeight='medium'
                    _dark={{
                      color: 'coolGray.800',
                    }}>
                    {language === 'Indonesia'
                      ? 'Maaf anda tidak lulus'
                      : 'Sorry you didnt pass'}
                  </Text>
                </HStack>
              </HStack>
              <Box
                pl='6'
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}>
                {language === 'Indonesia'
                  ? `Nilai anda adalah ${result}`
                  : `Your score is ${result}`}
              </Box>
              <Box
                pl='6'
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}>
                {language === 'Indonesia'
                  ? 'Anda harus mengulang lagi quisnya'
                  : 'You need to do the quis again.'}
              </Box>
            </VStack>
          </Alert>
        ) : (
          <Alert w='100%' status='success'>
            <VStack space={2} flexShrink={1} w='100%'>
              <HStack
                flexShrink={1}
                space={1}
                alignItems='center'
                justifyContent='space-between'>
                <HStack space={2} flexShrink={1} alignItems='center'>
                  <Alert.Icon />
                  <Text
                    fontSize='md'
                    fontWeight='medium'
                    _dark={{
                      color: 'coolGray.800',
                    }}>
                    {language === 'Indonesia'
                      ? 'Selamat anda lulus'
                      : 'Congrats, you passed the test'}
                  </Text>
                </HStack>
              </HStack>
              <Box
                pl='6'
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}>
                {language === 'Indonesia'
                  ? `Nilai anda adalah ${result}`
                  : `Your score is ${result}`}
              </Box>
              <Box
                pl='6'
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}>
                {language === 'Indonesia'
                  ? `Berikut ini adalah ID Visitor anda : ${personal.nik}`
                  : `Here is your Visitor ID : V-${personal.noVisitor}`}
              </Box>
              <Box
                pl='6'
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}>
                {language === 'Indonesia'
                  ? 'Anda bisa mendownload sertifikatnya di bawah ini. Terimakasih sudah mengikuti assestment ini.'
                  : 'You can download the certificate down below. Thank you.'}
              </Box>
            </VStack>
          </Alert>
        )}
      </VStack>

      {result === 100 ? (
        <PernyataanModal />
      ) : (
        <Button
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Assestment' }],
            });
          }}>
          {language === 'Indonesia'
            ? 'Coba lagi, kembali ke quis'
            : 'Try again, back to quis'}
        </Button>
      )}

      <Button
        variant={'outline'}
        onPress={() => navigation.navigate('Personal')}>
        Kembali ke halaman utama
      </Button>
    </VStack>
  );
}
