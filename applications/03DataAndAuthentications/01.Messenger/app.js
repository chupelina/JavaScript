async function crud(url, options) {
    if (!options) {
        const address = await fetch(url);
        const response = await address.json();
        return response;
    } else {
        const address = await fetch(url, options);
        const response = await address.json();
        return response;
    }

}

function attachEvents() {
    let refresh = document.getElementById('refresh');
    refresh.addEventListener('click', (e) => getAllComments(e));
    let send = document.getElementById('submit');
    send.addEventListener('click',(e)=>addPost(e));
}

attachEvents();

async function getAllComments(e) {
    e.preventDefault();
    let response = await crud("http://localhost:3030/jsonstore/messenger");
    let textArea = document.getElementById('messages');
    textArea.value = '';
    textArea.value = Object.values(response).map(c => `${c.author}: ${c.content}`).join('\n');
}
async function addPost(e){
    e.preventDefault();
    let author = document.querySelectorAll('input')[0].value;
    let content = document.querySelectorAll('input')[1].value;
    if(author.trim()=="" || content.trim()==""){
        alert('All fields are requeierd');
        return;
    }
    let respone = await crud("http://localhost:3030/jsonstore/messenger",{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({author, content})
    })
    document.querySelectorAll('input')[0].value='';
    document.querySelectorAll('input')[1].value='';
}