function addingAndRemoving(comands) {
    let arr = [];
    let curr = 1;

    for (let i = 0; i < comands.length; i++) {
        let n = comands[i].localeCompare('add');
        if (n== 0) {
            arr.push(curr);
        } else {
            arr.pop(arr[arr.length-1]);
        } curr++;
    }
    if (arr.length == 0) {
        return 'Empty';
    }
    return arr.join('\n');
}

console.log(addingAndRemoving(['add',
    'add',
    'add',
    'add']));
    console.log(addingAndRemoving(['add',
    'add',
    'remove',
    'add',
    'add']
));
console.log(addingAndRemoving(['remove',
    'remove',
    'remove']));