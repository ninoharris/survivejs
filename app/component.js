// Note, if using 'default', a name isn't required.
// We can go straight into defining a function.
export default (text = 'Hello world!') => {
  const element = document.createElement('div')
  element.innerHTML = text
  return element
}