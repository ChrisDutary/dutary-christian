
function numPalindromo() {
    const numero = document.getElementById("numeroPalindromo").value;
    const esPalindromo = (str) => str === str.split('').reverse().join('');
    const numeroBase10 = numero;
    const numeroBase2 = parseInt(numero).toString(2);

    if(esPalindromo(numeroBase10) && esPalindromo(numeroBase2)) {
        document.getElementById("resultadoPalindromo").textContent = `${numero} es un palindromo`;
    } else {
        document.getElementById("resultadoPalindromo").textContent = `${numero} no es un palindromo`;
    }
}

function cuentaletras() {
    const cadena = document.getElementById("letras").value; 
    const conteo = {};

    for (let char of cadena) {
        conteo[char] = (conteo[char] || 0) + 1;
    }

    let resultado = '';
    for (let char in conteo){
        resultado += `${char}:${conteo[char]}---`;
    }

    document.getElementById("resultadoLetras").textContent = resultado;
}

function Bisiesto() {
    const anio = parseInt(document.getElementById("anioBisiesto").value);

    if((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0 )){
        document.getElementById("resultadoBisiesto").textContent = `${anio} es un año bisiesto`;
    } else{
        document.getElementById("resultadoBisiesto").textContent = `${anio} no es un año bisiesto`;
    }
}

function numPrimos() {
    const limite = parseInt(document.getElementById("numeroPrimo").value);

    if (limite <= 0 || limite >= 1000000) {
        document.getElementById("resultadodePrimos").textContent = "Por favor, ingrese un número entre 1 y 999,999.";
        return; // Salir de la función si el número está fuera del rango
    }
    let suma = 0;

    function Primo(num){
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++){
            if (num % i === 0) return false;
        }
        return true;
    }

    for(let i = 2; i <= limite; i++){
        if(Primo(i)){
            suma += i;
        }
    }

    document.getElementById("resultadodePrimos").textContent = `La sumatoria de los numeros primos es: ${suma}`; 
}
