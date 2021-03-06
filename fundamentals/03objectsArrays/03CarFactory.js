function car(car) {
    function getEngine(power) {
        const engines = [
            { power: 90, volume: 1800 },
            { power: 120, volume: 2400 },
            { power: 200, volume: 3500 }];
        return engines.find(el => el.power >= power);
    }
    function getCariage(carriage, color) {
        let carriages =[ 
        {  type: 'hatchback', color: color},
            {type: 'coupe', color: color}
        ];
        if(carriage.localeCompare('hatchback')){
            return carriages[1];
        }
        return carriages[0];
    }

    let wheels = Math.floor(car.wheelsize);
    if (wheels % 2 != 1) {
       wheels -=1;
    }


    let currentCar = {
        model: car.model,
        engine: getEngine(car.power),
        carriage: getCariage(car.carriage, car.color),
        wheels: [wheels, wheels, wheels, wheels]
    }
    return currentCar;
} 

console.log(car({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));
console.log(car({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}));