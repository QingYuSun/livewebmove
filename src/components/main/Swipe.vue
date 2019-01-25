<template>
	<div class="Carousel">
        <mt-swipe :auto="4000">
          <mt-swipe-item><a href="javascript:;"><img src="../../assets/carousel1.png"></a></mt-swipe-item>
          <mt-swipe-item><a href="javascript:;"><img src="../../assets/carousel2.jpg"></a></mt-swipe-item>
          <mt-swipe-item><a href="javascript:;"><img src="../../assets/carousel3.png"></a></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    name: 'app',
    components: {
        
    },
    data(){
        return {
            items:[]
        }
    },
    created:function(){
        this.carousel();
    },
    methods:{
        carousel(){
            var that = this;
            var url ='zteng-web/tVideoLive/selectVideoLiveList';
            var reqData = {};
                reqData.limit = 3,
                reqData.page = 1

            that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                console.log(res.body);
                if(res.body.status == 'SUCCEED'){
                    var date = res.body.data;
                    that.items = date;
                }
            })
        }
    }
}
</script>
<style>
	.Carousel{
        height: 4rem;
    }
</style>