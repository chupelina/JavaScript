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
        throw err;
    }
}


async function loginUser(email, password) {
    let result = await request(url + '/users/login', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    return result;
}

async function registerUser(email, password) {
    let result = await request(url + '/users/register', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
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
}

async function getAllArticles() {
    let result = await request(url + '/data/wiki?sortBy=_createdOn%20desc', {
        method: "get",
        headers: { 'content-type': 'application/json'}
    })
    return result;
}

async function getAllArticlesForHome() {
    let result = await request(url + '/data/wiki?sortBy=_createdOn%20desc&distinct=category', {
        method: "get",
        headers: { 'content-type': 'application/json'}
    })
    return result;
}

async function createArticle(title, category, content) {
    let result = await request(url + '/data/wiki', {
        method: "post",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization')},
        body: JSON.stringify({title:title, category:category, content:content})
    })
    return result;
}

async function getArticleById(id) {
    let result = await request(url + '/data/wiki/'+id, {
        method: "get",
        headers: { 'content-type': 'application/json'}
    })
    return result;
}

async function deleteArticle(id) {
    let result = await request(url + '/data/wiki/'+id, {
        method: "delete",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization')}
    })
    return result;
}

async function editArticle(id , title, category, content) {
    let result = await request(url + '/data/wiki/'+id, {
        method: "put",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization')},
        body: JSON.stringify({title:title, category:category, content:content})
    })
    return result;
}

async function getAllByTitle(title) {
    let result = await request(url + `/data/wiki?where=title%20LIKE%20%22${title}%22`, {
        method: "get",
        headers: { 'content-type': 'application/json'}
    })
    return result;
}

export {loginUser, registerUser, logoutUser, getAllArticles, getAllArticlesForHome,
     createArticle, getArticleById, deleteArticle, editArticle, getAllByTitle}