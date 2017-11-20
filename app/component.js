// Note, if using 'default', a name isn't required.
// We can go straight into defining a function.
// import styles from './style.mcss'
// import less from './preprocessed.less'
import './style.css'

export default (text = 'Hello world!') => {
  const element = document.createElement('a')
  element.style.width = '100vw'
  element.style.fontSize = '70px'

  const image = document.createElement('img')
  image.src = '/images/weather-icons/13d.svg'
  element.appendChild(image)
  const p = document.createElement('p')
  p.innerHTML = text
  element.appendChild(p)
  return element
}