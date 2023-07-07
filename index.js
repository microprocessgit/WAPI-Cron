import sleep from 'sleep';
import random from 'random';
import { getMessages, sendMessage, removeFromFila, addMyId } from './service/messages.js';

let message = [];
let messages = [];

console.log('Server WAPICRON runing...');

main();
function main() {
  if (messages.length != 0) {
    messages.reverse();
    message = messages.pop();
    sendMessage(message).then(res => {
      res = JSON.parse(res);
      if (res.statusCode == 200) {
        removeFromFila(message.pkId);
        addMyId(message.myId, res.data, message.client, message.isAction);
      }
      main();
      sleep.sleep(random.int(1,3));
    });
  } else {
    getMessages().then(res => {
      messages = res;
      if(messages.length == 0 )sleep.sleep(3);
      main();
    })
  }
}

