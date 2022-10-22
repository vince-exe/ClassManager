const dateInput = document.getElementById('date_input')
const registerButton = document.getElementById('register_btn')

/* assign the current date to the input */
date = new Date()
dateInput.value= date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)

window.addEventListener('keydown', (key) => {
    if(key.code == 'Enter') {
        registerButton.click()
    }
})

registerButton.addEventListener('click', () => {

})