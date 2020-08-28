/*
 * @Author: wukangjun
 * @Date: 2020-08-27 21:52:28
 * @Description: write something
 */ 

import path from 'path'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import extendsFS from 'fs-extra'
import GeneratorReactBoxesApp from '../src/app'

describe('generator-react-boxes:app', () => {
    const directories = [
        'config',
        'public',
        'scripts',
        'src',
        '.gitignore',
        'package.json',
        'README.md'
    ]

    describe('默认配置', () => {
        let runResult = null;
        beforeAll(() => {
            return helpers.create(GeneratorReactBoxesApp)
                .inTmpDir(dir => {
                    extendsFS.copySync(path.join(__dirname, '../src/app/templates'), dir)
                })
                .run()
                .then(result => {
                    runResult = result;
                })
        })

        afterAll(() => runResult.cleanup())
    
        // 下载templates默认模版
        // 对应的依赖插件
        // 验证模块的外层文件是否存在
        it('添加对应的javascript模版', () => {
            assert.file(directories)
        });
    });

    describe('router配置', () => {
        let runResult = null;
        beforeAll(() => {
            return helpers.create(GeneratorReactBoxesApp)
                .withOptions({
                    router: true
                })
                .run()
                .then(result => {
                    runResult = result
                })
        })

        afterAll(() => runResult.cleanup())

        it('写入.yo-rc.json配置', () => {
            runResult.assertFile('.yo-rc.json');
            runResult.assertFileContent([
                ['.yo-rc.json', /"router": true/]
            ])
        });

        it('composeWith router Generator', () => {
            const RouterGenerator = runResult.mockedGenerators['react-boxes:router'];
            assert(RouterGenerator.calledOnce);
        })
    });

    describe('react-state配置', () => {
        let runResult = null;
        beforeAll(() => {
            return helpers.create(GeneratorReactBoxesApp)
                .withOptions({
                    state: true
                })
                .run()
                .then(result => {
                    runResult = result
                })
        })

        afterAll(() => runResult.cleanup())

        it('写入.yo-rc.json配置', () => {
            runResult.assertFile('.yo-rc.json');
            runResult.assertFileContent([
                ['.yo-rc.json', /"state": true/]
            ])
        });

        it('composeWith state Generator', () => {
            const RouterGenerator = runResult.mockedGenerators['react-boxes:state'];
            assert(RouterGenerator.calledOnce);
        })
    })

});
