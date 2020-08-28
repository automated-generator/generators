/*
 * @Author: wukangjun
 * @Date: 2020-08-28 18:00:17
 * @Description: write something
 */
import Generator from 'yeoman-generator'
import { REACT_BASE_DEPENDENCIES } from './shared/constants'
import { choiceForFeatures, choiceForLanguages, choiceForRouter } from './prompts'
import { dynamicComposeWithBySlected } from './composeWith'

export default class GeneratorReactBoxesApp extends Generator {
  constructor(args: string | string[], opts: Generator.GeneratorOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('Generator react boxes!!!');
  }

  get prompting() {
    return {
      entryPrompt: choiceForFeatures(this),
      choiceLanguage: choiceForLanguages(this),
      choiceRouter: choiceForRouter(this)
    }
  }

  get default() {
    return {
      //dynamicComposeWith: dynamicComposeWithBySlected(this)
    }
  }

  install() {
    this.yarnInstall(
      REACT_BASE_DEPENDENCIES
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('javascript'),
      this.destinationPath()
    );
  }
}