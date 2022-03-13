//calculator object that hold the display value, first entered operand,
//operator and waiting for second operand set to false 
const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSocondOperand: false,
    operator: null 
}
//function that updates the displayValue value with the entered value(digit)
function inputValue(digit) {
    const { displayValue, waitingForSocondOperand } = calculator
    if(waitingForSocondOperand === true) {
        calculator.displayValue = digit
        calculator.waitingForSocondOperand = false
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
    }
}
//function that inputs the decimal(.)
function inputDecimal(dot) {
    if(calculator.waitingForSocondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSocondOperand = false
        return
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
}
//function that handles the next operation when the operator has been pressend the 
//second time
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const input = parseFloat(displayValue)
    if(operator && calculator.waitingForSocondOperand) {
        calculator.operator = nextOperator
        return
    }
    if(firstOperand === null && !isNaN(input)) {
        calculator.firstOperand = input
    } else if(operator) {
        const result = calculus(firstOperand, input, operator)

        calculator.displayValue = `${parseFloat(result.toFixed(1))}`
        calculator.firstOperand = result
    }
    calculator.waitingForSocondOperand = true
    calculator.operator = nextOperator
}
//function that handles the operations
function calculus(firstOperand, secondOperand, operator) {
    if(operator === '+') {
        return firstOperand + secondOperand
    } else if(operator === '-') {
        return firstOperand - secondOperand
    } else if(operator === '*') {
        return firstOperand * secondOperand
    } else if(operator === '/') {
        return firstOperand / secondOperand
    } 

    return secondOperand
}

function clearCalculator() {
    calculator.displayValue = "0"
    calculator.firstOperand = null
    calculator.waitingForSocondOperand = false
    calculator.operator = null
}

function deleteInput() {
    calculator.displayValue = calculator.displayValue
        .toString()
        .slice(0, -1)
}

function updateDisplay() {
    const display = document.querySelector('.digital-display')
    display.value = calculator.displayValue
}
//click evenLister
const keys = document.querySelector('.keyboard')
keys.addEventListener('click', (e) => {
    const { target } = e
    const { value } = target
    if(!target.matches('button')) {
        return
    }
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value)
            break
        case '.':
            inputDecimal(value)
            break
        case 'clear':
            clearCalculator()
            break
        case 'del':
            deleteInput()
            break        
        default:
            if(Number.isInteger(parseFloat(value))) {
                inputValue(value)
            }
    }
    updateDisplay()
})
//key press event listner
document.addEventListener('keydown', (e) => {
    let keyName = e.key
    e.preventDefault()
    switch (keyName) {
        case '+':
        case '-':
        case '*':
        case '/':
        case 'Enter':
            handleOperator(keyName)
            break
        case '.':
            inputDecimal(keyName)
            break
        case 'Escape':
            clearCalculator()
            break
        case 'Backspace':
            deleteInput()
            break
        case 'plusminus':
            plusMinus()
            break
        default:
            if(Number.isInteger(parseFloat(keyName))) {
                inputValue(keyName)
            }
    }
    updateDisplay()
})
