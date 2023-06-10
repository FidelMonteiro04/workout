export const formatPhoneNumber = (
  value: string,
  callback: (field: string, value: string) => void
) => {
  const phoneNumber = value.replace(/\D/g, "");

  if (phoneNumber.length > 11) {
    callback("contact", value.slice(0, value.length - 1));
    return;
  }

  let formattedValue = phoneNumber.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3"
  );
  if (phoneNumber.length > 10) {
    formattedValue = phoneNumber.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      "($1) $2 $3-$4"
    );
  }
  callback("contact", formattedValue);
};
