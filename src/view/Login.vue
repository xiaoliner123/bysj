<script>
    import { Form,FormModel, ConfigProvider,Input,Button } from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Login',
        data() {
            return {
                userinfo: {
                    username:'',
                    password:''
                },
            };
        },
        mounted() {
            if(!this.getUserinfo.username){
                this.$ipcRenderer.send('eStore-get','userinfo')
                this.$ipcRenderer.on('userinfo',(e,value)=>{
                this.userinfo = value
                console.log('okk')
            })
            }else{
                this.userinfo = this.getUserinfo   
            }            
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
                this.$router.replace('/mainview')
            },
            toRegister(){   
                this.$router.replace('/register')
            }
        },
        render() {
            return (
                <div id="login">
                    <div id="logo2"><img class='logo-img' src='logo2.jpeg'/></div>
                    <div id='textArea'>
                        <span class='system-title'>饮品点餐系统</span>
                        <Form>
                            <Form.Item label='用户名'>
                                <Input v-model={this.userinfo.username}/>
                            </Form.Item>
                            <Form.Item label='密码'>
                                <Input.Password v-model={this.userinfo.password}/>
                            </Form.Item>
                        </Form>
                        <Button type='primary' onClick={this.handleLogin}>登录</Button><Button type='link' onClick={this.toRegister}>立即注册</Button>
                    </div>
                </div>
            )
        }
    }
</script>

<style lang='scss'>
    #app{
        text-align: left;
    }
    #login{
        display: flex;
        position: relative;
    }
    #logo2{
        width: 50%;
        height: 50%;
        margin-top:10%;
        margin-left:2%;
        img{
            width:100%;
            height: 100%;
        }
    }
    #textArea{
        position: absolute;
        left:60%;
        top:24%;
        display: inline-block;      
    }
    .ant-form-item{
        margin-bottom: 0;
    } 
    .ant-btn{
        margin-top:10px;
    }
    .system-title{
        color: black;
        font-weight: bold;
        font-size: 24px;
    }
</style>