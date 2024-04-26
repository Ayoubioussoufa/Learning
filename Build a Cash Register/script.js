let button = document.getElementById("purchase-btn");
let input = document.getElementById("cash");
let changeDue = document.getElementById("change-due");
let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

function checkCashRegister(price, cash, cid) {
    const currencyUnits = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };

    if (price > cash)
    {
        alert("Customer does not have enough money to purchase the item");
        return 1;
    }

    let totalCID = 0;
    for (let i = 0; i < cid.length; i++) {
        totalCID += cid[i][1];
    }
    
    let changeD = cash - price;
    let changeArray = [];

    if (totalCID < changeD) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (totalCID === changeD) {
        return { status: "CLOSED", change: cid };
    }

    console.log(totalCID, changeD);

    if (!changeD) {
        changeDue.replaceChildren();

        let ptag = document.createElement('p');
        ptag.className = 'result-text';
        ptag.appendChild(document.createTextNode("No change due - customer paid with exact cash"));
        changeDue.appendChild(ptag);
        return 1;
    }

    for (let i = cid.length - 1; i >= 0; i--) {
        let currency = cid[i][0];
        let unitValue = currencyUnits[currency];
        let availableAmount = cid[i][1];

        if (changeD >= unitValue && availableAmount > 0) {
            let count = Math.min(Math.floor(changeD / unitValue), availableAmount / unitValue);
            let amount = count * unitValue;
            changeArray.push([currency, amount]);
            changeD -= amount;
            changeD = Math.round(changeD * 100) / 100; // Round to two decimal places to avoid floating point precision issues
        }
    }

    if (changeD > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: changeArray };
}

function working(objs) {

    changeDue.replaceChildren();
    
    let ptag = document.createElement('p');
    ptag.className = 'result-text';
    ptag.appendChild(document.createTextNode(`${objs.status === "OPEN" ? "OPEN" : (objs.status === "INSUFFICIENT_FUNDS" ? "INSUFFICIENT_FUNDS" : "CLOSED")}, change: ${objs.change}`));
    changeDue.appendChild(ptag);
}

button.addEventListener('click', () => {
    let val = checkCashRegister(price, input.value, cid);
    if (typeof val === 'object')
    {
        working(val);
    }
    input.value = '';
});

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        let val = checkCashRegister(price, input.value, cid);
        if (typeof val === 'object'){
            working(val);
        }
        input.value = '';
    }
});

// and this

let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

const checkCashRegister = () => {
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  let totalCID = parseFloat(
    cid
      .map(total => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );

  if (totalCID < changeDue) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  if (totalCID === changeDue) {
    result.status = 'CLOSED';
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue > denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      if (count > 0) {
        result.change.push([reversedCid[i][0], count * denominations[i]]);
      }
    }
  }
  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // Update cid if change is passed in
  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join('')}  
  `;
};

purchaseBtn.addEventListener('click', checkResults);

cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();
