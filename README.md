#SLACK JS PARSER
---
### HEROKU DEPLOY
You can easily deploy into a heroku instance, you only need to set two env vars:

* `NODE_ENV` Set to `PRODUCTION`
* `TOKEN` It's your Slack Slash Command token, you can find this token when create/edit a Slash Command.

### HOW TO USE
The idea is very simple you can execute a JS command inline into the a Slack Channel and get the result after send the command, for instance: 

`/js [1,2,3].reduce((a, b) => a +b)`

The result will be:

```
User eduardonunesp snippet:

[1,2,3].reduce((a, b) => a +b)

result:

6
```

### SANDBOXED JS
The Javascript will be executed inside a sandbox, thanks to NPM module [Sandbox](https://www.npmjs.com/package/sandbox).
