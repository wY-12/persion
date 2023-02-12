<template>
  <div class="mainWrapper">
        <div class="main-title">
            <div class="main-title-left">
                <h1>早安，请开始一天的工作吧</h1>
                <div class="saying">{{ saying }}</div>
                <div class="weather">{{ weather }}</div>
                <div v-for="item in titleData" :key="item.name" class="title">
                    <Icon :type="item.iconType" size="20" class="Icon" color="#55a0f8"></Icon>
                    <span>{{ item.name }}:{{ item.num }}</span>
                </div>
            </div>
            <div class="main-title-right">
                <img src="https://demo.gin-vue-admin.com/assets/dashboard.70e55b71.png" class="gva-top-card-right" alt="" data-v-d42cfe5c="">
            </div>

        </div>

        <div class="mainContent">
            <div id="articleProportion" class="articleProportion"></div>
            <div class="audio" id="audio">
                <Spin fix v-if="audioLoading"></Spin>
                <div class="voice-chat-card">
                <div class="voice-chat-card-header">
                    <img class="avatar" :src="music.cover || ''">
                    <div class="username">{{music.songs}}</div>
                    <div class="status"></div>
                </div>
                <div class="voice-chat-card-body">

                    <div class="audio-container">
                    <audio controls="" v-if="musicAudio">
                        <source :src="music.url" :type="'audio/mp3'||'video/mp4' || 'video/avi' || 'video/mov'">
                        Your browser does not support the audio element.
                    </audio>
                    </div>
                </div>
                </div>
                <div class="hotReview">
                    <div class="hotReviewName">{{ music.name }}:</div>
                    <div class="hotReviewComment">{{ music.comment }}</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import { nextTick } from 'vue'

