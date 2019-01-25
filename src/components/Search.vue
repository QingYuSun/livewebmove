<template>
  <div class="s-search">
    <div class="outer-layer">
      <div class="case">
        <input type="text" name="search" placeholder="上次搜索的字段" @keyup="key($event)" v-model="search">
      </div>
      <div class="sistory-search">
        <div class="sistory-title">
          <span>历史搜索</span>
        </div>
        <div class="sistory-list">
          <a v-for="(item,index) in searchhistoyarray" @click="historysearch(item)">{{item}}</a>
        </div>
      </div>
     <!--  <div class="hot-search-layer">
        <div class="sistory-title">
          <span>热门搜索</span>
        </div>
        <div class="hot-ranking">
          <ul>
            <li><i class="pink">1</i>搜索字段</li>
            <li><i class="orange">2</i>搜索字段</li>
            <li><i class="green">3</i>搜索字段</li>
            <li><i>4</i>搜索字段</li>
            <li><i>5</i>搜索字段</li>
            <li><i>6</i>搜索字段</li>
            <li><i>7</i>搜索字段</li>
            <li><i>8</i>搜索字段</li>
            <li><i>9</i>搜索字段</li>
            <li><i>10</i>搜索字段</li>
          </ul>
        </div>
      </div> -->
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '搜索页面',
        items:[],
        search:'',
        searchhistoy:[],
        searchhistoyarray:[],
        limitge:4,
        pageye:1
      };
    },
    created(){
      this.searchhistoyarray = JSON.parse(localStorage.getItem('search'));
    },
    watch:{
      search(){
        this.research();
      }
    },
    methods: {
      historysearch(ev){
        this.search = ev;
      },
      key(e){
            var _this=this;
            if(e.keyCode=='13'){
                _this.init();
            }
        },
      init(){
        var _this=this;
        if (_this.search == '') {
          alert("搜索内容不可为空");
        }else{
          _this.searchhistoy.unshift(_this.search);
          console.log(typeof(_this.searchhistoy));
          var arr = [];
          for (var i in _this.searchhistoy) {
            if (i < 2) {
                arr.push(_this.searchhistoy[i]); //属性
            }
          }
          console.log(arr);
          _this.searchhistoyarray = arr;
          localStorage.setItem('search',JSON.stringify(arr));
        }
      },
      research(){
        var url ='zteng-web/search/findVideo'
        var that = this
        var reqData = {};
            reqData.limit = that.limitge,
            reqData.page = that.pageye,
            reqData.searchVar = that.search

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var date = res.body.data;
                that.items = date;
            }else{
                
            }
        })
      }
    }
  }
</script>


<style>
  .s-search{
    width: 100%;
    min-height: 736px;
    background-color: #fff;
  }
  .outer-layer{
    background-color: #fff;
  }
  .case{
    width: 100%;
    padding: 0.2rem 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .case input{
    width: 90%;
    margin: 0 3%;
    background-color: #f2f2f2;
    padding: 0.15rem;
    border: 0;
    border-radius: 5px;
    font-weight: 200;
    font-size: 14px;

  }
  .sistory-search{
    padding: 0.2rem 0; 
  }
  .sistory-title{
    margin: 0 3%;
    padding: 0.1rem 0 0.3rem 0;
  }
  .sistory-list{
    padding: 0 3%;
  }
  .sistory-list a{
    display: block;
    font-size: 14px;
    font-weight: 200;
    color: #7f7f7f;
    padding: 0.3rem 0;
  }
  .hot-ranking{
    padding: 0 3%;
  }
  .hot-ranking ul li{
    float: left;
    width: 42%;
    padding: 0.2rem 0;
    font-size: 16px;
    font-weight: 200;
    padding-left: 8%;
    position: relative;
  }
  .hot-ranking i{
    position: absolute;
    display: block;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #e6e6e6;
    text-align: center;
    border-radius: 10px;
    top: 0.22rem;
    color: #808080;
  }
  .hot-ranking .pink{
    background-color: #ff6269;
    color: #fff;
  }
  .hot-ranking .orange{
    background-color: #ffab63;
    color: #fff;
  }
   .hot-ranking .green{
    background-color: #d6e65f;
    color: #fff;
  }


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
</style>