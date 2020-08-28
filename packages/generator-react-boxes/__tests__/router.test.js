import helpers from 'yeoman-test'
import assets from 'yeoman-assert'
import GeneratorReactBoxesRouter from '../src/router'
import { THEME_ROUTER_NAME } from '../src/router/constants'

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

  })
})