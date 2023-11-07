import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const imgPickerOptions = {
  allowsEditing: true,
  quality: 1,
  aspect: [1, 1],
};

function useImgPicker() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  function onImage({ cancelled, uri }) {
    setLoading(false);
    if (cancelled === true) return;
    setImage({ uri });
  }
  async function pickImage() {
    setLoading(true);
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== ImagePicker.PermissionStatus.GRANTED) {
      return;
    }
    ImagePicker.launchImageLibraryAsync(imgPickerOptions).then(onImage);
  }
  return { image, pickImage, loading };
}

export default useImgPicker;
