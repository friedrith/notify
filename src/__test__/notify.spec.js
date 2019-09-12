import https from 'https'

import notifier from 'node-notifier'

import notify from '../notify'

jest.mock('node-notifier', () => ({
  notify: jest.fn(),
}))

jest.mock('https', () => ({
  request: jest.fn((url, config, callback) => {
    callback({ on: jest.fn((a, b) => b()) })
    return { write: jest.fn(), end: jest.fn() }
  }),
}))

describe('notify', () => {
  it('should return a rejected promise when the adapter is not implemented', async () => {
    const notification = notify({ adapter: 'not implemented' })

    await expect(notification).rejects.toContain(
      'Adapter "not implemented" is not handled. Please use one of the following adapters: native,slack'
    )
  })

  it('should return a rejected promise when the adapter is slack without webhook provided', async () => {
    const notification = notify({ adapter: 'slack' })

    await expect(notification).rejects.toContain(
      'Empty webhook. Please provide a webhook to use adapter slack'
    )
  })

  it('should use node-notify', async () => {
    const message = 'MESSAGE'

    await notify({ adapter: 'native', message })

    expect(notifier.notify).toHaveBeenCalledWith({ title: 'notify', message })
  })

  it('should call slack api', async () => {
    const message = 'MESSAGE'
    const webhook = 'WEBHOOK'

    await notify({ adapter: 'slack', message, webhook })

    expect(https.request).toHaveBeenCalled()
  })
})
