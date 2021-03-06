// const { use } = require("chai");

function validate() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let email = document.getElementById('email');
    let configPass = document.getElementById('confirm-password');
    let companyIfo = document.getElementById('companyInfo');
    let companyNumber = document.getElementById('companyNumber');
    let company = document.getElementById('company');
    let button = document.getElementById('submit');
 let valid = document.getElementById('valid');
 console.log(valid);
    let usernameBool = false;
    let passwordBool = false;
    let passwordConfirmBool = false;
    let emailBool = false;
    let companyCheckBool = false;
    let companyNumberBool = false;
    button.addEventListener('click', onclick);

    function onclick(e) {
        e.preventDefault();

        let regex = /^[a-zA-Z0-9]+$/g;
        if (regex.test(username.value) && username.value.length >= 3 && username.value.length <= 20) {
            username.style.borderColor = '';
            usernameBool = true;
        } else {
            emailBool = false;
            username.style.borderColor = 'red';
        }

        let regEm = /(.)*@(.)*\.(.)*/g;
        if (regEm.test(email.value)) {
            email.style.borderColor = '';
            emailBool = true;
        } else {
            emailBool = false;
            email.style.borderColor = 'red';
        }

        let reg = /^[A-Za-z0-9_]+$/g;
        console.log(password.value);
        if (reg.test(password.value) && password.value.length >= 5
            && password.value.length <= 15) {
            password.style.borderColor = '';
            passwordBool = true;
        } else {
            password.style.borderColor = 'red';
            passwordBool = false;
        }
        console.log(configPass.value);
        if (reg.test(configPass.value)&&
            configPass.value.length>=5 &&
            configPass.value.length<=15 &&
            configPass.value == password.value) {
          configPass.style.borderColor = '';
            passwordConfirmBool = true;
        } else {
            configPass.style.borderColor = 'red';
            passwordConfirmBool = false;
        }
        let num = Number(companyNumber.value);
        if (companyCheckBool) {
            if (num >= 1000 && num <= 9999) {
                companyNumberBool = true;
                companyNumber.style.borderColor = '';
            } else {
                companyNumberBool = false;
                companyNumber.style.borderColor = 'red';
            }
        }
        if (usernameBool && passwordConfirmBool && passwordBool
            && emailBool) {
            if (companyCheckBool) {
                if (companyNumberBool) {
                   
                    valid.style.display = '';
                }else{
                    valid.style.display = 'none';
                }

            } else {
                console.log('ok');
                let valid = document.getElementById('valid');
                valid.style.display = '';
            }
        }else{
            valid.style.display = 'none';
        }
    }

    company.addEventListener('change', (e) => {
        e.preventDefault();
        if (company.checked) {
            companyCheckBool = true;
            companyIfo.style.display = '';
        } else {
            companyIfo.style.display = 'none';
        }
    });


}
