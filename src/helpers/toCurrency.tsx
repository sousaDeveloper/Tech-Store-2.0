interface toCurrencyProps {
  price: number;
}

const toCurrency = ({ price }: toCurrencyProps) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export default toCurrency;
