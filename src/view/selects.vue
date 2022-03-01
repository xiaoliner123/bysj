<script>
    import Vue from 'vue'
    import { List, Avatar,Menu, Button,Badge,Drawer,Modal,Message,AutoComplete} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    import addOrderSocket from '../api/addOrder'
    import getDrinkSocket from '../api/getdrink'
    import getAddressSocket from '../api/getAddress'
    import addAddressSocket from '../api/addAddress'
    Vue.use(Modal)
    export default {
        name: 'Selects',
        data() {
            return {
                user:{},
                New:[],
                Fruit:[],          
                Snacks:[],
                Milk:[],
                Icecream:[],
                Cheese:[],
                Coffee:[],
                Tea:[],
                Ice:[],
                menuList: [],
                shopping:[],
                order:{
                    id:'',
                    username:'',
                    avatar: '',
                    drinkname:'',
                    datetime:'',
                    status:'未出餐',
                    address:'不需要配送'                   
                },
                address:[],
                visible:false,
                totalPrice:0,
                showModal:false,
                dat: new Date()
            };
        },
        mounted() {
            this.user = this.getUserinfo
            getDrinkSocket.webSocketSend()
            getDrinkSocket.webSocketOnMessage(this.getDrink)
            getAddressSocket.webSocketSend(this.user.username)
            getAddressSocket.webSocketOnMessage(this.getAddress)
            console.log(this.user)         
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
            getDrink(msg){
                let data = JSON.parse(msg.data)
                console.log('获取到')
                console.log(data)
                for(var i=0;i<data.length;i++){
                    switch (data[i].drinkkind){
                        case '当季新品':
                            this.New.push(data[i])
                            this.menuList.push(data[i])
                            break
                        case '清爽果茶':
                            this.Fruit.push(data[i])
                            break
                        case '小零食':
                            this.Snacks.push(data[i])
                            break 
                        case '现煮奶茶':
                            this.Milk.push(data[i])
                            console.log(this.Milk)
                            break 
                        case '鲜冰激凌':
                            this.Icecream.push(data[i])
                            break 
                        case '芝士奶盖':
                            this.Cheese.push(data[i])
                            break 
                        case '新品咖啡':
                            this.Coffee.push(data[i])
                            break 
                        case '原叶纯茶':
                            this.Tea.push(data[i])
                            break 
                        case '冰沙系列':
                            this.Ice.push(data[i])
                            break                             
                        
                    }
                }
            },
            getAddress(msg){
                let ads = JSON.parse(msg.data)
                console.log(ads)
                for(var i=0;i<ads.length;i++){
                    this.address.push(ads[i].address)
                }
            },
            handleadd(itemName,itemPrice,itemAvater){
                this.shopping.push({name:itemName,price:'￥'+itemPrice,pictureUrl:itemAvater})
                console.log(itemPrice)
                this.totalPrice = this.totalPrice + itemPrice
            },
            onClose(){
                this.visible = false
            },
            showDrawer(){
                this.visible = true
            },
            handleShow(username,avatar,drinkname){
                this.showModal = true
                this.order.datetime = this.dat.toLocaleDateString()
                this.order.avatar = this.shopping[0].pictureUrl
                this.order.username = this.user.username
                for(var i in this.shopping){
                    this.order.drinkname = this.order.drinkname + ' ' +this.shopping[i].name 
                    console.log(this.order.drinkname)
                }
            },
            handleOk(){
                this.showModal = false
                this.shopping = []
                this.totalPrice = 0
                addOrderSocket.webSocketSend(this.order)
                addOrderSocket.webSocketOnMessage(this.callback)
                addAddressSocket.webSocketSend({username:this.user.username,address:this.order.address})
                console.log(this.order)
            },
            callback(msg){
                let message = msg.data
                if(!JSON.parse(message).code){
                    Message.success(JSON.parse(message).msg)
                }else{
                    Message.error(JSON.parse(message).msg)
                } 
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
                                    <List.Item actions={[<Button size='small' type='primary' onClick={this.handleadd.bind(this,item.drinkname,item.drinkprice,item.drinkurl)}>添加</Button>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.drinkurl}/>}
                                            title={item.drinkname}
                                            description={'￥'+item.drinkprice}
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
                                            <List.Item actions={[<Button size='small' type='primary' onClick={()=>{this.shopping.splice(index,1),this.totalPrice = this.totalPrice - item.price}}>删除</Button>]}>
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
            cursor:pointer;
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