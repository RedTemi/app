import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const imgPickerOptions = {
  allowsEditing: true,
  quality: 1,
  aspect: [1, 1] as [number, number],
};

const useImgPicker = () => {
  const [image, setImage] = useState<{ uri?: string }>({});
  const [loading, setLoading] = useState(false);

  const onImage = ({ cancelled, uri }: { cancelled: boolean; uri?: string }) => {
    setLoading(false);
    if (cancelled) return;
    setImage({ uri });
  };

  async function pickImage() {
    setLoading(true);
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== ImagePicker.PermissionStatus.GRANTED) {
      return;
    }
    ImagePicker.launchImageLibraryAsync(imgPickerOptions).then(onImage);
  }
  return { image, pickImage, loading };
};

export default useImgPicker;
