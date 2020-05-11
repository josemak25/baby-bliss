declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}

export default function createFormData(
  photo: {
    fileName: string;
    type: string;
    uri: string;
  },
  otherData: any
) {
  if (!photo) return;
  const data = new FormData();

  data.append('avatar', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri
  });

  //append other data
  const keys = Object.keys(otherData);
  if (keys.length) {
    keys.forEach(key => data.append(key, otherData[key]));
  }
  return data;
}
