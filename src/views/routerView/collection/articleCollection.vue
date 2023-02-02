<template>
  <div class="wrapper">
      <div class="cardWrapper">
        <Col span="6" v-for="(item,index) in cardData" :key="index" class="card">
          <div @click="cardDetails(item)">
            <Card >
                <div style="text-align:center">
                  <img v-if="item.img" :src=item.img class="cardImage">
                  <h3>{{item.title}}</h3>
                  <p>{{ item.introduction }}</p>
              </div>
            </Card>
          </div>
        </Col>
      </div>
      
  </div>
</template>

<script>
export default {
    data(){
      return {
        cardData:[
        ]
      }
    },
    mounted(){
      this.getCards()
    },
    methods:{
      cardDetails(item){
        window.open(item.url,'_blank');
      },
      getCards(){
        this.$axios({
                method:'get',
                url:'http://45.77.181.240:8080/api/sysuser/getCards',
            }).then(res=>{
                this.cardData = res.data
            })
      }
    }
}
</script>

<style lang="less">
.wrapper{
  padding: 20px;
}
.cardWrapper{
  columns: 5; // 默认列数
  column-gap: 20px; // 列间距
  cursor: pointer;
}
.card{
  width: 100%;
  break-inside: avoid;
  margin-bottom: 10px;
  .cardImage{
    width: 70%;
    height: 100%;
  }
}
</style>