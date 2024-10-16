const checkMain = document.querySelectorAll(".main__one-checkbox");
const checkBoxes = document.querySelectorAll(".main__one-checkbox-input");
const amountInput = document.querySelector("#amount");
const termInput = document.querySelector("#term");
const rateInput = document.querySelector("#rate");
const inputs = [amountInput, rateInput, termInput];
const btn = document.querySelector(".main__one-calculate");
const clearBtn = document.querySelector(".main__one-btn");
const secondOne = document.querySelector(".main__two-first");
const secondTwo = document.querySelector(".main__two-second");
const exceptComa = /^\d+(,\d+)*$/;
const exceptDot = /^\d+(.\d+)*$/;
const numbersOnly = /^\d+$/;

const checkBox = e => {
	const index = Array.from(checkBoxes).indexOf(e.target);
	checkMain[index].style.backgroundColor = "#eff0c8";
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
	inputs.forEach(el => {
		el.value = "";
		el.nextElementSibling.style.backgroundColor = "hsl(202, 86%, 94%)";
		el.nextElementSibling.style.color = "hsl(200, 24%, 40%)";
	});

	resetCheckboxes();
	checkChecked();
};

const checkInputs = (input, regex) => {
	if (regex.test(input.value)) {
		input.nextElementSibling.style.backgroundColor = "hsl(202, 86%, 94%)";
		input.nextElementSibling.style.color = "hsl(200, 24%, 40%)";
	} else {
		input.nextElementSibling.style.backgroundColor = "rgba(215,52,41,255)";
		input.nextElementSibling.style.color = "white";
	}

	checkBoxes.forEach(input => {
		if (input.checked === false) {
			console.log("nie");
		} else {
			console.log("tak");
		}
	});
};

const calculate = () => {
	secondOne.style.display = "none";
	secondTwo.style.display = "block";
};

checkBoxes.forEach(box => box.addEventListener("click", checkBox));

resetCheckboxes();

btn.addEventListener("click", e => {
	e.preventDefault();
	checkInputs(amountInput, exceptComa);
	checkInputs(termInput, numbersOnly);
	checkInputs(rateInput, exceptDot);

	if (checkInputs === true) {
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
	}
	this.value = value;

	const numericAmount = parseFloat(this.value.replace(/,/g, ""));
});

termInput.addEventListener("input", function () {
	let value = this.value;

	let numericTerm = parseFloat(this.value);
	if (numericTerm > 40) {
		value = "40";
		numericTerm = 40;
	}

	this.value = value;
});

rateInput.addEventListener("input", function () {
	let value = this.value.replace(/\./g, "");
	if (value.length > 1) {
		value = value.slice(0, 1) + "." + value.slice(1);
	}
	this.value = value;

	const numericRate = parseFloat(this.value);
});
