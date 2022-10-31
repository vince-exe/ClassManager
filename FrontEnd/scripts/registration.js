const firstNameInput = document.getElementById('first_name_input')

const lastNameInput = document.getElementById('last_name_input')

const emailInput = document.getElementById('email_input')

const pwdInput = document.getElementById('pwd_input')

const errorText = document.getElementById('error_text')
const errorTextDiv = document.getElementById('error_text_div')

const dateInput = document.getElementById('date_input')
const registerButton = document.getElementById('register_btn')

const domainsArray = ['@gmail.com', '@outlook.it', '@virgilio.it']

function clearInputFields() {
    firstNameInput.value = ""
    lastNameInput.value = ""
    emailInput.value = ""
    pwdInput.value = ""
}

function displayErrorText(message) {
    errorText.style.display = 'block'
    errorText.textContent = message
    errorTextDiv.style.display = 'block'
}

function checkEmailDomain(email, array) {
    let check = false

    array.forEach(word => {
        if (email.includes(word)) {
            check = true
        }
    })

    return check
}

clearInputFields()

/* assign the current date to the input */
date = new Date()
dateInput.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)

window.addEventListener('keydown', (key) => {
    if (key.code == 'Enter') {
        registerButton.click()
    }
})

registerButton.addEventListener('click', () => {
    if (firstNameInput.value == "" || lastNameInput.value == "" || emailInput.value == "" || pwdInput.value == "") {
        displayErrorText('You have to fill all the input boxes')
        return
    }
    const date = new Date(dateInput.value)
    if (date.getTime() != date.getTime()) {
        displayErrorText('Please select a valid date')
        return
    }
    if (!checkEmailDomain(emailInput.value, domainsArray)) {
        displayErrorText('Please insert a valid email')
        return
    }
    fetch('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'firstName': firstNameInput.value,
            'lastName': lastNameInput.value,
            'email': emailInput.value,
            'pwd': pwdInput.value,
            'bdayDate': date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString(   )
        })
    }
    ).then(response => {
        switch(response.status) {
            case 200:
                document.cookie = `email=${emailInput.value}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`
                window.location = '../view/homepage.html'
                break
            
            /* conflict ( email already in use ) */
            case 409:
                displayErrorText('There is already an account associated at this email')
                break
        }
    })
    .catch(response => {
        displayErrorText("The application can't reach the server...")
        return
    })
})
