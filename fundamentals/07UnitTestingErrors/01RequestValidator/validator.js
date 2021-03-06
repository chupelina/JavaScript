function validator(request) {
    let methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1' ,'HTTP/2.0'];
    function err(str) {
        throw new Error(`Invalid request header: Invalid ${str}`);
    }

    if (!methods.includes(request.method)) {
        err('Method');
    }
    let reg = /^([a-z\.0-9]+)$|^[\*]$/g;
    if (!reg.test(request.uri) || request.uri==='' || request.uri===undefined) {
        err('URI')
    }
    if(!versions.includes(request.version) ){
        err('Version')
    }
    let mesageReg = /[<>\&'"\\]/g;
    if (mesageReg.test(request.message) || request.message===undefined) {
        err('Message');
    }
    return request;
}

console.log(validator({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: 'fgddfd>'
  }));
// console.log(validator({
//     method: 'OPTIONS',
//     uri: 'git.master',
//     version: 'HTTP/1.1',
//     message: '-recursive'
// }));
// console.log(validator({
//     method: 'POST',
//     uri: 'home.bash',
//     message: 'rm -rf /*'
// }));

// console.log(validator({
//         method: 'GET',
//         uri: 'svn.public.catalog',
//         version: 'HTTP/1.1'   
// }))

// console.log(validator({
//     method: 'GET',
//     version: 'HTTP/1.1',
//     message: ''
//   }));