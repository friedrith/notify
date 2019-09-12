import path from 'path'
import fs from 'fs'
import os from 'os'

export const getFileConfiguration = configFilename => {
  try {
    const absoluteFilename = path.resolve(process.cwd(), configFilename)
    return JSON.parse(fs.readFileSync(absoluteFilename, 'utf8'))
  } catch (e) {
    return {}
  }
}

export const removeEmptyOptions = config =>
  Object.keys(config).reduce(
    (acc, option) =>
      config[option] === undefined ? acc : { ...acc, [option]: config[option] },
    {}
  )

export const getDefaultConfigurationFilename = () =>
  path.resolve(os.homedir(), '.notify')
