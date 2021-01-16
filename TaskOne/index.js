// var oCalculator = document.getElementsByClassName('J_calculator')[0],
//   oResult = oCalculator.getElementsByClassName('result')[0],
//   fInput = oCalculator.getElementsByTagName('input')[0],
//   sInput = oCalculator.getElementsByTagName('input')[1],
//   oBtnGroup = oCalculator.getElementsByClassName('button-group')[0];
//
// oBtnGroup.addEventListener('click', onButtonClick, false)
//
// function onButtonClick(ev) {
//   var e = ev || window.event,
//     tar = e.target || e.srcElement,
//     tagName = tar.tagName.toLowerCase();
//
//   if (tagName === 'button') {
//     var method = tar.getAttribute('data-method'),
//       fVal = Number(fInput.value.replace(/\s+/g, '')) || 0,
//       sVal = Number(sInput.value.replace(/\s+/g, '')) || 0;
//
//     switch (method) {
//       case 'plus':
//         oResult.innerHTML = fVal + sVal
//         break;
//       case 'minus':
//         oResult.innerHTML = fVal - sVal
//         break;
//       case 'mul':
//         oResult.innerHTML = fVal * sVal
//         break;
//       case 'div':
//         oResult.innerHTML = fVal / sVal
//         break;
//       default:
//         break
//     }
//   }
// }


// ES5模块

;(function (doc, tools, compute) {
  var oCalculator = doc.getElementsByClassName('J_calculator')[0]
  var fInput = oCalculator.getElementsByTagName('input')[0]
  var sInput = oCalculator.getElementsByTagName('input')[1]
  var oResult = oCalculator.getElementsByClassName('result')[0]
  var btnGroup = oCalculator.getElementsByClassName('button-group')[0];

  function init() {
    btnEvents()
  }

  function btnEvents() {
    btnGroup.addEventListener('click', onBtnClick, false)
  }

  function onBtnClick(ev) {
    var tar = tools.getTarget(ev)
    var tagName = tar.tagName.toLowerCase();

    if (tagName === 'button') {
      var method = tar.getAttribute('data-method')
      var fVal = tools.digital(fInput.value)
      var sVal = tools.digital(sInput.value)
      renderResult(compute[method](fVal, sVal))
    }
  }

  function renderResult(val) {
    oResult.innerText = val
  }


  init()
})(document, tools, compute)
