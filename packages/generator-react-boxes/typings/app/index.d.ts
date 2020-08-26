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
    constructor(args: string | string[], opts: Generator.GeneratorOptions);
    initializing(): void;
    get prompting(): {
        entryPrompt: () => Promise<void>;
        choiceLanguage: () => Promise<void>;
        choiceRouter: () => Promise<void>;
    };
    configuring(): void;
    install(): void;
    writing(): void;
    private _getSubGeneratorlistOutApp;
}
