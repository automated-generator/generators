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

