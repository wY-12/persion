<template>
  <div>
    <div class="main-title">
        <div v-for="(item,index) in titleData" :key="index" class="titleWarpper" :style="{width:titleWidth+'%'}">
            <div class="titleIcon" :style="{background:item.color}">
                <Icon :type="item.iconType" color="white" :size="titleWidth + 10" class="Icon"></Icon>
            </div>
            <div class="titleData">
                <div class="titleDataNum">{{ item.num }}</div>
                <div class="titleDataName">{{ item.name }}</div>
            </div>
        </div>
    </div>

    <div class="mainContent">
        <div id="articleProportion" class="articleProportion"></div>
        <div id="variationWeekly" class="variationWeekly"></div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            titleData:[
                {
                    name:'面试题数量',
                    iconType:'ios-paper',
                    num:0,
                    color:'seagreen',
                },
                {
                    name:'小技巧数量',
                    iconType:'ios-navigate',
                    num:0,
                    color:'olivedrab',
                },
                {
                    name:'文章收藏数量',
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
                        { value: 0, name: '面试题' },
                        { value: 0, name: '小技巧' },
                        { value: 0, name: '文章收藏' },
                        // { value: 484, name: 'css小技巧' },
                        // { value: 300, name: '地址收藏' }
            ],
            variationWeeklyData:{
                num:[1,2,6,5],
                time:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        }
    },
    created(){
        this.titleWidth = 100 / this.titleData.length - 1
    },
    mounted(){
        this.articleProportion = document.getElementById('articleProportion')
        this.variationWeekly = document.getElementById('variationWeekly')

        this.drawVariationWeekly(this.variationWeeklyData)
        if(window.localStorage.getItem('userId')){
            this.getTotals()
        }
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
                    lineHeight: 15,
                    rich: {
                        time: {
                            fontSize: 10,
                            color: '#999'
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
                    radius: '50%',
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
        drawVariationWeekly(data){
            let variationWeekly = this.$echarts.init(this.variationWeekly)
            if(data.num.length<7){
                let Length = data.num.length
                for(let i = 0 ;i< 7 - Length;i++){
                    data.num.push(0)
                }
            }
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                    }
                },
                title: {
                    text: '学习量',
                    left: 'center'
                },
                xAxis: [
                    {
                    type: 'category',
                    data: data.time,
                    axisPointer: {
                        type: 'shadow'
                    }
                    }
                ],
                yAxis: [
                    {
                    type: 'value',
                    name: '查看篇数',
                    min: 0,
                    max: 50,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} 篇'
                    }
                    },
                ],
                series: [
                    {
                    name: '查看篇数',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' 篇';
                        }
                    },
                    data: data.num,
                    },
                ]
            };
            variationWeekly.setOption(option)
        },
        getTotals(){
            this.$axios({
                method:'post',
                url:'http://localhost:8080/api/sysuser/getTotals',
                data:{
                    userId:window.localStorage.getItem('userId')
                }
            }).then(res=>{
                this.titleData[0].num = res.data.total
                this.articleProportionData[0].value = res.data.total
                this.drawArticleProportion(this.articleProportionData);

            })
        }
    }
}
</script>

<style lang="less">
    .main-title{
        overflow: hidden; 
        white-space: nowrap; 
        text-overflow: ellipsis; 
        justify-content: space-around;
        margin: 20px 0;
        display: flex;
        .titleWarpper{
            height: 100px;
            border: 1px solid black;
            display: flex;
            .titleIcon{
                height: 100%;
                width: 25%;
                position: relative;
                .Icon{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            .titleData{
                width: 75%;
                display: inline-block;
                overflow: hidden;
                position: relative;
                margin: 0px;
                height: 100px;
                .titleDataNum{
                    position: absolute;
                    font-size: 3vw;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-65%);

                }
                .titleDataName{
                    position: absolute;
                    bottom: 0;
                    font-size: 1vw;
                    left: 50%;
                    transform: translate(-50%);
                }
            }
        }
    }
    .mainContent{
        display: flex;
        justify-content: space-around;
    }
    .articleProportion{
        display: inline-block;
        height: 380px;
        width:40%;
        margin: 40px 40px 0 40px;
    }
    .variationWeekly{
        height: 380px;
        display: inline-block;
        width:40%;
        margin: 40px 0 0 0;


    }
    
    
</style>