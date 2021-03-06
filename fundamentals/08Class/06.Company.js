class Company {
    constructor(departments = []) {
        this.departments = departments;
    }
    addEmployee(username, salary, position, department) {
        if (!username || !position || !department || !salary || salary < 0) {
            throw new Error("Invalid input!");
        }
        let newEmploy = {
            username: username,
            salary: Number(salary),
            position: position
        }
        if (!this.departments[department]) {
            this.departments[department] = [];
        }
        this.departments[department].push(newEmploy);
        return `New employee is hired. Name: ${username}. Position: ${position}`
    }

    bestDepartment() {
        let bestDepartment = '';
        let bestAvgSalary = 0;

        Object.entries(this.departments).forEach(([key, value]) => {
            let salary = 0;
            value.forEach(emp => {
                salary += emp.salary;
            })
            salary = salary / value.length;
            if (bestAvgSalary < salary) {
                bestDepartment = key;
                bestAvgSalary = salary;
            }

        });
        let output = `Best Department is: ${bestDepartment}\n`;
        output += `Average salary: ${bestAvgSalary.toFixed(2)}\n`;
        this.departments[bestDepartment].sort((e1, e2) => {
            let result = e2.salary - e1.salary;
            if (result == 0) {
                return e1.username.localeCompare(e2.username)
            }
            return result;
        }).forEach(emp =>
            output += `${emp.username} ${emp.salary} ${emp.position}\n`);

        return output;
    }
}

let c = new Company();
 c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

console.log(c.bestDepartment()); 
