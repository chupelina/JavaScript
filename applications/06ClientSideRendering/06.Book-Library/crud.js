
let host = "http://localhost:3030/jsonstore/collections/books";
async function post(data) {
    await fetch(host, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
}

async function get(){
   return await(await fetch(host)).json();
}

async function getCurrentBook(id){
   return await (await fetch(host+'/'+id)).json();
}

async function put(id, data){
    await fetch(host+'/'+id, {
        method: 'put',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
}

async function del(id){
    await fetch(host+'/'+id, {
        method: 'delete',
        headers: { "Content-Type": "application/json" }
    })
}

export {
    post,
    get,
    put,
    del,
    getCurrentBook
};