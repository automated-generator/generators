import Generator from 'yeoman-generator'
import {
  BS_ARCHITECTURE,
  CS_ARCHITECTURE,
  NODE_ARCHITECTURE,
  ARCHITECTURE_NAME,
  PC_PLATFORM,
  H5_PLATFORM,
  BS_PLATFORM_NAME,
  FLUTTER_PLATFORM,
  MINI_WECHAT_PLATFORM,
  CS_PLATFORM_NAME,
  REACT_FRAMEWORK,
  VUE_FRAMEWORK,
  VUE_3_FRAMEWORK, 
  FRAMEWORK_CLIENT} from "./constants";

export class BoxesPromptDefaultOptions extends Generator {
  [ARCHITECTURE_NAME]: string;
  [BS_PLATFORM_NAME]: string;
  [CS_PLATFORM_NAME]: string;
  [FRAMEWORK_CLIENT]: string;

  getPromptOptions() {
    return {
      architecture: this[ARCHITECTURE_NAME],
      bs_platform: this[BS_PLATFORM_NAME],
      cs_platform: this[CS_PLATFORM_NAME],
      client_framework: this[FRAMEWORK_CLIENT]
    }
  }
}

export function choiceForArchitecture(instance: BoxesPromptDefaultOptions) {
  const choices = [
    { name: 'B/S', value: BS_ARCHITECTURE },
    { name: 'C/S', value: CS_ARCHITECTURE },
    { name: 'NODE', value: NODE_ARCHITECTURE }
  ];

  return () => instance.prompt({
    type: 'list',
    name: ARCHITECTURE_NAME,
    message: 'Select the feature for your architecture!',
    choices,
    default: BS_ARCHITECTURE,
  }).then(answer => {
    instance[ARCHITECTURE_NAME] = answer[ARCHITECTURE_NAME];
  });
}

export function choiceForBSPlatform(instance: BoxesPromptDefaultOptions) {
  const choices = [
    { name: 'PC', value: PC_PLATFORM },
    { name: 'H5', value: H5_PLATFORM }
  ];
  return () => instance.prompt({
    type: 'list',
    name: BS_PLATFORM_NAME,
    message: 'Which Platform would you like to use for the client?',
    choices,
    when: () => instance[ARCHITECTURE_NAME] === BS_ARCHITECTURE
  }).then(answer => {
    instance[BS_PLATFORM_NAME] = answer[BS_PLATFORM_NAME];
  });
}

export function choiceForCSPlatform(instance: BoxesPromptDefaultOptions) {
  const choices = [
    { name: 'flutter', value: FLUTTER_PLATFORM },
    { name: 'miniprogram/wechat', value: MINI_WECHAT_PLATFORM }
  ];
  return () => instance.prompt({
    type: 'list',
    name: CS_PLATFORM_NAME,
    message: 'Which Platform would you like to use for the client?',
    choices,
    when: () => instance[ARCHITECTURE_NAME] === CS_ARCHITECTURE
  }).then(answer => {
    instance[CS_PLATFORM_NAME] = answer[CS_PLATFORM_NAME]
  })
}

export function choiceForDefaultFramework(instance: BoxesPromptDefaultOptions) {
  const choices = [
    { name: 'react', value: REACT_FRAMEWORK },
    { name: 'vue', value: VUE_FRAMEWORK },
    { name: 'vue3', value: VUE_3_FRAMEWORK }
  ];
  return () => instance.prompt({
    type: 'list',
    name: FRAMEWORK_CLIENT,
    choices,
    message: `Which framework would you like to use for the client?`,
    when: () => !!instance[BS_PLATFORM_NAME]
  }).then(answer => {
    instance[FRAMEWORK_CLIENT] = answer[FRAMEWORK_CLIENT];
  })
}

export function logAllSelectedinfo(instance: BoxesPromptDefaultOptions) {
  instance.log(`
    architecture(体系结构): ${instance[ARCHITECTURE_NAME]};
    platform(平台): ${instance[BS_PLATFORM_NAME] || instance[CS_PLATFORM_NAME]};
    framework(框架): ${instance[FRAMEWORK_CLIENT]}
  `);
}