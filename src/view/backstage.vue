<script>
    import { Form,FormModel, ConfigProvider,Input,Button } from 'ant-design-vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Backstage',
        data() {
            return {
                userinfo: {
                    username:'',
                    password:''
                },
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
                <div>
                    backstage
                </div>
            )
        }
    }
</script>