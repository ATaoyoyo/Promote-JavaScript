import tpl from './index.tpl'

export default class InputsComponent {
  constructor() {
    this.name = 'InputsComponent'
  }

  tpl() {
    const oDiv = document.createElement('div')
    oDiv.className = 'input-group'
    oDiv.innerHTML = tpl()
    return oDiv
  }
}