var Main=Vue.component("Main",{
    template:`
    <div class="template">
        <div class="content">
            <div class="left">
                <router-view name="left"></router-view>
            </div>
            <div class="right">
                <router-view name="right"></router-view>
            </div>
        </div>
    </div>
    `,
})
var Left=Vue.component("Left",{
    data(){
        return {
            menu:""
        }

    },
    computed:{
        date(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    arr.push(this.menu[i]);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(!arr[j].child){
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i]);
                            }else{
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    created(){
        fetch('./text/menu.txt').then(function (e) {
            return e.json();
        }).then(e=>{
            this.menu=e;
        })
    },
    template:`
    <div>
        <ul> 
            <div v-for="item in date">
                <li>
                    <router-link :to="'#'+item.id"> 
                        {{item.title}}   
                    </router-link>
                </li>
                <ul> 
                    <li v-for="item1 in item.child">
                        <router-link :to="'#'+item1.id"> 
                            {{item1.title}}
                        </router-link>
                    </li>
                </ul> 
            </div>
            
        </ul>
    </div>`,

})
var Right=Vue.component("Right",{
    data(){
        return{
            data1:''
        }
    },
    mounted(){
        fetch("./text/md.txt").then(function(e){
            return e.text();
        }).then(e=>{
            this.data1 = e;
        })
    },
    template:`
    <div v-html="data1" class="markdown-body">
    </div>`,
    watch:{
        $route(){
            var num="#a"+this.$route.hash.slice(1);
            var pos=document.querySelector(num).offsetTop-20;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number:  document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
            animate();
        }
    }
})
var Quire=Vue.component("Quire",{
    data(){
        return {
            data2:"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
        }

    },
    template:`<div style="position: absolute;top:80px;">{{data2}}</div>`,
})