#!/usr/bin/env node

import { Command } from 'commander'
import path from 'path'
import fs from 'fs'
import os from 'os'

import notify from './notify'

import { version, description } from '../package'

const loadFileConfiguration = configFilename => {
  try {
    const absoluteFilename = path.resolve(process.cwd(), configFilename)
    return JSON.parse(fs.readFileSync(absoluteFilename, 'utf8'))
  } catch (e) {
    return {}
  }
}

const removeEmptyOptions = config =>
  Object.keys(config).reduce(
    (acc, option) =>
      config[option] === undefined ? acc : { ...acc, [option]: config[option] },
    {}
  )

const program = new Command()

program
  .description(description)
  .version(version)
  .option('-d, --debug', 'output extra debugging')
  .option(
    '-a, --adapter <adapter>',
    'The adapter to use to notify you when the process is finished. If no adapter is provided as argument, the adapter is configuration file is used.'
  )
  .option(
    '-m, --message <message>',
    'The message to display in the notification. If no message is provided as argument, the message is configuration file is used.'
  )
  .option(
    '--webhook <url>',
    'The url to request to notify using slack adapter.'
  )
  .option(
    '-c, --config <filename>',
    'The path to the configuration file to use.',
    path.resolve(os.homedir(), '.notify')
  )

program.parse(process.argv)

const config = {
  adapter: 'native',
  message: 'Task is finished!',
  ...loadFileConfiguration(program.config),
  ...removeEmptyOptions(program.opts()),
}

notify(config).catch(error => {
  console.error(error)
  process.exit(2)
})
