
import Generator from 'yeoman-generator'

export const NAME_OPTION = 'name'
export const TYPESCRIPT_OPTION = 'typescript'

export function useOptions(generator: Generator) {
  generator.option(TYPESCRIPT_OPTION, {
    type: Boolean,
    alias: '-t',
    description: 'use typescript language'
  });

  generator.option(NAME_OPTION, {
    type: String,
    alias: '-n',
    description: 'slected has existed themes'
  });
}