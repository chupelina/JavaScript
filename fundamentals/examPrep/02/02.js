class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
        this.currentCarsIn = 0;
    }
    addCar(carModel, carNumber) {
       let currentCar = { carModel, carNumber, payed: false };
        if (this.currentCarsIn < this.capacity) {
            this.vehicles.push(currentCar);
            this.currentCarsIn++;
            return `The ${carModel}, with a registration number ${carNumber}, parked.`
        } else {
            throw new Error('Not enough parking space.');
        }
    }
    removeCar(carNumber) {
        let current = this.vehicles.filter(c => c.carNumber == carNumber)[0];
        if (!current) {
            throw new Error("The car, you're looking for, is not found.");
        }
        if (!current.payed) { 
            throw new Error(`${current.carNumber} needs to pay before leaving the parking lot.`);
        }
        let result = this.vehicles.filter(v => v != current);
        this.vehicles = result;
        return `${current.carNumber} left the parking lot.`;
    }
    pay(carNumber) {
        let current = this.vehicles.filter(c => c.carNumber == carNumber)[0];
        if (!current) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
        if (current.payed) {
            throw new Error(`${current.carNumber}'s driver has already payed his ticket.`);
        }
        current.payed = true;
        return `${current.carNumber}'s driver successfully payed for his stay.`;
    }
    getStatistics(carNumber) {
         if(!carNumber){
            return[`The Parking Lot has ${this.capacity - this.currentCarsIn} empty spots left.`,
            this.vehicles.sort((a,b)=> a.carModel.localeCompare(b.carModel))
             .map(v=>
                `${v.carModel} == ${v.carNumber} - ${v.payed? 'Has payed' : 'Not payed'}`).join('\n')
              ].join('\n')
         }else{
            let current = this.vehicles.filter(c => c.carNumber == carNumber)[0];
           return `${current.carModel} == ${current.carNumber} - ${current.payed? 'Has payed' : 'Not payed' }`
         } 
    }
}

const parking = new Parking(5);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.addCar("B t600", "TX3661CA"));
console.log(parking.addCar("A t600", "TX3621CA"));
console.log(parking.addCar("c t600", "TX363CA"));
console.log(parking.getStatistics());
