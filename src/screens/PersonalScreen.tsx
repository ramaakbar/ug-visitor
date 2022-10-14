import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  FormControl,
  Heading,
  Input,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { RootStackParamList } from '../../App';
import { useLanguageStore } from '../stores/languageStore';
import { PersonalDataType, usePersonalStore } from '../stores/personalStore';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function PersonalScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalDataType>({
    defaultValues: {
      name: '',
      noVisitor: '',
    },
  });
  const { personal, setPersonal } = usePersonalStore();
  const { language } = useLanguageStore();
  const [loading, setLoading] = useState(false);

  const savePersonal = async (upperName: string, noVisitor: string) => {
    try {
      let res = await fetch(
        // eslint-disable-next-line prettier/prettier
        'https://ptfi-lms.fmi.com/db/ug_visitor/api/save-personal.php',
        {
          method: 'POST',
          body: JSON.stringify({
            name: upperName,
            no_visitor: noVisitor,
          }),
          // eslint-disable-next-line prettier/prettier
        }
      );
      return res.text();
    } catch (error) {
      console.log('error fetching');
    }
  };

  const onSubmit = async (data: PersonalDataType) => {
    setLoading(true);

    let upperName = data.name.toUpperCase();

    let res = await savePersonal(upperName, data.noVisitor!);
    // console.log('res:', res);

    setPersonal({ name: upperName, nik: res, noVisitor: data.noVisitor });

    setLoading(false);
    navigation.navigate('Video');
    reset();
  };

  return (
    <VStack mx={4} mt={3}>
      <Heading size='lg'>Personal Data</Heading>
      <VStack mt={2} space={2}>
        <Controller
          control={control}
          rules={{ required: true, minLength: 2 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={errors.name && true}>
              <FormControl.Label isRequired>
                {language === 'Indonesia' ? 'Nama' : 'Name'}
              </FormControl.Label>
              <Input
                backgroundColor='white'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size='xs' />}>
                  Name is required
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
          name='name'
        />
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: { value: /^[0-9]+$/, message: 'Please enter a number' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={errors.noVisitor && true}>
              <FormControl.Label isRequired>No Visitor</FormControl.Label>
              <Input
                backgroundColor='white'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.noVisitor && (
                <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size='xs' />}>
                    {errors.noVisitor.message
                      ? errors.noVisitor.message
                      : 'No Visitor is required'}
                  </FormControl.ErrorMessage>
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
          name='noVisitor'
        />
        {/* <Text>{`${personal.name} + ${personal.nik}`}</Text> */}
        <Button
          mt='5'
          onPress={handleSubmit(onSubmit)}
          isLoading={loading}
          isLoadingText='Submitting'>
          Submit
        </Button>
      </VStack>
    </VStack>
  );
}
