<template>
  <div class="wrapper">
      <div class="cardWrapper">
        <Col span="6" v-for="(item,index) in cardData" :key="index" class="card">
          <div @click="cardDetails(item)">
            <Card >
                <div style="text-align:center">
                  <img v-if="item.image" :src=item.image class="cardImage">
                  <h3>{{item.name}}</h3>
                  <p>{{ item.content }}</p>
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
          {
            name:'卡片',
            content:'卡片的具体内容'
          },
          {
            name:'卡片',
            content:'卡片的具体内容卡'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容卡片的具体内容'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },
          
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },
          {
            name:'卡片',
            image:'https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png',
            content:'卡片的具体内容'
          },

        ]
      }
    },
    methods:{
      cardDetails(item){
        console.log(item)
        console.log("111111")
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