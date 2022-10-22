const emailBox = document.getElementById('email_input')
const pwdBox = document.getElementById('pwd_input')
const loginBtn = document.getElementById('login_btn')

const DomainsArray = ['@gmail.com', '@outlook.it', '@virgilio.com']

function checkEmailDomain(email, array) {
    let check = false

    array.forEach(word => {
        if (email.includes(word)) {
            check = true
        }
    })

    return check
}

window.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        loginBtn.click()
    }
})

emailBox.addEventListener('keydown', () => {
    emailBox.style.color = 'rgba(245, 245, 245, 0.678)'
})

loginBtn.addEventListener('click', () => {
    const credentials = {
        email: emailBox.value,
        pwd: pwdBox.value
    }
    if(credentials.pwd == "") {
        return
    }
    if (!checkEmailDomain(credentials.email, DomainsArray)) {
        emailBox.style.color = 'rgb(110, 13, 13)'
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
                alert('Successfully Logged In')
                break

            case 401:
                document.getElementById('error_text').style.display = 'block'
                document.getElementById('error_text_div').style.display = 'block'
                break

            default:
                alert(toString(response.status))
                break
        }
    })
})
