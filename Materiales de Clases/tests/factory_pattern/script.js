import operation from './operations.js';

const htmlElements = {
  form: document.querySelector('form'),
  result: document.querySelector('#result'),
};

const templates = {
  result: (value) => `<span>${value}</span>`,
};

const render = (value) => {
  htmlElements.result.innerHTML = templates.result(value);
};

const handlers = {
  calculate: (e) => {
    e.preventDefault();
    const a = e.target.a.value;
    const b = e.target.b.value;
    const operator = e.target.operator.value;
    const fn = operation(operator);
    const result = fn(a, b);
    render(result);
  },
};

const bindEvents = () => {
  htmlElements.form.addEventListener('submit', handlers.calculate);
};

const init = () => {
  bindEvents();
};

init();
