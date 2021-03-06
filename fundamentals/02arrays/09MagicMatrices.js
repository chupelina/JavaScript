function magic(matrix) {
    let sum = 0;

    for (let row = 0; row < matrix.length; row++) {
        let currSum = 0;
        for (let col = 0; col < matrix.length; col++) {
            currSum += matrix[row][col];
            if (row == 0) {
                sum = currSum;
            }
        }
        if (currSum != sum) {
            return false;
        }

    } for (let col = 0; col < matrix.length; col++) {
        let currSum = 0;
        for (let row = 0; row < matrix.length; row++) {
            currSum += matrix[row][col];
            if (col == 0) {
                sum = currSum;
            }
            if (currSum != sum) {
                return false;
            }
        }
        return true;
    }
}
console.log(magic([[4, 5, 6],
[6, 5, 4],
[5, 5, 5]]));
console.log(magic([[11, 32, 45],
[21, 0, 1],
[21, 1, 1]]));
console.log(magic([[1, 0, 0],
[0, 0, 1],
[0, 1, 0]]));
