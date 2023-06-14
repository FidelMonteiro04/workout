export const formatCnpj = (
  value: string,
  callback: (field: string, value: string) => void
) => {
  // Remove tudo que não for número
  const cleanedValue = value.replace(/\D/g, "");

  // Verifica se o usuário está apagando caracteres
  if (cleanedValue.length < 14) {
    callback("cnpj", cleanedValue);
    return;
  }

  // Aplica a formatação do CNPJ
  let formattedValue = cleanedValue.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
    "$1.$2.$3/$4-$5"
  );
  callback("cnpj", formattedValue);

  return formattedValue;
};
