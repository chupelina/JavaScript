function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      let input = document.querySelector('#inputs>textarea').value;
      let curr = JSON.parse(input);
      let restaurants = {};

      curr.forEach(line => {
         const tokens = line.split(' - ');
         const name = tokens[0];
         const workersArray = tokens[1].split(', ');
         let workers = [];
         for (const worker of workersArray) {
            const current = worker.split(' ');
            const salary = Number(current[1]);
            workers.push({
               name: current[0], salary
            })
         }
         if (restaurants[name]) {
            workers = workers.concat(restaurants[name].workers);
         }
         workers.sort((work1, work2) => work2.salary - work1.salary);
         let bestSalary = workers[0];
         let avgSalary = workers.reduce((sum, worker) => sum + worker.salary, 0)
                        / workers.length;
         restaurants[name] = {
            workers,
            avgSalary : avgSalary,
            bestSalary: workers[0].salary
         }                  
      });
      let best = {};
      let name = '';
      let avg = 0;
      for (const rest in  restaurants) {
         if(avg<restaurants[rest].avgSalary){
            name = rest;
            best = restaurants[rest];
            avg = restaurants[rest].avgSalary;
         }
      }
      let bestRestaurant =  document.querySelector('#bestRestaurant>p');
      bestRestaurant.textContent = `Name: ${name} Average Salary: ${best.avgSalary.toFixed(2)} Best Salary: ${best.bestSalary}`;
      let bestWorkers = document.querySelector('#workers>p');
      let stringWorkers = [];
      for (const worker in best.workers) {
      stringWorkers.push(`Name: ${best.workers[worker].name} With Salary: ${best.workers[worker].salary} ` );
      }
       bestWorkers. textContent = stringWorkers.join(' ');
   }
}