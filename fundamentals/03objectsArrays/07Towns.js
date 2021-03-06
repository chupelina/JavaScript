function towns(input){
  function createTown(name, latitude, longitude) {
      let town={
      Town: name,
      Latitude: Number(latitude),
      Longitude: Number(longitude)};
      return town;
  }
output = [];
   for (let i = 1; i < input.length; i++) {
       let current = input[i].split('|');
       let name = current[1].slice(1, current[1].length-1);
       let latitude = Number(current[2].slice(1, current[2].length-1)).toFixed(2);
       let longitude = Number(current[3].slice(1, current[3].length-1)).toFixed(2);
       output.push(createTown(name, latitude, longitude));
   }
    return JSON.stringify(output);
}

console.log(towns(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']));