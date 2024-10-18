const checkMain = document.querySelectorAll(".main__one-checkbox");
const checkBoxes = document.querySelectorAll(".main__one-checkbox-input");
const topInputCont = document.querySelectorAll(".main__one-container-input");
const amountInput = document.querySelector("#amount");
const termInput = document.querySelector("#term");
const rateInput = document.querySelector("#rate");
const inputs = [amountInput, rateInput, termInput];
const radioOne = document.querySelector("#checkbox-1");
const radioTwo = document.querySelector("#checkbox-2");
const btn = document.querySelector(".main__one-calculate");
const clearBtn = document.querySelector(".main__one-btn");
const secondOne = document.querySelector(".main__two-first");
const secondTwo = document.querySelector(".main__two-second");
const repaymentAmount = document.querySelector(".main__two-second-box-repayments");
const totalPayment = document.querySelector(".main__two-second-box-total");
const exceptComa = /^\d+(,\d+)*$/;
const exceptDot = /^\d+(.\d+)*$/;
const numbersOnly = /^\d+$/;

const checkBox = e => {
	const index = Array.from(checkBoxes).indexOf(e.target);
	const child = checkMain[index].querySelector(".main__one-checkbox-span");
	checkMain[index].style.backgroundColor = "#eff0c8";
	child.style.color = "hsl(202, 55%, 16%)";
	checkChecked();
};

const resetCheckboxes = () => {
	checkBoxes.forEach(box => {
		box.checked = false;
	});
};

const checkChecked = () => {
	checkBoxes.forEach(box => {
		if (box.checked === false) {
			box.closest(".main__one-checkbox").style.backgroundColor = "white";
			box.nextElementSibling.style.color = "hsl(200, 24%, 40%)";
		}
	});
};

const clearAll = () => {
	secondOne.style.display = "flex";
	secondTwo.style.display = "none";
	topInputCont[0].placeholder = "";

	inputs.forEach(el => {
		el.value = "";
		el.nextElementSibling.style.backgroundColor = "hsl(202, 86%, 94%)";
		el.nextElementSibling.style.color = "hsl(200, 24%, 40%)";
	});

	resetCheckboxes();
	checkChecked();
};

const checkInputs = (input, regex) => {
	let isValid = regex.test(input.value);

	if (amountInput.value.length < 7) {
		amountInput.nextElementSibling.style.backgroundColor = "rgba(215,52,41,255)";
		amountInput.nextElementSibling.style.color = "white";
		amountInput.value = "";
		amountInput.placeholder = "Must be minimum 100,000";
	}

	if (isValid && !input.value.startsWith(0)) {
		input.nextElementSibling.style.backgroundColor = "hsl(202, 86%, 94%)";
		input.nextElementSibling.style.color = "hsl(200, 24%, 40%)";
		amountInput.placeholder = "";
	} else {
		input.nextElementSibling.style.backgroundColor = "rgba(215,52,41,255)";
		input.nextElementSibling.style.color = "white";
	}

	checkBoxes.forEach(input => {
		if (radioOne.checked === false && radioTwo.checked === false) {
			input.closest(".main__one-checkbox").style.backgroundColor = "rgba(215,52,41,255)";
			input.nextElementSibling.style.color = "white";
			isValid = false;
		}
	});

	return isValid;
};

const checkPlaceHolder = () => {
	if (amountInput.value < 100000) {
		topInputCont[0].value = "";
		topInputCont[0].placeholder = "Must be minimum 100,000";
	}
};

const showCalculate = () => {
	secondOne.style.display = "none";
	secondTwo.style.display = "block";
};

const calculate = () => {
	const numericAmount = parseFloat(amountInput.value.replace(/,/g, ""));
	const r = rateInput.value / 100 / 12;
	const n = termInput.value * 12;
	const square = (1 + r) ** n;
	const monthly = (numericAmount * square * r) / (square - 1);
	const shortMonthly = monthly.toFixed(2);
	const monthlyFirst = shortMonthly.charAt(0);
	const monthlyRest = shortMonthly.slice(1);
	const allToPay = monthly * n;
	const allToPayFixed = allToPay.toFixed(2);
	const allToPayFirst = allToPayFixed.slice(0, 3);
	const allToPayEnd = allToPayFixed.slice(3);

	if (amountInput.value < 100000) {
		checkPlaceHolder();
	} else if (monthlyRest.length === 5) {
		repaymentAmount.textContent = `£${monthlyFirst}${monthlyRest}`;
		totalPayment.textContent = `£${allToPayFirst},${allToPayEnd}`;
		``;
		showCalculate();
	} else {
		repaymentAmount.textContent = `£${monthlyFirst},${monthlyRest}`;
		totalPayment.textContent = `£${allToPayFirst},${allToPayEnd}`;
		showCalculate();
	}
};

checkBoxes.forEach(box => box.addEventListener("click", checkBox));

checkMain.forEach(main => {
	main.addEventListener("click", () => {
		const childInput = main.querySelector(".main__one-checkbox-input");
		childInput.nextElementSibling.style.color = "hsl(202, 55%, 16%)";
		main.style.backgroundColor = "#eff0c8";
		childInput.checked = true;
		checkChecked();
	});
});

resetCheckboxes();

btn.addEventListener("click", e => {
	e.preventDefault();
	const isAmountValid = checkInputs(amountInput, exceptComa);
	const isTermValid = checkInputs(termInput, numbersOnly);
	const isRateValid = checkInputs(rateInput, exceptDot);

	if (isAmountValid && isTermValid && isRateValid) {
		calculate();
	}
});

clearBtn.addEventListener("click", clearAll);

window.addEventListener("DOMContentLoaded", () => {
	inputs.forEach(input => {
		input.value = "";
	});
});

amountInput.addEventListener("input", function () {
	let value = this.value.replace(/,/g, "");

	if (value.length > 3) {
		value = value.slice(0, 3) + "," + value.slice(3);
		if ((value.length = 7)) {
			value = value.slice(0, 7);
		}
	}
	this.value = value;
});

termInput.addEventListener("input", function () {
	let value = this.value;
	if (value > 50) {
		value = "50";
	}

	this.value = value;
});

rateInput.addEventListener("input", function () {
	let value = this.value.replace(/[^0-9]/g, "");

	if (value.length >= 4) {
		value = value.slice(0, 2) + "." + value.slice(2, 4);
	} else if (value.length === 3) {
		value = value.slice(0, 1) + "." + value.slice(1, 3); 
	} else if (value.length === 2) {
		value = value.slice(0, 1) + "." + value.slice(1); 
	}

	this.value = value;
});
