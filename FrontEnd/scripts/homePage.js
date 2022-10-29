const table = document.getElementById('table')

const addButton = document.getElementById('add-button')
const updateButton = document.getElementById('update-button')
const deleteButton = document.getElementById('delete-button')

const idInput = document.getElementById('id-input')

const errorDiv = document.getElementById('no-students-div')
const errorText = document.getElementById('no-students-text')

function isValidId(id) {
    return !isNaN(id)
}

updateButton.addEventListener('click', () => {
    studentId = idInput.value
    if (isValidId(studentId) && studentId.length) {
        
    }
    else {
        errorDiv.style.display = 'block'
        errorText.style.display = 'block'
        errorText.innerHTML = `Please insert a correct id`
    }
})

addButton.addEventListener('click', () => {
    window.location = '../view/addStudent.html'
})

function addStudent(id, fN, lN, em, pwd, bday) {
    let row = table.insertRow(-1)
    row.className = 'table-row-content'

    let cellId = row.insertCell(0)
    cellId.className = 'table-div'

    let cellFirstName = row.insertCell(1)
    cellFirstName.className = 'table-div'

    let cellLastName = row.insertCell(2)
    cellLastName.className = 'table-div'

    let cellEmail = row.insertCell(3)
    cellEmail.className = 'table-div'

    let cellPwd = row.insertCell(4)
    cellPwd.className = 'table-div'

    let cellbDayDate = row.insertCell(5)
    cellbDayDate.className = 'table-div'

    cellId.innerHTML = id
    cellFirstName.innerHTML = fN
    cellLastName.innerHTML = lN
    cellEmail.innerHTML = em
    cellPwd.innerHTML = pwd
    cellbDayDate.innerHTML = bday
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

const fetchStudents = async (url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': getCookie("email") })
    })

    if (!response.ok) {
        errorDiv.style.display = 'block'
        errorText.style.display = 'block'
        errorText.innerHTML = `Error while requesting to the server the students list`
        table.style.display = 'none'
        return undefined
    }
    /* return the array of students */
    return JSON.parse(await response.text()).studentsList
}

fetchStudents('http://localhost:3000/homepage/api/students').then(students => {
    if (students === undefined) {
        return
    }

    if (students.length == 0) {
        errorDiv.style.display = 'block'
        errorText.style.display = 'block'
        errorText.innerHTML = 'You have no students yet :('
        table.style.display = 'none'
        return
    }

    students.forEach(student => {
        addStudent(
            student.id,
            student.firstName,
            student.lastName,
            student.email,
            student.pwd,
            student.bdayDate
        )
    }
    )
})
