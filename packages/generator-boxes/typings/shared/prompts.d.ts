import Generator from 'yeoman-generator';
import { ARCHITECTURE_NAME, BS_PLATFORM_NAME, CS_PLATFORM_NAME, FRAMEWORK_CLIENT } from "./constants";
export declare class BoxesPromptDefaultOptions extends Generator {
    [ARCHITECTURE_NAME]: string;
    [BS_PLATFORM_NAME]: string;
    [CS_PLATFORM_NAME]: string;
    [FRAMEWORK_CLIENT]: string;
    getPromptOptions(): {
        architecture: string;
        bs_platform: string;
        cs_platform: string;
        client_framework: string;
    };
}
export declare function choiceForArchitecture(instance: BoxesPromptDefaultOptions): () => Promise<void>;
export declare function choiceForBSPlatform(instance: BoxesPromptDefaultOptions): () => Promise<void>;
export declare function choiceForCSPlatform(instance: BoxesPromptDefaultOptions): () => Promise<void>;
export declare function choiceForDefaultFramework(instance: BoxesPromptDefaultOptions): () => Promise<void>;
export declare function logAllSelectedinfo(instance: BoxesPromptDefaultOptions): () => void;
