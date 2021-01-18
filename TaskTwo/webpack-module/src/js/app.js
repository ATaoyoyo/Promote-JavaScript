import Tab from "../module/Tab";


(function (doc) {
  const app = doc.getElementById('app')
  const init = () => {
    new Tab(app).init()
  }

  init()
})(document)