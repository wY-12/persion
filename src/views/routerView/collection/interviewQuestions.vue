<template>
  <div class="topTable">
    <div class="search">
      <span class="searchSpan">类型搜索：</span>
      <Select v-model="searchValue" clearable filterable style="width:200px">
          <Option v-for="(item,index) in typeList" :value="item.typeId" :key="index">{{ item.type }}</Option>
      </Select>
      
      <Button @click="search" type="primary" shape="circle" icon="ios-search" class="searchBtn"></Button>
      <Button @click="add" type="primary" shape="circle" icon="ios-add" class="addBtn"></Button>
    </div>
    

    <myTable :table-data="tableData" :title-data="tableTitle" :showHeader="false" @pageChange="pageChange"></myTable>
    <Modal v-model="modal1" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>是否确认删除当前题目</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
        </div>
    </Modal>
    <Modal v-model="popupModal" width="500">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>确认题目类型</span>
        </p>
        <div class="popupContent">
          <p>题目类型:  
            <Select v-model="popType" clearable filterable style="margin:0 20px; width:250px;">
              <Option v-for="(item,index) in typeList" :value="item.typeId" :key="index">{{ item.type }}</Option>
          </Select>
          </p>
        </div>
        <div slot="footer">
            <Button type="primary" :loading="modal_loading" @click="confirmAdd">确认添加</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import myTable from '../../../components/myTable.vue';

export default {
  components:{myTable},
  data(){
    return{
      tableData:{
        total:0,
        list:[
        ]
      },
        tableTitle:[
                    {
                        title: '题目',
                        key: 'title',
                        // fixed: 'left'
                        render:(h,params)=>{
                          return h('a',{
                            on:{
                              click:()=>{
                                this.toCheck(params.row)
                              }
                            }
                          },params.row.title)
                        }
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width: 100,
                        render:(h,params)=>{
                          let typeName = ''
                          switch(params.row.type){
                            case 1:
                              typeName = 'css';
                            break;
                            case 2:
                              typeName = 'js';
                            break;
                            case 3:
                              typeName = 'http/https';
                            break;
                            case 4:
                              typeName = 'vue';
                            break;
                            default:
                             typeName = '未知类型';
                            break;
                          }
                          return h('p',{},typeName)
                        }
                    },
                    {
                        title: '时间',
                        key: 'time',
                        width: 200
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render :(h,params)=> {
                          return h('div',[
                            h('a',{
                              style:{
                                marginRight:'10px'
                              },
                              on:{
                                click:()=>{
                                  this.toCheck(params.row)
                                }
                              }
                            },'查看'),
                            h('a',{
                              on:{
                                click:()=>{
                                  this.clickDel(true,params.row)
                                }
                              }
                            },'删除')
                          ])
                        }
                    }
  
        ],
        modal1:false,
        popupModal:false,
        popType:'',
        searchValue:'',//筛选值
        modal_loading:false,
        typeList:[],//筛选数组
        page:1,
        pageSize:10,
        nowRow:null,
    }
  },
  mounted(){
    this.getTypeList();
    this.getInterviewList();
  },
  methods:{
    del(row){
      this.modal_loading = true;
      this.$axios({
        method:'post',
        url:'http://localhost:8080/api/sysuser/delDetails',
        data:{
          id:this.nowRow.id
        }
      }).then(res=>{
        this.modal_loading = false;
        this.modal1 = false;
        this.$myMessage({
          content:'删除成功',
          messageType:'success'
        })
        this.getInterviewList()
      },rej=>{
        this.modal_loading = false;
        this.$myMessage({
          content:'删除失败',
          messageType:'error'
        })
      })



    },
    getTypeList(){
      this.$axios({
        method:'post',
        url:'http://localhost:8080/api/sysuser/getInterviewType',
        data:{
          userId:window.localStorage.getItem('userId')
        }
      }).then(res=>{
        this.typeList = res.data
      })
    },
    getInterviewList(){
      this.$axios({
        method:'post',
        url:'http://localhost:8080/api/sysuser/getInterviewTitle',
        data:{
          userId:window.localStorage.getItem('userId'),
          page:this.page,
          pageSize:this.pageSize,
          type:this.searchValue,
        }
      }).then(res=>{
        this.tableData.total = res.data.total
        this.tableData.list = res.data.data
      })
    },
    clickDel(isTrue,row){
      this.nowRow = row
      this.modal1 = isTrue
    },
    pageChange(val){
      this.page = val
      this.getInterviewList()
    },
    toCheck(row){
      this.$router.push({
        path:'/details',
        query:{
          id:row.id
        }
      })
    },
    search(){
      this.getInterviewList()

    },
    add(){
      this.popupModal = true
    },
    confirmAdd(){
        if(this.popType){
          this.popupModal = false
          this.$router.push({
            path:'/edit-details',
            query:{
              type:this.popType
            }
          })
        }else{
          this.$myMessage({
            content:'请选择类型',
            messageType:'error'
          })
        }
        
    }
      
  }
}
</script>

<style lang="less">
.topTable{
  margin: 10px;
}
.search{
  margin-bottom: 10px;
}
.search::after{
  content: '';
  margin-top: 5px;
  display: block;
  border: 0.5px solid rgba(200, 196, 196,0.5);
}
.searchSpan{
  font-size: 12px;
}
.searchBtn{
  margin-left: 20px;
}
.addBtn{
  color: #fff;
  position: relative;
  float: right;
  margin-right: 30px;
  i{
    font-size: 30px;
    position: absolute;
    top: -7px;
    left: 0;
  }
}
.popupContent{
  text-align: center;
  font-size: 14px;
  .popopInput{
    width: 80%;
  }
}
</style>