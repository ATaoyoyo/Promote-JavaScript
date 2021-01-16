export default (target) => {
  target.prototype.plus = function s(val1, val2) {
    return val1 + val2
  }

  target.prototype.minus = function us(val1, val2) {
    return val1 - val2
  }

  target.prototype.mul = function (val1, val2) {
    return val1 * val2
  }

  target.prototype.div = function (val1, val2) {
    return val1 / val2
  }
}