import Vue from 'vue'
import loading from './loading.vue'
 
const PopupBox = Vue.extend(loading)
 
let instance = null
loading.install = function(dom,data) {
    instance = new PopupBox({
        data
    }).$mount()
    if(dom){
        dom.appendChild(instance.$el)
    }else{
        document.body.appendChild(instance.$el)
    }
    Vue.nextTick(() => {
        instance.isShow = true
    })
}
loading.close = function(){
    instance.isShow = false
}
export default loading