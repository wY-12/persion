<template>
  <div class="detailsWrapper">
    
    <div class="title">{{ details.title }}</div>
    <div class="detailsBlurb">
        <div class="detailsTime">{{details.time}}</div>
        <Button-group size="small" shape="circle" class="editBtn">
            <Button type="text" @click="toEdit">编辑 </Button>
        </Button-group>
    </div>
    
    <div class="markdown-body" v-html="details.content">
    </div>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
export default {
    data(){
        return{
            details:{

            },
            editTitle:'',
            oldTitle:'',
            loading:null,
        }
    },
    mounted(){
        this.loading = this.$myLoading();

        this.getDetials()
    },
    methods:{
        toEdit(){
            this.$router.push({path:'/edit-details',query:{
                detailsId:this.$route.query.id
            }})
        },
        getDetials(){

            this.$axios.post('/api/sysuser/getDetails',{detailsId:this.$route.query.id},res=>{
                this.loading.close();
                this.details = res
            },rej=>{
                this.loading.close()
                this.$myMessage({
                    content:rej,
                    messageType:'error'
                })
            })
        },
    }
}
</script>

<style lang="less">
.detailsWrapper{
    padding: 0 30px;
}
.title{
    font-size: 28px;
    line-height: 42px;
    font-weight: bolder;
    margin: 20px 0;
    text-align: center;
}
.detailsBlurb{
    height: 35px;
    
    .detailsTime{
        font-size: 13px;
        margin-bottom: 10px;
        display: inline-block;
    }
    .editBtn{
        float: right;
        Button{
            font-size: 13px;
            color: black;
        }
    }
}

</style>