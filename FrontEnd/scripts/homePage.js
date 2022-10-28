const table = document.getElementById('table')

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

    if(!response.ok) {
        console.log('bad request')
    }
    
    return JSON.parse(await response.text()).studentsList
}

fetchStudents('http://localhost:3000/homepage/api/students').then(students => {
    if(students.length == 0) {
        console.log('ok')
        document.getElementById('no-students-div').style.display = 'block'
        document.getElementById('no-students-text').style.display = 'block'
        table.style.display = 'none'
        return
    }

    students.forEach(student => {
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

        cellId.innerHTML = student.id
        cellFirstName.innerHTML = student.firstName
        cellLastName.innerHTML = student.lastName
        cellEmail.innerHTML = student.email
        cellPwd.innerHTML = student.pwd
        cellbDayDate.innerHTML = student.bdayDate
    })
})
