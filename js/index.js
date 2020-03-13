const INITIAL_STATE = {
	result: null,
	lastOperator: null,
	operation: []
};

const calculate = (v) => {
    let compute = INITIAL_STATE.result;
    switch (INITIAL_STATE.lastOperator) {
        case "+":
            compute += v;
            break;
        case "-":
            compute -= v;
            break;
        case "*":
            compute *= v;
            break;
        case "/":
            compute /= v;
            break;
        case "=":
            compute = v;
            break;
        default:
            throw new Error("Operator not supported");
    }
    return compute;
}

const getResult = (value) => {
    const res = calculate(value);
    INITIAL_STATE.operation.push(value, "=", res);
    const operation = INITIAL_STATE.operation.join(" ");
    INITIAL_STATE.result = res;
    INITIAL_STATE.lastOperator = "=";
    INITIAL_STATE.operation = [];

    return { res, operation };
}

const add = (value) => {
    if (!isNaN(value)) {
        INITIAL_STATE.operation.push(value);
        INITIAL_STATE.operation.push("+");
        INITIAL_STATE.lastOperator = "+";
        check(value);
    }
}

const sub = (value) => {
    if (!isNaN(value)) {
        INITIAL_STATE.operation.push(value);
        INITIAL_STATE.operation.push("-");
        INITIAL_STATE.lastOperator = "-";
        check(value);
    }
}

const div = (value) => {
    if (!isNaN(value)) {
        INITIAL_STATE.operation.push(value);
        INITIAL_STATE.operation.push("/");
        INITIAL_STATE.lastOperator = "/";
        check(value);
    }
}

const mult = (value) => {
    if (!isNaN(value)) {
        INITIAL_STATE.operation.push(value);
        INITIAL_STATE.operation.push("*");
        INITIAL_STATE.lastOperator = "*";
        check(value);
    }
}

const check = (value) => {
    if (INITIAL_STATE.result === null) {
        INITIAL_STATE.result = value;
    } else {
        const res = calculate(value);
        INITIAL_STATE.result = res;
    }
}

const reset = () => {
    INITIAL_STATE.lastOperator = null;
    INITIAL_STATE.operation = [];
    INITIAL_STATE.lastOperator = null;
}

document.querySelector(".resetButton").onclick = function() {
    reset();
    document.querySelector(".resetButton").value = "";
    document.querySelector("#logInformation").value = "";
    document.querySelector(".inputNumber").value = null;
    document.querySelector(".inputNumber").focus();
};

document.querySelector(".equalButton").onclick = function() {
    const value = parseFloat(document.querySelector(".inputNumber").value);
    const { res, operation } = getResult(value);
    document.querySelector("#resultValue").value = res;
    document.querySelector(".inputNumber").value = res;
    document.querySelector("#logInformation").value += operation + "\n";
};

document.querySelector("#addButton").onclick = function() {
    const value = parseFloat(document.querySelector(".inputNumber").value);
    add(value);
    document.querySelector(".inputNumber").value = null;
    document.querySelector(".inputNumber").focus();
};

document.querySelector("#substractButton").onclick = function() {
    const value = parseFloat(document.querySelector(".inputNumber").value);
    sub(value);
    document.querySelector(".inputNumber").value = null;
    document.querySelector(".inputNumber").focus();
};

document.querySelector("#multiplicationButton").onclick = function() {
    const value = parseFloat(document.querySelector(".inputNumber").value);
    mult(value);
    document.querySelector(".inputNumber").value = null;
    document.querySelector(".inputNumber").focus();
};

document.querySelector("#divisionButton").onclick = function() {
    const value = parseFloat(document.querySelector(".inputNumber").value);
    div(value);
    document.querySelector(".inputNumber").value = null;
    document.querySelector(".inputNumber").focus();
};