import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        massage:"",
        aTodos:[{value:"默认默认",id:0}],
        role:'',
        watchvideo: 0,
        videolist:0,
        classify:'小学',
        topic:'语文'

    },
    getters:{
        nCounts(state){
            return state.aTodos.length;
        }
    },
    mutations:{
        //新増 TodoList item
        ONADDTODO(state,item){
            state.aTodos.push(item);
        },
        //删除 TodoList item
        ONDELTODO(state,index){
            state.aTodos.splice(index,1);
        },
        //设置 错误提示信息
        ONERROR(state,str){
            state.massage=str;
        }
    },
    actions:{
        //提交 ONADDTODO
        onAddTodo(context,item){
            if(item.value!=""){
                context.commit("ONADDTODO",item);
                context.commit("ONERROR","");
            }else{
                context.commit("ONERROR","添加失败")
            }
        },
        //提交 ONDELTODO
        onDelTodo({commit},index){
            commit("ONDELTODO",index);
        }

    },
    modules:{}
});

export default store;