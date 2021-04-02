
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

async function loginUser(username, password) {
    let result = await request(url + '/users/login', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    })
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    return result;
}

async function registerUser(username, password) {
    let result = await request(url + '/users/register', {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    })
    sessionStorage.setItem('authorization', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    return result;
}

async function logoutUser() {
    let result = await request(url + '/users/logout', {
        method: "get",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization') }
    })
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
}


async function getAllListings() {
    let result = await request(url + '/data/cars?sortBy=_createdOn%20desc', {
        method: "get",
        headers: { 'content-type': 'application/json' },
    })
    return result;
}

async function createCar(brand, model, description, year, imageUrl, price) {
    await request(url + '/data/cars', {
        method: "post",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization') },
        body: JSON.stringify({ brand: brand, model: model, description: description, year: year, imageUrl: imageUrl, price: price })
    })

}

async function getCurrentCar(id) {
    let response = await request(url + '/data/cars/' + id, {
        method: "get",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization') }
    })
    return response;
}

async function deleteCurrentCar(id) {
    let response = await request(url + '/data/cars/' + id, {
        method: "delete",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization') }
    })
    return response;
}
async function updateCar(id, brand, model, description, year, imageUrl, price) {
    await request(url + '/data/cars/'+id, {
        method: "put",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization') },
        body: JSON.stringify({ brand: brand, model: model, description: description, year: year, imageUrl: imageUrl, price: price })
    })

}

async function getAllMine() {
    let userId = sessionStorage.getItem('userId');
    let response = await request(url + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`, {
        method: "get",
        headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('authorization') }
    })
    return response;
}

async function getAllByYear(year) {
    let response = await request(url + `/data/cars?where=year%3D${year}`, {
        method: "get",
        headers: { 'content-type': 'application/json' }
    })
    return response;
}
export { loginUser, registerUser, logoutUser, getAllListings, createCar, getCurrentCar, deleteCurrentCar, updateCar, getAllMine, getAllByYear }