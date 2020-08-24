import fs from 'fs'
import path from 'path'
import Generator from 'yeoman-generator'
import { flowRight } from 'lodash'
import { REACT_BASE_DEPENDENCIES } from './constants'

const GENERATOR_APP_NAME = 'react-boxes'

export default class GeneratorReactBoxesApp extends Generator {
  /**
   * 除去app之外的所有子generator列表名称
   */
  private _subGeneratorlist: string[] = [];

  /**
   * 所有选项的列表
   */
  private _answers: string[] = [];

  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('Generator react boxes!!!')
    this._subGeneratorlist = this._getSubGeneratorlistOutApp();
  }

  async prompting() {
    const answers = await this.prompt([
      {
        type: 'checkbox',
        name: GENERATOR_APP_NAME,
        choices: this._subGeneratorlist
      }
    ]);
    this._answers = answers[GENERATOR_APP_NAME];
  }

  configuring() {
    this._answers.forEach((answer: string) => {
      this.composeWith(`${GENERATOR_APP_NAME}:${answer}`);
    });
  }

  install() {
    this.yarnInstall(
      REACT_BASE_DEPENDENCIES,
      {
        cwd: this.destinationRoot()
      }
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('javascript/**/*'),
      this.destinationPath()
    )
  }

  private _getSubGeneratorlistOutApp(): string[] {
    const getGeneratorlist = flowRight([
      (d) => d.filter((generaterName: string) => generaterName != 'app'), 
      fs.readdirSync,
      path.join
    ]);
    return getGeneratorlist(__dirname, '..');
  }
}