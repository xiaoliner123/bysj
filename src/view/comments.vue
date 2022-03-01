<script>
    import Vue from 'vue'
    import {List,Comment,Tooltip,Icon} from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    import getCommentSocket from '../api/getComment'
    export default {
        name: 'Comments',
        data() {
            return {
                comments:[],
                avatarlist:['jazebelle','julie','jake','jabala','jerry','jude','jacques','jordan','josh','jenni']
            };
        },
        mounted() { 
            getCommentSocket.webSocketSend()
            getCommentSocket.webSocketOnMessage((msg)=>{console.log(JSON.parse(msg.data)),this.comments = JSON.parse(msg.data)})        
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
                                    avatar={'https://joeschmoe.io/api/v1/' + this.avatarlist[Math.floor(Math.random()*this.avatarlist.length)]}
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