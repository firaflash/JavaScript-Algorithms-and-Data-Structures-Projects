const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Regex to validate US phone numbers
const regex = /^1?\s?(\d{3}|\(\d{3}\))[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

const checkInput = (par) => {
    console.log("starting");

    // Create a new div for result each time
    const result = document.createElement("p");

    if (par.trim() === "") {
        alert("Please provide a phone number");
        return;
    } else if (regex.test(par)) {
        result.style.color = "green";
        result.textContent = "Valid US number: " + par;
    } else {
        result.style.color = "red";
        result.textContent = "Invalid US number: " + par;
    }

    // Append the result inside the result container
    resultsDiv.appendChild(result);

    userInput.value = ""; // Clear the input field
};

// Event listeners
checkBtn.addEventListener("click", () => checkInput(userInput.value));
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkInput(userInput.value);
    }
});
clearBtn.addEventListener("click", () => {
    resultsDiv.innerHTML = ""; // Clear the entire result container
});