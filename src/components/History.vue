<template>
  <div class="h-history">
    <template v-for="(item,index) in items">
      <a @click="skipwatch(item.videoId)">
        <div class="History-one">
          <div class="vido-img">
            <img :src="item.firstFrame">
          </div>
          <div class="vido-detailed">
            <p class="v-title">{{item.title}}</p>
            <p class="v-number">{{item.count}}次播放</p>
            <div class="teacher-time">
               <span class="fleft">{{item.userName}}</span>
               <span class="fright">{{item.longtime}}</span>
            </div>
          </div>
        </div>
        </a>
    </template>
    <!-- <router-link to="/Watch">
      <div class="History-one">
        <div class="vido-img">
          <img src="../assets/host.png">
        </div>
        <div class="vido-detailed">
          <p class="v-title">视频标题：视频标题</p>
          <p class="v-number">1111次播放</p>
          <div class="teacher-time">
             <span class="fleft">老师ID</span>
             <span class="fright">时间</span>
          </div>
        </div>
      </div>
    </router-link> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '观看历史',
        items:[/*{
            title:'视频标题：视频标题',
            play: '1111次播放',
            teacherid:'老师ID',
            time:'时间'
          },{
            title:'视频标题：视频标题2',
            play: '1111次播放',
            teacherid:'老师ID',
            time:'时间'
          }*/],
          limitge:10,
          pageye:1,
          yearclassify:'',
          subjecttopic:''
      }
    },
    created(){
      /*localStorage.getItem(name) *///取值
      var videolist = localStorage.getItem('vlist');
      var classify = localStorage.getItem('classify');  //年级
      var topic = localStorage.getItem('topic');  //科目
      console.log(videolist);
      this.yearclassify = classify;
      this.subjecttopic = topic;
      if (videolist == 1) {
          this.hostmorelist();
      }
      if (videolist == 2) {
        this.hostclasslist();
      }
      if (videolist == 3) {
        this.Historyclasslist();
      }
      if (videolist == 4) {
        this.Concernclasslist();
      }
      if (videolist == 5) {
        this.tocollectclasslist();
      }
    },
    methods: {
      hostmorelist(){
          var url ='zteng-web/tVideo/open/selectVideoList'
          var that = this
          var reqData = {};
              reqData.limit = that.limitge,
              reqData.page = that.pageye

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var date = res.body.data;
                  that.items = date;
              }else{
                  
              }
          })
      },
      hostclasslist(){
          var url ='zteng-web/tVideo/open/selectVideoListBy'
          var that = this
          var reqData = {};
              reqData.limit = that.limitge,
              reqData.page = that.pageye,
              reqData.classify = that.yearclassify,
              reqData.topic = that.subjecttopic

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var date = res.body.data;
                  that.items = date;
              }else{
                  
              }
          })
      },
      Historyclasslist(){
          var url ='zteng-web/tVideo/selectVideoListByMe'
          var that = this
          var reqData = {};
              reqData.limit= that.limitge,
              reqData.page = that.pageye

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var date = res.body.data;
                  that.items = date;
              }else{
                  
              }
          })
      },
      Concernclasslist(){
          var url ='zteng-web/tVideo/selectRelations'
          var that = this
          var reqData = {};
          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var date = res.body.data;
                  that.items = date;
              }else{
                  
              }
          })
      },
      tocollectclasslist(){
        var url ='zteng-web/tVideo/selectVideoByCollection'
        var that = this
        var reqData = {};
        reqData.limit = 10,
        reqData.page = 1
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var date = res.body.data;
                that.items = date;
            }else{
                
            }
        })
      },
      skipwatch(Id){
        var urlId = Id;
        localStorage.setItem('vid',urlId);
        this.$store.state.watchvideo = urlId;
        this.$router.push('/Watch');
        console.log(this.$store.state.watchvideo);
      }
    }
  }
</script>


<style>
  .h-history{
    width: 100%;
  }
  .History-one{
    padding: 0.3rem;
    border-bottom:1px solid #e6e6e6;
    overflow: hidden;
  }
  .vido-img{
    float: left;
    width: 35%;
    height: 1.5rem;
  }
  .vido-img img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .vido-detailed{
      margin-left: 38%;
  }
  .teacher-time{

  }
  .v-title{
    font-size: 14px;
    padding-bottom: 0.2rem;
  }
  .v-number{
    font-size: 12px;
    color: #808080;
  }
  .teacher-time{
    overflow: hidden;
    padding: 0.3rem 0 0 0;
    color: #808080;
  }
  .teacher-time span{
    font-size: 13px;
  }
  .fleft{
    float: left;
  }
  .fright{
    float: right;
  }
</style>