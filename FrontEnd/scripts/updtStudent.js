const firstNameInput = document.getElementById('first_name_input')
const lastNameInput = document.getElementById('last_name_input')

const emailInput = document.getElementById('email_input')
const pwdInput = document.getElementById('pwd_input')

const dateInput = document.getElementById('date_input')
const updtButton = document.getElementById('updt-btn')

const errorText = document.getElementById('error_text')
const errorTextDiv = document.getElementById('error_text_div')

function getDate(date) {
    const [tDay, tMonth, tYear] = date.split('/')
    return new Date(+tYear, +tMonth - 1, +tDay)
}

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

console.log(getCookie('updtUser'))
const userInfo = JSON.parse(getCookie("updtUser"))
/* remove the cookie */
document.cookie = 'updtUser=; Max-Age=0; path=/; domain=' + location.hostname;

firstNameInput.value = userInfo.firstName
lastNameInput.value = userInfo.lastName
emailInput.value = userInfo.email
pwdInput.value = userInfo.pwd
dateInput.valueAsDate = getDate(userInfo.bdayDate)

updtButton.addEventListener('click', () => {
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
    fetch('http://localhost:3000/manageStudent/api/updt-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': userInfo.id,
            'idManager': userInfo.idManager,
            'firstName': firstNameInput.value,
            'lastName': lastNameInput.value,
            'email': emailInput.value,
            'pwd': pwdInput.value,
            'bdayDate': date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString()
        })
    })
    .then(response => {
        if(response.status == 200) {
            window.location.replace('../view/homepage.html')
            return
        }
    })
})


