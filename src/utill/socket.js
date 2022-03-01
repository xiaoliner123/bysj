 function Socket(type){
    if ("WebSocket" in window) {
        var webSocket = new WebSocket('ws://localhost:3000/'+ type);//创建socket对象
    } else {
        alert("该浏览器不支持websocket!");
    }
    //打开
    webSocket.onopen = function() {
        console.log("WebSocket连接成功");
    }; 
    //关闭
    webSocket.onclose = function() {
        webSocketClose();
    };
    //连接发生错误的回调方法
    webSocket.onerror = function() {
        console.log("WebSocket连接发生错误");
    }; 
    //发送消息
    this.webSocketSend = (data) =>{
        webSocket.send(JSON.stringify(data));
    },
    //接收消息
    this.webSocketOnMessage = (callback) =>{
        var data={}
        webSocket.onmessage = (msg)=>{
            data = msg
            //console.log(data.data)
            callback(msg)
        }       
    }
}
//关闭socket
function webSocketClose() {
    //因为我建立了多个socket，所以我需要知道我关闭的是哪一个socket，就做了一些判断。
    if (
      webSocket.readyState === 1 &&
      webSocket.url === "ws://1xx.xx.xx.xxx:3000"
    ) {
      webSocket.close();//这句话是关键，之前我忘了写，一直没有真正的关闭socket
      console.log("对话连接已关闭");
    }
  }



export default Socket;
