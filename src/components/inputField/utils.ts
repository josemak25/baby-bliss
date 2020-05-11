export const validateFormFields = (field: string, value: string) => {
  switch (field.toLowerCase()) {
    case 'name':
      if (value && value.trim().length < 4) {
        return 'Name too short!';
      }
      return;

    case 'username':
      if (value && value.trim().length < 3) {
        return 'Username too short!';
      }
      return;

    case 'email':
      const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!EMAIL_PATTERN.test(value && value.trim())) {
        return 'Invalid email address!';
      }
      return;

    case 'phone':
      const PHONE_PATTERN = /^(\+234|0)\d{10}$/;
      if (!PHONE_PATTERN.test(value)) {
        return 'Invalid phone number!';
      }
      return;
    case 'password':
      if (value && value.trim().length < 6) {
        return 'Password too short!';
      }
      return;

    case 'address':
      if (value && value.trim().length < 5) {
        return 'Address to short.';
      }
      return;

    default:
      break;
  }
};
