<template>
    <div>
        <div class="cut-comment">
            <ul>
                <li><a @click="Smessages" :class="{PickOn : Systemmessages == 0}" href="javascript:;">回复</a></li>
                <li><a @click="Smessages" :class="{PickOn : Systemmessages == 1}" href="javascript:;">系统消息</a></li>
            </ul>
        </div>
        <router-link to="/Search" v-if="Systemmessages == 0">
            <div class="Comment-details" v-for="(item,index) in commfromme">
                <div class="Comment-head">
                    <img :src="item.commentImg">
                </div>
                <div class="Comment-Concern">
                    <div class="Commentid-time">
                        <span class="Commentid">{{item.commentName}}</span>
                        <span class="p-time">{{item.commentImg}}</span>
                    </div>
                    <!-- <p class="Comment-classify">回复：<i>夏晴</i>  {{item.commentContent}}</p> -->
                    <p class="Comment-classify">{{item.commentContent}}</p>

                </div>
            </div>
        </router-link>
         <router-link to="/public" v-if="Systemmessages == 1">
             <div class="Comment-details" v-for="(item,index) in system">
                <!-- <div class="zt-Comment-head">
                    <img :src="item.commentImg">
                </div> -->
                <div class="zt-Comment-Concern">
                    <div class="Commentid-time">
                        <span class="Commentid">{{item.title}}</span>
                        <span class="p-time">{{newtime(item.createTime)}}</span>
                    </div>
                    <p class="Comment-classify">{{item.content}}</p>
                </div>
            </div>
         </router-link>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: '消息页面',
        Systemmessages:0,
        commfromme:[],
        system:[]
      }
    },
    created(){
        this.tVideoCommFromMe();
        this.systemCommFromMe();
    },
    methods: {
        newtime:function(el){
            return moment(el).format('YYYY年MM月DD')
        },
        Smessages(){
            if (this.Systemmessages == 0) {
                this.Systemmessages = 1
                console.log(this.Systemmessages)
            }else{
                this.Systemmessages = 0
                console.log(this.Systemmessages)
            }
        },
        tVideoCommFromMe(){
        //获取评论
        var url ='zteng-web/tVideoComm/selectCommFromMe'
        var that = this
        var reqData = {};
            reqData.toReplyUid = 1

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              let data = res.body.data;
              that.commfromme = data;
            }else{
                
            }
        })
      },
      systemCommFromMe(){
        //获取评论
        var url ='zteng-web/sysmessage/selectSysmessageList'
        var that = this
        var reqData = {};

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              let data = res.body.data;
              that.system = data;
            }else{
                
            }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    .zt-Comment-head{
        float: left;
        width: 12%;
        height: 0.8rem;
    }
    .zt-Comment-head img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .zt-Comment-Concern{
        margin-left: 15%;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cut-comment{
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
    }
    .cut-comment li{
        float: left;
        width: 50%;
        text-align: center;
    }
    .cut-comment li a{
        font-size: 14px;
        line-height: 0.8rem;
        height: 0.8rem;
        padding: 0 15px;
    }
    .PickOn{
        color: #8ec220;
        border-bottom: 2px solid #8ec220;
        display: inline-block;
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
</style>
