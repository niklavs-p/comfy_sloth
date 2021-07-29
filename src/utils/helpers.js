export const formatPrice = (price) => {
  const newNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return newNumber.format((price / 100).toFixed(2));
};

export const getUniqueValues = () => {};
