import Client from 'pg';
import 'dotenv/config';
import { post } from './request.js';
import { logger } from '../shared.js'


const client = new Client.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

export const sendMessage = (data) => {
  if (data.options == null) data.options = "";
  const host = `${process.env.HOSTBAILEYS}/${data.client}/messages/send`;
  return post(host, data);
};

export const removeFromFila = async (id) => {
  try {
    const res = await client.query('DELETE FROM "MessageToFila" WHERE "pkId"=$1', [id]);
    return res.rowCount;
  }
  catch (e) {
    logger.error(e, 'An error occured during message delete');
  }
  return 0;
}

export const getMessages = async () => {
  try {
    const res = await client.query('SELECT * FROM "MessageToFila"');
    return res.rows;
  }
  catch (e) {
    logger.error(e, 'An error occured during message get');
  }
}
