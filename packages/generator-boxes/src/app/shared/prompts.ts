import Generator from 'yeoman-generator'
import { BS_ARCHITECTURE, CS_ARCHITECTURE, NODE_ARCHITECTURE, ARCHITECTURE_NAME } from "./constants";

export interface BoxesPromptOptions {
  [ARCHITECTURE_NAME]: string;
}

export function choiceForArchitecture(instance: Generator & BoxesPromptOptions) {
  const choices = [
    { name: 'B/S', value: BS_ARCHITECTURE },
    { name: 'C/S', value: CS_ARCHITECTURE },
    { name: 'NODE', value: NODE_ARCHITECTURE }
  ];
  const archiitecturePrompt: Generator.Question = {
    type: 'list',
    name: ARCHITECTURE_NAME,
    message: 'Select the feature for your architecture!',
    choices,
    default: BS_ARCHITECTURE,
    when: (response: any) => { console.log(response); return true }
  };

  return instance.prompt(archiitecturePrompt).then(answer => {
    console.log(answer)
  })
}