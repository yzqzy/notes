import _ from 'lodash'
import './style.css'
import Icon from './icon.png'
import Data from './data.xml'
import Notes from './data.csv'

// custom parser
import toml from './data.toml'
import yaml from './data.yaml'
import json from './data.json5'

function component() {
  const element = document.createElement('div')

  element.innerHTML = _.join(['hello', 'webpack5'], ' ')
  element.classList.add('hello')

  const icon = new Image()
  icon.src = Icon
  element.appendChild(icon)

  console.log(Data)
  console.log(Notes)

  console.log(toml.title)
  console.log(toml.owner.name)
  console.log(yaml.title)
  console.log(yaml.owner.name)
  console.log(json.title)
  console.log(json.owner.name)

  return element
}

document.body.appendChild(component())
