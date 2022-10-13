import * as FileSystem from 'expo-file-system';
import { PersonalDataType } from './stores/personalStore';

const grabPdf = async (data: PersonalDataType) => {
  let date = new Date();
  let obj = {
    name: data.name,
    visitor_id: data.nik,
    date: date.toLocaleDateString(),
  };
  try {
    let res = await fetch(
      // eslint-disable-next-line prettier/prettier
      'https://ptfi-lms.fmi.com/db/ug_visitor/api/download-certificate.php',
      {
        method: 'POST',
        body: JSON.stringify(obj),
        // eslint-disable-next-line prettier/prettier
      }
    );

    let data = await res.text();
    // console.log(data);

    return data;
  } catch (error) {
    console.log('error fetching');
  }
};

const downloadForAos = async (pdfBase64Str: any) => {
  const folder =
    FileSystem.StorageAccessFramework.getUriForDirectoryInRoot('Download');
  const permissions =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
      // eslint-disable-next-line prettier/prettier
      folder
    );
  if (!permissions.granted) {
    console.log('tidak dpt print');

    return;
  }

  let filePath = await FileSystem.StorageAccessFramework.createFileAsync(
    permissions.directoryUri,
    'certificate.pdf',
    // eslint-disable-next-line prettier/prettier
    'application/pdf'
  );
  // let filePath = "content://com.android.externalstorage.documents/tree/primary%3Atest/document/primary%3Atest%2Ftest.txt";
  // console.log(pdfBase64Str, '====');
  try {
    await FileSystem.StorageAccessFramework.writeAsStringAsync(
      filePath,
      pdfBase64Str,
      // eslint-disable-next-line prettier/prettier
      { encoding: FileSystem.EncodingType.Base64 }
    );
    alert('download success!');
  } catch (err) {
    console.log(err);
  }
};

export const downloadFile = async (data: PersonalDataType) => {
  const pdf = await grabPdf(data);

  downloadForAos(pdf);
};
