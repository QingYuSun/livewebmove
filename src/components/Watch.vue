<template>
  <div class="w-Play">
    <div class="play-area">
        <div class="shipin">
          <video id="myvideo" :src="videoinfor.url" :poster="videoinfor.firstFrame" height="100%" width="auto" controls>
          </video>
          <!-- <video id="myvideo" :src="videoSrc" :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" height="100%" width="auto" controls>
          </video> -->
          <!-- <div class="broadcast">
            <div class="suspend">
              <span class="ico ico-sound" :class="{ active: isMute }" v-on:click="playClick()"></span>
            </div>
            <div>
              <span class="ico ico-skip"></span>
            </div>
            <div>
              <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="closeSoundClick()"></span>
            </div>
          </div> -->
      </div>
    </div>
    <div v-if="Commentx == 0">
    <div class="recommend">
      <div class="my-video-details">
        <div class="my-video">
          <span>{{videoinfor.title}}</span>
        </div>
        <div class="uploadtime">
          <span>{{videoinfor.count}}次播放 上传时间：{{newtime(videoinfor.createTime)}}</span>
          <i v-bind:class="{revolvecartoon: nowActive == 1}" @click="disjianjie"></i>
        </div>
        <div class="boxnow">
            <span v-bind:class="{activescribe: nowActive == 1}">{{videoinfor.videoDescribe}}</span>
        </div>
        <div class="like">
          <span class="like-words-count">{{videoinfor.comms}}</span>
          <span v-if="licktrue == 0" @click="likeclick" class="like-count">{{videoinfor.likes}}</span>
          <span v-if="licktrue == 1" @click="likedeletelclick" class="like-count2">{{videoinfor.likes}}</span>
          <span v-if="redheart == 0" @click="collectclick" class="collect-count">收藏</span>
          <span v-if="redheart == 1" @click="collectdeletelclick" class="collect-count2">已收藏</span>
        </div>
      </div>
    </div>
    <div class="teacher-details">
      <div class="teacher-head">
        <img :src="videoinfor.headImg">
      </div>
      <div class="teacher-Concern">
        <span class="teacherid">{{videoinfor.userName}}</span>
        <p class="teacher-classify">分类：{{videoinfor.topic}}   <span>关注数：{{videoinfor.relations}}</span></p>
      </div>
      <div class="addConcern">
        <span @click="cancellick" style="background-color: #ccc;" v-if="videoinfor.isrelation == 1">已关注</span>
        <span @click="addlick" v-if="videoinfor.isrelation == 0">+关注</span>
      </div>
    </div>
    <div class="interval"></div>
    <div class="dich">
      <div class="dich-title">
        <span>为您推荐</span>
      </div>
      <div class="h-history">
      <template v-for="(item,index) in items">
            <div class="History-one" @click="cutvideid(item.videoId)">
              <div class="vido-img">
                <img :src="item.firstFrame">
              </div>
              <div class="vido-detailed">
                <p class="v-title">{{item.title}}</p>
                <p class="v-number">{{item.count}}</p>
                <div class="teacher-time">
                   <span class="fleft">{{videoinfor.userName}}</span>
                   <span class="fright">{{item.longtime}}</span>
                </div>
              </div>
            </div>
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
    </div>
    </div>
    <div>
      <div class="Comment-warp">
        <div class="Comment">
          <span>评论</span>
        </div>
        <div class="Comment-details" v-for="(cmid,index) in Commentiddata">
          <div class="Comment-head">
            <img :src="cmid.commentImg">
          </div>
          <div class="Comment-Concern">
            <div class="Commentid-time">
               <span class="Commentid" @click="transmitname(cmid.commentName,cmid.commentUid,cmid.tVideoCommId)">{{cmid.commentName}}</span>
               <span class="p-time">{{newtime(cmid.createTime)}}</span>
            </div>
            <p v-if="cmid.toReplyCommId == null" class="Comment-classify">{{cmid.commentContent}}</p>
            <p v-else class="Comment-classify">回复：<i @click="transmitname(comitem.toReplyCommName,comitem.toReplyCommId,comitem.tVideoCommId)">{{cmid.toReplyCommName}}</i>  {{cmid.commentContent}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="reply">
      <input type="text" name="text" placeholder="发言~" v-model="content">
      <a @click="VideoinsertComm">发送</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '观看页面',
        videoinfor:{}, //播放视频详情
        Commentx:0,
        videosID:0, //视频ID
        items:[], //为您推荐视频列表
        licktrue:0, //是否点赞
        Recommendlimit:4, //为您推荐的一页多少
        Recommendpage:1,  //为您推荐的一页
        Commentiddata:[],//视频评论
        content:'',
        ReplyUiddata:'',
        ReplyCommIddata:'',
        redheart:0,
        nowActive:0,
        urername:''
      };
    },
    created:function(){
      /*alert(this.$store.state.role);*/
      var vid = localStorage.getItem('vid');
      this.videosID = vid;
      this.videodata();
      this.tVideoComm();
      /*this.VideoinsertComm()*/
    },
    methods: {
      timeAgo:function (val) {
          return moment(val).fromNow()
      },
      newtime:function(el){
          return moment(el).format('YYYY-MM-DD')
      },
      disjianjie(){
        if (this.nowActive == 0) {
          this.nowActive = 1;
        }else{
          this.nowActive = 0;
        }
        
      },
      //评论切换（取消了）
      Comment(){
        this.Commentx = 0
      },
      videodata(){
        //视频详情
          var url ='zteng-web/tVideo/selectVideoByVideoId'
          var that = this
          var reqData = {};
              reqData.videoId = that.videosID,

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var data = res.body.data;
                  that.videoinfor = data;
                  that.videodatauserId();
                  that.licktrue = that.videoinfor.islike;
                  that.redheart = that.videoinfor.iscollection;
                  console.log(that.licktrue);
              }else{
                  
              }
          })
      },
      videodatauserId(){
        //视频为您推荐
          var url ='zteng-web/tVideo/selectVideoListByUserId'
          var that = this
          var reqData = {};
              reqData.videoId = that.videosID,
              reqData.limit = that.Recommendlimit,
              reqData.page = that.Recommendpage,
              reqData.userId = that.videoinfor.userId

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var data = res.body.data;
                  that.items = data;
              }else{
                  
              }
          })
      },
      addlick(){
        this.videoinfor.isrelation = 1
        var url ='zteng-web/tRelation/insertRelation'
          var that = this
          var reqData = {};
              reqData.fromUserId = this.videoinfor.userId,

          this.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  this.videoinfor.isrelation = 1
              }else{
                  
              }
          })
      },
      cancellick(){
        var url ='zteng-web/tRelation/deleteRelation'
        var that = this
        var reqData = {};
            reqData.relationId = this.videoinfor.userId,

        this.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                this.videoinfor.isrelation = 0
            }else{
                
            }
        })
      },
      likeclick(){
        //点赞
        if (this.licktrue == 0) {
          var url ='zteng-web/tVideoLikes/insertLike'
          var that = this
          var reqData = {};
              reqData.voideId = that.videosID,

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  that.licktrue = 1;
                  console.log(this.licktrue);
                  that.videoinfor.likes++;
              }else{
                  
              }
          })
        }
      },
      likedeletelclick(){
        //取消点赞
        if (this.licktrue == 1) {
          var url ='zteng-web/tVideoLikes/deleteLike'
          var that = this
          var reqData = {};
              reqData.voideId = that.videosID,

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  that.licktrue = 0;
                  console.log(this.licktrue);
                  that.videoinfor.likes--;
              }else{
                  
              }
          })
        }
      },
      collectclick(){
        //收藏
        if (this.redheart == 0) {
          var url ='zteng-web/tVideo/insertCollection'
          var that = this
          var reqData = {};
              reqData.videoId = that.videosID,

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                this.redheart = 1;
              }else{
                  
              }
          })
        }
      },
      collectdeletelclick(){
        //取消收藏
        if (this.redheart == 1) {
          var url ='zteng-web/tVideo/deleteCollection'
          var that = this
          var reqData = {};
              reqData.videoId = that.videosID,

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                this.redheart = 0;
              }else{
                  
              }
          })
        }
      },
      VideoinsertComm(){
        //评论
        var fdStart = this.content.indexOf("回复");

        var date = moment().format("YYYY-MM-DD");
        var url ='zteng-web/tVideoComm/insertComm'
        var that = this
        if(fdStart == 0){
              that.content = that.content.replace(`回复:${ that.urername }`,'');
              console.log(that.content);
              //表示strCode是以回复开头
              var reqData = {};
                  reqData.commentUid = that.videosID, //评论人id
                  reqData.commentContent = that.content,  //评论内容
                  reqData.createTime =  date,// 评论时间
                  reqData.videoId  = that.videosID,//评论视频id
                  reqData.toReplyUid = that.ReplyUiddata,
                  reqData.toReplyCommId = that.ReplyCommIddata
            }else if(fdStart == -1){
              //表示strCode不是以回复开头
              var reqData = {};
                  reqData.commentUid = that.videosID, //评论人id
                  reqData.commentContent = this.content,  //评论内容
                  reqData.createTime =  date,// 评论时间
                  reqData.videoId  = that.videosID//评论视频id
            }
        
            
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              that.content = ''
              that.tVideoComm();
            }else{
                
            }
        })
      },
      tVideoComm(){
        //获取评论
        var url ='zteng-web/tVideoComm/selectCommList'
        var that = this
        var reqData = {};
            reqData.videoId = that.videosID,

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              let data = res.body.data;
              that.Commentiddata = data;
            }else{
                
            }
        })
      },
      transmitname(name,ReplyUid,ReplyCommId){
        this.content = `回复:${ name }`;
        this.urername = name;
        this.ReplyUiddata = ReplyUid;
        this.ReplyCommIddata = ReplyCommId;
      },
      cutvideid(cutid){
        localStorage.setItem('vid',cutid);
        this.videosID = cutid;
        this.videodata();
        this.tVideoComm();
      }
    }
  }
