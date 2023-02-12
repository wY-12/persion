export default{
    namespaced:true,
    state:{
        imgUrl:'https://cdn.cdnjson.com/tvax3.sinaimg.cn/large/9bd9b167gy1g4lhmvl2vej21hc0xcqnz.jpg'
    },
    mutations:{
        changeUrl(state,newUrl){
            state.imgUrl = newUrl
        }
    },
    actions: {
        
    }
}