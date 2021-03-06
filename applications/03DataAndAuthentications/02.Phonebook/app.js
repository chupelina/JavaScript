async function crud(url, options) {
    const address = await fetch(url, options);
    const response = await address.json();
    return response;
}


function attachEvents() {
    document.getElementById('btnLoad')
        .addEventListener('click', getAllContacts);
    document.getElementById('btnCreate')
        .addEventListener('click', createContact);
}

attachEvents();

async function getAllContacts() {
    const response = await crud('http://localhost:3030/jsonstore/phonebook');
    let ul = document.getElementById('phonebook');
    ul.addEventListener('click', deleteContact);
    ul.innerHTML = ''
    Object.values(response).map(r => {
        console.log();
        let li = document.createElement('li');
        li.innerText = `${r.person}: ${r.phone} `;
        let btn = document.createElement('button');
        btn.id = r._id;
        btn.innerText = 'Delete';
        li.appendChild(btn);
        ul.appendChild(li);
    })
}
async function createContact(e) {
    e.preventDefault();
    let person = document.getElementById('person').value;
    let phone = document.getElementById('phone').value;
    if (person.trim() == '' || phone.trim() == '') {
        alert('All fields are required');
        return;
    }
    await crud('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person, phone })
    })
    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
}

async function deleteContact(e) {
    if (e.target.innerText == 'Delete') {
        let iAM = confirm('Are you shure?');

        if (iAM.ok) {
            await crud('http://localhost:3030/jsonstore/phonebook/' + e.target.id, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            })
        }

    }
}