import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database [PUT function]
//Note: Database and its version, new transaction, opening desired object store, passing in the content, and confirming
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data has been saved to the DataBase!", result);
};
  //Leave the below code in?
  // console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database [GET function]
//Note: Database and its version, new transaction, opening desired object store, get all request, confirmation and return
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log("Data has been saved to the DataBase!", result);
  return result.value;
};
//Leave the below code in?
//console.error('getDb not implemented');

initdb();
