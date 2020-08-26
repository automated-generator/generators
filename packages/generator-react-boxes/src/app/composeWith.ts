import Generator from 'yeoman-generator'
import { categoryChoices } from './prompts'
import { GENERATOR_NAMESPACE_NAME } from './shared/constants';
import { getSubGeneratorFilenameExculdeApp } from './shared/fs';

export function composeWithBynamespace(context: Generator) {
  const subGeneratorFilename = getSubGeneratorFilenameExculdeApp();

  return (namespace: string) => {
    const composeWithName = `${GENERATOR_NAMESPACE_NAME}:namespace`;
    if (subGeneratorFilename.includes(namespace)) {
      context.composeWith(composeWithName);
    } else {
      throw new Error(`the namespace(${composeWithName}) is not exist in the generators of ${GENERATOR_NAMESPACE_NAME}`);
    }
  }
}

export function dynamicComposeWithBySlected(context: Generator) {
  return () => {
    categoryChoices
      .filter(category => !category.independent)
      .map(category => category.value)
      .filter(Boolean)
      .forEach(composeWithBynamespace(context))
  }
}

