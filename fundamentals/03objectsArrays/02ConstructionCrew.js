function crew(object) {
    if(object.dizziness === true){
     let currHydrated = object.weight*0.1*object.experience;
     object.levelOfHydrated += currHydrated;
     object.dizziness = false;
    }
    let worker = {
        weight: object.weight,
        experience: object.experience,
        levelOfHydrated: object.levelOfHydrated,
        dizziness: object.dizziness
    }

    return worker;
}

console.log(crew({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }));
console.log(crew({ weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true }));
console.log(crew({ weight: 95,
    experience: 3,
    levelOfHydrated: 0,
    dizziness: false }));