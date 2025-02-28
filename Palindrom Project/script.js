const checkButton = document.getElementById("check-btn");
const inputField = document.getElementById("text-input");
const result = document.getElementById("result");
const container = document.getElementById("result-container")

// Function to check if input is empty
const isEmpty = (text) => {
    if (text === "") {
        alert("Please input a value");
        return true;
    }
    return false;
};

// Function to reverse a string
const reverseText = (text) => {
    let reversed = ""; 
    for (let i = text.length - 1; i >= 0; i--) { 
        reversed += text[i];
    }
    return reversed;
};

// Function to check if the input is a palindrome
const checkPalindrome = () => {
    let palindromText = inputField.value;
    
    if (isEmpty(palindromText)) return;

    // Normalize text: remove non-alphanumeric characters & convert to lowercase
    palindromText = palindromText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Reverse the cleaned text
    let reversedText = reverseText(palindromText);

    // Check if the original and reversed text match
    let isPalindrom = palindromText === reversedText;

    // Display result
    if (isPalindrom) {
        result.textContent = `${inputField.value} is a palindrome`;
        result.style.color = "green";
    } else {
        result.textContent = `${inputField.value} is not a palindrome`;
        result.style.color = "red";
    }
    
};

// Add event listener to the button
checkButton.addEventListener("click", checkPalindrome);

inputField.addEventListener("keydown",e => e.key === "Enter" ? checkPalindrome() : null)
