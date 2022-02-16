<script>
    import { List, Avatar,Menu } from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Selects',
        data() {
            return {
                menuList: [
                    {
                        name:'珍珠奶茶',
                        pictureUrl:'黑糖.jpeg'
                    }, 
                    {
                        name:'三拼霸霸奶茶',
                        pictureUrl:'椰果.jpeg'
                    },  
                    {
                        name:'黑糖珍珠奶茶',
                        pictureUrl:'黑糖.jpeg'
                    },  
                    {
                        name:'霸霸椰果奶茶',
                        pictureUrl:'椰果.jpeg'
                    },  
                    {
                        name:'双拼奶茶',
                        pictureUrl:'双拼.jpeg'
                    },
                    {
                        name:'黑糖珍珠奶茶',
                        pictureUrl:'黑糖.jpeg'
                    },  
                    {
                        name:'霸霸椰果奶茶',
                        pictureUrl:'椰果.jpeg'
                    },  
                    {
                        name:'双拼奶茶',
                        pictureUrl:'双拼.jpeg'
                    },                                                                                                                           
                ]
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
        },
        render() {
            return (
                <div class='select'>
                    <div class='menulist'>
                        <Menu mode="vertical" defaultSelectedKeys={['1']}>
                            <Menu.Item key='1'><Avatar shape='square' src='清爽果茶.jpg'/>&nbsp;当季新品</Menu.Item>
                            <Menu.Item key='2'><Avatar shape='square' src='清爽果茶.jpg'/>&nbsp;清爽果茶</Menu.Item>
                            <Menu.Item key='3'><Avatar shape='square' src='小零食.jpeg'/>&nbsp;小零食</Menu.Item>
                            <Menu.Item key='4'><Avatar shape='square' src='现煮奶茶.jpeg'/>&nbsp;现煮奶茶</Menu.Item>
                            <Menu.Item key='5'><Avatar shape='square' src='鲜冰激凌.jpeg'/>&nbsp;鲜冰激凌</Menu.Item>
                            <Menu.Item key='6'><Avatar shape='square' src='芝士奶盖.jpeg'/>&nbsp;芝士奶盖</Menu.Item>
                            <Menu.Item key='7'><Avatar shape='square' src='新品咖啡.jpeg'/>&nbsp;新品咖啡</Menu.Item>
                            <Menu.Item key='8'><Avatar shape='square' src='原叶纯茶.jpeg'/>&nbsp;原叶纯茶</Menu.Item>
                            <Menu.Item key='9'><Avatar shape='square' src='冰沙系列.jpeg'/>&nbsp;冰沙系列</Menu.Item>
                        </Menu>
                    </div>
                    <div class='drinklist'>
                        <List
                            itemLayout='horizontal'
                            dataSource={this.menuList}
                            size='large'
                            renderItem={item =>(
                                <div onClick={()=>{console.log('ok')}} style={{paddingLeft:'10px'}}>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.pictureUrl}/>}
                                            title={item.name}
                                        />
                                    </List.Item>
                                </div>
                            )}
                        ></List>                    
                    </div>
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
    }
</style>