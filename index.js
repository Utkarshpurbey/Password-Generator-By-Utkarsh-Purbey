const NUMBERS=['0','1','2','3','4','5','6','7','8','9']
const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const SYMBOLS = ['*', '#', '?', '^', '$', '%', '&', '{', '}', '[', ']', '~'];
const lengthRange = document.getElementById('length');
const lengthValueSpan = document.getElementById('lengthValue');
const passwordInput = document.getElementById('password');
const clipBoardButton = document.getElementById('clipboard');
const clipboardAlert = document.getElementById('alert');


let state = {
  numbers: true,
  lowercase: true,
  uppercase: true,
  symbols: true,
  passwordLength: 20,
};


document.addEventListener('DOMContentLoaded', () => {
  if (typeof generatePassword !== 'undefined') {
    generatePassword();
  }
});

const copyToClipboard = async () => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(passwordInput.value);
    clipboardAlert.classList.add('active');
    clipBoardButton.setAttribute('disabled', true);

    setTimeout(() => {
      clipboardAlert.classList.remove('active');
      clipBoardButton.removeAttribute('disabled');
    }, 2000);
  }
};
clipBoardButton.addEventListener('click', copyToClipboard);

const allCheckBoxes=[...document.querySelectorAll(".checkbox")];
allCheckBoxes.forEach((input) => {
  input.addEventListener('change', (e) => {
    state = { ...state, [e.target.id]: e.target.checked };
    generatePassword();
  });
});

lengthRange.addEventListener('input', (e) => {
  lengthValueSpan.innerText = e.target.value;
  state = { ...state, passwordLength: e.target.value };
  generatePassword();
});

const generatePassword = () => {
  let finalPassword = '';
  const availableCharacters = [
    ...(state.numbers ? NUMBERS : []),
    ...(state.uppercase ? LETTERS : []),
    ...(state.lowercase ? LETTERS.map((letter) => letter.toLowerCase()) : []),
    ...(state.symbols ? SYMBOLS : []),
  ];

  for (let i = 0; i < state.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    finalPassword += availableCharacters[randomIndex];
  }

  passwordInput.value = finalPassword;
};
