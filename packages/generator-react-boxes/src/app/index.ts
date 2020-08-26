import fs from 'fs'
import path from 'path'
import { flowRight } from 'lodash'
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
      dynamicComposeWithBySlected: dynamicComposeWithBySlected(this)
    }
  }

  install() {
    this.yarnInstall(
      REACT_BASE_DEPENDENCIES
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('javascript/**/*'),
      this.destinationPath()
    );
  }
}