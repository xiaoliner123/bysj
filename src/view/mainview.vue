<script>
    import { Form,FormModel, ConfigProvider,Input,Button,Layout,Menu } from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'

    const {Header,Footer,Sider,Content} = Layout
    export default {
        name: 'Mainview',
        data() {
            return {
                userinfo: {
                    username:'',
                    password:''
                },
            };
        },
        mounted() {           
        },
        computed: {
            ...mapGetters({
                getUserinfo: 'getUserinfo'
            })            
        },   
        methods:{
            ...mapActions({
                set_userinfo: 'set_userinfo'
            }),
            handleLogin(){
                this.set_userinfo(this.userinfo)
                //console.log(this.userinfo)
                this.$ipcRenderer.send('eStore-set','userinfo',this.userinfo) 
            },
            toRegister(){   
                this.$router.replace('/register')
            }
        },
        render() {
            return (
                <div id="components-layout-demo-basic">
                    <Layout>
                        <Header>
                            <div class='logo'><img class='logo-img' src='logo3.jpg'/></div>
                            <div class='title'>饮品点餐系统</div>
                            <div class='menus'>
                                <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                                    <Menu.Item key='1'><router-link to='/selects'>点餐</router-link></Menu.Item>
                                    <Menu.Item key='2'><router-link to='/comments'>评论</router-link></Menu.Item>
                                    <Menu.Item key='3'><router-link to='/order'>订单</router-link></Menu.Item>
                                    <Menu.Item key='4'><router-link to='/backstage'>商家后台</router-link></Menu.Item>
                                </Menu>                            
                            </div>
                        </Header>
                        <Layout>
                            <Content>
                                <router-view/>
                            </Content>
                        </Layout>
                        <Footer>小麟儿出品&nbsp;&nbsp;&nbsp;1107097431@qq.com</Footer>
                    </Layout>
                </div>
            )
        }
    }
</script>

<style lang='scss'>
#components-layout-demo-basic {
  display: flex;
  min-height: 100%;
}
#components-layout-demo-basic .ant-layout-header{
  background:white;
  color:black;
  width: 100%;
  height: 20%;
  padding: 0;  
}
#components-layout-demo-basic .ant-layout-header .title{
    display: inline-block;
    width:80%;
    height: 50%;
    padding-left:20px;
    font-weight: bold;
    font-size: 24px;
}
#components-layout-demo-basic .ant-layout-header .menus{
    display: inline-block;
    width:80%;
    height: 50%;
    .ant-menu-horizontal{
        border:0;
    }  
}
#components-layout-demo-basic .ant-layout-header .logo{
  float: left;
  width: 20%;
  height:100%;
  line-height: 100%;
  background:white;
  text-align: center;
  img{
    height: 100%;
    width:60%;
  } 
}
#components-layout-demo-basic .ant-layout-footer {
  background:white;
  color: rgba(159, 160, 161, 0.849);
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding:0;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: white;
  height: 450px;
  line-height: 120px;
  border:1px solid rgb(133, 131, 131);
  border-left: none;
  border-right: none;
  padding: 20px 0 20px 20px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>