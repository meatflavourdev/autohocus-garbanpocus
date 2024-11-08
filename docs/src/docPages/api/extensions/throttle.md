# Throttle

## toc

## Introduction

This extension throttles connection attempts and bans ip-addresses if it crosses the configured threshold.

Make sure to register it **before** any other extensions!

## Installation

Configure your `.npmrc` to look for packages with the @hocuspocus prefix in our private registry, [as described here](/installation#2-installation).

Now you should be able to install the Monitor package with:

```bash
# with npm
npm install @hocuspocus/extension-throttle

# with Yarn
yarn add @hocuspocus/extension-throttle
```

## Configuration

```js
import { Server } from '@hocuspocus/server'
import { Throttle } from '@hocuspocus/extension-throttle'

const server = Server.configure({
  extensions: [
    new Throttle({
      // [optional] allows up to 15 connection attempts per ip address per minute.
      // set to null or false to disable throttling, defaults to 15
      throttle: 15,

      // [optional] bans ip addresses for 5 minutes after reaching the threshold
      // defaults to 5
      banTime: 5,
    }),
  ],
})

server.listen()
```
