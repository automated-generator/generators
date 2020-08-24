import Generator from 'yeoman-generator'

export default class GeneratorReactBoxesApp extends Generator {
  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('Generator react boxes!!!')
  }

  async prompting() {
    await this.prompt([])
  }
}