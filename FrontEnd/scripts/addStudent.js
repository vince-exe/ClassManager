const firstNameInput = document.getElementById('first_name_input')

const lastNameInput = document.getElementById('last_name_input')

const emailInput = document.getElementById('email_input')

const pwdInput = document.getElementById('pwd_input')

const errorText = document.getElementById('error_text')
const errorTextDiv = document.getElementById('error_text_div')

const dateInput = document.getElementById('date_input')
const addButton = document.getElementById('add-btn')

const domainsArray = ['@gmail.com', '@outlook.it', '@virgilio.it']

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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

/* assign the current date to the input */
date = new Date()
dateInput.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)

window.addEventListener('keydown', (key) => {
    if (key.code == 'Enter') {
        addButton.click()
    }
})

addButton.addEventListener('click', () => {
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
    fetch('http://localhost:3000/manageStudent/api/add-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            'firstName': firstNameInput.value,
            'lastName': lastNameInput.value,
            'email': emailInput.value,
            'emailManager': getCookie("email"),
            'pwd': pwdInput.value,
            'bdayDate': date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString()
        })
    })
    .then(response => {
        if(response.status == 200) {
            window.location.replace('../view/homepage.html')
            return
        }   
        /* conflict */
        if(response.status == 409) {
            displayErrorText('There is already a student with this email')
        }
    })
})