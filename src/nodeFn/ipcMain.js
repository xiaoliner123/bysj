import { app, ipcMain, shell, dialog } from 'electron'
const registerWindowStateChangeActions = (win, server) => {
    // 窗口取消最大化
    ipcMain.on('window-unmax', function(){
      win.unmaximize()
    })
  
    // 窗口最小化
    ipcMain.on('window-min', function(){
      win.minimize()
    })
  
    // 窗口最大化
    ipcMain.on('window-max', function(){
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    })
  
    // 关闭窗口
    ipcMain.on('window-close', function(){
      if (server) {
        server.close()
        server.on('close', ()=>{
          app.exit()
        })
      }
    })
  
    // 将窗口从最小化状态恢复到以前的状态
    ipcMain.on('window-restore', function(){
      win.restore()
    })
  
    // // 调整窗口大小
    ipcMain.on('window-resize', function(e, obj){
      win.setSize(obj.width, obj.height)
    })
    // 启动程序
    ipcMain.on('window-start',function(e, obj){
      if (server) {
        server.send(Buffer.from(obj), 11204, 'localhost')
      }
    })
  
    // 打开文件
    ipcMain.on('window-openfile',function(e, path){
      shell.openPath(path)
    })
  
    // 将原生窗口的标题更改为 title
    ipcMain.on('window-setTitle', function(title){
      win.setTitle(title)
    })
  
    // 测试接收
    ipcMain.on('window-test',function(e, obj){
      if (server) {
        server.send(Buffer.from(obj), 12027, 'localhost')
      }
    })
  
    // 测试打开文件夹
    ipcMain.on('openDirectory',function(e, key) {
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }).then(res => {
        if (res.filePaths[0]) {
          e.sender.send('getDirectory', {
            key,
            file: res.filePaths[0]
          })
        }
      })
    })
  
  }
  
  export default registerWindowStateChangeActions