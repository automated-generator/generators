/*
 * @Author: wukangjun
 * @Date: 2020-08-27 21:52:28
 * @Description: write something
 */
import helpers from 'yeoman-test'
import assets from 'yeoman-assert'
import GeneratorReactBoxesRouter from '../src/router'

/**
 * yo react-boxes:router
 * options
 *  -n(--name): default theme1
 *  -t(--typescript): javascript
 */
describe('react-boxes:router', () => {
  /**
   * 默认配置
   * -n: default默认路由react-router-dom
   * -t: 默认为javascript(值为空)
   */
  describe('default options', () => {
    let runResult = null;
    beforeAll(() => {
      return helpers.create(GeneratorReactBoxesRouter)
        .withOptions({
          name: 'default'
        })
        .run()
        .then(result => {
          runResult = result;
        });
    });

    afterAll(() => runResult.cleanup())

    /**
     * 默认配置-测试用例1
     *  是否写入当前项目下.yo-rc.json文件中
     */
    it('选项写入到.yo-rc.json文件', () => {
      runResult.assertFileContent([
        ['.yo-rc.json', /"themeRouterName": "default"/]
      ]);
      runResult.assertFile('.yo-rc.json');
    });

    /**
     * 默认配置-测试用例2
     *  默认react-dom-router模版是否写入项目
     */
    it('react-dom-router模版', () => {
      runResult.assertFileContent([
        ['package.json', /"react-dom-router"/]
      ]);
      runResult.assertFileContent([
        ['src/App.jsx', /"react-dom-router"/]
      ])
    })

  })
})