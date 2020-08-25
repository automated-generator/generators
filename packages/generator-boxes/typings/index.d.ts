import Generator from 'yeoman-generator';
import { BoxesPromptDefaultOptions } from './shared/prompts';
export default class GeneratorBoxesApp extends BoxesPromptDefaultOptions {
    constructor(args: string | string[], opts: Generator.CompositionOptions);
    initializing(): void;
    get prompting(): {
        architecture: () => Promise<void>;
        platform_bs: () => Promise<void>;
        platform_cs: () => Promise<void>;
        framework_client: () => Promise<void>;
    };
    configuration(): void;
}
