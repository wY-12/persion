<template>
    <div id="container"></div>
</template>

<script>
import 'echarts-gl';
import moonBase from '../../../assets/moon-base.jpg'
import moonBump from '../../../assets/moon-bump.jpg'
import starfield from '../../../assets/starfield.jpg'
export default {
    
    data(){
        return{
            container:null,
            loading:null
        }
        
    },
    created(){
        this.$loading.install()
    },
    mounted(){
        setTimeout(() => {
            this.$loading.close()
        }, 2000);
        this.container = document.getElementById('container')
        this.init()
        
    },
    methods:{
        init(){
            let container = this.$echarts.init(this.container)
            let option = {
                globe: {
                    baseTexture:moonBase,
                    heightTexture:moonBump,
                    displacementScale: 0.05,
                    displacementQuality: 'medium',
                    environment: starfield,
                    shading: 'realistic',
                    realisticMaterial: {
                        roughness: 0.8,
                        metalness: 0
                    },
                    postEffect: {
                    enable: true,
                    SSAO: {
                        enable: true,
                        radius: 2,
                        intensity: 1,
                        quality: 'high'
                    }
                    },
                    temporalSuperSampling: {
                        enable: true
                    },
                    light: {
                        ambient: {
                            intensity: 0
                        },
                        main: {
                            intensity: 2,
                            shadow: true
                        },
                        // ambientCubemap: {
                        //     // texture: pisa,
                        //     exposure: 0,
                        //     diffuseIntensity: 0.02
                        // }
                    },
                    viewControl: {
                        autoRotate: false
                    }
                },
                series: []
                };
            container.setOption(option)
            
            
        }
    }

}
</script>

<style>
#container{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>