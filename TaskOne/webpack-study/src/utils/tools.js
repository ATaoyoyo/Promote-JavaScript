function trimToSpace(val) {
  return val.replace(/\s+/g, '')
}

function digitizing(val) {
  return Number(val) || 0
}

export {
  trimToSpace,
  digitizing
}