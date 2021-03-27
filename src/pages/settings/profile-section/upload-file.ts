import {axiosAuthTodos} from '@utils/axios-instances';
import axios from 'axios';

export async function uploadToS3({
  fileType,
  fileContents,
}: {
  fileType: string;
  fileContents: File;
}) {
  const presignedPostUrl = await getPresignedPostUrl(fileType);

  const formData = new FormData();
  formData.append('Content-Type', fileType);
  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append('file', fileContents); // The file must be the last element

  const response = await axios.post(presignedPostUrl.url, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  console.log('response is', response);

  return presignedPostUrl.filePath;
}

type PresignedPostUrlResponse = {
  url: string;
  fields: {
    key: string;
    acl: string;
    bucket: string;
  };
  filePath: string;
};

async function getPresignedPostUrl(fileType: string) {
  const {
    data: presignedPostUrl,
  } = await axiosAuthTodos.get<PresignedPostUrlResponse>(
    `/get-presigned-url-s3?fileType=${fileType}`,
  );

  return presignedPostUrl;
}
