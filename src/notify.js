import https from 'https'
import notifier from 'node-notifier'
import { name } from '../package'

import adapters, { NATIVE, SLACK } from './config.adapters'

const adaptersList = Object.values(adapters).join(',')

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
}

export default ({ adapter, message, webhook }) =>
  new Promise((resolve, reject) => {
    if (adapter === NATIVE) {
      notifier.notify({
        title: name,
        message,
      })
      resolve()
    } else if (adapter === SLACK) {
      if (!webhook) {
        throw 'Empty webhook. Please provide a webhook to use adapter slack'
      }

      const request = https.request(webhook, requestConfig, res => {
        res.on('end', () => resolve())
      })
      request.write(JSON.stringify({ text: message }))
      request.end()
    } else {
      reject(
        `Adapter "${adapter}" is not handled. Please use one of the following adapters: ${adaptersList}`
      )
    }
  })
