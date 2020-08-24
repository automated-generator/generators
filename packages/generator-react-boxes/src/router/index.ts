import Generator from 'yeoman-generator'
import { REACT_ROUTER_DEPENDENCIES } from './constants';

export default class GeneratorReactBoxesRouter extends Generator {
  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('react-boxes:router')
  }

  install() {
    this.yarnInstall(REACT_ROUTER_DEPENDENCIES)
  }
}