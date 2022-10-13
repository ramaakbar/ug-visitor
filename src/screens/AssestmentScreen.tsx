import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  Button,
  Heading,
  HStack,
  Modal,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { FlatList } from 'react-native';

import { RootStackParamList } from '../../App';
import {
  assestmentEng,
  assestmentIndo,
  noteEng,
  noteIndo,
} from '../assestment';
import Question from '../components/Question';
import { useLanguageStore } from '../stores/languageStore';
import { PersonalDataType, usePersonalStore } from '../stores/personalStore';
import { JawabanType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList>;

const initialJawab: JawabanType = {
  jawab1: '',
  jawab2: '',
  jawab3: '',
  jawab4: '',
  jawab5: '',
};

const checkResult = (result: JawabanType) => {
  let benar = 0;
  let salah = 0;
  let index = 0;
  let nilai = 0;
  const jawaban = ['d', 'b', 'd', 'c', 'c'];

  for (const [, value] of Object.entries(result)) {
    if (value === jawaban[index]) {
      benar++;
    } else {
      salah++;
    }
    index++;
  }

  nilai = (benar / jawaban.length) * 100;
  return { benar, salah, nilai };
};

export default function AssestmentIndonesiaScreen({ navigation }: Props) {
  const [jawab, setJawab] = useState<JawabanType>(initialJawab);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { personal } = usePersonalStore();
  const { language } = useLanguageStore();

  const saveProgressTest = async (
    personal: PersonalDataType,
    // eslint-disable-next-line prettier/prettier
    nilai: number
  ) => {
    try {
      let res = await fetch(
        // eslint-disable-next-line prettier/prettier
        'https://ptfi-lms.fmi.com/db/ug_visitor/api/test.php',
        {
          method: 'POST',
          body: JSON.stringify({ id: personal.nik, nilai: nilai }),
          // eslint-disable-next-line prettier/prettier
        }
      );
      return res.text();
    } catch (error) {
      console.log('error fetching');
    }
  };

  return (
    <>
      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={language === 'Indonesia' ? assestmentIndo : assestmentEng}
        keyExtractor={(list) => list.id}
        renderItem={({ item, index }) => (
          <Question
            jawab={jawab}
            setJawab={setJawab}
            question={item.question}
            choices={item.choices}
            jawabIndex={`jawab${index + 1}`}
          />
        )}
        ListHeaderComponent={
          <>
            <Heading size='lg' pt={5}>
              Self Assessment UG Visitor Induction
              {language === 'Indonesia' ? '(BAHASA)' : '(ENGLISH)'}
            </Heading>
            <Alert my={5} w='100%' status='info'>
              <VStack space={2} flexShrink={1} w='100%'>
                <HStack flexShrink={1} space={2} justifyContent='space-between'>
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt='1' />
                    <Text fontSize='md' color='coolGray.800' w='90%'>
                      {language === 'Indonesia' ? noteIndo : noteEng}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
          </>
        }
        ListFooterComponent={
          <Button my={5} onPress={() => setShowModal(true)}>
            {language === 'Indonesia' ? 'Submit Jawaban' : 'Submit Answer'}
          </Button>
        }
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth='400px'>
          <Modal.CloseButton />
          <Modal.Header>Submit Jawaban</Modal.Header>
          <Modal.Body>
            <VStack space={5}>
              <Text>Apakah anda sudah yakin dengan jawaban anda?</Text>
              <Button.Group space={2} justifyContent='flex-end'>
                <Button
                  variant='ghost'
                  colorScheme='blueGray'
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  isLoading={loading}
                  isLoadingText='Submitting'
                  onPress={async () => {
                    setLoading(true);
                    const { nilai } = checkResult(jawab);
                    setJawab(initialJawab);
                    let res = await saveProgressTest(personal, nilai);

                    setLoading(false);
                    setShowModal(false);
                    navigation.navigate('ResultScreen', {
                      result: nilai,
                    });
                  }}>
                  Submit
                </Button>
              </Button.Group>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
