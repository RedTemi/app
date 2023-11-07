import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import QueryUpload from '../graphql/query.upload.graphql';
import MutationUpdateAvatar from '../graphql/mutation.updateAvatar.graphql';

function uriContentType(uri) {
  return fetch(uri).then(({ headers }) => headers.get('content-type'));
}

function uploadForm(url, body) {
  return fetch(url, { method: 'POST', body });
}

function makeFormData(fields, file) {
  const formData = new FormData();
  formData.append('Content-Type', file.type);
  formData.append('Cache-Control', 'max-age=0, must-revalidate');
  Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
  formData.append('file', file);
  return formData;
}

function useUpload() {
  const [formdata, setFormdata] = useState();
  const {
    data: {
      getSignedUrl: {
        formdata: formdataStr,
      } = {},
    } = {},
    refetch,
  } = useQuery(QueryUpload);
  const [updateAvatar] = useMutation(MutationUpdateAvatar);
  useFocusEffect(useCallback(() => {
    refetch();
  }, [refetch]));
  useEffect(() => {
    if (formdataStr === undefined) return;
    setFormdata(JSON.parse(formdataStr));
  }, [formdataStr]);
  async function upload({ uri }) {
    const type = await uriContentType(uri);
    const { url: s3Url, fields } = formdata;
    const file = { uri, type };
    const bodyData = makeFormData(fields, file);
    return uploadForm(s3Url, bodyData).then(() => updateAvatar());
  }
  return upload;
}

export default useUpload;
