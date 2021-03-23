
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
        alert(err.message);
        throw (err);
    }
}


async function get() {
    return await (await fetch(url + '/data/catalog')).json();
}

async function getOne(id) {
    return await (await fetch(url + '/data/catalog/' + id)).json();
} 

async function getAllMine() {
    const userId = sessionStorage.getItem('userId');
    return await (await fetch(url + `/data/catalog?where=_ownerId%3D%22${userId}%22`)).json();
}

async function post(data) {
    await fetch(url + '/data/catalog', {
        method: "post",
        headers: {
            'content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authorization')
        },
        body: JSON.stringify(data)
    })
}

async function put(data, id) {
    await fetch(url + '/data/catalog/'+id , {
        method: "put",
        headers: {
            'content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authorization')
        },
        body: JSON.stringify(data)
    })
}

async function del(id) {
    await fetch(url + '/data/catalog/' + id, {
        method: "delete",
        headers: {
            'content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authorization')
        }        
    })
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
    return result;
}


async function register(email, password) {
    let result = await request(url + '/users/register', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
  console.log(result);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
}

async function logout() {
    await get(url + '/users/logout');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userId');
}

export{get, getOne, getAllMine, post, put, del, logout, loginUser, register}