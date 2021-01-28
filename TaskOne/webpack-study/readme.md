# webpack 理解与学习

## 基本概念

> 本质上，webpack 是一个用于现代 JavaScript 应用程序的*静态模块打包工具*。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

## 创建项目

首先新建一个空白项目文件夹，并使用`npm init -y`初始化：

```sh
mkdir learn-webpack && cd learn-webpack && npm init -y
```

创建`index.html`文件，并新建一个`src`文件夹，在`src`文件夹中创建`main.js`文件：

```sh
touch index.html && mkdir src && cd src && touch main.js
```

安装`webpack`所需要的依赖：

```sh
yarn add webpack webpack-cli -D
```

## 基本配置

在项目根目录文件中，新建`webpack.config.js`文件，并添加以下内容：

```js
module.exports = {
  mode: 'development',
  entry: '',
  output: {},
  module: {},
  plugins: [],
  devServer: {},
}
```

根据个人理解以及练习，发现编写`webpack.config.js`主要会用到以下属性：

- mode
  配置打包环境模式，分别为`production`（生产）和`development`（开发）。

```js
mode: 'production'
```

- entry
  打包文件入口，默认值为`./src/index.js`，也可更改为其他路径。多数情况下，会使用到`node`中的`path`模块用来动态获取文件所在位置，原因是生产环境与开发环境下的目录结构可能会不相同。

```js
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
}
```

- output
  打包出口文件对象，主要输出的文件默认值为`./dist/main.js`，其他生成文件默认放置在 ./dist 文件夹中。同样的，在实际使用过程中，也会用到`node`的`path`模块。其中`output`的`path`属性用来指定文件输出位置，`filename`指定生成的文件。`[name]`是根据入口文件的名称动态生成，比如入口文件为`main.js`，那么打包出来的出口文件就是`main.js`。

```js
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
}
```

- module
  配置打包模块，这是一个比较核心的属性，里面有一个`rules`，用来配置各种需要转换的模块的规则。依靠于它，可以让你使用很多新的东西或特性。比方说要使用`ts`，但是浏览器是无法识别`ts`的，就可以使用`ts-loader`来讲`.ts`文件中的内容转换成为`js`。

```js
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
}
```

- plugin
  插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
  比方说使用`html-webpack-plugin`插件，它的作用就是打包的过程中生成一个`.html`文件，并且可以帮助我们自动关联打包后的`js`。

  其中`template`用来指定生成`html`的模板，`filename`为`html`文件的名称，`title`为`html`文档的标题。更多关于`html-webpack-plugin`插件的配置，可在[官方文档](https://webpack.docschina.org/plugins/html-webpack-plugin/)中查询。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: 'Webpack App',
    }),
  ],
}
```

- devServer
  此属性为可选值，单通常在开发环境下都会添加。它可以生成一个本地服务，以便编写完代码之后不用每次都手动打包进行调试。使用`devServer`需要安装`webpack-dev-server`依赖。

  `open`用来配置服务启动后是否自动打开浏览器。
  `contentBase`用来告诉服务器内容的来源。
  `port`指定服务端口。

  更多配置项，可以在[官网](https://webpack.docschina.org/configuration/dev-server/#devserver)查看。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: 'Webpack App',
    }),
  ],
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, './dist'),
    port: 8080,
  },
}
```

## 常用模块及插件

### 三大件

要使用`webpack`首先得安装`webpack`，`webpack-cli`。若是需要使用到服务，则要安装`webpack-dev-server`。这三个东西是最必装的三大件。

```sh
yarn add webpack webpack-cli webpack-dev-server
```

### 六件套（处理 JavaScript）

紧接着的六件套便是用来对`JavaScript`做处理，能够让我们用到一些`JavaScript`最新的语法。

分别是：

- babel-loader
- babel-core
- babel-preset-env
- babel-plugin-transform-runtime
- babel-plugin-transform-decorators
- babel-plugin-transform-decorators-legacy

其中，`babel-loader`，`babel-core`，`babel-preset-env`为必装的插件。安装好之后，得在项目的根目录文件中新建`babel.config.js`文件，用来对`JavaScript`做处理：

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
  ],
}
```

然后再`webpack.config.js`的`rules`中添加`loader`：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
```

`exclude`是指定什么文件或文件夹中的`JS`不做处理，其实`node_modules`肯定是不需要做处理的，故在此排除掉。

### 四件套（处理样式）

对`JavaScript`做了处理，接下来应该就是对样式进行处理了。主要是用到一下四个：

- sass-loader
- node-sass
- css-loader
- style-loader

同样的，安装好之后，需要在`webpack.config.js`中进行配置：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}
```

需要注意的是，处理`CSS`的`loader`的顺序是倒着来的，这一点要牢记。

其实处理样式不一定是四件套，可能更多，也可能更少，需要在实际的开发过程中进行选择，这里只是举一个我常用的例子。

### 处理 HTML

处理`html`最常用的就是`html-webpack-plugin`了，这个在之前就已经用例子展示过，就不多做赘述了。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: 'Webpack App',
    }),
  ],
}
```

## 总结

到这里，`webpack`最基本的使用就已经完结了，只需要记住最外面的几个属性，由外向内的编写，就没用那么困难了。更多的模块，`loader`，`plugin`，都可以在学习的路上不断积累扩展，持之以恒，一定会有所收获。
