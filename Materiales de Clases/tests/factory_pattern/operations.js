const getOperator = (operator) => {
  switch (operator) {
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '*';
    case 'divide':
      return '/';
    default:
      return null;
  }
};

const operation = (operator) => {
  return (a, b) => {
    return eval(`${a} ${getOperator(operator)} ${b}`);
  };
};

export default operation;
