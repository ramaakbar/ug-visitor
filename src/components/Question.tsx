import { Box, FormControl, Radio, Stack } from 'native-base';
import { Dispatch, SetStateAction } from 'react';
import { Image } from 'react-native';

import { JawabanType } from '../types';

type Props = {
  jawab: JawabanType;
  setJawab: Dispatch<SetStateAction<JawabanType>>;
  question: string;
  choices: string[];
  jawabIndex: string;
};

const value = ['a', 'b', 'c', 'd'];

export default function Question({
  jawab,
  setJawab,
  question,
  choices,
  jawabIndex,
}: Props) {
  return (
    <Box mt={3} backgroundColor='white' rounded='md' p={5}>
      <FormControl>
        <FormControl.Label
          mb={4}
          _text={{
            fontSize: 'md',
            bold: true,
          }}>
          {question}
        </FormControl.Label>
        <Radio.Group
          name='exampleGroup'
          accessibilityLabel='select prize'
          defaultValue={jawab.jawab1}
          onChange={(value) => {
            setJawab((prev) => ({ ...prev, [jawabIndex]: value || '' }));
          }}>
          <Stack space={4} w='90%'>
            {choices.map((val, index) => (
              <Radio
                key={index}
                value={value[index]}
                size='sm'
                _stack={{ alignItems: 'flex-start' }}>
                {question.includes('3.') === true ? (
                  <Box>
                    {`${value[index]}.`}
                    {/* @ts-ignore */}
                    <Image source={val} />
                  </Box>
                ) : (
                  val
                )}
              </Radio>
            ))}
          </Stack>
        </Radio.Group>
      </FormControl>
    </Box>
  );
}
