<template>
  <div id="app">
    <div class="wrapper">
        <v-hello></v-hello>
        <!-- <v-main></v-main> -->
        <!-- <router-view></router-view>
        <v-fooder></v-fooder> -->
    </div>
  </div>
</template>

<script>
    import vHello from './components/Hello.vue';
    import md5 from 'js-md5';
    /*import vMain from './components/Main.vue';*/
    /*import vFooder from './components/Fooder.vue';*/
    export default{
        data:function(){
            return{
                msg:'this is home',
                /*stringA:'',
                stringSignTemp:'',
                sign:'',
                stringB:'',
                param:'',*/
                getSignatures:'',
                prefix:'',
                Authorization:'',
                Unicode:'',  //腾讯智慧校园接口需要的参数
                newuserid:'',  //链接带过来的个人userid
                newobjectid:'',
                newobjType:'',
                userdate:[]
            }
        },
        created:function () {
            //获取链接
            this.GetRequest();
        },
        methods: {
            //处理签名
            package(){
                /*let stringA =`objType=${ num1 }&objectid=${ num2 }&openAppID=${ num3 }&timestamp=${ timestamp }`;*/
                /*var timestamp = Date.parse(new Date());*/
                /*let stringA =`devCode=3tYjQGzKXNXeNujF&devType=1&objType=1&objectid=HVMLFRjunehWsMdone&timestamp=${ timestamp }&userid=6mYY0oL6jY4done`;
*/              let stringA=this.Unicode.join("&");
                console.log(stringA);
                let stringSignTemp=`${ stringA }&key=377729078cacd0711f00d4df8df260a3`;
                let sign = md5(stringSignTemp).toUpperCase();
                let stringB = encodeURI(stringA);
                this.param = `${ stringB }&sign=${ sign }`;
                this.eventtime();
            },
            //发出请求获取智腾数据
            eventtime:function(){
                let that    = this
                /*let url     = `https://m.campus.qq.com/api/open/getObjectInfo?${ that.param }`;*/ //上级单位
                let url     = `api/open/getUserInfo?${ that.param }`; //个人数据
                /*let url     = `https://m.campus.qq.com/api/open/getAdminInfo?${ that.param }`;*/ //查看是否是管理员
                var reqData     = {}
                /*reqData.year = date.getFullYear();
                reqData.month = parseInt(date.getMonth()) + 1;*/

                that.$http.get(url,reqData,{"emulateJSON":true}).then(function (res) {
                    if(res.body.code == 0) {
                        let data    = res.body.data;
                        that.userdate = data;
                        this.login();
                        }
                    },function(res){
                        // 响应错误回调
                    });
            },
            login(){
                var url ='zteng-web/index/login'
                var that = this
                var reqData = {};
                    /*this.userid*/ //需要的参数id
                    reqData.code = that.newuserid,
                    reqData.userName = that.userdate.name,
                    reqData.headImg = that.userdate.head

                this.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                    console.log(res.body);
                    if(res.body.status == 'SUCCEED'){
                    }else{
                        
                    }
                })
            },
            //获取链接后面数据
            GetRequest:function() {
               var alerturl =  window.location.href;
               var url = location.search;  //获取url中"?"符后的字串
               /*var url ='?objType=2&objectid=EzQ319HuHN8done&openAppID=944283151634&timestamp=1517196073000&userid=07CF7A024DF102BEEAA26726901F72D2'*/
               var theRequest = new Object();
               if (url.indexOf("?") != -1) {
                  var str = url.substr(1);
                  var strs = str.split("&");
                  for(var i = 0; i < strs.length; i ++) {
                     theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                  }
               }
               this.$store.state.role = theRequest;
 
               this.newuserid = theRequest.userid;
               this.newobjectid = theRequest.objectid;
               this.newobjType = theRequest.objType;
                /*this.newuserid = '8AjnyHtUxxQdone';
               this.newobjectid = 'uLBtjuneYN9Ookdone';
               this.newobjType = 2;*/
 
            let timestamp = Date.parse(new Date());
            this.Unicode=[`timestamp=${ timestamp }`,'devCode=3tYjQGzKXNXeNujF','devType=1',`objType=${ this.newobjType }`,`objectid=${ this.newobjectid }`,`userid=${ this.newuserid }`];
            this.Unicode.sort();
            this.package();

            }
        },
        components:{
            vHello
        }
    }
</script>
<style>
    @import "./scss/rest.css";
</style>