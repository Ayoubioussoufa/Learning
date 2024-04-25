let userInput = document.getElementById('user-input');
let checkBtn = document.getElementById('check-btn');
let clearBtn = document.getElementById('clear-btn');
let result = document.getElementById('results-div');

function Validator(input) {
    if (input.length == 0) {
        alert("Please provide a phone number");
        return ;
    }
    let phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;
    
    const pTag = document.createElement('p');
    pTag.className = 'results-text';
    phoneRegex.test(input)
      ? (pTag.style.color = '#00471b')
      : (pTag.style.color = '#4d3800');
    pTag.appendChild(
      document.createTextNode(
        `${phoneRegex.test(input) ? 'Valid' : 'Invalid'} US number: ${input}`
      )
    );
    result.appendChild(pTag);
    return regex.test(input);
}

checkBtn.addEventListener('click', () => {
    Validator(userInput.value);
    userInput.value = '';
});


userInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        Validator(userInput.value);
        userInput.value = '';
    }
});

clearBtn.addEventListener('click', () => {
    result.innerText = '';
});