<script>
    import { Menu,List,Comment,Button,Select,Avatar} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    const { Option } = Select
    export default {
        name: 'Backstage',
        data() {
            return {
                contentObj:{},
                comments:[
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        comm:'翁斐然翁绕弯儿翁认为我若阿萨德哈军所多哈军卡奥所大所大大大所大多撒大所大所大所大所大所大所多撒多所大所大所大大师大师大师大师的华为客户要求武汉市打卡机的哈扩大产能，奥马哈科技的哈空间的哈市科技的哈师大',
                        datetime:'2022-12-12',
                        ordername:'鲜榨橙汁'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        comm:'翁斐然翁绕弯儿翁认为我若',
                        datetime:'2022-2-15',
                        ordername:'草莓圣代'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        comm:'翁斐然翁绕弯儿翁认为我若阿萨德哈军所多哈军卡奥所大所大大大所大多撒大所大所大所大所大所大所多撒多所大所大所大大师大师大师大师的华为客户要求武汉市打卡机的哈扩大产能，奥马哈科技的哈空间的哈市科技的哈师大',
                        datetime:'2022-12-12',
                        ordername:'鲜榨橙汁'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        comm:'翁斐然翁绕弯儿翁认为我若',
                        datetime:'2022-2-15',
                        ordername:'草莓圣代'
                    },                    
                ],
                orders:[
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/jess',
                        drinkname:'鲜榨橙汁',
                        datetime:'2022-12-12',
                        status:'正在配送',
                        address:'山西省'
                    },
                    {
                        username:'13121321',
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        drinkname:'鲜榨橙汁',
                        datetime:'2022-12-12',
                        status:'订单完成',
                        address:'北京市'
                    },                   
                ],
                drinks:[
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
                ]
            };
        },
        mounted() {  
            this.contentObj = this.drinkManage()       
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
            drinkManage(){
                return (
                    <div>
                        <List
                            dataSource={this.drinks}
                            size='large'
                            renderItem={(item,index) =>(
                                <div onClick={()=>{console.log('ok')}} style={{paddingLeft:'10px'}}>
                                    <List.Item actions={[<Button size='small' type='primary' onClick={()=>{this.drinks.splice(index,1)}}>删除</Button>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.pictureUrl}/>}
                                            title={item.name}
                                            description={item.price}
                                        />
                                    </List.Item>
                                </div>
                            )}
                        ></List>                    
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
                                <List.Item actions={[<Select style={{width:'120px'}} v-model={this.orders[index].status}><Option value='未出餐'>未出餐</Option><Option value='正在配送'>正在配送</Option><Option value='订单完成'>订单完成</Option></Select>]}>
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
                                <List.Item actions={[<Button size='small' type='primary' onClick={()=>{this.comments.splice(index,1)}}>删除</Button>]}>
                                    <Comment
                                        actions={this.handleModel(item.ordername)}
                                        author={item.username}
                                        avatar={item.avatar}
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
</style>