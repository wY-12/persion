<template>
    <div class="home">
            <input type="text" class="titleInput" placeholder="请输入标题" v-model="dataEdit.value.docxTitle"></input>
        <div class="markdownEditor">
            <mavon-editor @change="changeData" :toolbars="toolbars" v-model="dataEdit.value.docxContent" :ishljs="true" ref="md"  @save="keepContent"/>
        </div>

    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        dataEdit:{
            value:{
                docxTitle:undefined,
                docxContent:'请输入文章正文',
            },
            format_html:undefined,    //这是html结构的用于详情页展示
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        loading:null,
        
      };
    },
    mounted(){
        if(this.$route.query.detailsId){
            this.$loading.install()
            this.getDetials()
        }
    },  
    methods:{
        changeData(value, render){
        },
        keepContent(value,render){
            
            this.dataEdit.format_html = render
            if(!this.dataEdit.value.docxTitle){
                this.$myMessage({
                    content:'请输入标题后保存',
                    messageType:'error'
                })
                return
            }
            if(this.dataEdit.value.docxTitle.replace(/\s*/g,"").length>50){
                this.$myMessage({
                    content:'题目不宜过长',
                    messageType:'error'
                })
                return
            }
            //接口保存到数据库
            if(this.$route.query.detailsId){
                this.changeDetails()
            }else{
                this.addDetails()
            }
        },
        changeDetails(){
            this.$loading.install()

            let data = {
                mdContent:this.dataEdit.value.docxContent.toString(),
                content:this.dataEdit.format_html.toString(),
                title:this.dataEdit.value.docxTitle.toString(),
                id:this.$route.query.detailsId
            }
            this.$axios.post('/api/sysuser/changeDetails',data,(res)=>{
                this.$loading.close()
                this.$myMessage({
                    content:'修改成功',
                    messageType:'success'
                })
            },rej=>{
                this.$loading.close()
                this.$myMessage({
                    content:rej,
                    messageType:'error'
                })
            })
        },
        addDetails(){
            this.$loading.install()

            let data ={
                    type:this.$route.query.type,
                    mdContent:this.dataEdit.value.docxContent.toString(),
                    content:this.dataEdit.format_html.toString(),
                    title:this.dataEdit.value.docxTitle.toString(),
                    userId:window.sessionStorage.getItem('userId')
                }
            this.$axios.post('/api/sysuser/addDetails',data,(res)=>{
                this.$loading.close()
                this.$myMessage({
                    content:'添加成功',
                    messageType:'success'
                })
            },rej=>{
                this.$loading.close()
                this.$myMessage({
                    content:rej,
                    messageType:'error'
                })
            })
        },
        getDetials(){

            this.$axios.post('/api/sysuser/getDetails',
                {
                    detailsId:this.$route.query.detailsId
                },(res)=>{
                    this.dataEdit.value.docxContent = res.mdContent
                    this.dataEdit.value.docxTitle = res.title
                    this.$loading.close()
                },(rej)=>{
                    this.$loading.close()
                    this.$myMessage({
                        content:rej,
                        messageType:'error'
                    })
                }
            )
        },
    }
  };
</script>
<style lang="less">
.titleInput{
    border: none;
    border-bottom: 1px solid black;
    height: 5%;
    outline: none; 
    font-size: 24px;
    margin: 10px 10%;
    width: 80%;
    text-align: center;
    font-weight: bolder;
}
    .home{
        height: 100%;
    }
    .markdownEditor{
        height: calc(95% - 20px);
        .v-note-wrapper{
            min-height: 100%;
        }
    }
    .editTitle{
        font-size: 20px;
        font-weight: bolder;
    }
    .editKeep{
        text-align: end;
        
    }
</style>