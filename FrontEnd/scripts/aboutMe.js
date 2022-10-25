const idInput = document.getElementById("id_input")
const firstNameInput = document.getElementById("first_name_input")
const lastNameInput = document.getElementById("last_name_input")
const emailInput = document.getElementById("email_input")
const pwdInput = document.getElementById("pwd_input")
const dateInput = document.getElementById("date_input")

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

fetch("http://localhost:3000/homepage/api/info/me", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'email': getCookie("email") })
}).then(response => {
    response.text().then(value => {
        const credentials = JSON.parse(value)

        /* set the input boxes */
        idInput.value = credentials.id
        firstNameInput.value = credentials.firstName
        lastNameInput.value = credentials.lastName
        emailInput.value = credentials.email
        pwdInput.value = credentials.pwd
        dateInput.value = credentials.bdayDate
    })
})
