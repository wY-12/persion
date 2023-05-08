<template>
  <div class="wrapper" id="wrapper">
      <div class="cardWrapper">
        <Col span="6" v-for="(item,index) in cardData" :key="index" class="card" id="cards">
          <div @click="cardDetails(item)">
            <Card>
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
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    data(){
      return {
        cardData:[
        ],
        loading:null,
        wrapper:null,
      }
    },
    watch:{
      imgUrl:{
        handler(newval,oldval){
          if(newval != oldval){
            this.wrapper.style.backgroundImage = 'url('+ this.imgUrl +')'
          }
        }
      }
    },
    computed:mapState('imgUrl',['imgUrl']),
    created(){
    },
    mounted(){
      this.$loading.install()
      this.wrapper = document.getElementById('wrapper')
      this.wrapper.style.backgroundImage = 'url('+ this.imgUrl +')'
      this.getCards()
    },
    methods:{
      cardDetails(item){
        window.open(item.url,'_blank');
      },
      getCards(){

        this.$axios.get('/api/sysuser/getCards',{},res=>{
          this.$loading.close();
          this.cardData = res
        },rej=>{
          this.$loading.close();

          this.$myMessage({
            content:rej,
            messageType:'error'
          })
        })
      },
    }
}
</script>

<style lang="less">
.wrapper{
  padding: 20px;
  width: 100%;
  background: no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;
}
.cardWrapper{
  columns: 5; // 默认列数
  column-gap: 20px; // 列间距
  // cursor: pointer;
}
.card{
  width: 100%;
  break-inside: avoid;
  margin-bottom: 10px;
  background: #000;
  margin: 2%;
  box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  transition: .2s all;
  cursor: pointer;
  align-items: center;
  text-align: center;
  font-size: 13px;
  .cardImage{
    width: 70%;
    height: 100%;
  }
}
.cardWrapper:hover .card{
  filter: blur(1px);
  opacity: .5;
  transform: scale(.98);
  box-shadow: none;
}
.cardWrapper:hover .card:hover {
  transform: scale(1);
  filter: blur(0px);
  opacity: 1;
  box-shadow: 0 8px 20px 0px rgba(0, 0, 0, 0.125);
  background: #A82C2C;
}
</style>