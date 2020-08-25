import Generator from 'yeoman-generator';
export default class GeneratorReactBoxesApp extends Generator {
    /**
     * 除去app之外的所有子generator列表名称
     */
    private _subGeneratorlist;
    /**
     * 所有选项的列表
     */
    private _answers;
    constructor(args: string | string[], opts: Generator.CompositionOptions);
    initializing(): void;
    prompting(): Promise<void>;
    configuring(): void;
    install(): void;
    writing(): void;
    private _getSubGeneratorlistOutApp;
}
