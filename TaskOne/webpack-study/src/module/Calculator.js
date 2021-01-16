import compute from "../lib/compute";
import ResultComponent from "../components/Result";
import InputsComponent from "../components/Inputs";
import ButtonComponent from "../components/Button";
import { digitizing, trimToSpace } from "../utils/tools";

@compute
export default class Calculator {
  constructor(el) {
    this.el = el
    this.name = 'Calculator'

    this.resultComponent = new ResultComponent()
    this.inputsComponent = new InputsComponent()
    this.buttonComponent = new ButtonComponent()

    this.data = this.definedData()

    this.currentIndex = 0
  }

  init() {
    this.render()
    this.btnEvent()
    this.inputEvent()
  }

  definedData() {
    // let _obj = {}
    // let method = 'plus'
    // let fVal = 0
    // let sVal = 0
    //
    const _this = this
    //
    // Object.defineProperties(_obj, {
    //   method: {
    //     get() {
    //       return method
    //     },
    //     set(newVal) {
    //       method = newVal
    //       _this.setResult(_this.data.method, _this.data.fVal, _this.data.sVal)
    //     }
    //   },
    //   fVal: {
    //     get() {
    //       return fVal
    //     },
    //     set(newVal) {
    //       fVal = newVal
    //       _this.setResult(_this.data.method, _this.data.fVal, _this.data.sVal)
    //     }
    //   },
    //   sVal: {
    //     get() {
    //       return sVal
    //     },
    //     set(newVal) {
    //       sVal = newVal
    //       _this.setResult(_this.data.method, _this.data.fVal, _this.data.sVal)
    //     }
    //   }
    // })
    //
    // return _obj

    const target = {
      method: 'plus',
      fVal: 0,
      sVal: 0,
    }
    return new Proxy(target, {
      get(target, prop) {
        return target[prop]
      },
      set(target, prop, newVal) {
        target[prop] = newVal
        _this.setResult(_this.data.method, _this.data.fVal, _this.data.sVal)
        return true
      }
    })
  }

  render() {
    const oFrag = document.createDocumentFragment();
    oFrag.appendChild(this.resultComponent.tpl())
    oFrag.appendChild(this.inputsComponent.tpl())
    oFrag.appendChild(this.buttonComponent.tpl())
    this.el.appendChild(oFrag)
  }

  btnEvent() {
    const el = this.el
    this.oResult = el.getElementsByClassName('result')[0]
    this.oBtnGroup = el.getElementsByClassName('button-group')[0]
    this.btns = el.getElementsByClassName('btn')
    this.oBtnGroup.addEventListener('click', this.onBtnClick.bind(this), false)
  }

  inputEvent() {
    this.oInputGroup = this.el.getElementsByTagName('input')
    this.oInputGroup[0].addEventListener('input', this.onInput.bind(this), false)
    this.oInputGroup[1].addEventListener('input', this.onInput.bind(this), false)
  }

  onBtnClick(ev) {
    const e = ev || window.event;
    const tar = e.target || e.srcElement;
    const tagName = tar.tagName.toLowerCase()

    if (tagName === 'button') {
      const method = tar.getAttribute('data-method')
      this.setData('method', method)
      this.setCurrentSelect(tar)
    }

    this.setResult(this.data.method, this.data.fVal, this.data.sVal)
  }

  onInput(ev) {
    const e = ev || window.event;
    const tar = e.target || e.srcElement;
    const tagName = tar.tagName.toLowerCase()
    const id = tar.getAttribute('data-id')
    const val = digitizing(trimToSpace(tar.value)) || 0

    if (tagName === 'input') {
      this.setData(id, val)
    }
  }

  setData(field, newVal) {
    switch (field) {
      case 'method':
        this.data.method = newVal;
        break
      case 'fVal':
        this.data.fVal = newVal;
        break
      case 'sVal':
        this.data.sVal = newVal
        break
      default:
        break
    }
  }

  setMethod(method) {
    this.data.method = method
  }

  setCurrentSelect(target) {
    this.btns[this.currentIndex].className = 'btn'
    this.currentIndex = [].indexOf.call(this.btns, target)
    this.btns[this.currentIndex].className += ' selected'
  }

  setResult(method, val1, val2) {
    this.oResult.innerText = this[method](val1, val2)
  }
}