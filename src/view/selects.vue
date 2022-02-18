<script>
    import Vue from 'vue'
    import { List, Avatar,Menu, Button,Badge,Drawer,Modal,Message,AutoComplete} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    Vue.use(Modal)
    export default {
        name: 'Selects',
        data() {
            return {
                New:[
                    {
                        name:'珍珠奶茶',
                        pictureUrl:'黑糖.jpeg',
                        price:'￥12'
                    }
                ],
                Fruit:[
                    {
                        name:'三拼霸霸奶茶',
                        pictureUrl:'椰果.jpeg',
                        price:'￥12'
                    }                    
                ],
                Snacks:[
                    {
                        name:'霸霸椰果奶茶',
                        pictureUrl:'椰果.jpeg',
                        price:'￥12'
                    }
                ],
                Milk:[],
                Icecream:[],
                Cheese:[],
                Coffee:[],
                Tea:[],
                Ice:[],
                menuList: [
                    {
                        name:'珍珠奶茶',
                        pictureUrl:'黑糖.jpeg',
                        price:'￥12'
                    }, 
                    {
                        name:'三拼霸霸奶茶',
                        pictureUrl:'椰果.jpeg',
                        price:'￥12'
                    },  
                    {
                        name:'黑糖珍珠奶茶',
                        pictureUrl:'黑糖.jpeg',
                        price:'￥12'
                    },  
                    {
                        name:'霸霸椰果奶茶',
                        pictureUrl:'椰果.jpeg',
                        price:'￥12'
                    },  
                    {
                        name:'双拼奶茶',
                        pictureUrl:'双拼.jpeg',
                        price:'￥12'
                    },
                    {
                        name:'黑糖珍珠奶茶',
                        pictureUrl:'黑糖.jpeg',
                        price:'￥12'
                    },  
                    {
                        name:'霸霸椰果奶茶',
                        pictureUrl:'椰果.jpeg',
                        price:'￥12'
                    },  
                    {
                        name:'双拼奶茶',
                        pictureUrl:'双拼.jpeg',
                        price:'￥12'
                    },                                                                                                                           
                ],
                shopping:[],
                order:{
                    username:'',
                    avatar: '',
                    drinkname:'',
                    datetime:'',
                    status:'未出餐',
                    address:'不需要配送'                   
                },
                address:['山西省太原市','重庆市','北京市'],
                visible:false,
                totalPrice:0,
                showModal:false,
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
            handleadd(itemName,itemPrice,itemAvater){
                this.shopping.push({name:itemName,price:itemPrice,pictureUrl:itemAvater})
                this.totalPrice = this.totalPrice + parseInt(itemPrice.replace('￥','')) 
            },
            onClose(){
                this.visible = false
            },
            showDrawer(){
                this.visible = true
            },
            handleShow(username,avatar,drinkname){
                this.showModal = true
            },
            handleOk(){
                this.showModal = false
                this.shopping = []
                this.totalPrice = 0
                Message.success('支付成功')
            },
            handleCancel(){
                this.showModal = false
            },
            handleChange(value) {
                console.log(this.order.address);
            },                        
        },
        render() {
            return (
                <div class='select'>
                    <div class='menulist'>
                        <Menu mode="vertical" defaultSelectedKeys={['1']}>
                            <Menu.Item key='1' onClick={()=>{this.menuList = this.New}}><Avatar shape='square' src='清爽果茶.jpg'/>&nbsp;当季新品</Menu.Item>
                            <Menu.Item key='2' onClick={()=>{this.menuList = this.Fruit}}><Avatar shape='square' src='清爽果茶.jpg'/>&nbsp;清爽果茶</Menu.Item>
                            <Menu.Item key='3' onClick={()=>{this.menuList = this.Snacks}}><Avatar shape='square' src='小零食.jpeg'/>&nbsp;小零食</Menu.Item>
                            <Menu.Item key='4' onClick={()=>{this.menuList = this.Milk}}><Avatar shape='square' src='现煮奶茶.jpeg'/>&nbsp;现煮奶茶</Menu.Item>
                            <Menu.Item key='5' onClick={()=>{this.menuList = this.Icecream}}><Avatar shape='square' src='鲜冰激凌.jpeg'/>&nbsp;鲜冰激凌</Menu.Item>
                            <Menu.Item key='6' onClick={()=>{this.menuList = this.Cheese}}><Avatar shape='square' src='芝士奶盖.jpeg'/>&nbsp;芝士奶盖</Menu.Item>
                            <Menu.Item key='7' onClick={()=>{this.menuList = this.Coffee}}><Avatar shape='square' src='新品咖啡.jpeg'/>&nbsp;新品咖啡</Menu.Item>
                            <Menu.Item key='8' onClick={()=>{this.menuList = this.Tea}}><Avatar shape='square' src='原叶纯茶.jpeg'/>&nbsp;原叶纯茶</Menu.Item>
                            <Menu.Item key='9' onClick={()=>{this.menuList = this.Ice}}><Avatar shape='square' src='冰沙系列.jpeg'/>&nbsp;冰沙系列</Menu.Item>
                        </Menu>
                    </div>
                    <div class='drinklist'>
                        <List
                            dataSource={this.menuList}
                            size='large'
                            renderItem={item =>(
                                <div onClick={()=>{console.log('ok')}} style={{paddingLeft:'10px'}}>
                                    <List.Item actions={[<Button size='small' type='primary' onClick={this.handleadd.bind(this,item.name,item.price,item.pictureUrl)}>添加</Button>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.pictureUrl}/>}
                                            title={item.name}
                                            description={item.price}
                                        />
                                    </List.Item>
                                </div>
                            )}
                        ></List>
                        <div class='shopping'><Badge count={this.shopping.length}><Avatar size='large' src='购物车.png' onClick={this.showDrawer}/></Badge></div>
                        <Drawer visible={this.visible} onClose={this.onClose} width='400' closable={false}>
                            <div class='drawer-content'>
                                <List
                                    dataSource={this.shopping}
                                    renderItem={(item,index) =>(
                                        <div style={{paddingLeft:'10px'}}>
                                            <List.Item actions={[<Button size='small' type='primary' onClick={()=>{this.shopping.splice(index,1),this.totalPrice = this.totalPrice - parseInt(item.price.replace('￥',''))}}>删除</Button>]}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.pictureUrl}/>}
                                                    title={item.name}
                                                    description={item.price}
                                                />
                                            </List.Item>
                                        </div>                                    
                                    )}
                                > 
                                </List>                            
                            </div>
                            <div style={{paddingTop:'20px'}}>
                                <div style={{float:'left'}}><span style={{display:'inline-block',paddingTop:'14px',fontSize:'20px',color:'#f40'}}>总价&nbsp;&nbsp;{this.totalPrice}</span></div>
                                <div style={{float:'right'}}><Button size='large' type='primary' onClick={this.handleShow}>结算</Button></div>
                            </div>
                        </Drawer>                  
                    </div>
                    <Modal visible={this.showModal} onCancel={this.handleCancel} footer={null}>
                        <span>请输入配送地址：</span>
                        <AutoComplete
                            dataSource={this.address}
                            style={{width:'100%'}}
                            onChange={this.handleChange}
                            v-model={this.order.address}
                        />
                        <div style={{width:'100%',height:'40px'}}><div style={{float:'right'}}><Button onClick={this.handleOk}>确认支付</Button></div></div>
                    </Modal>
                </div>
            )
        }
    }
</script>
<style lang='scss'>
    .select{
        height: 100%;
        padding-right:20px ;
    }
    .menulist{
        float: left;
        width: 15%;
        height: 100%;
    }
    .drinklist{
        height: 100%;
        background: rgb(255, 255, 255);
        overflow-x: none;
        overflow-y:scroll;
        .shopping{
            position: fixed;
            bottom:10px;
            right:50px;
        }
    }
    .ant-drawer-body{
        padding-top:20px;
        height:100%;
    }
    .drawer-content{
        height:90%;
        overflow-x: none;
        overflow-y:scroll;
    }
</style>