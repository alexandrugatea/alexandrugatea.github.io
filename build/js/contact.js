const form = document.getElementById('contactMe');
const nameInput = document.getElementById('formName');
const emailInput = document.getElementById('formEmail');
const subjectInput = document.getElementById('formSubject');
const messageInput = document.getElementById('formMessage');
const replyToInput = document.getElementById('replyTo');

const successBox = document.getElementById("formSent");
const errorBox = document.getElementById("formError");

const minLength = 2;
const minWords = 2;

const sendMessage = document.getElementById("sendMessage");
const sendMessageOriginal = sendMessage.innerHTML;

// Function to validate email using regular expression
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to validate if a string has at least 2 whole words
function hasMinimumWords(input) {
    const words = input.trim().split(/\s+/);
    return words.length >= minWords;
}

// Function to add error class
function addErrorClass(inputElement) {
    inputElement.classList.add('error');
    inputElement.classList.remove('valid');
    errorBox.classList.remove("hidden");
    errorBox.classList.add("shown");
}

// Function to remove error class
function removeErrorClass(inputElement) {
    inputElement.classList.remove('error');
    inputElement.classList.add('valid');
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    

    // Perform validation
    if (nameInput.value.length < minLength) {
        addErrorClass(nameInput);
    } else {
        removeErrorClass(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
        addErrorClass(emailInput);
    } else {
        removeErrorClass(emailInput);
    }

    if (subjectInput.value.length < minLength) {
        addErrorClass(subjectInput);
    } else {
        removeErrorClass(subjectInput);
    }

    if (!hasMinimumWords(messageInput.value)) {
        addErrorClass(messageInput);
    } else {
        removeErrorClass(messageInput);
    }

    // If there are no errors, submit the form
    if (!form.querySelectorAll('.error').length) {
        showLoader();
        sendMessage.innerText = 'Sending...';
        setTimeout(submitForm, 1000);
    }

}
// Function to remove the 'valid' class from all form elements
function removeValidClassFromForm() {
    const formElements = form.querySelectorAll('input, textarea');
    formElements.forEach(element => {
        element.classList.remove('valid');
    });
}

form.addEventListener('reset', removeValidClassFromForm);

// Function to submit form via AJAX
function submitForm() {
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => {
            if (response.ok) {

                successBox.classList.remove('hidden');
                successBox.classList.add('shown');
                hideLoader();
                sendMessage.innerText = "Message sent";

                setTimeout(() => {
                    successBox.classList.remove('shown');
                    successBox.classList.add('hidden');
                    form.reset();
                    
                    sendMessage.innerText = sendMessageOriginal;
                }, 2000);

            } else {
                throw new Error('Error submitting the form. Please try again.');
            }
        })
        .catch(error => {
            hideLoader();
            errorBox.innerText = "An error occurred while submitting the form: " + error + ". Please try again.";
            errorBox.style.display = 'block';
        });
}

// Add event listeners for input fields
nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 2) {
        addErrorClass(nameInput);
    } else {
        removeErrorClass(nameInput);
    }
    hideErrorMessageIfAllValid();
});

emailInput.addEventListener('input', () => {
    //replyToInput.value = emailInput.value;
    if (!isValidEmail(emailInput.value)) {
        addErrorClass(emailInput);
    } else {
        removeErrorClass(emailInput);
    }
    hideErrorMessageIfAllValid();
});

subjectInput.addEventListener('input', () => {
    if (subjectInput.value.length < minLength) {
        addErrorClass(subjectInput);
    } else {
        removeErrorClass(subjectInput);
    }
    hideErrorMessageIfAllValid();
});

messageInput.addEventListener('input', () => {
    if (!hasMinimumWords(messageInput.value)) {
        addErrorClass(messageInput);
    } else {
        removeErrorClass(messageInput);
    }
    hideErrorMessageIfAllValid();
});

function hideErrorMessageIfAllValid() {
    const errorInputs = form.querySelectorAll('.error');
    if (errorInputs.length === 0) {
        errorBox.classList.remove("shown");
        errorBox.classList.add("hidden");
    } else {
        errorBox.classList.remove("hidden");
        errorBox.classList.add("shown");
    }
}

function showLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
}
function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}


// Add submit event listener to the form
form.addEventListener('submit', handleSubmit);
