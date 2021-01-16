var compute = (function () {
  function plus(val1, val2) {
    return val1 + val2
  }

  function minus(val1, val2) {
    return val1 - val2
  }

  function mul(val1, val2) {
    return val1 * val2
  }

  function div(val1, val2) {
    return val1 / val2
  }


  return {
    plus: plus,
    minus: minus,
    mul: mul,
    div: div
  }
})()