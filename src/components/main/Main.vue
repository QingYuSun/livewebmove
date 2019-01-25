<template>
    <div class="main-warp">
        <div class="zt-main">
            <div class="zt-logo-header">
                <a class="showuser" v-show ="!show" href="javascript:;" @click="usertrue"></a>
                <a class="noshowuser" v-show ="show" href="javascript:;" @click="userfalse"></a> 
                <div class="zt-logo">
                    <img src="../../assets/zteng.png">
                </div>
            </div>
            <div class="zt-classify">
                <div class="zt-recommend">
                    <ul>
                        <template v-for="(item,index) in classdate">
                            <li :class="{active : activeIndex == item.index}" @click="selected(item)">{{item.type}}</li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
            <div class="Carousel-warp">
                 <template v-if="activeIndex == 0">
                    <v-swipe></v-swipe>
                </template>
                <div class="Carousel-sub" v-if="activeIndex != 0">
                    <mt-swipe :auto="0">
                      <mt-swipe-item>
                        <ul class="subclassification">
                            <li v-for="(item,index) in property" v-if="index < 8">
                                <a @click="selectVideoListBy(item.childrenname)">
                                    <div class="subclass">
                                        <img :src="item.childrenimg">
                                    </div>
                                    <span>{{item.childrenname}}</span>
                                </a>
                            </li>
                        </ul>
                      </mt-swipe-item>
                      <mt-swipe-item>
                          <ul class="subclassification">
                            <li v-for="(item,index) in property" v-if="index > 7">
                                <a @click="selectVideoListBy(item.childrenname)">
                                    <div class="subclass">
                                        <img :src="item.childrenimg">
                                    </div>
                                    <span>{{item.childrenname}}</span>
                                </a>
                            </li>
                        </ul>
                      </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        <div class="interval"></div>
        <div class="hottest">
            <div class="hottest-title">
                <span>最热</span>
                <a @click='morehottest'>更多</a>
            </div>
            <div class="hottest-list">
                <ul>
                    <router-link to="/Watch" v-for="(item,index) in hotline">
                        <li @click="videourl(item.videoId)">
                            <div class="ztlist-img">
                                <img :src="item.firstFrame">
                                <span class="teacher-name">{{item.userName}}<i></i></span>
                                <span class="number-look">{{item.count}}<i></i></span>
                            </div>
                            <span class="video-title">{{item.title}}</span>
                        </li>
                    </router-link>
                    <!-- <li>
                        <div class="ztlist-img">
                            <img src="../../assets/host.png">
                            <span class="teacher-name">老师名字</span>
                            <span class="number-look">人数</span>
                        </div>
                        <span class="video-title">视频标题:视频标题</span>
                    </li>
                    <li>
                        <div class="ztlist-img">
                            <img src="../../assets/host.png">
                            <span class="teacher-name">老师名字</span>
                            <span class="number-look">人数</span>
                        </div>
                        <span class="video-title">视频标题:视频标题</span>
                    </li>
                    <li>
                        <div class="ztlist-img">
                            <img src="../../assets/host.png">
                            <span class="teacher-name">老师名字</span>
                            <span class="number-look">人数</span>
                        </div>
                        <span class="video-title">视频标题:视频标题</span>
                    </li> -->
                </ul>
            </div>
        </div>
        <!-- <div class="hottest">
            <div class="hottest-title">
                <span class="playico">热门子分类</span>
                <a href="">更多</a>
            </div>
        </div> -->
        <div v-show ="show" class="user-display" @click="userfalse">
             <router-link to="/Search">搜索</router-link>
             <!-- <router-link to="/History">观看历史</router-link> -->
             <a @click="Historyclick">观看历史</a>
            <!-- <router-link to="/History">关注</router-link> -->
            <a @click="Concernclick">关注</a>
            <router-link to="/Message">消息</router-link>
            <!-- <router-link to="/History">收藏</router-link> -->
            <a @click="tocollect">收藏</a>
        </div>
    </div>
</template>

<script>
 
/*import calendar from './calendar.vue'*/
import vSwipe from './Swipe.vue';
import auth from '../../js/auth';
var menus = [
        {
            index:0,
            type:'推荐',
        },
        {
            index:1,
            type:'小学'
        },
        {
            index:2,
            type:'初中'
        },
        {
            index:3,
            type:'高中'
        }/*,
        {
            index:4,
            type:'精英'
        }*/
    ]
