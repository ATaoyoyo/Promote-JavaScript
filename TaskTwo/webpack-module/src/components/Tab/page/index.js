import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from "../../../utils/tools";

export default () => {
  return {
    name: 'page',
    tpl(dataItem) {
      let oPage = document.createElement('div')
      let pageHtml = this.renderPage(dataItem)
      oPage.className = 'page'
      oPage.innerHTML = pageHtml
      return {oPage, pageHtml}
    },
    renderPage(dataItem) {
      return tplReplace(tpl, {
        cityName: dataItem.city_name,
        intro: dataItem.intro
      })
    }
  }
}