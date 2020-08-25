import Generator from 'yeoman-generator'
import { choiceForArchitecture, BoxesPromptDefaultOptions, choiceForBSPlatform, choiceForCSPlatform, choiceForDefaultFramework, logAllSelectedinfo } from './shared/prompts';

export default class GeneratorBoxesApp extends BoxesPromptDefaultOptions {

  constructor(args: string | string[], opts: Generator.CompositionOptions) {
    super(args, opts);
  }

  initializing() {
    this.log('Generator boxes!!!')
  }

  get prompting() {
    return {
      architecture: choiceForArchitecture(this),
      platform_bs: choiceForBSPlatform(this),
      platform_cs: choiceForCSPlatform(this),
      framework_client: choiceForDefaultFramework(this)
    }
  }

  configuration() {
    logAllSelectedinfo(this)
  }
}