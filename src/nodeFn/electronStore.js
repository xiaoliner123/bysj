const Store = require('electron-store');
import { ipcMain } from 'electron'

const store = new Store();

const electronstoreMethods = () => {
  
  ipcMain.on('eStore-set', function(e, key, value){
    store.set(key, value);
  })

  ipcMain.on('eStore-get', function(e, key){
    e.sender.send(key, store.get(key))
  })

  ipcMain.on('eStore-delete', function(key){
    store.delete(key)
  })

}

export default electronstoreMethods