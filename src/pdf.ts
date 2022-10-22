import * as FileSystem from 'expo-file-system';
import { PersonalDataType } from './stores/personalStore';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

const grabPdf = async (data: PersonalDataType) => {
  let date = new Date();
  let obj = {
    name: data.name,
    visitor_id: data.noVisitor,
    nik: data.nik,
    date: date.toLocaleDateString(),
  };
  try {
    let res = await fetch(
      'https://ptfi-lms.fmi.com/db/ug_visitor/api/download-certificate.php',
      {
        method: 'POST',
        body: JSON.stringify(obj),
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
      folder
    );
  if (!permissions.granted) {
    console.log('tidak dpt print');

    return;
  }

  let filePath = await FileSystem.StorageAccessFramework.createFileAsync(
    permissions.directoryUri,
    'certificate.pdf',
    'application/pdf'
  );
  // let filePath = "content://com.android.externalstorage.documents/tree/primary%3Atest/document/primary%3Atest%2Ftest.txt";
  // console.log(pdfBase64Str, '====');
  try {
    await FileSystem.StorageAccessFramework.writeAsStringAsync(
      filePath,
      pdfBase64Str,
      { encoding: FileSystem.EncodingType.Base64 }
    );
    alert('download success!');
  } catch (err) {
    console.log(err);
  }
};

const downloadForIos = async (pdfBase64Str: any) => {
  const fileUri = getFileUri('certificate');
  await FileSystem.writeAsStringAsync(fileUri, pdfBase64Str, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await Sharing.shareAsync(fileUri);
  alert('download success!');
};

function getFileUri(name: string) {
  return FileSystem.documentDirectory + `${encodeURI(name)}.pdf`;
}

export const downloadFile = async (data: PersonalDataType) => {
  const pdf = await grabPdf(data);

  if (Platform.OS === 'ios') {
    downloadForIos(pdf);
  } else {
    downloadForAos(pdf);
  }
};
