<script>
  import { Icon, ConfigProvider } from 'ant-design-vue'
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  export default {
    name: 'App',
    methods:{
      handleWindowClose() {
        if (this.$router.currentRoute.name === 'PostTask') {
          // 整体逻辑为通知订阅组件，如果有未保存的数据提示用户保存
          this.close_win()
        } else {
          this.$ipcRenderer.send('window-close')
        }
        // this.$ipcRenderer.send('window-close')
      },
      handleWindowMin() {
        this.$ipcRenderer.send('window-min')
      },
      handleWindowMax() {
        this.$ipcRenderer.send('window-max')
      }      
    },
    render() {
      return (
        <ConfigProvider locale={zh_CN}>
          <div id="app">
            <div class="app_control" style="-webkit-app-region: drag">
              <div class="app_control_text"><img class='app_control_icon'/>蜜雪冰城模拟器</div>
              <div class="app_control_box" style="-webkit-app-region: no-drag;">
                <span class="app_control_close" onClick={this.handleWindowClose}><Icon type="close" /></span>
                <span class="app_control_max" onClick={this.handleWindowMax}><Icon type="switcher" /></span>
                <span class="app_control_min" onClick={this.handleWindowMin}><Icon type="minus" /></span>
              </div>
            </div>
            <div id="nav">
              <router-view/>
            </div>
          </div>
        </ConfigProvider>
      )
    }
  }
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
#nav {
  padding-top: 30px;
}
.app_control {
  position: fixed;
  height: 30px;
  width: 100%;
  background: #f3f8ff;
  z-index:999;
  .app_control_text {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 14px;
    margin-left: 15px;
    // font-weight: bold;
    color: #000;
  }
  .app_control_icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
  .app_control_box {
    width: 120px;
    position: absolute;
    right: 0;
    top: 0;
    span {
      display: inline-block;
      float: right;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      width: 40px;
      text-align: center;
      color: #aaa;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
        color: #000;
      }
    }
  }
}
</style>
