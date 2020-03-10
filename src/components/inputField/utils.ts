export const validateFormFields = (field: string, value: string) => {
  switch (field.toLowerCase()) {
    case 'name':
      if (value.trim().length < 4) {
        return false;
      }
      return true;

    case 'username':
      if (value.trim().length < 3) {
        return false;
      }
      return true;

    case 'email':
      const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!EMAIL_PATTERN.test(value.trim())) {
        return false;
      }
      return true;

    case 'phone':
      const PHONE_PATTERN = /^(\+234|0)\d{10}$/;
      if (!PHONE_PATTERN.test(value)) {
        return false;
      }
      return true;
    case 'password':
      if (value.trim().length < 6) {
        return false;
      }
      return true;

    case 'address':
      if (value.trim().length < 5) {
        return false;
      }
      return true;

    default:
      break;
  }
};
