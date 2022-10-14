import { Pressable, Text } from 'native-base';

export default function CertificateMenu() {
  return (
    <Pressable onPress={() => console.log('asdas')} mr={5}>
      <Text>Certificate</Text>
    </Pressable>
  );
}
