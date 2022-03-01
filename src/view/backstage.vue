<script>
    import { Menu,List,Comment,Button,Select,Avatar,Drawer,Form,Input,AutoComplete,Message} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    import addDrinkSocket from '../api/addDrink' 
    import getCommentSocket from '../api/getComment'
    import delCommentSocket from '../api/delComment'
    import getOrderSocket from '../api/getOrder'
    import revStatusSocket from '../api/revStatus'
    import getDrinkSocket from '../api/getdrink'
    import delDrinkSocket from '../api/delDrink'
    const { Option } = Select
    export default {
        name: 'Backstage',
        data() {
            return {
                contentObj:{},
                comments:[],
                orders:[],
                drinks:[],
                addDrink:{
                    drinkname:'',
                    drinkkind:'',
                    drinkprice:'',
                    drinkurl:''
                },
                drinkkind:['当季新品','清爽果茶','小零食','现煮奶茶','鲜冰激凌','芝士奶盖','新品咖啡','原叶纯茶','冰沙系列'],
                avatarlist:['jazebelle','julie','jake','jabala','jerry','jude','jacques','jordan','josh','jenni'],
                visible:false,
            };
        },
        mounted() {  
            getDrinkSocket.webSocketSend()
            getDrinkSocket.webSocketOnMessage((msg)=>{console.log(JSON.parse(msg.data)),this.drinks = JSON.parse(msg.data)})
            setTimeout(()=>{
                this.contentObj = this.drinkManage()
            },100)
            getCommentSocket.webSocketSend()
            getCommentSocket.webSocketOnMessage((msg)=>{console.log(JSON.parse(msg.data)),this.comments = JSON.parse(msg.data)})
            getOrderSocket.webSocketSend()
            getOrderSocket.webSocketOnMessage((msg)=>{console.log(JSON.parse(msg.data)),this.orders = JSON.parse(msg.data)})
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
            handleModel(ordername){
                return (
                    [
                        <span>
                            {ordername}
                        </span>,                                       
                    ]                    
                )
            },
            handleAddDrink(){
                console.log('ok')
                setTimeout(()=>{
                    addDrinkSocket.webSocketSend(this.addDrink)
                    addDrinkSocket.webSocketOnMessage(this.callback)
                },3000)
            },
            callback(msg){
                let message = msg.data
                if(!JSON.parse(message).code){
                    Message.success(JSON.parse(message).msg)
                }else{
                    Message.error(JSON.parse(message).msg)
                }               
            },
            onClose(){
                this.visible = false
            },
            showDrawer(){
                this.visible = true
            },            
            drinkManage(){
                return (
                    <div>
                        <List
                            dataSource={this.drinks}
                            size='large'
                            renderItem={(item,index) =>(
                                <div onClick={()=>{console.log('ok')}} style={{paddingLeft:'10px'}}>
                                    <List.Item actions={[<Button size='small' type='primary' onClick={()=>{delDrinkSocket.webSocketSend(item.drinkid),delDrinkSocket.webSocketOnMessage(this.callback),this.drinks.splice(index,1)}}>删除</Button>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.drinkurl}/>}
                                            title={item.drinkname}
                                            description={'￥'+item.drinkprice}
                                        />
                                    </List.Item>
                                </div>
                            )}
                        ></List> 
                        <div class='add-drink' onClick={()=>{this.visible = true}}><Avatar size='large' src='添加.jpg'/></div>                     
                    </div>
                )
            },
            orderManage(){
                return (
                    <div>
                        <List
                            split={false}
                            dataSource={this.orders}
                            renderItem={(item,index) =>(
                                <List.Item actions={[<Select style={{width:'120px'}} v-model={this.orders[index].status} onChange={()=>{console.log('修改状态'),revStatusSocket.webSocketSend({id:item.id,status:this.orders[index].status})}}><Option value='未出餐'>未出餐</Option><Option value='正在配送'>正在配送</Option><Option value='订单完成'>订单完成</Option></Select>]}>
                                    <Comment
                                        actions={this.handleModel(item.address)}
                                        author={item.username}
                                        avatar={item.avatar}
                                        content={item.drinkname}
                                        datetime={item.datetime}
                                    />
                                </List.Item>
                            )}
                        >
                        </List>                      
                    </div>
                )
            },
            commentManage(){
                return (
                    <div>
                        <List
                            split={false}
                            dataSource={this.comments}
                            renderItem={(item,index) =>(
                                <List.Item actions={[<Button size='small' type='primary' onClick={()=>{delCommentSocket.webSocketSend(item.id),delCommentSocket.webSocketOnMessage(this.callback),this.comments.splice(index,1)}}>删除</Button>]}>
                                    <Comment
                                        actions={this.handleModel(item.ordername)}
                                        author={item.username}
                                        avatar={'https://joeschmoe.io/api/v1/' + this.avatarlist[Math.floor(Math.random()*this.avatarlist.length)]}
                                        content={item.comm}
                                        datetime={item.datetime}
                                    />
                                </List.Item>
                            )}
                        >
                        </List>                    
                    </div>
                )
            },            
        },
        render() {
            return (
                <div class='backstage'>
                    <div class='menulist'>
                        <Menu mode="vertical" defaultSelectedKeys={['1']}>
                            <Menu.Item key='1' onClick={()=>{this.contentObj = this.drinkManage()}}>&nbsp;饮品管理</Menu.Item>
                            <Menu.Item key='2' onClick={()=>{this.contentObj = this.orderManage()}}>&nbsp;订单管理</Menu.Item>
                            <Menu.Item key='3' onClick={()=>{this.contentObj = this.commentManage()}}>&nbsp;评论管理</Menu.Item>
                        </Menu>
                    </div> 
                    <div class='drinklist'>  
                        {this.contentObj}              
                    </div>
                    <Drawer visible={this.visible} onClose={this.onClose} width='400' closable={false}>
                        <form action='http://localhost:3000/img_upload' method='post' enctype='multipart/form-data'>
                            <Form.Item label='饮品名称:'>
                                <Input v-model={this.addDrink.drinkname}/>
                            </Form.Item>
                            <Form.Item label='饮品分类:'>
                                <AutoComplete
                                    dataSource={this.drinkkind}
                                    v-model={this.addDrink.drinkkind}
                                    style={{width:'100%'}}
                                />
                            </Form.Item>
                            <Form.Item label='饮品价格:'>
                                <Input v-model={this.addDrink.drinkprice}/>
                            </Form.Item>
                            <Form.Item label='饮品配图:'>
                                <input type='file' name='image' size='50'/>
                            </Form.Item>
                            <div style={{paddingTop:'20px',marginTop:'100px'}}>
                                <div style={{float:'right'}}><Button size='large' type='primary' htmlType='submit' onClick={this.handleAddDrink}>确定</Button></div>
                            </div> 
                        </form>                       
                    </Drawer> 
                </div>
            )
        }
    }
</script>
<style>
    .backstage{
        height: 100%;
    }
    .menulist{
        float: left;
        width: 15%;
        height: 100%;
    }
    .add-drink{
        position: fixed;
        bottom:10px;
        right:30px;
        cursor:pointer;
    }
</style>