import Calculator from '../module/Calculator'

(function () {
  const oCalculator = document.getElementsByClassName('J_calculator')[0]

  function init() {
    new Calculator(oCalculator).init()
  }

  init()
})()