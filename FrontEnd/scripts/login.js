const emailBox = document.getElementById('email_input')
emailBox.value = ""

const pwdBox = document.getElementById('pwd_input')

const loginBtn = document.getElementById('login_btn')

const errorText = document.getElementById('error_text')
const errorTextDiv = document.getElementById('error_text_div')

const domainsArray = ['@gmail.com', '@outlook.it', '@virgilio.it']

function checkEmailDomain(email, array) {
    let check = false

    array.forEach(word => {
        if (email.includes(word)) {
            check = true
        }
    })

    return check
}

function displayErrorText(message) {
    errorText.style.display = 'block'
    errorText.textContent = message
    errorTextDiv.style.display = 'block'
}

window.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        loginBtn.click()
    }
})


loginBtn.addEventListener('click', () => {
    const credentials = {
        email: emailBox.value,
        pwd: pwdBox.value
    }
    if(credentials.pwd == "") {
        return
    }
    if (!checkEmailDomain(credentials.email, domainsArray)) {
        displayErrorText('Please insert a valid email')
        return
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': credentials.email, 'pwd': credentials.pwd })
    }
    ).then(response => {
        switch(response.status) {
            case 200:
                document.cookie = `email=${credentials.email}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`
                window.location = '../view/homepage.html'
                break

            case 401:
                displayErrorText("There isn't an account associated with this email and password")
                break

            default:
                displayErrorText("Application Error")
                break
        }
    })
    .catch(response => {
        displayErrorText("The application can't reach the server...")
        return
    })
})
