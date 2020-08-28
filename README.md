# generators
生成器项目是基于monolithic repository

## 目录
-  [单体仓库和多体仓库的区别](#model)
- [Lerna](#Lerna)
    - [Lerna两种工作模式](#twoways)
    - [安装](#lerna-installation)
- [Commands](#Commands)
    - [lerna bootstrap](#commands-bootstrap)
- [Typescript配置](#typescript)
- [yeoman项目开发技巧](#yeoman-skills)
- [yeoman测试](#yeoman-test)



## <a id="model">单体仓库和多体仓库的区别</a>
目前项目有2中模式分别是monolithic repository和multiple repository

mulitiple repository是传统做法，存在以下问题:
* `issue`管理混乱
* `changelog`难以整合
* `核心仓库版本`更新麻烦，需要同步所有`module`更新其依赖的`核心仓库版本`

monolithic repository，存在以下问题：
* 仓库体积较大，可能带来版本控制的问题
* 统一构建工具

## <a id="Lerna">Lerna</a>
`Lerna`是一个工具，它优化了`git`和`npm`管理`monolithic repository`的工作流

### <a id="twoways">Lerna两种工作模式</a>
Fixed/Locked mode(default)
在`publish`的时候,会依据`lerna.json`文件的`version`字段，进行增加，只选择一次，其他有改动的包自动更新版本号.

Independent mode
`lerna init --independent` 初始化项目
`lerna.json`文件的`version: independent`
每次`publish`，都会得到一个提示符,提示每个已更改的包

## <a id="lerna-installation">安装</a>
全局安装lerna
```
npm install lerna -g
```
然后在项目种初始化(我们采用独立模式independent)
```
lerna init --independent
```

## <a id="Commands">Commands</a>

### <a id="commands-bootstrap">lerna bootstrap</a>
将本地包链接在一起并安装剩余的包依赖项

#### Usage
构建当前Lerna仓库中的包。安装它们的所有依赖项并链接任何交叉依赖项。

运行时，该命令将:

1. `npm install`每个包的所有外部依赖项。
2. 将所有相互依赖的Lerna包符号链接在一起。
3. `npm run prepublish`npm在所有引导包中运行prepublish(除非通过了——igno- prepublish)。
4. `npm run prepare`npm在所有引导包中运行prepare。


## <a id="typescript">Typescript配置</a>
目前vue的typescript配置
```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "jest"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```
react的typescript配置
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

## <a id="yeoman-skills">yeoman项目开发技巧</a>

### <a id="yeoman-git">git仓库初始化</a>
```
initGitRepo() {
  if (!this.options.skipGit) {
    if (this.gitInstalled || this.isGitInstalled()) {
        const gitDir = this.gitExec('rev-parse --is-inside-work-tree', { trace: false }).stdout;
        // gitDir has a line break to remove (at least on windows)
        if (gitDir && gitDir.trim() === 'true') {
            this.gitInitialized = true;
        } else {
            const shellStr = this.gitExec('init', { trace: false });
            this.gitInitialized = shellStr.code === 0;
            if (this.gitInitialized) this.log(chalk.green.bold('Git repository initialized.'));
            else this.warning(`Failed to initialize Git repository.\n ${shellStr.stderr}`);
        }
    } else {
        this.warning('Git repository could not be initialized, as Git is not installed on your system');
    }
  }
},
```

### <a id="yeoman-test">yeoman测试</a>
```
var helpers = require('yeoman-test')
```
对生成器进行单元测试时，最有用的方法是helper.run()。该方法将返回一个[RunContext](https://github.com/yeoman/yeoman-test/blob/master/lib/run-context.js)实例，您可以在该实例上调用method来设置目录、模拟提示符、模拟参数等等。

有时，您可能希望为生成器构造一个测试场景，以便使用目标目录中的现有内容运行。在这种情况下，您可以使用回调函数调用`inTmpDir()`，如下所示:
```
var path = require('path');
var fs = require('fs-extra');

helpers.run(path.join(__dirname, '../app'))
  .inTmpDir(function (dir) {
    // `dir` is the path to the new temporary directory
    fs.copySync(path.join(__dirname, '../templates/common'), dir)
  })
  .withPrompts({ coffee: false })
  .then(function () {
    assert.file('common/file.txt');
  });
```

如果生成器调用composeWith()，则可能需要模拟那些依赖的生成器。使用# withgenerator()，传递使用#createDummyGenerator()作为第一项的数组，并将模拟生成器的名称空间作为第二项的数组:
```
var deps = [
  [helpers.createDummyGenerator(), 'karma:app']
];
return helpers.run(path.join(__dirname, '../app')).withGenerators(deps);
```

您还可以运行生成器将其作为模块导入。这是有用的，如果源代码的生成器是颠倒。

您将需要提供以下设置运行:
解析:生成器的路径，例如../src/app/index.js
名称空间:生成器的名称空间，例如mygenerator:app
```
var MyGenerator = require('../src/app');

helpers.run(MyGenerator, { 
  resolved: require.resolve(__dirname, '../src/app/index.js'),
  namespace: 'mygenerator:app'
});
```

Yeoman使用生成器相关的断言助手扩展了本机断言模块。您可以在`yeoman-assert`存储库中看到断言助手的完整列表。
```
var assert = require('yeoman-assert');
```
