<template>
  <div class="content" v-if="isShow" :style="{'top':topNum}">
    <Icon :type='iconType' :size=16 color='white' class="iconClass" :style="{'background':iconColor}"></Icon>
    <span class="contentSpan"> {{content}}</span>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isShow:false,
            content:'',
            topNum:'-50px',
            iconArr:[
                {
                    name:'success',
                    iconType:'ios-checkmark',
                    color:'green'
                },
                {
                    name:'fail',
                    iconType:'ios-close',
                    color:'red'
                },
                {
                    name:'error',
                    iconType:'ios-information',
                    color:'red'
                },
                {
                    name:'help',
                    iconType:'ios-help',
                    color:'darkorange'
                }
            ],
            messageType:'',
            iconType:'ios-infomation',
            iconColor:'aqua',
        }
    },
    watch:{
        isShow(val){
            setTimeout(() => {
                if(val){
                    this.topNum = '50px'
                }
            }, 100);
        },
    },
    mounted(){
        this.iconArr.forEach(item => {
            if(item.name == this.messageType){
                this.iconType = item.iconType
                this.iconColor = item.color
            }
        });
    },  
    methods:{

    }
}
</script>

<style>
.content{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    z-index: 9999;
    color: #657180;
    font-size: 12px;
    vertical-align: middle;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
    transition:all 0.5s;
    background-color: #fff;

}
.contentSpan{
    vertical-align: middle;
}
.iconClass{
    margin-right: 5px;

    border-radius: 50%;
}
</style>