/*
 * @Author: wukangjun
 * @Date: 2020-08-27 21:52:28
 * @Description: write something
 */ 
import helpers from 'yeoman-test'
import GeneratorReactBoxesApp from '../src/app'

describe('generator-react-boxes:app', () => {

    // 下载templates默认模版
    // 对应的依赖插件
    describe('下载安装自己的模版和插件', () => {
        let runResult = null;
        beforeAll(() => {
            return helpers.create(GeneratorReactBoxesApp)
                .run()
                .then(result => {
                    runResult = result;
                })
        });

        aflterAll(() => runResult.cleanup());


        it('安装对应插件', () => {
            
        })
    })
});
