<script>
    import { Form,FormModel, ConfigProvider,Input,Button } from 'ant-design-vue'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Register',
        data() {
            return {
                registerinfo: {
                    username:'',
                    password:'',
                    password2:'',
                    tel:'',
                    idcord:''
                },
            };
        },
        mounted() {           
        },
        computed: {        
        },   
        methods:{
            handleRegister(){
                console.log("注册成功")
                this.$router.replace('/')
            },
            toLogin(){
                this.$router.replace('/')
            }
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
                                <Input.Password v-model={this.registerinfo.password2}/>
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
