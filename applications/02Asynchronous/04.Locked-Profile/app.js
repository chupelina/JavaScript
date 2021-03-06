function lockedProfile() {
    document.getElementById('main').innerHTML = '';
    findAllprofiles();
}

async function findAllprofiles() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const answear = await response.json();
    Object.values(answear).map(createCard);
}

function createCard(person) {
    let div = document.createElement('div');
    div.className = 'profile';
    let img = document.createElement('img');
    img.src = './iconProfile2.png';
    img.className = "userIcon";
    div.appendChild(img);
    let inputRadio = createRadioBtn(div, person._id);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('hr'));
    createInputLable('Username:', 'text', person.username, div);
    let divHidden = document.createElement('div');
    divHidden.id = person._id;
    div.appendChild(divHidden);
    let button = document.createElement('button');
    button.innerText = 'Show more';
    div.appendChild(button);
    button.addEventListener('click', (e) => showMore(e, person, inputRadio));
    document.getElementById('main').appendChild(div);
}

function showMore(e, person, inputRadio) {
    if (inputRadio.checked == false && e.target.innerText=='Show more') {
        let divShown =  document.getElementById(person._id);
        divShown.appendChild(document.createElement('hr'));
        createInputLable('Email:', 'email', person.email, divShown);
        createInputLable('Age:', 'text', person.age, divShown);
        e.target.innerText = 'Hide';
        inputRadio.checked = true;
    } else if( inputRadio.checked == false && e.target.innerText=='Hide') {
       document.getElementById(person._id).innerHTML='';
        inputRadio.checked = true;
        e.target.innerText = 'Show more';
    }
}


function createInputLable(lableName, typeName, nameName, parrent) {
    let userLable = document.createElement('lable');
    userLable.innerText = lableName;
    parrent.appendChild(userLable);
    let inputName = document.createElement('input');
    inputName.type = typeName;
    inputName.name = nameName;
    inputName.value = nameName;
    inputName.disabled = true;
    inputName.readOnly = true;
    parrent.appendChild(inputName);
}

function createRadioBtn(parrent, id) {
    let lockLable = document.createElement('lable');
    lockLable.innerText = 'Lock';
    parrent.appendChild(lockLable);
    let inputRadio = document.createElement('input');
    inputRadio.type = 'radio';
    inputRadio.name = id;
    inputRadio.value = "lock";
    inputRadio.checked = true;
    parrent.appendChild(inputRadio);
    let unlockLable = document.createElement('lable');
    unlockLable.innerText = 'Unlock';
    parrent.appendChild(unlockLable);
    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = id;
    radio.value = "unlock";
    parrent.appendChild(radio);
    return inputRadio;
}