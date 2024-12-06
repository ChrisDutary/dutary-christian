const App = (({ reverseString }) => {
  const htmlElements = {
    form: document.querySelector('form'),
    response: document.querySelector('#response'),
  }
  const handlers = {
    onInputChange(e) {
      htmlElements.response.textContent = reverseString(e.target.value);
    }
  }
  const bindEvents = () => {
    htmlElements.form.elements.cadena.addEventListener('input', handlers.onInputChange);
  }
  return {
    init() {
      bindEvents();
    }
  } 
})(window.Utils);
App.init();