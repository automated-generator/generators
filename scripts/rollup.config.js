const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const packagejson = require('../package.json')

const projectName = last(process.argv)


function last(list) {
  return Array.isArray(list) && list[list.length - 1];
}

function relativePath(pathname) {
  return path.resolve(process.cwd(), pathname);
} 

const publishPath = relativePath('packages')
function getPathRelativePublicPath(name) {
  return path.join(publishPath, name);
}

function isExistRelativePublicPath(name) {
  return name && fs.existsSync(getPathRelativePublicPath(name));
}

function getFilePathRelativePublicPath(name) {
  if (isExistRelativePublicPath(name)) {
    return getPathRelativePublicPath(name)
  }
  return null;
}

function readdirSync(dir) {
  try {
    if (fs.existsSync(dir)) {
      return (fs.readdirSync(dir)).map(d => path.join(dir, d));
    }
    return null;
  } catch (error) {
    return null;
  }
}

function getBuildingPackages(pname) {
  const subPackagePath = getFilePathRelativePublicPath(pname)
  return subPackagePath ? [subPackagePath] : readdirSync(publishPath)
}

function createRollupInputOptions(generatorRoot) {
  const inputOptions = {
    external: [
      ...Object.keys(packagejson.dependencies),
      ...Object.keys(packagejson.devDependencies)
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  };

  return function(subgenerator) {
    let getInputDir = getBuildingDir(subgenerator)
    inputOptions.input = getInputDir('index.ts');
    inputOptions.plugins.push(typescript({
      tsConfig: relativePath('tsconfig.json'),
      useTsconfigDeclarationDir: true,
      tsconfigDefaults: {
        compilerOptions: {
          declaration: true,
          declarationDir: path.join(generatorRoot, 'typings')
        },
      },
    }))
    return inputOptions;
  }
}

function createRollupOutputOptions() {
  const outputOptions = {
    format: 'cjs',
    exports: 'default'
  };

  return function (output) {
    outputOptions.file = output;
    return outputOptions;
  }
}

function getBuildingDir(base) {
  return function(filename) {
    return path.join(base, filename)
  }
}

function getBuildingOutput(base) {
  const place = base.replace(/\/(src)\//, '/generators/')
  return path.join(place, 'index.js')
}


async function buildSubGeneratorsFromSubPackage(subgenerator, generatorRoot) {
  const output = getBuildingOutput(subgenerator)
  
  const rollupInputOptions = createRollupInputOptions(generatorRoot)
  const rollupOutputOptions = createRollupOutputOptions()
  const bundle = await rollup.rollup(rollupInputOptions(subgenerator))

  bundle.write(rollupOutputOptions(output))
}

/**
 * 构建子generator的包
 * 
 * @param {*} subpackage 
 */
function subPackageBuild(subpackage) {
  const subGeneratorDis = readdirSync(path.join(subpackage, 'src'));
  if (subGeneratorDis) {
    subGeneratorDis.forEach((subgenerator) => buildSubGeneratorsFromSubPackage(subgenerator, subpackage))
  }
}

function build() {
  const subPackages = getBuildingPackages(projectName);
  subPackages.forEach(subPackageBuild);
}

build();