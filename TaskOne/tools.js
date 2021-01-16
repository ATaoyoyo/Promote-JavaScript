var tools = (function () {
  function digital(val) {
    return Number(val.replace(/\s+/g, '')) || 0
  }

  function getTarget(ev) {
    var e = ev || window.event
    return e.target || e.srcElement
  }

  return {
    digital: digital,
    getTarget: getTarget
  }
})()