export default {
    name: 'app',
    components: {
        vSwipe
    },
    data(){
        return {
            classdate:menus,
            activeIndex:0,
            show: false,
            property:[],
            aaaa:[[{
                childrenimg: require('../../assets/Chinese.png'),
                childrenname:'语文'
                },{
                    childrenimg: require('../../assets/mathematics.png'),
                    childrenname:'数学'
                },{
                    childrenimg: require('../../assets/English.png'),
                    childrenname:'英语'
                },{
                    childrenimg: require('../../assets/Geography.png'),
                    childrenname:'自然'
                },{
                    childrenimg: require('../../assets/other.png'),
                    childrenname:'其他'
                }],[{
                    childrenimg: require('../../assets/Chinese.png'),
                    childrenname:'语文'
                },{
                    childrenimg: require('../../assets/mathematics.png'),
                    childrenname:'数学'
                },{
                    childrenimg: require('../../assets/English.png'),
                    childrenname:'英语'
                },{
                    childrenimg: require('../../assets/politics.png'),
                    childrenname:'政治'
                },{
                    childrenimg: require('../../assets/Geography.png'),
                    childrenname:'地理'
                },{
                    childrenimg: require('../../assets/history.png'),
                    childrenname:'历史'
                },{
                    childrenimg: require('../../assets/organism.png'),
                    childrenname:'生物'
                },{
                    childrenimg: require('../../assets/Physics.png'),
                    childrenname:'物理'
                },{
                    childrenimg: require('../../assets/chemistry.png'),
                    childrenname:'化学'
                },{
                    childrenimg: require('../../assets/other.png'),
                    childrenname:'其他'
                }],[{
                    childrenimg: require('../../assets/Chinese.png'),
                    childrenname:'语文'
                },{
                    childrenimg: require('../../assets/mathematics.png'),
                    childrenname:'数学'
                },{
                    childrenimg: require('../../assets/English.png'),
                    childrenname:'英语'
                },{
                    childrenimg: require('../../assets/politics.png'),
                    childrenname:'政治'
                },{
                    childrenimg: require('../../assets/Geography.png'),
                    childrenname:'地理'
                },{
                    childrenimg: require('../../assets/history.png'),
                    childrenname:'历史'
                },{
                    childrenimg: require('../../assets/organism.png'),
                    childrenname:'生物'
                },{
                    childrenimg: require('../../assets/Physics.png'),
                    childrenname:'物理'
                },{
                    childrenimg: require('../../assets/chemistry.png'),
                    childrenname:'化学'
                },{
                    childrenimg: require('../../assets/other.png'),
                    childrenname:'其他'
                }]
            ],
            hotline:[],
            limitge:6,
            pageye:1,
        }
    },
    created:function(){
        /*setInterval(this.Carouseltime,5000);*/
        this.limit();
        /*this.upvideo();*/
    },
    methods:{
        selected:function(item){
            this.activeIndex = item.index
            if (item.index !=0) {
                this.property = this.aaaa[item.index-1]
            }
        },
        usertrue:function(){
            this.show = true;
        },
        userfalse:function(){
            this.show = false
        },
        limit(){
            var url ='zteng-web/tVideo/open/selectVideoList'
            var that = this
            var reqData = {};
                reqData.limit = that.limitge,
                reqData.page = that.pageye

            that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                console.log(res.body);
                if(res.body.status == 'SUCCEED'){
                    var date = res.body.data;
                    that.hotline = date;
                    console.log(JSON.stringify(that.hotline));
                }else{
                    
                }
            })
        },
        newtime:function(el){
            return moment(el).format('YYYY年MM月DD')
        },
        videourl(Id){
            var urlId = Id;
            localStorage.setItem('vid',urlId);
            this.$store.state.watchvideo = urlId;
            console.log(this.$store.state.watchvideo);
        },
        morehottest(){
            //热门点进去视频列表页面
            localStorage.setItem('vlist',1)
            this.$store.state.videolist = 1;
            if (this.$store.state.videolist == 1) {
                this.$router.push('/History');
            }
        },
        selectVideoListBy(classify){
            //分类点进视频列表页面
            localStorage.setItem('vlist',2)
            this.$store.state.videolist = 2;
            localStorage.setItem('classify',classify)
            this.$store.state.classify = classify;
            if (this.activeIndex == 1) {
                localStorage.setItem('topic','小学')
                this.$store.state.topic = '小学';
            }
            if (this.activeIndex == 2) {
                localStorage.setItem('topic','初中')

                this.$store.state.topic = '初中';
            }
            if (this.activeIndex == 3) {
                localStorage.setItem('topic','高中')

                this.$store.state.topic = '高中';
            }
            
            if (this.$store.state.videolist == 2) {
                this.$router.push('/History');
            }
        },
        Historyclick(){
            localStorage.setItem('vlist',3)
            this.$store.state.videolist = 3;
            if (this.$store.state.videolist == 3) {
                this.$router.push('/History');
            }
        },
        Concernclick(){
            localStorage.setItem('vlist',4)
            this.$store.state.videolist = 4;
            if (this.$store.state.videolist == 4) {
                this.$router.push('/History');
            }
        },
        tocollect(){
            localStorage.setItem('vlist',5)
            this.$store.state.videolist = 5;
            if (this.$store.state.videolist == 5) {
                this.$router.push('/History');
            }
        }
    }
}
</script>

