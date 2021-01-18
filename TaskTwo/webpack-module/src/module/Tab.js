import './../scss/tab.scss'
import city from "../data/city";
import nav from '../components/Tab/nav/index'
import page from '../components/Tab/page/index'

export default class Tab {
  constructor(app) {
    this.name = 'Tab'
    this.app = app
    this.oTab = document.createElement('div')
    this.oTab.className = 'tab J_tab'

    this.oNavComponent = nav()
    this.oPageComponent = page()

    this.currentIndex = 0

    this.htmlCache = {}
  }

  init() {
    this.render()
    this.getElement()
    this.oNavComponent.bindEvent(this.onNavItemClick.bind(this))
  }

  render() {
    const frag = document.createDocumentFragment()
    const tpl = this.oPageComponent.tpl(city[this.currentIndex])
    frag.appendChild(this.oNavComponent.tpl(city))
    frag.appendChild(tpl.oPage)

    this.htmlCache[this.currentIndex] = tpl.pageHtml

    this.oTab.appendChild(frag)
    this.app.appendChild(this.oTab)
  }

  getElement() {
    this.oNavItem = this.oTab.getElementsByClassName('nav-item')
    this.oPageItem = this.oTab.getElementsByClassName('content-wrapper')[0]
  }

  onNavItemClick(ev) {
    let e = ev || window.event
    let tar = e.target || e.srcElement
    let className = tar.className
    className === 'nav-item' && this.changePage(tar)
  }

  changePage(tar) {
    this.oNavItem[this.currentIndex].className = 'nav-item'
    this.currentIndex = [].indexOf.call(this.oNavItem, tar)
    this.oNavItem[this.currentIndex].className += ' current'
    this.oPageItem.innerHTML = this.renderHtml(city, this.currentIndex)
  }

  renderHtml(data, index) {
    if (!this.htmlCache[index]) {
      this.htmlCache[index] = this.oPageComponent.renderPage(data[index])
    }

    return this.htmlCache[index]
  }


}