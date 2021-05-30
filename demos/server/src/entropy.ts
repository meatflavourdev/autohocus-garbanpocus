import { Logger } from '../../../packages/logger/src'
import { Monitor } from '../../../packages/monitor/src'
import { Server } from '../../../packages/server/src'
import { RocksDB } from '../../../packages/rocksdb/src'
import { Throttle } from '../../../packages/throttle/src'

const server = Server.configure({
  port: 5001,
  extensions: [
    new Logger(),
    new Monitor(),
    new RocksDB({ path: './database' }),
    new Throttle(),
  ],

  async onConnect(data) {
    await new Promise((resolve, reject) => setTimeout(() => {
      // @ts-ignore
      reject()
      // @ts-ignore
      // resolve()
    }, 1337))
  },
})

server.listen()
