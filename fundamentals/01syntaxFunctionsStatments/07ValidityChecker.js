function checkValidity(x1, y1, x2, y2) {
    function validate(p1, q1, p2, q2) {
        let cathetusA = Math.abs(p1 - p2),
        cathetusB = Math.abs(q1 - q2),
        hypotenuse = Math.sqrt(Math.pow(cathetusA, 2) + Math.pow(cathetusB, 2));
        let validate = Number.isInteger(hypotenuse) ? "valid" : "invalid";
        console.log(`{${p1}, ${q1}} to {${p2}, ${q2}} is ${validate}`);
    }
    validate(x1, y1, 0, 0);
    validate(x2, y2, 0, 0);
    validate(x1, y1, x2, y2);
}

checkValidity(3, 0, 0, 4);
checkValidity(2, 1, 1, 1);