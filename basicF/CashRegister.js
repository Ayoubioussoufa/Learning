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

    let totalCID = 0;
    for (let i = 0; i < cid.length; i++) {
        totalCID += cid[i][1];
    }
    
    let changeDue = cash - price;
    let changeArray = [];

    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (totalCID === changeDue) {
        return { status: "CLOSED", change: cid };
    }

    for (let i = cid.length - 1; i >= 0; i--) {
        let currency = cid[i][0];
        let unitValue = currencyUnits[currency];
        let availableAmount = cid[i][1];

        if (changeDue >= unitValue && availableAmount > 0) {
            let count = Math.min(Math.floor(changeDue / unitValue), availableAmount / unitValue);
            let amount = count * unitValue;
            changeArray.push([currency, amount]);
            changeDue -= amount;
            changeDue = Math.round(changeDue * 100) / 100; // Round to two decimal places to avoid floating point precision issues
        }
    }

    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: changeArray };
}
  
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));