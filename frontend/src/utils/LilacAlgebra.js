export function LineCalculator(x1, y1, x2, y2) {
    const m = (y2 - y1) / (x2 - x1)
    const b = (x1 * m) - y1

    const x = function(y) {
        return (x1 === x2)? x1 : (y + b) / m 
    }
    const y = function(x) {
        return (x * m) - b
    }

    return {x: x, y: y}
}