<style>
    .main-warp{
        width: 100%;
    }
    .zt-main{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
    }
    .zt-logo-header{
        width: 100%;
        height: 0.8rem;
        background-color: rgba(51,51,51,1);
    }
    .showuser{
        display: block;
        float: left;
        width: 0.8rem;
        height: 100%;
        background-image: url(../../assets/user.png);
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .noshowuser{
        display: block;
        float: left;
        width: 0.8rem;
        height: 100%;
        background-image: url(../../assets/dislodge.png);
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .zt-logo{
        width: 2rem;
        height: 100%;
        margin: 0 auto;
    }
    .zt-logo img{
        width: 100%;
        height: 100%;
    }
    .zt-classify{
        width: 100%;
        height: 0.8rem;
        background-color: #fff;
    }
    .zt-classify{
        
    }
    .zt-recommend{
        width: 96%;
        margin: 0 auto;
    }
    .zt-recommend ul li{
        width: 25%;
        float: left;
        line-height: 0.8rem;
        height: 0.8rem;
        text-align: center;
        font-size: 15px;
    }
    .active{
        color: #8ec222;
        border-bottom: 3px solid #8ec222;
        box-sizing: border-box;
    }
    .Carousel-warp{
        width: 100%;
        margin-top: 1.6rem;
    }
    .Carousel-warp a{
        display: block;
        width: 100%;
        height: 100%;
    }
    .Carousel-warp a img{
        width: 100%;
        height: 100%;
    }
    .Carousel-sub{
        height: 5rem;
        overflow: hidden;
    }
    


    .hottest{
        background-color: #fff;
        width: 100%;
    }
    .hottest-title{
        padding: 0 0.1rem;
        overflow: hidden;
    }
    .hottest-title span{
        float: left;
        height: 0.8rem;
        line-height: 0.8rem;
        background-repeat: no-repeat;
        background-size: 0.5rem;
        padding-left: 0.5rem;
        background-position: 0 0.1rem;
        background-image: url(../../assets/fire.png);
    }
    .hottest-title .playico{
        float: left;
        height: 0.8rem;
        line-height: 0.8rem;
        background-repeat: no-repeat;
        background-size: 0.5rem;
        padding-left: 0.5rem;
        background-position: 0 0.18rem;
        background-image: url(../../assets/playico.png);
    }
    .hottest-title a{
        float: right;
        height: 0.8rem;
        line-height: 0.8rem;
        background-repeat: no-repeat;
        background-size: 0.5rem;
        padding-right: 0.5rem;
        background-position: right;
        background-image: url(../../assets/more.png);
    }
    .hottest-list{
        margin: 0 0.1rem;
        overflow: hidden;
    }
    .hottest-list ul li{
        float: left;
        width: 48%;
        margin: 0 1%;
        margin-bottom: 0.2rem;
    }
    .ztlist-img{
        width: 100%;
        height: 2.4rem;
        position: relative;
    }
    .ztlist-img img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
    .video-title{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 16px;
    }
    .teacher-name{
        position: absolute;
        bottom: 0.1rem;
        left: 0;
        font-size: 14px;
        color: #fff;
        font-weight: 100;
    }
    .teacher-name i{
        float: left;
        width: 0.3rem;
        height: 0.4rem;
        padding-left: 10px;
        background-image: url(../../assets/headico.png);
        background-size: 60%;
        background-position: 6px 2px;
        background-repeat: no-repeat;
    }
    .number-look{
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        color: #fff;
        font-weight: 100;
        display: block;
        line-height: 0.4rem;
        width: 1.5rem;
        text-align: left;
        background: -webkit-linear-gradient(45deg, #0000, #000);
        background: linear-gradient(45deg, #0000, #000);
        border-top-right-radius: 10px;
    }
    .number-look i{
        float: left;
        width: 0.6rem;
        height: 0.4rem;
        padding-left: 10px;
        background-image: url(../../assets/eye.png);
        background-size: 40%;
        background-position: 0.4rem 1px;
        background-repeat: no-repeat;
    }

    .user-display{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color:rgba(0, 0, 0, 0.5);
        margin-top: 0.8rem;
        z-index: 100;
        text-align: center;
        padding-top: 0.5rem;
    }
    .user-display a{
        display: table;
        color: #fff;
        padding: 0.5rem 0;
        font-weight: 200;
        margin: 0 auto;
    }

    .subclassification{
        margin: 0.2rem -0.1rem;
        text-align: center;
    }
    .subclassification li{
        float: left;
        padding: 0.2rem 0.36rem;
    }
    .subclassification li span{
        font-size: 16px;
        line-height: 0.7rem;
        height: 0.7rem;
    }
    .subclass{
        width: 1.2rem;
        height: 1.2rem;
    }
    .subclass img{
        width: 100%;
        height: 100%;
        border-radius: 0.6rem;
    }
    .interval{
        height: 15px;
        background-color: #f3f3f3;
        width: 100%;
    }
</style>