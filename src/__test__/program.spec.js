import { Command } from 'commander'
import buildProgram from '../program'

describe('program', () => {
  it('should return an instance of Command', () => {
    process.argv = [ 'node', 'notify' ]
    expect(buildProgram()).toBeInstanceOf(Command)
  })

  it('should return a program with parameters', () => {
    const message = 'new message'
    const adapter = 'slack'
    process.argv = [ 'node', 'notify', '-m', message, '-a', adapter ]

    const program = buildProgram()
    const options = program.opts()

    expect(options.message).toEqual(message)
    expect(options.adapter).toEqual(adapter)
  })
})
