import Generator from 'yeoman-generator'
import { choiceForArchitecture, BoxesPromptOptions } from './shared/prompts';
import { ARCHITECTURE_NAME } from './shared/constants';

export default class GeneratorBoxesApp extends Generator implements BoxesPromptOptions {
  [ARCHITECTURE_NAME]: string;
  
  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('Generator boxes!!!')
  }

  prompting() {
    return {
      architecturePrompting: choiceForArchitecture(this)
    }
  }
}