import tpl from './index.tpl'
import './index.scss'

export default class ButtonComponent {
  constructor() {
    this.name = 'ButtonGroup'
  }

  tpl() {
    const oDiv = document.createElement('div')
    oDiv.className = 'button-group'
    oDiv.innerHTML = tpl()
    return oDiv
  }
}