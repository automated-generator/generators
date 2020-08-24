import Generator from 'yeoman-generator'

export default class GeneratorReactBoxesApp extends Generator {
  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('Generator react boxes!!!')
  }

  prompting() {
    this.prompt([
      { 
        type: 'list',
        name: 'babel',
        choices: [
          'babel-01',
          'babel-02'
        ]
      }
    ])
  }
}