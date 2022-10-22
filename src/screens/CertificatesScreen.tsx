import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  SearchIcon,
  Text,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { downloadFile } from '../pdf-2';
import { Certificate, CertificateRes } from '../types';

export default function CertificatesScreen() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState({
    loading: false,
    item: '',
  });
  const [search, setSearch] = useState('');
  const [filteredResults, setFilteredResults] = useState<Certificate[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCert = async (): Promise<CertificateRes> => {
    let res = await fetch(
      'https://ptfi-lms.fmi.com/db/ug_visitor/api/all-certificates.php'
    );
    let data = await res.json();
    return data;
  };

  const searchCert = (searchValue: string) => {
    setSearch(searchValue);
    if (search !== '') {
      const filteredCert = certificates.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredCert);
    } else {
      setFilteredResults(certificates);
    }
  };

  const handleFetch = async () => {
    let cert = await fetchCert();
    if (cert.status.code === 404) {
      alert(cert.status.message);
    }
    setCertificates(cert.certificates);
  };
  useEffect(() => {
    setCertificates([]);
    setLoading((prev) => !prev);
    handleFetch();
    setLoading((prev) => !prev);
  }, []);

  return (
    <VStack space={4}>
      {loading === true ? (
        <Text padding={10}>Loading..</Text>
      ) : (
        <FlatList
          style={{ padding: 10 }}
          data={search.length > 1 ? filteredResults : certificates}
          keyExtractor={(list) => list.id}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            handleFetch();
            setRefreshing(false);
          }}
          ListHeaderComponent={
            <>
              <Input
                value={search}
                onChangeText={(text) => searchCert(text)}
                backgroundColor='white'
                clearButtonMode='always'
                InputLeftElement={
                  <SearchIcon m='2' ml='3' size='5' color='gray.400' />
                }
                mb={6}
              />
            </>
          }
          renderItem={({ item }) => (
            <Box
              backgroundColor={'white'}
              padding={3}
              marginBottom={5}
              rounded={'md'}>
              <HStack justifyContent={'space-between'}>
                <VStack space={1}>
                  <HStack>
                    <Text bold maxWidth={'40'}>
                      {item.nama}{' '}
                    </Text>
                    <Text>- {item.date.toString()}</Text>
                  </HStack>
                  <Text>Certificate: {item.id_user}</Text>
                  <Text>ID Visitor: {item.no_visitor}</Text>
                  <Flex direction='row'>
                    <Text>Status: </Text>
                    <Badge colorScheme='info'>{item.status}</Badge>
                  </Flex>
                </VStack>
                <Flex justifyContent={'center'}>
                  {item.status === 'Done' ||
                    (item.status === 'Done Download' && (
                      <Button
                        isLoading={
                          downloadLoading.item === item.id &&
                          downloadLoading.loading
                        }
                        isLoadingText='Loading'
                        variant='ghost'
                        onPress={async () => {
                          setDownloadLoading((prev) => ({
                            loading: true,
                            item: item.id,
                          }));
                          await downloadFile({
                            name: item.nama,
                            nik: item.id_user,
                            noVisitor: item.no_visitor,
                          });
                          setDownloadLoading((prev) => ({
                            ...prev,
                            loading: false,
                          }));
                        }}>
                        Download
                      </Button>
                    ))}
                </Flex>
              </HStack>
            </Box>
          )}
        />
      )}
    </VStack>
  );
}
