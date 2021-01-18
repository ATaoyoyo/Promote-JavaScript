import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from "../../../utils/tools";

export default () => {
  return {
    name: 'nav',
    tpl(data) {
      let oNav = document.createElement('div')
      oNav.className = 'nav'
      let list = ''
      data.forEach(function (item, index) {
        list += tplReplace(tpl, {
          navStyleClass: !index ? 'nav-item current' : 'nav-item',
          city_name: item.city_name
        })
      })
      oNav.innerHTML = list
      return oNav
    },
    bindEvent(onNavItemClick) {
      let navItem = document.getElementsByClassName('nav')[0]
      navItem.addEventListener('click', onNavItemClick, false)
    }
  }
}