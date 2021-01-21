# 学习笔记

## ES5模块化

### 创建模块

因为ES5中没有模块化的概念，所以在编写代码的过程中，是采用函数作用域来模拟编写各个模块。

一般使用一个立即执行函数来完成对模块的编写：

```js
;(function (){
 // write code...
})()
```

在最前面添加一个分号是因为编写好之后的代码，在生成环境会被压缩，如果不添加分号会出现一些意想不到的错误。因此，一般可以在函数立即表达式前后添加分号，避免生成环境下面出现错误。

### 使用模块

如果在一个模块中，使用另一个模块中的东西，该如何使用呢？

按照上面的形式，函数执行完就直接被销毁了，无法取到函数里面的内容。但是可以通过函数表达式，对函数中的内容进行接收。

比如说，现在有一个`tools.js`文件，里面有一个两数相加的工具函数：

```js
// tools.js
var tools = (function (){
  var sum = function (num1, num2) {
    return num1 + num2
  }
  
  return {
    sum: sum
  }
})();
```

由于函数表达式的特征，使得`tools`这个变量接收一个对象，对象中就是我们需要使用到的内容。

然后我们在后续的某个模块文件中，可以通过参数传递的方式使用：

```js
// some module.js

;(function (tools){
  var result = tools.sum(1, 2)
})(tools)
```

但是在使用之前，不要忘了在HTML文件中进行引入：
```html
<script src="tools.js"></script>
<script src="module.js"></script>
```

## 装饰器的简单使用

### 依赖安装

装饰器需要配合`babel`使用，首先安装所需依赖：

```js
yarn add babel-plugin-transform-runtime transform-decorators-legacy -D
```

然后再项目中添加`.babelrc`文件，编写以下代码：

```js
{
  "presets": ["env"],
  "plugins": [
    "babel-plugin-transform-runtime",
    "transform-decorators-legacy"
  ]
}
```

### 使用场景

ES6中新添加了类的概念，但是JavaScript中的类无法继承多个类，这个时候，就可以使用装饰器来使用：

比方说现在有一个动物类:

```js
// Anima.js
export default class Anima {
  constructor(name) {
    this.name = name
  }
  
  sayMyselef() {
    console.log(`i am ${this.name}`)
  }
}
```

要给动物类添加一个跑动方法，就可以这样写：
```js
// run.js
export default (target) => {
  target.prototype.run(name) {
    console.log(`${name} running...`)
  }
}
```

然后再`Anima`类中引入，添加：

```js
// Anima.js

import run form './run.js'

export default class Anima {
  constructor(name) {
    this.name = name
  }
  
  sayMyselef() {
    console.log(`i am ${this.name}`)
  }
}
```

现在便可以直接在`Anima`类中使用`this.run`方法了。









