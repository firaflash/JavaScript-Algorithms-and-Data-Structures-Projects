const inputNum = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");



const checkInput = () => {
    if (inputNum.value.trim() === "") {
        result.classList.remove("output");
        result.innerHTML = "Please enter a valid number";
        result.classList.add("errOutput");
        return;
    } else if (inputNum.value < 1) {
        result.classList.remove("output");
        result.innerHTML = "Please enter a number greater than or equal to 1";
        result.classList.add("errOutput");
        return;
    }else if( inputNum.value > 3999){
        result.classList.remove("output");
        result.innerHTML = "Please enter a number less than or equal to 3999";
        result.classList.add("errOutput");
        return;
    }
    return "this";
};


const toRoman = num =>{
    let resultValue = [];
    let quotient = num;
    while(num > 0){
        if(num >= 1000){
            quotient = Math.floor(num/1000);
            num = num % 1000;
            for(let i=0;i<quotient;i++){
                resultValue.push("M");
            }
        }else if(num >= 100){
            quotient = Math.floor(num/100);
            num = num % 100;
            if(quotient <=3){
                for(let i=0;i<quotient;i++){
                    resultValue.push("C");
                }
            }else if(quotient === 4){
                resultValue.push("CD")
            }else if(quotient === 5){
                resultValue.push("D")
            }else if(quotient >= 6 && quotient <=8){
                resultValue.push("D")
                for(let i=0;i<quotient-5;i++){
                    resultValue.push("C");
                }
            }else{
                resultValue.push("CM")
            }
        }else if(num >= 10){
            quotient = Math.floor(num/10);
            num = num % 10;
            if(quotient <=3){
                for(let i=0;i<quotient;i++){
                    resultValue.push("X");
                }
            }else if(quotient === 4){
                resultValue.push("XL")
            }else if(quotient === 5){
                resultValue.push("L")
            }else if(quotient >= 6 && quotient <=8){
                resultValue.push("L")
                for(let i=0;i<quotient-5;i++){
                    resultValue.push("X");
                }
            }else{
                resultValue.push("XC")
            }
        }else if(num >= 1){
            quotient = Math.floor(num/1);
            num = num % 1;
            if(quotient <=3){
                for(let i=0;i<quotient;i++){
                    resultValue.push("I");
                }
            }else if(quotient === 4){
                resultValue.push("IV")
            }else if(quotient === 5){
                resultValue.push("V")
            }else if(quotient >= 6 && quotient <=8){
                resultValue.push("V")
                for(let i=0;i<quotient-5;i++){
                    resultValue.push("I");
                }
            }else{
                resultValue.push("IX")
            }
        }
    }
    return resultValue.join("");
}

const convertion = () => {
    if (checkInput()) { // Call the function
        result.classList.remove("errOutput");
        result.innerHTML = toRoman(inputNum.value);
        result.classList.add("output");
        return;
    }
};
convertBtn.addEventListener("click", convertion);

inputNum.addEventListener("keydown", e => e.key === "Enter" ? convertion() : null);

/**
 * Remeber There is a better Way
 * const toRoman = num => {
    const romanNumerals = [
        { value: 1000, symbol: "M" },
        { value: 900, symbol: "CM" },
        { value: 500, symbol: "D" },
        { value: 400, symbol: "CD" },
        { value: 100, symbol: "C" },
        { value: 90, symbol: "XC" },
        { value: 50, symbol: "L" },
        { value: 40, symbol: "XL" },
        { value: 10, symbol: "X" },
        { value: 9, symbol: "IX" },
        { value: 5, symbol: "V" },
        { value: 4, symbol: "IV" },
        { value: 1, symbol: "I" }
    ];

    let result = "";

    for (const { value, symbol } of romanNumerals) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }

    return result;
};
 */

