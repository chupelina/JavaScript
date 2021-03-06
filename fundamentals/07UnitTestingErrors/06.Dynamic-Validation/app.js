function validate() {
    let email = document.getElementById('email');
    email.addEventListener('change', valid);
    let styleCSS = document.querySelector('head>style');

    function valid(e) {
        // e.preventDefault();
        let current = email.value;

        let reg = /[a-z]+@[a-z]+\.[a-z]+/g;
        if (reg.test(current)) {
            email.value = '';
            email.className = '';
        } else {
            email.className = 'error';
        }
        console.log(current);
    }
}