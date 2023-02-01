<style lang="less">
    .layout{
        height: 100%;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .ivu-row-flex{
            height: 100%;
        }
        .layout-right{
            height: 100%;
        }
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        height: calc( 100% - 130px);
        margin: 15px 15px 10px 15px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .mini-layout-text{
        display:block; 
        width:100%; 
        overflow: hidden; 
        white-space: nowrap; 
        text-overflow: ellipsis; 
        .ivu-menu-submenu-title{
            display:block; 
            width:100%; 
            overflow: hidden; 
            white-space: nowrap; 
            text-overflow: ellipsis; 
        }
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #515A6E;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        text-align: center;
        .layout-header-nav{
            display: inline-block;
        }
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        border-radius: 3px;
        margin: 15px auto;
        text-align: center;
        color: #fff;
        font-size: 22px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .layout-header-button{
        float: left;
        transform: translateY(25%);
    }
    .logout-button{
        float: right;
        margin-right: 20px;
        transform: translateY(50%);
        font-weight: bolder;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text':textHidden}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="mainPage" theme="dark" width="auto"  @on-select="jumpTo">
                    <div class="layout-logo-left">王十二</div>
                    <div v-for="(item,index) in leftMenu" :key="index">
                        <Submenu name="1" v-if="item.children" class="mini-layout-text">
                            <template slot="title">
                                <Icon :type="item.icon" :size="iconSize"></Icon>
                                <span class="layout-text" >{{ item.name }}</span>
                            </template>
                            <Menu-item v-for="(cItem,index) in item.children" :key="index" :name="cItem.urlId" class="mini-layout-text">{{ cItem.name }}</Menu-item>
                        </Submenu>
                        <Menu-item :name="item.urlId" v-else class="mini-layout-text">
                            <Icon :type="item.icon" :size="iconSize"></Icon>
                            <span class="layout-text"> {{ item.name }}</span>
                        </Menu-item>
                    </div>
                </Menu>
            </i-col>
            <i-col :span="spanRight" class="layout-right">
                <div class="layout-header">
                    <Menu mode="horizontal"  :active-name="topMenu[0].urlId" @on-select="jumpTo">
                        
                        <i-button type="text"  @click="toggleClick" class="layout-header-button">
                            <Icon type="ios-more" size="26"></Icon>
                        </i-button>
                        <!-- <div class="layout-header-nav">
                            <Menu-item v-for="(item,index) in topMenu" :key="index" :name="item.urlId">
                                <Icon type="ios-navigate"></Icon>
                                {{ item.name }}
                            </Menu-item>
                        </div> -->
                        <i-button type="text"  @click="logout" class="logout-button">
                            退出
                        </i-button>
                    </Menu>
                    
                </div>
                <div class="layout-content">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
                <div class="layout-copy">
                     {{nowData}} &copy; 王十二
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                textHidden:false,
                time:null,
                topMenu:[
                    {
                        name:'导航',
                        urlId:'top1',
                    },
                    {
                        name:'另外功能',
                        urlId:'top2',
                    },
                    {
                        name:'导航3',
                        urlId:'top3',
                    },
                    {
                        name:'导航4',
                        urlId:'top4',
                    },
                ],
                leftMenu:[
                    {
                        name:'主页',
                        icon:'ios-navigate',
                        urlId:'mainPage',
                    },
                    {
                        name:'博物馆藏品',
                        icon:'ios-keypad',
                        
                        children:[
                            {
                                name:'前端面试题',
                                urlId:'interview-questions',
                            },
                            {
                                name:'前端小技巧',
                                urlId:'antic',
                            },
                            {
                                name:'文章收藏',
                                urlId:'article-collection',
                            },
                        ]
                    },
                ],
                menuNow:['首页'],
                nowData:new Date(),
            }
        },
        mounted(){
            if(!window.localStorage.getItem('userId') || window.localStorage.getItem('user') == ''){
                this.$myMessage({
                    content:'请先登录内部用户',
                    time:2000,
                    messageType:'error'
                })
                this.$router.push('/')
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 4 ? 20 : 24;
            }
        },
        watch:{

        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                    this.textHidden = true
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                    this.textHidden = false
                }
            },
            logout(){
                this.$myMessage({
                    content:'退出成功',
                    time:2000,
                    messageType:'success'
                })
                window.localStorage.removeItem('userId')
                this.$router.push('/')
            },  
            jumpTo(to){
                console.log(to)
                this.$router.push(to)
            },
            
        }
    }
</script>
