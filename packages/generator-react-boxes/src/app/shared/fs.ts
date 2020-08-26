import fs from 'fs'
import path from 'path'
import { flowRight } from "lodash"

export function getSubGeneratorFilenameExculdeApp(): string[] {
  const getGeneratorlist = flowRight([
    (d) => d.filter((filename: string) => filename != 'app'), 
    fs.readdirSync,
    path.join
  ]);
  return getGeneratorlist(__dirname, '..');
}
