import Generator from 'yeoman-generator'
import { REACT_ROUTER_DEPENDENCIES, THEME_ROUTER_NAME } from './constants';

export default class GeneratorReactBoxesRouter extends Generator {
  private themeRouter!: string;

  constructor(args: string | string[], opts: Generator.GeneratorOptions) {
    super(args, opts);

    this.option('typescript', {
      type: Boolean,
      alias: '-t',
      description: 'use typescript language'
    });

    this.option('name', {
      type: String,
      alias: '-n',
      description: 'slected has existed themes'
    });
  }

  initializing() {
    this.log('react-boxes:router')

  }

  async prompting() {
    if (this.options.name) {
      this.themeRouter = this.options.name;
      return;
    }

    const answer = await this.prompt({
      type: 'list',
      name: THEME_ROUTER_NAME,
      choices: [
        { name: 'react-dom-router', value: 'default' }
      ]
    });
    this.themeRouter = answer[THEME_ROUTER_NAME];
  }

  install() {
    //this.yarnInstall(REACT_ROUTER_DEPENDENCIES)
  }

  /**
   * - 读取App.js(js,jsx,ts,tsx)的内容
   * - 对其进行ast处理
   *  - 导入路由
   *  - 根节点外层添加路由器
   * - 返回覆盖当前的App.js文件
   */
  writing() {

  }

  end() {
    this.config.set(THEME_ROUTER_NAME, this.themeRouter)
  }
}