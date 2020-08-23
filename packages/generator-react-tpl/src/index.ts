/*
 * @Author: wukangjun
 * @Date: 2020-08-23 00:35:52
 * @Description: write something
 */ 
import Generator from 'yeoman-generator'

export default class GeneratorReactTpl extends Generator {
    private promptData: any;

    constructor(args: string[], options: any) {
        super(args, options);
    }

    prompting() {
        this.promptData = this.prompt([
            {
                
            }
        ])
    }
}