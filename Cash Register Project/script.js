const userInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const output = document.getElementById("change-due");
const itemPrice = document.querySelector(".total-price");
const changesInDrawer = document.querySelector(".changes-in-drawer");

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

// Price displayed on the screen
itemPrice.textContent = "Total $" + price;

let changes = {};

const updateChanges = () => {
    changesInDrawer.innerHTML = "";
    cid.forEach((i) => {
        changesInDrawer.innerHTML += `${i[0]}: $${i[1].toFixed(2)}<br>`;
    });
};

updateChanges()

const displayOutput = () => {
    // Convert the changes object to an array of [key, value] pairs
    output.innerHTML = `Status: OPEN<br>`
    Object.entries(changes).forEach(([denomination, amount]) => {
        output.innerHTML += `${denomination}: $${amount.toFixed(2)}<br>`;
    });
    updateChanges();
};



const checkInput = (sumCid, val, changeDue) => {
    if (val === "" || Number(val) < price) {
        alert("Customer does not have enough money to purchase the item");
        return true; // Error case
    }

    if (changeDue > sumCid) {
        alert("Insufficient funds in the cash register.");
        return true; // Error case
    }

    return false; // No errors
};

const calculateChange = (val) => {
    const sumCid = cid.reduce((a, b) => a + b[1], 0).toFixed(2);
    let changeDue = val - price; // Correct calculation
    if (checkInput(sumCid, val, changeDue)) {
        return;
    }

    while (changeDue > 0) {
        // Ensure changeDue is treated as a number with two decimal places
        changeDue = parseFloat(changeDue.toFixed(2));

        if (changeDue >= 100) {
            const count = Math.floor(changeDue / 100);
            cid[8][1] -= count * 100;
            changes[cid[8][0]] = (changes[cid[8][0]] || 0) + (count * 100);
            changeDue -= count * 100;
        } else if (changeDue >= 20) {
            const count = Math.floor(changeDue / 20);
            cid[7][1] -= count * 20;
            changes[cid[7][0]] = (changes[cid[7][0]] || 0) + (count * 20);
            changeDue -= count * 20;
        } else if (changeDue >= 10) {
            const count = Math.floor(changeDue / 10);
            cid[6][1] -= count * 10;
            changes[cid[6][0]] = (changes[cid[6][0]] || 0) + (count * 10);
            changeDue -= count * 10;
        } else if (changeDue >= 5) {
            const count = Math.floor(changeDue / 5);
            cid[5][1] -= count * 5;
            changes[cid[5][0]] = (changes[cid[5][0]] || 0) + (count * 5);
            changeDue -= count * 5;
        } else if (changeDue >= 1) {
            const count = Math.floor(changeDue / 1);
            cid[4][1] -= count * 1;
            changes[cid[4][0]] = (changes[cid[4][0]] || 0) + (count * 1);
            changeDue -= count * 1;
        } else if (changeDue >= 0.25) {
            const count = Math.floor(changeDue / 0.25);
            cid[3][1] -= count * 0.25;
            changes[cid[3][0]] = (changes[cid[3][0]] || 0) + (count * 0.25);
            changeDue -= count * 0.25;
        } else if (changeDue >= 0.1) {
            const count = Math.floor(changeDue / 0.1);
            cid[2][1] -= count * 0.1;
            changes[cid[2][0]] = (changes[cid[2][0]] || 0) + (count * 0.1);
            changeDue -= count * 0.1;
        } else if (changeDue >= 0.05) {
            const count = Math.floor(changeDue / 0.05);
            cid[1][1] -= count * 0.05;
            changes[cid[1][0]] = (changes[cid[1][0]] || 0) + (count * 0.05);
            changeDue -= count * 0.05;
        } else if (changeDue >= 0.01) {
            const count = Math.floor(changeDue / 0.01);
            cid[0][1] -= count * 0.01;
            changes[cid[0][0]] = (changes[cid[0][0]] || 0) + (count * 0.01);
            changeDue -= count * 0.01;
        }
    }

    // Display the change due
    displayOutput();
    // Display the breakdown of change
    console.log(changes);
};

purchaseBtn.addEventListener("click", () => {
    calculateChange(Number(userInput.value));
});

userInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        calculateChange(Number(userInput.value));
    }
});
