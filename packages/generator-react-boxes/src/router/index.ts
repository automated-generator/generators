import Generator from 'yeoman-generator'
import { REACT_ROUTER_DEPENDENCIES } from './constants';

export default class GeneratorReactBoxesRouter extends Generator {
  private _answer!: string;

  constructor(args: string | string[], opts: Generator.GeneratorOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('react-boxes:router')
  }

  async prompting() {
    const answer = await this.prompt({
      type: 'list',
      name: 'themeRouter',
      choices: [
        { name: 'react-dom-router', value: 'default' },
        { name: 'react-theme-1', value: 'theme1' }
      ]
    });
    this._answer = answer.themeRouter;
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
}