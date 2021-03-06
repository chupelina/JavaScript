function solve(array, parameter) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }
    const sorters = {
        "destination": (a, b) => a.destination.localeCompare(b.destination),
        "price": (a, b) => a.price - b.price,
        "status": (a, b) => a.status.localeCompare(b.status),
    }
    let resultArr = array.map(x => new Ticket(...x.split('|'))).sort(sorters[parameter]);
    return resultArr;
   
}

console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'));
console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'status'));