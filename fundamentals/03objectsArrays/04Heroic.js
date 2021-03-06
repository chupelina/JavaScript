function inventory(input) {
    function makeHero(name, level, items) {
        let hero = {
            name: name,
            level: level,
            items: items
        }
        return hero;
    }
    let output = [];
    for (let i = 0; i < input.length; i++) {
        let curr = input[i].split(' / ');
        let name = curr[0];
        let level = Number(curr[1]);
        let items;
        if (curr[2] == undefined) {
            items = [];
        } else {
            items = curr[2].split(', ');
        }

        output.push(makeHero(name, level, items));
    }
    return JSON.stringify(output);

}
console.log(inventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']));
console.log(inventory(['Jake / 1000 /']));