export default {
    data(){
        return {
            titleData:[
                {
                    name:'面试题数量',
                    iconType:'ios-paper',
                    num:0,
                    total:'interviewtitletotal',
                    color:'seagreen',
                },
                // {
                //     name:'小技巧数量',
                //     iconType:'ios-navigate',
                //     num:0,
                //     color:'olivedrab',
                // },
                {
                    total:'collectiontotal',
                    name:'收藏数量',
                    iconType:'ios-mic',
                    num:0,
                    color:'goldenrod',
                },
                // {
                //     name:'博客数量',
                //     iconType:'ios-body',
                //     num:0,
                //     color:'sandybrown',
                // },
                // {
                //     name:'博客数量',
                //     iconType:'ios-person',
                //     num:0,
                //     color:'green',
                // },
                
                
            ],
            titleWidth:0,
            articleProportion:null,
            variationWeekly:null,
            articleProportionData:[
                        { value: 0, name: '面试题',total:'interviewtitletotal', },
                        // { value: 0, name: '小技巧' },
                        { value: 0, name: '地址收藏',total:'collectiontotal',},
                        // { value: 484, name: 'css小技巧' },
                        // { value: 300, name: '地址收藏' }
            ],
            loading:null,
            saying:'',
            weather:'',
            music:{
                comment:'loading.....'
            },
            musicAudio:true,
            audioLoading:false
        }
    },
    created(){
        this.titleWidth = 100 / this.titleData.length - 1
    },
    mounted(){
        this.getSaying()
        this.getIp()
        this.getMusic()
        this.articleProportion = document.getElementById('articleProportion')
        this.getTotals()
        this.getbackgroundImg()

    },
    methods:{
        drawArticleProportion(data){
            let articleProportion = this.$echarts.init(this.articleProportion)
            let option = {
                title: {
                    text: '藏品',
                    subtext: '个人藏品',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'bottom'
                },
                
                label: {
                    alignTo: 'edge',
                    formatter: '{name|{b}}\n{time|{c} 篇}',
                    minMargin: 5,
                    position: "outside",
                    edgeDistance: 10,
                    lineHeight: 30,
                    rich: {
                        time: {
                            fontSize:12,
                            color: '#999'
                        },
                        name: {
                            fontSize:14,
                            color: '#000'
                        }
                    }
                },
                
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },

                series: [
                    {
                    name: '个人博客',
                    type: 'pie',
                    radius: '60%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            };
            articleProportion.setOption(option)
        },
        getTotals(){
            this.$loading.install()
            this.$axios.post('/api/sysuser/getTotals',{userId:1},res=>{
                
                this.articleProportionData.forEach(item => {
                    item.value = res[item.total] || 0
                });
                this.titleData.forEach(item => {
                    item.num = res[item.total] ||0
                });
                this.drawArticleProportion(this.articleProportionData);
                this.$loading.close()

            },rej=>{
                this.$loading.close()
                this.$myMessage({
                    content:rej,
                    messageType:'error'
                })
            }
            )
        },
        getSaying(){
            axios({
                method:'GET',
                url:'https://apikey.net/api/randtext/index',
                params:{
                    key:'zOBh5wzwt7JBmPUd11pbwuNsKHUbtykZ'
                }
            }).then(res=>{
                this.saying = res.data.data
            },rej=>{
                this.saying='思路也仅仅是思路，不能赖于行走。况且也不止于一条。'
            })
        },
        getIp(){
            axios({
                method:'POST',
                url:'https://tenapi.cn/v2/getip',
            }).then(res=>{
                // this.saying = res.data.data
                this.getWeather(res.data.data.city)
            },rej=>{
                this.getWeather('北京')
            })
        },
        getWeather(city){
            axios({
                method:'POST',
                url:'https://tenapi.cn/v2/weather',
                params:{
                    city:city
                }
            }).then(res=>{
                if(res.data.code == 200){
                    let weatherData = res.data.data[0]
                    this.weather = `${ weatherData.date}--${ weatherData.city }市    天气: ${ weatherData.weather }  风向：${weatherData.wind}  污染程度：${ weatherData.airQuality }`
                }
            },rej=>{
            })
        },
        getMusic(){
            this.audioLoading = true
            axios({
                method:'GET',
                url:'https://tenapi.cn/v2/comment',

            }).then(res=>{
                this.music = res.data.data
                this.musicAudio = false
                setTimeout(() => {
                    nextTick(()=>{
                        this.musicAudio = true
                    })
                    this.audioLoading = false

                }, 500);
            },rej=>{
            })
        },
        getbackgroundImg(){
            axios({
                method:'POST',
                url:'https://tenapi.cn/v2/acg',
                params:{
                  format:'json'
                }
            }).then(res=>{
                if(res.data.code==200&& res.data.data.url){
                    let heavyImage = new Image();
                    heavyImage.src = res.data.data.url;
                    const that = this
                    heavyImage.onload = function () {
                        that.$store.commit('imgUrl/changeUrl',res.data.data.url)
                    }
                    
                }
            },rej=>{
            })
      },
    }
}
</script>

<style lang="less">

    .main-title{
        width: 100%;
        height: 40%;
        background: #fff;
        overflow: hidden;
        margin-bottom: 1%;
    }
    .main-title-left{
        padding: 20px;
        width: 50%;
        height: 100%;
        float: left;
        .title{
            margin: 0 20px;
            display: inline-block;
            font-size: 20px;
            .Icon{
                margin-right: 20px;
            }
        }
        .weather{
            margin: 20px 0;
            font-size: 18px;
        }
    }
    .saying{
        font-size: 18px;
        line-height: 20px;
        margin: 20px 0;
    }
    .main-title-right{
        float: left;
        width: 50%;
        height: 100%;
        position: relative;
        img{
            right: 0;
            top: -50%;
            position: absolute;
            width: 80%;
        }
    }
    .mainContent{
    }
    .mainContent{
        height: 57.5%;
        position: relative;
    }
    .articleProportion{
        float: left;
        background: #fff;
        display: inline-block;
        position: absolute;
        height: 100%;
        left: 0;
        width:49%;
    }
    .mainWrapper,.cardsWrapper{
        height: 100%;
    }
    .mainWrapper{
        background: rgba(0, 0, 0, 0.05);
    }
    .voice-chat-card {
        width: 300px;
        height: 40%;
        margin: 20px auto;
        border-radius: 10px;
        padding: 10px;
        background-color: #fff;
    }

.voice-chat-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin: auto;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  color: black;
  background-color: #333;
}

.username {
  margin: 0;
  font-size: 18px;
  color: black;
}

.status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  margin-left: 10px;
}

.voice-chat-card-body {
  padding: 10px;
}

.status-text {
  font-size: 14px;
  margin-bottom: 10px;
}

.audio-container {
  display: flex;
  align-items: center;
}

audio {
  width: 100%;
}
.audio{
    text-align: center;
    height: 100%;
    background: #fff;
    width: 49%;
    float: right;
    padding: 0 20px;
    .ivu-spin-fix{
        width: 50%;
        left: 50%;
    }
    .hotReview{
        width: 100%;
        height: calc(60% - 40px);
        font-size: 20px;
    }
    .hotReviewName{
        height: 20%;
    }
    .hotReviewComment{
        height: 80%;
        overflow: auto;
    }
}

</style>