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
            background: rgba(0, 0, 0, 0.05);
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
    .layout-logo-left-img{
        width: 80%;
        height: 110%;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #000;
    }
    .layout-menu-left{
        background: #515A6E;
        position: relative;
        .card {
            position: absolute;
            width: 90%;
            height: 40%;
            background: rgba(0, 0, 0, 0);
            border-radius: 10px;
            text-align: center;
            transition: all 0.5s;
            bottom: 5%;
            left: 5%;
        }

        .card:hover {
            box-shadow: 0 1px 20px 1px rgba(0, 0, 0, 0.6);
        }

        .card .blob {
            height: 10px;
            width: 75%;
            border-radius: 0 0 30px 30px;
            margin: 0 auto;
            // background-color: #4bb8ff;
            visibility: visible;
            transition: all 0.3s;
        }

        .card:hover .blob {
            height: 0;
        }

        .card .img {
            display: flex;
            margin: 0 auto;
            width: 80%;
            border-radius: 50%;
            font-size: 11px;
            justify-content: center;
            align-items: center;
            transition: all 0.5s;
        }

        .card:hover .img {
            width: 100%;
            height: 70%;
            border-radius: 10px 0 0;
            margin: 0 auto;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 99999;
        }

        .card h2 {
            padding: 0 10px;
            font-size: 25px;
            transition: all 0.1s;
            z-index: -99;
            color: #fff;
            line-height: 17px;
        }

        .card span {
            margin-top: 5px;
            font-size: 12px;
        }

        .card:hover h2 {
            opacity: 0;
            width: 100%;
            position: absolute;
            transition: all 0.5s;
            color: #000;
        }

        .card>p {
            opacity: 0;
            transition: all 0.75s;
        }

        .card>p>svg {
            padding: 5px;
            cursor: pointer;
        }

        .card:hover>p {
            position: absolute;
            display: flex;
            width: 100%;
            justify-content: center;
            opacity: 1;
            transition: all 0.1s;
            bottom: 5%;
        }
        .weixin{
            position: absolute;
            width: 80%;
            height: 60%;
            bottom: 0%;
            left: 80%;
            z-index: 9999;
            display: none;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .weixinShow{
            display: block;
        }
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
        height: 40px;
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
    .textPadding{
        padding-left: 15px!important;
    }
    /* Hide the default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .container {
        display: inline-block;
        width: 50px;
        float: left;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        height: 50%;
        top: 50%;
        left: 0;
        transform: translate(0,-50%);
        user-select: none;
    }

    .checkmark {
        position: relative;
        top: 0;
        left: 0;
        height: 1.3em;
        width: 1.3em;
    }

    .checkmark span {
    width: 32px;
    height: 2px;
    background-color: #000;
    position: absolute;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    }

    .checkmark span:nth-child(1) {
    top: 10%;
    }

    .checkmark span:nth-child(2) {
    top: 50%;
    }

    .checkmark span:nth-child(3) {
    top: 90%;
    }

    .container input:checked + .checkmark span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    -webkit-transform: translateY(-50%) rotate(45deg);
    -moz-transform: translateY(-50%) rotate(45deg);
    -ms-transform: translateY(-50%) rotate(45deg);
    -o-transform: translateY(-50%) rotate(45deg);
    }

    .container input:checked + .checkmark span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
    -webkit-transform: translateY(-50%) rotate(-45deg);
    -moz-transform: translateY(-50%) rotate(-45deg);
    -ms-transform: translateY(-50%) rotate(-45deg);
    -o-transform: translateY(-50%) rotate(-45deg);
    }

    .container input:checked + .checkmark span:nth-child(3) {
    transform: translateX(-50px);
    -webkit-transform: translateX(-50px);
    -moz-transform: translateX(-50px);
    -ms-transform: translateX(-50px);
    -o-transform: translateX(-50px);
    opacity: 0;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text':textHidden}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name='activeName' :open-names='openNames' theme="dark" width="auto"  @on-select="jumpTo">
                    <div class="layout-logo-left">
                        <img src="../assets/loginTitle-fff.png" class="layout-logo-left-img"/>
                    </div>
                    <div v-for="(item,index) in leftMenu" :key="index">
                        <Submenu name="1" v-if="item.children" class="mini-layout-text">
                            <template slot="title">
                                <Icon :type="item.icon" :size="iconSize"></Icon>
                                <span class="layout-text" >{{ item.name }}</span>
                            </template>
                            <Menu-item v-for="(cItem,index) in item.children" :key="index" :name="cItem.urlId" class="mini-layout-text" :class='{textPadding:spanLeft === 2}'>{{ cItem.name }}</Menu-item>
                        </Submenu>
                        <Menu-item :name="item.urlId" v-else class="mini-layout-text">
                            <Icon :type="item.icon" :size="iconSize"></Icon>
                            <span class="layout-text"> {{ item.name }}</span>
                        </Menu-item>
                    </div>
                </Menu>
                <div class="card" >
                    <div class="img" id="img"></div>
                    <h2>王十二<br><br><span class="subtitle">一个刚入门的萌新程序员</span></h2>
                    <p>
                        <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" class="icon" @click="toGit">
                            <path d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z" fill="#f0f0f0"></path>
                        </svg>
                        <svg @mouseenter="weixinSvgEnt"  @mouseleave="weixinSvgOut" t="1675607265741" class="icon weixinSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6592" width="40" height="40"><path d="M465.454545 365.381818c0-18.618182 16.290909-34.909091 34.909091-34.909091s34.909091 16.290909 34.909091 34.909091-16.290909 34.909091-34.909091 34.909091-34.909091-16.290909-34.909091-34.909091z m-139.636363-34.909091c-18.618182 0-34.909091 16.290909-34.909091 34.909091s16.290909 34.909091 34.909091 34.909091 34.909091-16.290909 34.909091-34.909091-16.290909-34.909091-34.909091-34.909091z m256 179.2c-16.290909 0-27.927273 13.963636-27.927273 27.927273 0 16.290909 13.963636 27.927273 27.927273 27.927273 16.290909 0 27.927273-13.963636 27.927273-27.927273 2.327273-13.963636-11.636364-27.927273-27.927273-27.927273z m384 2.327273c0 251.345455-202.472727 453.818182-453.818182 453.818182S58.181818 763.345455 58.181818 512 260.654545 58.181818 512 58.181818 965.818182 260.654545 965.818182 512z m-539.927273 137.309091c-4.654545-16.290909-9.309091-34.909091-9.309091-53.527273 0-109.381818 104.727273-197.818182 237.381818-197.818182h13.963637c-18.618182-102.4-125.672727-181.527273-256-181.527272-144.290909 0-258.327273 97.745455-258.327273 216.436363 0 65.163636 34.909091 123.345455 88.436364 162.909091 4.654545 2.327273 6.981818 9.309091 6.981818 13.963637v4.654545c-4.654545 16.290909-11.636364 41.890909-11.636364 44.218182 0 2.327273-2.327273 4.654545-2.327273 6.981818 0 4.654545 4.654545 9.309091 9.309091 9.309091 2.327273 0 2.327273 0 4.654546-2.327273l55.854545-32.581818c4.654545-2.327273 9.309091-4.654545 13.963637-4.654545h6.981818c25.6 6.981818 55.854545 11.636364 83.781818 11.636363 6.981818 2.327273 11.636364 2.327273 16.290909 2.327273z m444.509091-51.2c0-100.072727-97.745455-179.2-216.436364-179.2-118.690909 0-216.436364 81.454545-216.436363 179.2 0 100.072727 97.745455 179.2 216.436363 179.2 25.6 0 48.872727-4.654545 69.818182-9.309091h6.981818c4.654545 0 6.981818 2.327273 11.636364 2.327273l46.545455 27.927272c2.327273 0 2.327273 2.327273 4.654545 2.327273 4.654545 0 6.981818-2.327273 6.981818-6.981818v-4.654545s-6.981818-23.272727-9.309091-37.236364v-4.654546c0-4.654545 2.327273-9.309091 6.981818-11.636363 44.218182-34.909091 72.145455-83.781818 72.145455-137.309091z m-144.290909-88.436364c-16.290909 0-27.927273 13.963636-27.927273 27.927273 0 16.290909 13.963636 27.927273 27.927273 27.927273 16.290909 0 27.927273-13.963636 27.927273-27.927273 2.327273-13.963636-11.636364-27.927273-27.927273-27.927273z" fill="#e6e6e6" p-id="6593"></path></svg>

                        <div class="weixin" :class="{weixinShow:weixinShow}">
                            <img src="../assets/weixin.jpg" alt="">
                         </div>
                    </p>
                </div>
            </i-col>
            <i-col :span="spanRight" class="layout-right">
                <div class="layout-header">
                    <Menu mode="horizontal"  :active-name="topMenu[0].urlId" @on-select="jumpTo">
                        <label class="container" >
                            <input type="checkbox" @click="toggleClick">
                            <div class="checkmark">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </label>
                        <!-- <div class="layout-header-nav">
                            <Menu-item v-for="(item,index) in topMenu" :key="index" :name="item.urlId">
                                <Icon type="ios-navigate"></Icon>
                                {{ item.name }}
                            </Menu-item>
                        </div> -->
                        
                        <i-button v-if="logined"  type="text"  @click="logout" class="logout-button">
                            退出
                        </i-button>
                        <i-button v-else type="text"  @click="login" class="logout-button">
                            登录
                        </i-button>
                    </Menu>
                    
                </div>
                <div class="layout-content">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" />
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive" />
                </div>
                <div class="layout-copy">
                     {{nowData}} &copy; 王十二
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import programmer from '../assets/programmer.json';
    import lottie from 'lottie-web'
    export default {
        data () {
            return {
                spanLeft: 3,
                spanRight: 21,
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
                                name:'地址收藏',
                                urlId:'article-collection',
                            },
                        ]
                    },
                    {
                        name:'代码编辑器',
                        icon:'ios-cog',
                        urlId:'codeEditor',
                        superMenu:true
                    },
                ],
                logined:false,
                menuNow:['首页'],
                nowData:new Date(),
                activeName:'',
                openNames:['1'],
                weixinShow:false
            }
        },
        mounted(){
            this.logined = false
            if(window.sessionStorage.getItem('userId')){
                this.logined = true
            }
            this.activeName = this.$route.name
            const animation = lottie.loadAnimation({
                container: document.getElementById('img'), // 绑定dom节点
                renderer: 'svg', // 渲染方式:svg、canvas
                loop: true, // 是否循环播放，默认：false
                autoplay: true, // 是否自动播放, 默认true
                animationData:programmer // AE动画使用bodymovie导出为json数据
            })
            if(this.$route.name == 'details'){
                this.activeName = 'interview-questions'
            }
            // if(!window.sessionStorage.getItem('userId') || window.sessionStorage.getItem('user') == ''){
            //     this.$myMessage({
            //         content:'请先登录内部用户',
            //         time:2000,
            //         messageType:'error'
            //     })
            //     this.$router.push('/')
            // }
            for(let i = 0;i<this.leftMenu.length;i++){
                if(this.leftMenu[i].children){
                    for(let j = 0;j<this.leftMenu[i].children.length;j++){
                        if(this.leftMenu[i].children[j].superMenu && window.sessionStorage.getItem('isSuper') != 1){
                            this.leftMenu[i].children.splice(j,1)
                        }
                    }
                }else{
                    if(this.leftMenu[i].superMenu && window.sessionStorage.getItem('isSuper') != 1){
                        this.leftMenu.splice(i,1)
                    }
                }
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 3 ? 20 : 24;
            }
        },
        watch:{

        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 3) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                    this.textHidden = true
                } else {
                    this.spanLeft = 3;
                    this.spanRight = 21;
                    this.textHidden = false
                }
            },
            logout(){
                this.logined = false
                this.$myMessage({
                    content:'退出成功',
                    time:2000,
                    messageType:'success'
                })
                window.sessionStorage.clear()
                location.replace('/')
            },  
            login(){
                this.$router.push('/login')
            },
            toGit(){
                window.open('https://github.com/wY-12','_blank');
            },
            weixinSvgEnt(){
                this.weixinShow = true
            },
            weixinSvgOut(){
                this.weixinShow = false
            },  
            jumpTo(to){
                this.$router.push(to)
            },
            
        }
    }
</script>
