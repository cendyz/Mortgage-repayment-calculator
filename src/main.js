const checkMain = document.querySelectorAll(".main__one-checkbox");
const checkBoxes = document.querySelectorAll(".main__one-checkbox-input");
const amountInput = document.querySelector("#amount");
const termInput = document.querySelector("#term");
const rateInput = document.querySelector("#rate");
const inputs = [amountInput, rateInput, termInput];

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
		}
	});
};

checkBoxes.forEach(box => box.addEventListener("click", checkBox));

resetCheckboxes();

window.addEventListener("DOMContentLoaded", () => {
	inputs.forEach(input => {
		input.value = "";
	});
});
