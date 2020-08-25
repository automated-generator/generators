import { CompositionOptions, GeneratorConstructor } from 'yeoman-generator';
declare class SubGenerator implements CompositionOptions {
    readonly path: string;
    readonly Generator: GeneratorConstructor;
    constructor(path: string, Generator: GeneratorConstructor);
}
export default class GeneratorCache {
    private loadGeneratorCache;
    static of(framework: string): SubGenerator;
    get(name: string): SubGenerator;
    private _saveSubGenerator;
}
export {};
