/*
 * @Author: wukangjun
 * @Date: 2020-08-25 21:01:59
 * @Description: write something
 */ 
import Generator from 'yeoman-generator'
import { choiceForArchitecture, BoxesPromptDefaultOptions, choiceForBSPlatform, choiceForCSPlatform, choiceForDefaultFramework, logAllSelectedinfo } from './shared/prompts';
import GeneratorCache from './GeneratorCache';
import { FRAMEWORK_CLIENT } from './shared/constants';

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
    const currentFramename = this[FRAMEWORK_CLIENT];
    logAllSelectedinfo(this);

    // 获取当前的框架名称
    if (currentFramename) {
      this.composeWith(
        GeneratorCache.of(currentFramename),
        this.getPromptOptions());
    }
  }
}