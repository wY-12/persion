<template>
  <div>
    <Table :loading="tabLoading" :border='false' stripe  :columns="titleData" @on-row-dblclick="dblclick" :data="tableData.list" :show-header="showHeader"></Table>
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
        },
        tabLoading:{
          type:Boolean,
          default:false
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
      dblclick(val){
        this.$emit('dblclick',val)
      }
    }
}
</script>

<style lang="less">
.ivu-table{
  td{
    min-height: 46px;
  }
}

.tablePage{
  margin-top: 10px;
  text-align: end;
}
</style>