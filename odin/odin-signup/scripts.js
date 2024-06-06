const panel = document.getElementById("ssPanel");
const switcher = document.getElementById("formSwitch");

switcher.addEventListener("click", () => switchForms(panel));

function switchForms(el) {
	el.classList.toggle("sign-in");
	el.classList.toggle("sign-up");
}

document.addEventListener("DOMContentLoaded", function () {
	// Gather form elements
	const signUpform = document.getElementById("signUp");
	const signInform = document.getElementById("signIn");
	const signUpFirstName = document.getElementById("suFirstName");
	const signUpLastName = document.getElementById("suLastName");
	const signUpEmailAddress = document.getElementById("suEmailAddress");
	const signUpPhone = document.getElementById("suTel");
	const signUpPassword = document.getElementById("suPassword");
	const signUpConfirmPassword = document.getElementById("suConfirmPassword");

	const signInEmailAddress = document.getElementById("siEmail");
	const signInPassword = document.getElementById("siPassword");
	const autofillDummySignUp = document.getElementById("dummySignUp");
	const autofillDummySignIn = document.getElementById("dummySignIn");

	const signUpSuccessMessage = "Sign up successful. Data saved to local storage.";
	const signUpErrorMessage = "Validation failed. Check your inputs.";

	const signInSuccessMessage = "Sign in successful.";
	const signInErrorMessage = "Email or password is incorrect.";

	const dummyData = {
		firstName: "Thor",
		lastName: "OdinSon",
		email: "thor.hammer@valhalla.realm",
		phone: "+1234567890",
		password: "12!*^H4m3r",
	};

	autofillDummySignUp.addEventListener("click", function () {
		signUpFirstName.value = dummyData.firstName;
		signUpLastName.value = dummyData.lastName;
		signUpEmailAddress.value = dummyData.email;
		signUpPhone.value = dummyData.phone;
		signUpPassword.value = dummyData.password;
		signUpConfirmPassword.value = dummyData.password;

		let inputs = signUpform.querySelectorAll(".form-field");
		inputs.forEach((input) => {
			input.classList.remove("error");
			input.classList.add("valid");
		});
		let message = signUpform.querySelector(".message");
		message.classList.remove("error", "filled");
		message.textContent = "";
	});

	autofillDummySignIn.addEventListener("click", function () {
		signInEmailAddress.value = dummyData.email;
		signInPassword.value = dummyData.password;

		let inputs = signInform.querySelectorAll(".form-field");
		inputs.forEach((input) => {
			input.classList.remove("error");
			input.classList.add("valid");
		});
	});

	// Form validation functions
	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	// Validate phone number to start with + and have 10 characters
	function validatePhoneNumber(phoneNumber) {
		return /^\+\d{10,}$/.test(phoneNumber);
	}

	function validatePassword(password) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
	}

	function validateInput(inputElement, validationFunction) {
		if (validationFunction(inputElement.value)) {
			removeErrorClass(inputElement);
			return true;
		} else {
			addErrorClass(inputElement);
			return false;
		}
	}

	function addErrorClass(inputElement) {
		inputElement.classList.add("error");
		inputElement.classList.remove("valid");
	}

	function removeErrorClass(inputElement) {
		inputElement.classList.remove("error");
		inputElement.classList.add("valid");
	}

	// Attach validation to input events
	function attachInputValidation(inputElement, validationFunction) {
		inputElement.addEventListener("input", () => {
			validateInput(inputElement, validationFunction);
		});
	}

	// Attach validation handlers
	attachInputValidation(signInEmailAddress, validateEmail);

	attachInputValidation(signUpFirstName, (value) => value.length >= 2);
	attachInputValidation(signUpLastName, (value) => value.length >= 2);
	attachInputValidation(signUpEmailAddress, validateEmail);
	attachInputValidation(signUpPhone, validatePhoneNumber);
	attachInputValidation(signUpPassword, validatePassword);
	attachInputValidation(signUpConfirmPassword, (value) => value === signUpPassword.value && validatePassword(value));

	function autoResetAfterSuccess(form, timer) {
		const messageBox = form.querySelector(".message");
		const validInputs = form.querySelectorAll(".valid");

		setTimeout(() => {
			messageBox.textContent = "";
			messageBox.classList.remove("valid", "error", "filled");
			form.reset();
			validInputs.forEach((validInput) => validInput.classList.remove("valid", "error"));
		}, timer);
	}

	function resetAll(form) {
		const messageBox = form.querySelector(".message");
		const inputs = form.querySelectorAll(".form-field");
		messageBox.textContent = "";
		messageBox.classList.remove("valid", "error", "filled");
		inputs.forEach((input) => input.classList.remove("valid", "error", "filled"));
	}

	function setSignUpMessage(state, form) {
		const messageBox = form.querySelector(".message");

		if (state) {
			messageBox.classList.add("valid", "filled");
			messageBox.textContent = signUpSuccessMessage;
		} else {
			messageBox.classList.add("error", "filled");
			messageBox.classList.remove("valid");
			messageBox.textContent = signUpErrorMessage;
		}
	}

	function setSignInMessage(form, state, message) {
		const messageBox = form.querySelector(".message");

		if (state) {
			messageBox.classList.add("valid", "filled");
			messageBox.textContent = message;
		} else {
			messageBox.classList.add("error", "filled");
			messageBox.classList.remove("valid");
			messageBox.textContent = message;
		}
	}

	// Form submission handlers
	signUpform.addEventListener("submit", function (event) {
		event.preventDefault();
		let isValid = true;

		isValid &= validateInput(signUpFirstName, (value) => value.length >= 2);
		isValid &= validateInput(signUpLastName, (value) => value.length >= 2);
		isValid &= validateInput(signUpEmailAddress, validateEmail);
		isValid &= validateInput(signUpPhone, validatePhoneNumber);
		isValid &= validateInput(signUpPassword, validatePassword);
		isValid &= validateInput(
			signUpConfirmPassword,
			(value) => value === signUpPassword.value && validatePassword(value)
		);

		if (isValid) {
			localStorage.setItem("email", signUpEmailAddress.value);
			localStorage.setItem("password", signUpPassword.value);
			setSignUpMessage(isValid, this);
			autoResetAfterSuccess(this, 3000);

			setTimeout(() => {
				if (panel.classList.contains("sign-up")) {
					switchForms(panel);
				}
			}, 3500);
		} else {
			setSignUpMessage(isValid, this);
		}
	});

	signUpform.addEventListener("reset", function () {
		resetAll(this);
	});
	signInform.addEventListener("reset", function () {
		resetAll(this);
	});

	signInform.addEventListener("submit", function (event) {
		event.preventDefault();

		const storedEmail = localStorage.getItem("email");
		const storedPassword = localStorage.getItem("password");
		const emailValid = validateInput(signInEmailAddress, validateEmail);
		const passwordValid = validateInput(signInPassword, (value) => value === storedPassword);

		if (emailValid && passwordValid && signInEmailAddress.value === storedEmail) {
			setSignInMessage(this, 1, signInSuccessMessage);
			autoResetAfterSuccess(this, 3000);
		} else {
			setSignInMessage(this, 0, signInErrorMessage);
		}
	});
});
