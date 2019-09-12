import {
  getFileConfiguration,
  removeEmptyOptions,
  getDefaultConfigurationFilename,
} from '../config'

import fs from 'fs'

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => 'configuration'),
}))

jest.mock('os', () => ({
  homedir: jest.fn(() => '/home'),
}))

describe('getFileConfiguration', () => {
  it('should return empty config when content is not there', () => {
    fs.readFileSync.mockImplementationOnce(() => {
      throw new Error()
    })

    const config = getFileConfiguration('filename')

    expect(config).toEqual({})
  })

  it('should return empty config when content is not a json', () => {
    fs.readFileSync.mockReturnValue('configuration')

    const config = getFileConfiguration('filename')

    expect(config).toEqual({})
  })

  it('should return the config if the configuration file is present and is a json', () => {
    fs.readFileSync.mockReturnValue('{"key1": "value1", "key2": 1}')
    const config = getFileConfiguration('filename')

    expect(config).toEqual({ key1: 'value1', key2: 1 })
  })
})

describe('removeEmptyOptions', () => {
  it('should return an object without undefined values', () => {
    const object = { key1: 'value1', key2: 1 }

    const options = removeEmptyOptions({ ...object, key3: undefined })

    expect(options).toEqual(object)
  })
})

describe('getDefaultConfigurationFilename', () => {
  it('should return filename is the home directory', () => {
    const filename = getDefaultConfigurationFilename()

    expect(filename).toEqual('/home/.notify')
  })
})
