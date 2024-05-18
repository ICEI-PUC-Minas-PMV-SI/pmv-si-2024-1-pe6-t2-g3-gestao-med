export function formatPhoneNumber(value: string) {
  let formattedValue = value.replace(/\D/g, "");

  if (formattedValue.length > 11) {
    formattedValue = formattedValue.slice(0, 11);
  }

  formattedValue = formattedValue.replace(
    /^(\d{2})(\d{1})(\d{4})(\d{4})/,
    "($1) $2 $3-$4"
  );

  return formattedValue;
}