</script>

<style>
  .play-area{
    width: 100%;
    height: 4rem;
  }
  .shipin{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    box-sizing: border-box;
    background: #000;
    cursor: pointer;
    position: relative;
  }
  #myvideo{
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .broadcast{
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    height: 20px;
    padding-left: 0.5rem;
  }
  .suspend{
    float: left;
    width: 20px;
    height: 20px;
  }
  .suspend span{
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(../assets/play.png);
    background-size: 100%;
  }

  .recommend{
    border-bottom: 1px solid #e6e6e6;
    padding: 0.1rem 0.3rem; 
  }
  .uploadtime{
    padding: 5px 0;
    font-size: 13px;
    color: #9f9f9f;
  }
  .uploadtime i{
    float: right;
    background-image: url(../assets/more_unfold.png);
    background-size: 100%;
    width: 20px;
    height: 20px;
    transform: rotate(0deg);
    transition: All 0.4s ease-in-out;
  }
  .like-words-count{
    padding-left: 30px;
    font-size: 15px;
    font-weight: 200;
    background-size: 25px;
    background-repeat: no-repeat;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-position: 1px 4px;
    background-image: url(../assets/news.png);

  }
  .like-count{
    padding-left: 30px;
    font-size: 15px;
    font-weight: 200;
    background-size: 30px;
    background-repeat: no-repeat;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-image: url(../assets/like.png);
  }
  .collect-count{
    padding-left: 30px;
    font-size: 15px;
    font-weight: 200;
    background-size: 25px;
    background-repeat: no-repeat;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-position: 0 3px;
    background-image: url(../assets/heart.png);
  }
  .collect-count2{
    padding-left: 30px;
    font-size: 15px;
    font-weight: 200;
    background-size: 25px;
    background-repeat: no-repeat;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-position: 0 3px;
    background-image: url(../assets/redheart.png);
  }
  .like-count2{
    padding-left: 30px;
    font-size: 15px;
    font-weight: 200;
    background-size: 30px;
    background-repeat: no-repeat;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-image: url(../assets/like2.png);
  }
  .teacher-details{
    padding: 0.2rem 0.3rem;
    position: relative;
    height: 0.8rem;
  }
  .teacher-head{
    float: left;
    width: 12%;
    height: 100%;
  }
  .teacher-head img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .teacher-Concern{
    margin-left: 15%;
  }
  .teacherid{
    font-size: 14px;
  }
  .teacher-classify{
    font-size: 12px;
    padding-top: 0.15rem;
    color: #9f9f9f;
  }
  .addConcern{
    position: absolute;
    right: 0.3rem;
    top: 30%;
  }
  .addConcern span{
    background-color: #ff6269;
    display: block;
    padding: 5px 7px;
    color: #fff;
    font-size: 12px;
    font-weight: 100;
    border-radius: 5px;
  }
  .interval{
    height: 15px;
    background-color: #f3f3f3;
    width: 100%;
    }
  .dich-title{
    padding: 0.1rem 0.3rem; 
  }
  .dich-title span{
    font-size: 16px;
  }
  .reply{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e6e6e6;
    background-color: #fff;
    overflow: hidden;
  }
  .reply input{
    width: 80%;
    background-color: #e6e6e6;
    border: 0;
    margin: 5px 0 5px 10px;
    padding: 5px;
    border-radius: 5px;
    float: left;
  }
  .reply a{
    width: 10%;
    background-color: #ff6269;;
    color: #fff;
    display: block;
    float: left;
    margin-top: 5px;
    margin-left: 3%;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    padding: 3px 0;
  }
  .p-time{
    float: right;
    font-size: 12px;
    color: #9f9f9f;
  }
  .Comment-classify i{
    font-style: normal;
    color: #484747;
    font-size: 14px;
  }

/*评论区域css*/
  .Comment{
    padding: 0.1rem 0.3rem; 
  }
  .Comment-details{
    padding: 0.2rem 0.3rem;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
  }
  .Comment-head{
    float: left;
    width: 8%;
    height: 0.55rem;
  }
  .Comment-head img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .Comment-Concern{
    margin-left: 12%;
  }
  .Commentid{
    font-size: 14px;
  }
  .Comment-classify{
    font-size: 12px;
    padding-top: 0.15rem;
    color: #9f9f9f;
  }


/*热门分类css*/
  .h-history{
    width: 100%;
  }
  .History-one{
    padding: 0.3rem;
    border-bottom:1px solid #e6e6e6;
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
  .Comment-warp{
    margin-bottom: 60px;
  }
  .boxnow span{
    font-size: 12px;
    display: none;
    overflow: hidden;
    transition: height 0.5s;
  }
  .boxnow span.activescribe {
    display: block;
  }
  .uploadtime i.revolvecartoon{
    transform: rotate(180deg);
    transition: All 0.4s ease-in-out;
  }
</style>