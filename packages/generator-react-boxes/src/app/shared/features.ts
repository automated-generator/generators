
export class ReactGeneratorFeatures {
  static Babel = 'babel';

  static Language = 'language';

  static Router = 'router';

  static State = 'state';

  static LinterWithFormatter = 'linter_formatter';

  static UnitTesting = 'unit_testing';

  static getName() {
    return 'reactGeneratorFeatures'
  }
}

export class Languages {
  static Typescript = 'typescript';

  static default = 'javascript';
}

export class DataStates {
  static Redux = 'redux';

  static Flux = 'flux';

  static Mobx =  'mobx';
}

export class RouterThemes {
  static default = 'router';

  static theme1Router = 'theme1-router'
}