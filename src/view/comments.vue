<script>
    import Vue from 'vue'
    import {List,Comment,Tooltip,Icon} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Comments',
        data() {
            return {
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
           
            handleModel(ordername){
                return (
                    [
                        <span>
                            {ordername}
                        </span>,                                       
                    ]                    
                )
            }
        },
        render() {
            return (
                <div class='comments'>
                    <List
                        header={`${this.comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={this.comments}
                        renderItem={item =>(
                            <li>
                                <Comment
                                    actions={this.handleModel(item.ordername)}
                                    author={item.username}
                                    avatar={item.avatar}
                                    content={item.comm}
                                    datetime={item.datetime}
                                />
                            </li>
                        )}
                    >
                    </List>
                </div>
            )
        }
    }
</script>
<style>
    .comments{
        display: block;
        height:100%; 
        overflow-y: scroll;
        overflow-x: hidden;
    }

</style>