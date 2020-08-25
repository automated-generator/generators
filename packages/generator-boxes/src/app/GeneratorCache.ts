/*
 * @Author: wukangjun
 * @Date: 2020-08-25 21:01:59
 * @Description: write something
 */ 
import { CompositionOptions, GeneratorConstructor } from 'yeoman-generator'

class SubGenerator implements CompositionOptions {
  constructor(
    readonly path: string,
    readonly Generator: GeneratorConstructor
  ) {}
}

export default class GeneratorCache {
  private loadGeneratorCache = new Map<string, SubGenerator>();

  static of (framework: string) {
    return new GeneratorCache().get(framework);
  }

  public get(name: string) {
    const subGenerator = this.loadGeneratorCache.get(name);
    if (subGenerator) {
      return subGenerator;
    } else {
      return this._saveSubGenerator(name);
    }
  }

  private _saveSubGenerator(name: string) {
    const path: string = `generator-${name}-boxes/generators/app`
    const Generator:GeneratorConstructor = require(`${path}/index.js`)
    const subGenerator = new SubGenerator(require.resolve(path), Generator)

    this.loadGeneratorCache.set(name, subGenerator)
    return subGenerator
  }
}
