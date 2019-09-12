import { Command } from 'commander'
import { version, description } from '../package'
import { getDefaultConfigurationFilename } from './config'

export default () =>
  new Command()
    .description(description)
    .version(version)
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
      getDefaultConfigurationFilename()
    )
    .parse(process.argv)
