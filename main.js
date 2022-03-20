//  Select the DOM Element
const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const lowercaseEl = document.querySelector('#lowercase');
const uppercaseEl = document.querySelector('#uppercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateEl = document.querySelector('#generate');
const clipboardEl = document.querySelector('#clipboard');

//  Write Function to create random values for each field
function getRandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}
function getRandomSymbol() {
  const symbols = `!@#$%^&*(){}[]=<>/,.`;
  return symbols[Math.floor(Math.random() * symbols.length)];
}
//  Put the random functions into an object

const randomFunc = {
  lower: getRandomLowercase,
  upper: getRandomUppercase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//  Generate password function
function generatePassword(upper, lower, number, symbol, length) {
  // 1. initialise password
  let generatedPassword = '';

  //   get the number that is checked

  const typeCount = upper + lower + number + symbol;

  //  create an object to check whether true or false

  const typeArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // if no boxes are checked don't run function
  if (typeCount === 0) {
    return '';
  }

  // loop through each type and call random generator function
  for (let i = 0; i < length; i += typeCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  // Add final pw to the pw variable and return: the slice is so it returns length even its less than 4(the typeCount). The .split... is to randomize the order in which the function is returned

  const finalPassword = generatedPassword
    .slice(0, length)
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return finalPassword;
}

// 3. Event listener for the generate button
generateEl.addEventListener('click', () => {
  // get the value of length put in by the user and use the unary + to turn it from string to number
  const length = +lengthEl.value;

  //   get checked values
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  // call the generate password function

  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumbers,
    hasSymbols,
    length
  );

  // Autoupdate result whenever any of the boxes are checked or unchecked
  if (resultEl.innerText !== '') {
    const inputs = [uppercaseEl, lowercaseEl, numbersEl, symbolsEl];
    inputs.forEach((input) => {
      input.addEventListener('click', () => {
        resultEl.innerText = generatePassword(
          hasUpper,
          hasLower,
          hasNumbers,
          hasSymbols,
          length
        );
      });
    });
  }
});

// 5. Clipboard function
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('copied to clipboard');
});
