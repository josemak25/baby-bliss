export const abbreviateNumber = (value: any, decPlaces = 2) => {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate value abbreviations
  var abbrev = ['k', 'm', 'b', 't'];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the value is bigger or equal do the abbreviation
    if (size <= value) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      value = Math.round((value * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (value == 1000 && i < abbrev.length - 1) {
        value = 1;
        i++;
      }

      // Add the letter for the abbreviation
      value += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return value;
};

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
export const createFormData = (
  photo: {
    fileName: string;
    type: string;
    uri: string;
  },
  otherData: any
) => {
  if (!photo) return;
  const data = new FormData();

  data.append('images', {
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
};
