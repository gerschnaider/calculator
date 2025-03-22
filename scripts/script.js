function operate(op1, operator, op2){
    //arguments are passed always in a string format
    
    switch(operator){
        case '+':
            return (add(op1,op2));
        
        case '-':
            return (subtract(op1,op2));
        
        case '*':
            return (multiply(op1,op2));
        
        case '/':
            return (divide(op1,op2));
        
        default:
            console.error("wrong operator on function operate");
    }
}

function add(op1, op2){
    let number1= +op1, number2= +op2;
    if(number1!=NaN && number2!=NaN)
        return String(number1+number2);
    else
        return ("ERROR");
}

function subtract(op1, op2){
    let number1= +op1, number2= +op2;
    if(number1!=NaN && number2!=NaN)
        return String(number1-number2);
    else
        return ("ERROR");
}

function multiply(op1, op2){
    let number1= +op1, number2= +op2;
    if(number1!=NaN && number2!=NaN)
        return String(number1*number2);
    else
        return ("ERROR");
}

function divide(op1, op2){
    let number1= +op1, number2= +op2;
    if(number1!=NaN && number2!=NaN && number2!=0)
        return String(number1/number2);
    else
        return ("ERROR");
}

function updateDisplay(){
    contextDisplay.textContent=op1+operator;
    mainDisplay.textContent=op2;
}

//Initialize variables and frequently accessed DOM elements
let op1="", operator="+", op2="0", overwrite=true; //default operator when there's no op1 is sum because if function operate() is executed, it sums 0 and doesn't change nothing.
let mainDisplay=document.querySelector(".mainDisplay"),
    contextDisplay=document.querySelector(".contextDisplay")
    calculatorCase=document.querySelector(".calculatorCase"),
    buttonDot=document.querySelector("#dot");

//add event listeners
calculatorCase.addEventListener("click", (event) => {
    if(event.target.nodeName==="BUTTON"){
        switch(event.target.className){
            case "buttonNumber":
                //add digit to the number updating display
                if(overwrite){
                    //result of main display is overwritten
                    op2="";
                    overwrite=false;
                }
                op2=op2+event.target.dataset.choice;
                mainDisplay.textContent=op2;
                if(event.target.dataset.choice==='.')
                    //only allows one decimal
                    event.target.disabled=true;
                break;
            
            case "buttonOperator":
                //operates the previous values and waits for new operand
                overwrite=false;
                if(op2==="")
                    //update operator for the operation
                    operator=event.target.dataset.choice;
                else{
                    //do operation already shown and result becomes the new context, using the new operator 
                    op1=operate(op1,operator,op2);
                    if(op1!="ERROR"){
                        operator=event.target.dataset.choice;
                        op2="0";
                        overwrite=true;
                        buttonDot.disabled=false;
                        updateDisplay();
                    }else{
                        op2="ERROR";
                        op1="";
                        operator="+";
                        overwrite=true;
                        mainDisplay.textContent=op2;
                        contextDisplay.textContent="";
                    }
                }
                break;
            
            case "buttonEquals":
                contextDisplay.textContent="";
                mainDisplay.textContent=op2=operate(op1,operator,op2);
                op1="";
                operator="+";
                overwrite=true;
                buttonDot.disabled=false;
                break;

            case "buttonDelete":
                if(op2.length>1 && !overwrite){
                    op2=op2.substring(0,op2.length-1);
                    mainDisplay.textContent=op2;
                }else{
                    op2="0";
                    overwrite=true;
                    mainDisplay.textContent=op2;
                }
                break;

            case "buttonClear":
                //sets all default values
                op1="";
                operator="+";
                op2="0";
                mainDisplay.textContent="0";
                contextDisplay.textContent="";
                overwrite=true;
                break;
        }
        event.target.blur(); //so that if user presses enter, the last pressed button doesn't click.      
    }
});

document.body.addEventListener("keydown", (event) => {
    let button = null;
    if(event.key!="Backspace")
        button = document.querySelector(`[data-key="${event.key}"]`);
    else if (event.shiftKey)
        button = document.querySelector(".buttonClear");
    else 
        button = document.querySelector(".buttonDelete");


    if (button){
            button.click();
    }
});
