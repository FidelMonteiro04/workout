export const formatPrice = (price: string) => {
  const rawNumbers: any = price.replace(/[^0-9]/g, "").split("");

  for (let digit in rawNumbers) {
    let index = Number(digit);
    if (rawNumbers[index] != "0") break;
    rawNumbers[index] = "";
  }

  const correctLength = rawNumbers.join("").padStart(4, "0");
  const withComma =
    correctLength.slice(0, correctLength.length - 2) +
    "," +
    correctLength.slice(correctLength.length - 2);

  return withComma;
};
