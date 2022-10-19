import { Pressable, Text } from 'native-base';

export default function CertificateMenu({ nav }: { nav: () => void }) {
  return (
    <Pressable onPress={nav} mr={5}>
      <Text>Certificate</Text>
    </Pressable>
  );
}
