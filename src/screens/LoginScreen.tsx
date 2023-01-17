import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Controller, useForm } from 'react-hook-form';

import { RootStackParamList } from '../../App';
import { useState } from 'react';

type LoginType = {
  username: string;
  password: string;
};

type Props = NativeStackScreenProps<RootStackParamList>;

export default function LoginScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [show, setShow] = useState(false);

  const onSubmit = (data: LoginType) => {
    navigation.navigate('Personal');
    reset();
  };

  return (
    <VStack bgColor='#1F2122'>
      <VStack px='4' pt='14' pb='10'>
        <Heading color='white'>UG Induction for Visitor</Heading>
      </VStack>
      <VStack bgColor='white' px='4' pt='6' roundedTop='xl' height='full'>
        <Heading size='md' mb='3'>
          Sign In to Continue
        </Heading>
        <Controller
          control={control}
          rules={{
            required: 'username is required',
            minLength: {
              value: 2,
              message: 'username minimum 2 characters', // JS only: <p>error message</p> TS only support string
            },
            validate: (value) => value === 'visitor' || 'wrong credentials',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={errors.username && true}>
              <FormControl.Label isRequired>Username</FormControl.Label>
              <Input
                backgroundColor='white'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                InputLeftElement={
                  <Icon as={<MaterialIcons name='person' />} size={5} ml='2' />
                }
              />
              {errors.username && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size='xs' />}>
                  {errors.username.message}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
          name='username'
        />
        <Controller
          control={control}
          rules={{
            required: 'password is required',
            validate: (value) => value === 'Password@123',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={errors.password && true}>
              <FormControl.Label isRequired>Password</FormControl.Label>
              <Input
                backgroundColor='white'
                onBlur={onBlur}
                type={show ? 'text' : 'password'}
                onChangeText={onChange}
                value={value}
                InputLeftElement={
                  <Icon as={<MaterialIcons name='lock' />} size={5} ml='2' />
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr='2'
                      color='muted.400'
                    />
                  </Pressable>
                }
              />
              {errors.password && (
                <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size='xs' />}>
                    {errors.password.message}
                  </FormControl.ErrorMessage>
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
          name='password'
        />
        <Button mt='5' onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </VStack>
    </VStack>
  );
}
