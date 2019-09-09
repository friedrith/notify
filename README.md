# notify

A easy-to-use command line interface to notify you when a very long terminal process is finished.

## How to install

## How to use?

```bash
$ <command to wait> ; notify

$ notify -h # for help
```

## How to configure?

You can customize the notification on the fly

```bash
$  <command to wait> ; notify --adapter native --message "Customized message"
```

You can also use a configuration file :

```json
{
  "adapter": "native",
  "message": "Customized message"
}
```

By default, **notify** tries to load configuration file located in _/home/<user\>/.notify_ but you can specify the path:

```bash
$  <command to wait> ; notify --config <path>
```

### Adapters

Adapters are the way to display the notification. By default, only the native os notification systems are enabled but
you can setup new adapters like Slack for example.

> Do not hesitate to propose new adapters like Microsoft team, facebook, sms, etc.

#### Slack

The first step is to [create an Slack app on your slack workspace](https://api.slack.com/docs/slack-button#register_your_slack_app) and to authorize **incoming webhooks**. You should get a webhook url.

Then

```bash
$  <command to wait> ; notify --adapter slack --webhook <webhook>
```

or in your configuration file :

```json
{
  "adapter": "slack",
  "webhook": "<webhook>"
}
```
