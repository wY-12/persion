import Vue from 'vue'
import myMessage from './myMessage.vue'
 
const PopupBox = Vue.extend(myMessage)
 
myMessage.install = function(data) {
    let instance = new PopupBox({
        data
    }).$mount()
    document.body.appendChild(instance.$el)
    if(!instance.time){
        instance.time = 2000
    }
    Vue.nextTick(() => {
        instance.isShow = true
        setTimeout(() => {
            instance.topNum = '-50px' 
        }, instance.time - 500);
        setTimeout(() => {
            instance.isShow = false
        }, instance.time);
    })
}
export default myMessage