<script>
    import { Form,FormModel, ConfigProvider,Input,Button,Message } from 'ant-design-vue'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import { mapGetters, mapActions } from 'vuex'
    import RegisterSocket from '../api/register'
    export default {
        name: 'Register',
        data() {
            return {
                registerinfo: {
                    username:'',
                    password:'',
                    tel:'',
                    idcord:''
                },
                password2:''
            };
        },
        mounted() {           
        },
        computed: {        
        },   
        methods:{
            handleRegister(){
                if(this.registerinfo.password !==this.password2){
                    Message.error('两次输入密码不一致')
                }else{
                    console.log('???')
                    RegisterSocket.webSocketSend(this.registerinfo)
                    RegisterSocket.webSocketOnMessage(this.callback)
                }
            },
            toLogin(){
                this.$router.replace('/')
            },
            callback(msg){
                let message = msg.data
                if(!JSON.parse(message).code){
                    Message.success(JSON.parse(message).msg)
                    this.$router.replace('/')
                }else{
                    Message.error(JSON.parse(message).msg)
                } 
            },
        },
        render() {
            return (
                <div id="register">
                    <div class='textArea'>
                        <div style={{marginBottom:'20px',marginTop:'20px'}}><span class='register-introduce'>填写信息，快速完成注册</span></div>
                        <Form>
                            <Form.Item label='用户名'>
                                <Input v-model={this.registerinfo.username}/>
                            </Form.Item>
                            <Form.Item label='密码'>
                                <Input.Password v-model={this.registerinfo.password}/>
                            </Form.Item>
                            <Form.Item label='确认密码'>
                                <Input.Password v-model={this.password2}/>
                            </Form.Item>
                            <Form.Item label='手机号'>
                                <Input v-model={this.registerinfo.tel}/>
                            </Form.Item>
                            <Form.Item label='身份证'>
                                <Input v-model={this.registerinfo.idcord}/>
                            </Form.Item>
                        </Form>
                        <Button type='primary' onClick={this.handleRegister}>立即注册</Button><Button type='link' onClick={this.toLogin}>返回</Button>
                    </div>
                </div>
            )
        }
    }
</script>

<style>
    #register{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    .register-introduce{
        font-size: 20px;
        color: black;
        font-weight: bold;  
    }

</style>
