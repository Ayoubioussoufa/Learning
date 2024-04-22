// let button = document.getElementById("convert-btn");
// let input = document.getElementById("number");
// let output = document.getElementById("output");
// let value = '';

// input.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         Roman(input.value);
//         input.value = '';
//       }
// });

// button.addEventListener('click', () => {
//     Roman(input.value);
//     input.value = '';
// });


// function Roman(number) {
//     const dictionary = {
//         1000: "M", 900: "CM", 500: "D", 400: "CD",
//         100: "C", 90: "XC", 50: "L", 40: "XL",
//         10: "X", 9: "IX", 5: "V", 4: "IV", 1: "I"
//     };
//     if (number.length == 0 || !parseInt(number)) {
//         output.innerText = "Please enter a valid number";
//         return ;
//     }
//     else if (parseInt(number) < 1) {
//         output.innerText = "Please enter a number greater than or equal to 1";
//         return ;
//     }
//     else if (parseInt(number) > 3999) {
//         output.innerText = "Please enter a number less than or equal to 3999";
//         return ;
//     }
//     let array = [];
//     while (number > 0) {
//         let num = number - (number % (10 ** (number.toString().length - 1)));
//         let rest = number % (10 ** (number.toString().length - 1));
//         while (num > 0) {
//             if (num >= 1000)
//             {
//                 num -= 1000;
//                 array.push(dictionary[1000]);
//             }
//             else if (num >= 900)
//             {
//                 num -= 900;
//                 array.push(dictionary[900]);
//             }
//             else if (num >= 500)
//             {
//                 num -= 500;
//                 array.push(dictionary[500]);
//             }
//             else if (num >= 400)
//             {
//                 num -= 400;
//                 array.push(dictionary[400]);
//             }
//             else if (num >= 100)
//             {
//                 num -= 100;
//                 array.push(dictionary[100]);
//             }
//             else if (num >= 90)
//             {
//                 num -= 90;
//                 array.push(dictionary[90]);
//             }
//             else if (num >= 50)
//             {
//                 num -= 50;
//                 array.push(dictionary[50]);
//             }
//             else if (num >= 40)
//             {
//                 num -= 40;
//                 array.push(dictionary[40]);
//             }
//             else if (num >= 10)
//             {
//                 num -= 10;
//                 array.push(dictionary[10]);
//             }
//             else if (num >= 9)
//             {
//                 num -= 9;
//                 array.push(dictionary[9]);
//             }
//             else if (num >= 5)
//             {
//                 num -= 5;
//                 array.push(dictionary[5]);
//             }
//             else if (num >= 4)
//             {
//                 num -= 4;
//                 array.push(dictionary[4]);
//             }
//             else if (num >= 1)
//             {
//                 num -= 1;
//                 array.push(dictionary[1]);
//             }
//         }
//         number = rest;
//     }
//     let st = array.join('');
//     output.innerText = st;
// }

const form = document.getElementById('form');
const convertButton = document.getElementById('convert-btn');
const output = document.getElementById('output');

const convertToRoman = num => {
  const ref = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];
  const res = [];

  ref.forEach(function (arr) {
    while (num >= arr[1]) {
      res.push(arr[0]);
      num -= arr[1];
    }
  });

  return res.join('');
};

const isValid = (str, int) => {
  let errText = '';

  if (!str || str.match(/[e.]/g)) {
    errText = 'Please enter a valid number.';
  } else if (int < 1) {
    errText = 'Please enter a number greater than or equal to 1.';
  } else if (int > 3999) {
    errText = 'Please enter a number less than or equal to 3999.';
  } else {
    // No errors detected
    return true;
  }

  // Handle error text and output styling
  output.innerText = errText;
  output.classList.add('alert');

  return false;
};

const clearOutput = () => {
  output.innerText = '';
  output.classList.remove('alert');
};

form.addEventListener('submit', e => {
  e.preventDefault();
  updateUI();
});

convertButton.addEventListener('click', () => {
  updateUI();
});

const updateUI = () => {
  const numStr = document.getElementById('number').value;
  const int = parseInt(numStr, 10);

  output.classList.remove('hidden');

  clearOutput();

  if (isValid(numStr, int)) {
    output.innerText = convertToRoman(int);
  }
};
