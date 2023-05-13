import sleep from 'sleep';
import random from 'random';
import { getMessages, sendMessage, removeFromFila } from './service/messages.js';

let message = [];
let messages = [];

console.log('Server WAPICRON runing...');

main();
function main() {
  if (messages.length != 0) {
    messages.reverse();
    message = messages.pop();
    sendMessage(message).then(res => {
      if (JSON.parse(res).statusCode == 200) {
        removeFromFila(message.pkId);
      }
      main();
    });
    sleep.sleep(random.int(1,3));
  } else {
    getMessages().then(res => {
      messages = res;
      if(messages.length == 0 )sleep.sleep(3);
      main();
    })
  }
}

