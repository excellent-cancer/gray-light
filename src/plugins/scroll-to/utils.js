export function position(el) {
  const top = top(el)
  const bottom = top + el.clientHeight
  return { top, bottom }
}

export function top(el) {
  let location = 0
  if (el.offsetParent) {
    do {
      location += el.offsetTop
      el = el.offsetParent
    } while (el)
  }
  return location >= 0 ? location : 0
}