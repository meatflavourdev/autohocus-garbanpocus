<template>
  <div>
    <p>Status: {{ status }}, Synced: {{ client ? client.synced : null }}</p>

    <button @click="client.connect()">
      connect
    </button>
    <button @click="client.disconnect()">
      disconnect
    </button>

    <div v-if="editor">
      <editor-content :editor="editor" />
    </div>

    <div v-if="editor2">
      <editor-content :editor="editor2" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
// import { WebsocketProvider } from 'y-websocket'
import { HocuspocusClient } from './HocuspocusClient'
// import { IndexeddbPersistence } from 'y-indexeddb'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      client: null,
      editor: null,
      editor2: null,
      status: 'connecting',
      ydoc: null,
      indexdb: null,
    }
  },

  mounted() {
    this.ydoc = new Y.Doc()
    // this.client = new WebsocketProvider('ws://127.0.0.1:1234', 'hocuspocus-demo', this.ydoc, {
    //   params: {
    //     token: '123456',
    //   },
    // })

    this.client = new HocuspocusClient({
      url: 'ws://127.0.0.1:1234',
      name: 'hocuspocus-demo',
      document: this.ydoc,
      parameters: {
        token: '123456',
      },
    })

    // this.indexdb = new IndexeddbPersistence('hocuspocus-demo', this.ydoc)

    this.client.on('status', event => {
      this.status = event.status
    })

    window.ydoc = this.ydoc

    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Collaboration.configure({
          document: this.ydoc,
          field: 'default',
        }),
      ],
    })

    this.editor2 = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Collaboration.configure({
          document: this.ydoc,
          field: 'secondary',
        }),
      ],
    })
  },

  beforeUnmount() {
    this.editor.destroy()
    this.editor2.destroy()
    this.client.destroy()
  },
}
</script>
