function emptyObject (object) {
  for (let prop in object) {
    if (typeof object[prop] === 'object') {
      emptyObject(object[prop])
    } else {
      object[prop] = ''
    }
  }
}

function zeroPad (num, places) {
  var zero = places - num.toString().length + 1
  return Array(+(zero > 0 && zero)).join('0') + num
}

export { emptyObject, zeroPad }
