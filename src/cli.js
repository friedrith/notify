#!/usr/bin/env node

import notify from './notify'
import buildProgram from './program'
import { getFileConfiguration, removeEmptyOptions } from './native'

const program = buildProgram()

const config = {
  adapter: 'native',
  message: 'Task is finished!',
  ...getFileConfiguration(program.config),
  ...removeEmptyOptions(program.opts()),
}

notify(config).catch(error => {
  console.error(error) // eslint-disable-line no-console
  process.exit(2)
})
