function isArrayEqual(array1, array2) {
    if (array1.length !== array2.length)
        return false
  
    for (let i = 0; i < array1.length; i++)
        if (array1[i] !== array2[i])
            return false
  
    return true
}

function matrix(n) {
    let matrix = [];
    for (let i = 0; i < n; i++)
        matrix.push(Array(n))

    return matrix
}
 
function matrix_includes(matrix, target) {
    for (let i = 0; i < matrix.length; i++)
        if (isArrayEqual(matrix[i], target))
            return true
            
    return false
}

function swapElements(arr, oldIndex, newIndex) {
    const element = arr[oldIndex];
    arr[oldIndex] = arr[newIndex];
    arr[newIndex] = element;
    return arr;
}

export {isArrayEqual, matrix, matrix_includes, swapElements}