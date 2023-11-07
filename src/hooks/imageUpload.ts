import { useQuery, useMutation } from '@apollo/client';
import { UpdateAvatarDocument, GetSignedUrlDocument } from '../graphql/types.generated';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';

interface FormData {
  url?: string;
  fields?: Record<string, string>;
}

interface File {
  uri?: string;
  type?: string | null;
}

const uriContentType = (uri: string) => {
  return fetch(uri).then(({ headers }) => headers.get('content-type'));
};

const uploadForm = (url: string, body: BodyInit_) => {
  return fetch(url, { method: 'POST', body });
};

const makeFormData = (fields: FormData['fields'] = {}, file: File) => {
  const formData = new FormData();
  formData.append('Content-Type', file.type);
  formData.append('Cache-Control', 'max-age=0, must-revalidate');
  Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
  formData.append('file', file);
  return formData;
};

const useUpload = () => {
  const [formdata, setFormdata] = useState<FormData>({});
  const [updateAvatar] = useMutation(UpdateAvatarDocument);

  const { data: { getSignedUrl: { formdata: formdataStr = '' } = {} } = {}, refetch } = useQuery(GetSignedUrlDocument);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  useEffect(() => {
    if (formdataStr === undefined) return;
    setFormdata(JSON.parse(formdataStr));
  }, [formdataStr]);

  const upload = async ({ uri }: { uri: string }) => {
    const type = await uriContentType(uri);
    const { url: s3Url = '', fields = {} } = formdata;
    const file = { uri, type };
    const bodyData = makeFormData(fields, file);
    return uploadForm(s3Url, bodyData).then(() => updateAvatar());
  };
  return upload;
};

export default useUpload;
