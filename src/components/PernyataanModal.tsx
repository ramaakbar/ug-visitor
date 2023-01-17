import { Button, Center, VStack, Modal, Text, HStack } from 'native-base';
import { useState } from 'react';
import { downloadFile } from '../pdf';
import { useLanguageStore } from '../stores/languageStore';
import { PersonalDataType, usePersonalStore } from '../stores/personalStore';

const sendEmail = async (data: PersonalDataType) => {
  let obj = {
    name: data.name,
    visitor_id: data.noVisitor,
    nik: data.nik,
  };
  try {
    let res = await fetch(
      'https://ptfi-lms.fmi.com/db/ug_visitor/api/send-email.php',
      {
        method: 'POST',
        body: JSON.stringify(obj),
      }
    );

    let data = await res.text();
    console.log(`email successfully send , ${data} `);

    return data;
  } catch (error) {
    console.log('error sending email');
  }
};

export default function PernyataanModal() {
  const [showModal, setShowModal] = useState(false);
  const { language } = useLanguageStore();
  const [loading, setLoading] = useState(false);
  const { personal } = usePersonalStore();

  return (
    <>
      <Button onPress={() => setShowModal(true)}>Download Certificate</Button>
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='xl'>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              {language === 'Indonesia'
                ? 'Surat Pernyataan'
                : 'Statement Letter'}
            </Modal.Header>
            <Modal.Body>
              <VStack>
                <HStack>
                  <Text fontWeight='semibold'>
                    {language === 'Indonesia'
                      ? 'Nama Peserta: '
                      : 'Name Visitor'}
                  </Text>
                  <Text paddingLeft={2}>{personal.name}</Text>
                </HStack>
                <HStack marginBottom={2}>
                  <Text fontWeight='semibold'>No ID / Visitor: </Text>
                  <Text paddingLeft={2}>V-{personal.noVisitor}</Text>
                </HStack>
                <Text fontSize='lg' marginBottom={2} italic>
                  {language === 'Indonesia'
                    ? 'Dengan ini saya telah menerima Materi Induksi Keselamatan di Tambang Bawah Tanah'
                    : 'I have hereby received Safety Induction Materials in the Underground Mine'}
                </Text>
                <VStack>
                  <Text fontSize='md' fontWeight='semibold' underline>
                    {language === 'Indonesia'
                      ? 'MATERI INDUKSI KESELAMATAN: '
                      : 'SAFETY INDUCTION MATERIALS'}
                  </Text>
                  <Text>
                    1.{' '}
                    {language === 'Indonesia'
                      ? 'Alat Pelindung Diri (APD) '
                      : 'Personal Protective Equipment (PPE)'}
                  </Text>
                  <Text>
                    2.{' '}
                    {language === 'Indonesia'
                      ? 'Masuk-Keluar Area Tambang Bawah Tanah'
                      : 'In-Out Underground Mine Areas'}
                  </Text>
                  <Text>
                    3. {language === 'Indonesia' ? 'Peledakan' : 'Blasting'}
                  </Text>
                  <Text>
                    4.{' '}
                    {language === 'Indonesia'
                      ? 'Lalu-lintas di Area Tambang Bawah Tanah'
                      : 'Traffic Rules in UG Mine'}
                  </Text>
                  <Text>
                    5.{' '}
                    {language === 'Indonesia'
                      ? 'Melintas di Lintasan Alat Berat'
                      : 'Passing on Heavy Equipment Route Access'}
                  </Text>
                  <Text>
                    6.{' '}
                    {language === 'Indonesia'
                      ? 'Risiko Utama Divisi Operasi Tambang Bawah Tanah'
                      : 'Underground Mine Operations Division Top Risk'}
                  </Text>
                  <Text>
                    7.{' '}
                    {language === 'Indonesia'
                      ? 'Nomor Telepon Penting Keadaan Darurat'
                      : 'Important Telephone Number'}
                  </Text>
                  <Text>
                    8. {language === 'Indonesia' ? 'Evakuasi' : 'Evacuation'}
                  </Text>
                  <Text>
                    9.{' '}
                    {language === 'Indonesia'
                      ? 'Aturan Umum'
                      : 'General Safety Rules'}
                  </Text>
                </VStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer justifyContent={'center'}>
              <VStack>
                <Text mb='2' fontWeight='bold' fontSize='lg' textAlign='center'>
                  {language === 'Indonesia'
                    ? 'Mengerti dan Berkomitmen Melaksanakan'
                    : 'Understand and Commit to Implement'}
                </Text>
                <Button.Group space={2} justifyContent={'center'}>
                  <Button
                    variant='ghost'
                    colorScheme='blueGray'
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    {language === 'Indonesia' ? 'Tidak' : 'No'}
                  </Button>
                  <Button
                    isLoading={loading}
                    isLoadingText='Loading'
                    onPress={async () => {
                      setLoading(true);
                      await sendEmail(personal);
                      await downloadFile(personal);
                      setLoading(false);
                      setShowModal(false);
                    }}>
                    {language === 'Indonesia' ? 'Ya' : 'Yes'}
                  </Button>
                </Button.Group>
              </VStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
}
