function emptyObject (object) {
  for (let prop in object) {
    if (typeof object[prop] === 'object') {
      emptyObject(object[prop])
    } else {
      object[prop] = ''
    }
  }
}

export { emptyObject }
