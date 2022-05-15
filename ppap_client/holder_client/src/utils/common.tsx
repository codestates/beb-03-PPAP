export const isValidPhoneNumber = (phoneNumber: string) => {
  const regex = /[0-9A-Za-z]+@[A-Za-z]+\.[A-Za-z]{3}$/;
  return regex.test(phoneNumber);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};
