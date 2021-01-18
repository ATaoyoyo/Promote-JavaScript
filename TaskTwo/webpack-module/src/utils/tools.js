function tplReplace(template, replaceObj) {
  return template().replace(/{{(.*?)}}/g, function (node, key) {
    return replaceObj[key.trim()]
  })
}

export {
  tplReplace
}