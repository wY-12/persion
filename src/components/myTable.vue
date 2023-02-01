<template>
  <div>
    <Table :border='false'  :columns="titleData" :data="tableData.list" :show-header="showHeader"></Table>
    <Page :total="tableData.total" size="small" @on-change="pageChange" show-elevator class="tablePage"></Page>

  </div>
</template>

<script>
export default {
    props:{
      showHeader:{
        type:Boolean,
        default:true
      },  
        titleData:{
            type:Array,
            default:[]
        },
        tableData:{
            type:Object,
            default:{}
        }
    },
    data () {
            return {
            }
    },
    methods:{
      pageChange(val){
        this.$emit('pageChange',val)
      },
    }
}
</script>

<style lang="less">
.ivu-table{
  td{
    height: 46px;
  }
}
.tablePage{
  margin-top: 10px;
  text-align: end;
}
</style>