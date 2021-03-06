function radar(speed, type) {
    let limit = 0;
    if (type == 'motorway') {
        limit = 130;
    } else if (type == 'interstate') {
        limit = 90;
    } else if (type == 'city') {
        limit = 50;
    } else if (type == 'residential') {
        limit = 20;
    }

    if (speed <= limit) {
        return `Driving ${speed} km/h in a ${limit} zone`;
    }
    let diff = speed - limit;
    let status = '';
    if(diff <=20){
        status = 'speeding';
    }else if(diff<=40){
        status = 'excessive speeding';
    }else {
        status = 'reckless driving';
    }
       return `The speed is ${diff} km/h faster than the allowed speed of ${limit} - ${status}`

}

console.log(radar(40, 'city'));
console.log(radar(21, 'residential'));
console.log(radar(120, 'interstate'));
console.log(radar(200, 'motorway'));
