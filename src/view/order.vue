<script>
    import Vue from 'vue'
    import {List,Comment,Tooltip,Icon, Button,Modal,Input} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    Vue.use(Modal)
    export default {
        name: 'Order',
        data() {
            return {
                orders:[ 
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/jess',
                        drinkname:'鲜榨橙汁',
                        datetime:'2022-12-12',
                        status:'正在配送'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        drinkname:'鲜榨橙汁',
                        datetime:'2022-12-12',
                        status:'配送完成'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        drinkname:'鲜榨',
                        datetime:'2022/12/12',
                        status:'正在配送'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        drinkname:'鲜榨橙汁',
                        datetime:'2022-12-12',
                        status:'未出餐'
                    },                                                                              
                ],
                comments:{
                    username:'',
                    avatar: '',
                    comm:'请输入评论',
                    datetime:'',
                    ordername:''     
                },
                showModal:false,
                dat: new Date()
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
           
            handleModel(status,username,avatar,drinkname){
                return (
                    [
                        <span>
                            <Button size='small' onClick={this.handleShow.bind(this,username,avatar,drinkname)}>评价</Button>&nbsp;<Button type='link' size='small'>{status}</Button>
                        </span>,                                       
                    ]                    
                )
            },
            handleShow(username,avatar,drinkname){
                this.showModal = true
                this.comments.username = username
                this.comments.avatar = avatar
                this.comments.ordername = drinkname
            },
            handleOk(){
                this.showModal = false
                this.comments.datetime = this.dat.toLocaleDateString()
                console.log(this.comments)
            },
            handleCancel(){
                this.showModal = false
            }
        },
        render() {
            return (
                <div class='order'>
                    <List
                        header={`${this.orders.length} replies`}
                        itemLayout="horizontal"
                        dataSource={this.orders}
                        renderItem={item =>(
                            <li>
                                <Comment
                                    actions={this.handleModel(item.status,item.username,item.avatar,item.drinkname)}
                                    author={item.username}
                                    avatar={item.avatar}
                                    content={item.drinkname}
                                    datetime={item.datetime}
                                />
                            </li>
                        )}
                    >
                    </List>
                    <Modal visible={this.showModal} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <Input.TextArea v-model={this.comments.comm} rows="6"></Input.TextArea>
                    </Modal>
                </div>
            )
        }
    }
</script>
<style>
    .order{
        display: block;
        height:100%; 
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .ant-input{
        margin-top:15px;
    }
</style>