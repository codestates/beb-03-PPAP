export const isValidPhoneNumber = (phoneNumber: string) => {
  const regex = /^[0-9]{11,15}$/;
  return regex.test(phoneNumber);
};

export const isValidName = (name: string) => {
  const regex = /[가-힣|a-z|A-Z]+/;
  return regex.test(name);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};
