function sortingStrings(strings) {


    function twoCriterias(first, second) {
        let result = first.length - second.length;
        if (result == 0) {
            return first.localeCompare(second);
        }
        return result;
    }
    strings.sort(twoCriterias);
    return strings.join('\n');
}

console.log(sortingStrings(['alpha',
    'beta',
    'gamma']));
console.log(sortingStrings(['Isacc',
    'Theodor',
    'Jack',
    'Harrison',
    'George']
));
console.log(sortingStrings(['test',
    'Deny',
    'omen',
    'Default']));