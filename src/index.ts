import Koa from 'koa'
import { Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import bodyParser from 'koa-body'
import session from 'koa-session'
import router from './routes'
import createSockets from './sockets'

const app = new Koa()
const server = new HttpServer(app.callback())

// session
app.keys = ['sercet', 'new sercet']
app.use(session({ key: 'sercet', maxAge: 7200000 }, app))

// body parser
app.use(bodyParser({ multipart: true }))

// router
app.use(router.routes())

// websocket
const wss = new WebSocketServer({ server })
createSockets(wss)

server.listen(5000)

export default server
