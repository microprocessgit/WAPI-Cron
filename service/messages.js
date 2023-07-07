import Client from 'pg';
import 'dotenv/config';
import { post } from './request.js';
import { logger } from '../shared.js'


const client = new Client.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

export const sendMessage = (data) => {
  if (data.options == null) data.options = "";
  const host = `${process.env.HOSTWAPI}/${data.client}/messages/send`;
  return post(host, data);
};

export const removeFromFila = async (id) => {
  try {
    const res = await client.query('DELETE FROM "MessageFila" WHERE "pkId"=$1', [id]);
    return res.rowCount;
  }
  catch (e) {
    logger.error(e, 'An error occured during message delete');
  }
  return 0;
}

export const getMessages = async () => {
  try {
    const res = await client.query('SELECT * FROM "MessageFila"');
    return res.rows;
  }
  catch (e) {
    logger.error(e, 'An error occured during message get');
  }
}

export const addMyId = async (myId, data, sessionId, isAction) => {
  const {remoteJid, id} = data.key;
  try {
   await client.query('INSERT INTO "Message"("sessionId", "remoteJid", id, key, "myId", "isAction")'+ 
    'VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT ("sessionId", "remoteJid", id) DO UPDATE SET "myId" = $5,'+
    '"isAction" = $6',
   [sessionId, remoteJid, id, data.key, myId, isAction]);
  }
  catch (e) {
    logger.error(e, 'An error occured during message get');
  }
}
