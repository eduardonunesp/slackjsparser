'use strict';

const env = process.env.NODE_ENV || 'development';
const token = process.env.TOKEN || 'your_token';
const koa = require('koa');
const router = require('koa-router');
const Promise = require('bluebird');
const Sandbox = require('sandbox');
const app = koa();
const PORT = process.env.PORT || 9000;

app.use(require('koa-better-ratelimit')({
  duration: 1000*60*1, max: 1000, blacklist: []
}));

app.use(require('koa-body')())
app.use(require('koa-logger')());

app.use(require('koa-compress')({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.on('error', function(err, ctx){
  console.error('server error', err, ctx);
});

const executeSandboxed = function(code) {
  return new Promise(function(resolve) {
    let s = new Sandbox();
    s.run(code, (res) => resolve(res.result));
  })
}

const api = router();
api.post('/', function *() {
  if (this.request.body.token === token || env === 'development') {
    const result = yield executeSandboxed(this.request.body.text);
    const out = `User ${this.request.body.user_name} snippet: \n\n${this.request.body.text}\n\nresult: \n\n${result}`

    this.body = out;
  } else {
    this.body = "Ops ... looks like you aren't a team member";
  }
});

api.get('/', function *() {
  this.body = 'Hi :D';
});

app.use(api.routes());

app.listen(PORT, function(err) {
  if (err) console.error(err);
  else console.log('Running Server');
});