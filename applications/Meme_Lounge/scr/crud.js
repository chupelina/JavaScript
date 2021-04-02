
const url = 'http://localhost:3030';

async function request(host, options) {
    try {
        const response = await fetch(host, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        throw (err);
    }
}

async function loginUser(email, password) {
    let result = await request(url + '/users/login', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);
    return result;
}

async function registerUser(username, email, password, gender) {
    let result = await request(url + '/users/register', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: username, email:email, password:password, gender:gender})
    })
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('gender', gender);
    return result;
}

async function logoutUser() {
    let result = await request(url + '/users/logout', {
        method: "get",
        headers: { 'content-type': 'application/json' , 'X-Authorization': sessionStorage.getItem('authorization')}
    })
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('gender');
}

async function createMeme(title, description, imageUrl){
    let result = await request(url + '/data/memes', {
        method: "post",
        headers: { 'content-type': 'application/json' , 'X-Authorization': sessionStorage.getItem('authorization') },
        body: JSON.stringify({ title: title, description: description, imageUrl:imageUrl})
    })
    return result;
}

async function getAllMemes(){
    let result = await request(url + '/data/memes?sortBy=_createdOn%20desc', {
        method: "get",
        headers: { 'content-type': 'application/json'}
    })
    return result;
}

async function getCurrentMeme(id){
    let result = await request(url + '/data/memes/'+id, {
        method: "get",
        headers: { 'content-type': 'application/json'}
    })
    return result;
}

async function delCurrentMeme(id){
    let result = await request(url + '/data/memes/'+id, {
        method: "delete",
        headers: { 'content-type': 'application/json' , 'X-Authorization': sessionStorage.getItem('authorization') }
    })
    return result;
}

async function editMeme(id, title, description, imageUrl){
    let result = await request(url + '/data/memes/'+id, {
        method: "put",
        headers: { 'content-type': 'application/json' , 'X-Authorization': sessionStorage.getItem('authorization') },
        body: JSON.stringify({ title: title, description: description, imageUrl:imageUrl})
    })
    return result;
}

async function getAllMineMemes(){
    let id = sessionStorage.getItem('userId');
    let result = await request(url + `/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`, {
        method: "get",
        headers: { 'content-type': 'application/json' , 'X-Authorization': sessionStorage.getItem('authorization') }
    })
    return result;

}

export {loginUser, registerUser, logoutUser, createMeme, getAllMemes, getCurrentMeme, delCurrentMeme, editMeme, getAllMineMemes }