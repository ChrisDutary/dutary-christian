const numberModule = (function () {
    const generateBtn = document.getElementById('generateBtn');
    const BtnAsc = document.getElementById('BtnAsc');
    const BtnDesc = document.getElementById('BtnDesc');
    const numberCont = document.getElementById('numberCont');

    let numbers = [];

    
    
    function generateNum() {
        return Math.floor(Math.random() * 99) + 1; 
    }


    generateBtn.addEventListener('click', () => {
        let newNumber = generateNum();
        
        while (numbers.includes(newNumber)) {
            newNumber = generateNum(); 
        }

        numbers.push(newNumber); 
        numVerif(numbers);
    });

    function numVerif(numbersArray) {
        numberCont.innerHTML = '';
        numbersArray.forEach(num => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number-box');
            numberElement.textContent = NumDigit(num);
            numberCont.appendChild(numberElement);
        });
    }


    function NumDigit(number) {
        return number < 10 ? `0${number}` : number; 
    }

    function NumbersAsc(numbersArray) {
        return numbersArray.slice().sort((a, b) => a - b); 
    }

    function NumbersDesc(numbersArray) {
        return numbersArray.slice().sort((a, b) => b - a); 
    }

    function OrderNum(order) {
        let NumerosOrdenados;
        if (order === 'asc') {
            NumerosOrdenados = NumbersAsc(numbers);
        } else if (order === 'desc') {
            NumerosOrdenados = NumbersDesc(numbers);
        }
        numVerif(NumerosOrdenados);
    }

    BtnAsc.addEventListener('click', () => OrderNum('asc'));
    BtnDesc.addEventListener('click', () => OrderNum('desc'));


})();
