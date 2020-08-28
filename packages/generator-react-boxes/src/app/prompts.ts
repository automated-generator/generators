import Generator from 'yeoman-generator'
import { Languages, ReactGeneratorFeatures, RouterThemes } from './shared/features'

const categoryDefaultChoices = [
  ReactGeneratorFeatures.Babel,
  ReactGeneratorFeatures.Language
];

/**
 * subGenerator
 */
export const categoryChoices = [
  // { name: 'Babel', value: ReactGeneratorFeatures.Babel, independent: true },
  { name: 'Language', value: ReactGeneratorFeatures.Language, independent: true },
  { name: 'Router', value: ReactGeneratorFeatures.Router },
  { name: 'State', value: ReactGeneratorFeatures.State },
  { name: 'Linter/Formatter', value: ReactGeneratorFeatures.LinterWithFormatter },
  // { name: 'Unit Testing', value: ReactGeneratorFeatures.UnitTesting }
];

export function choiceForFeatures(context: Generator) {
  const name = ReactGeneratorFeatures.getName();
  return () => context.prompt({
    type: 'checkbox',
    name,
    choices: categoryChoices,
    default: categoryDefaultChoices
  }).then((answer) => {
    if (Array.isArray(answer[name])) {
      ((answer[name]) as string[]).forEach((prop: string) => {
        context.config.set(prop, prop);
      });
    }
  });
}

export function choiceForLanguages(context: Generator) {
  const name = ReactGeneratorFeatures.Language;
  const choices = [
    { name: 'Typescript', vlaue: Languages.Typescript },
    { name: 'default/javascript', value: Languages.default }
  ];

  return () => context.prompt({
    type: 'list',
    name,
    default: Languages.default,
    choices,
    when: () => context.config.get(name)
  }).then(saveKeyword(name, context));
}

export function choiceForRouter(context: Generator) {
  const name = ReactGeneratorFeatures.Router;
  const choices = [
    { name: 'react-dom-router', value: RouterThemes.default },
    { name: 'theme1-router', value: RouterThemes.theme1Router }
  ];

  return () => context.prompt({
    type: 'list',
    name,
    default: RouterThemes.default,
    choices,
    when: () => context.config.get(name)
  }).then(saveKeyword(name, context))
}

function saveKeyword(name: string, context: Generator) {
  return (answer: { [x: string]: {}; }) => {
    context.config.set(name, answer[name]);
  }
}