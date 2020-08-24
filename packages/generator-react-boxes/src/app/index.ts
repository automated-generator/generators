import Generator from 'yeoman-generator'

export default class GeneratorReactBoxesApp extends Generator {
  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('project initialzing!')
  }

  prompting() {
    
  }
}