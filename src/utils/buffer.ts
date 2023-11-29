import { Buffer as NodeJSBuffer } from 'buffer';

if (!window.Buffer) {
  window.Buffer = NodeJSBuffer;
}

export const Buffer = NodeJSBuffer;
