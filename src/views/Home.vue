<template>
    <div>
        <header>
            <section>
                <h1>ToDoList</h1>
                <input type="text" placeholder="添加ToDo" v-model="todo" @keyup.enter="addToDo()">
            </section>
        </header>
        <section>
            <h2>正在进行<span>{{todoLen}}</span></h2>
            <ul>
                <li v-for="(item,index) in todoList" :key="index" v-show="!item.done">
                    <input type="checkbox" :checked="item.done" @click.stop="changeToDo(index)">
                    <p>{{item.todo}}</p>
                    <span @click="deleteToDo(index,true)">-</span>
                </li>
            </ul>
            <h2>已经完成<span>{{todoList.length-todoLen}}</span></h2>
            <ul>
                <li v-for="(item,index) in todoList" :key="index" v-show="item.done">
                    <input type="checkbox" :checked="item.done" @click.stop="changeToDo(index)">
                    <p v-if="item.done">{{item.todo}}</p>
                    <span @click="deleteToDo(index,false)">-</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import * as Utils from "../utils/utils.js"
export default {
    data() {
        return {
            todo: '',
            todoList: [],
            todoLen: 0
        }
    },
    methods: {
        //获取localstorage数据
        initTodo () {
            let todoArr = Utils.getItem('todoList');
            //判断是否可以获取到值
            if(todoArr) {
                this.todoList = todoArr;
                let doArr = this.todoList.filter(val => !val.done);
                this.todoLen = doArr.length;
            }
        },
        //添加代办事项到数组里
        addToDo() {
            //判断添加内容是否有问题
            if(this.todo === "") {
                return alert("哦偶，内容还是空的");
            }else if(this.todo.length >= 30) {
                return alert("浓缩一下词汇会更好哦" + this.todo.length);
            }
            let todoObj = {
                todo: this.todo,
                done: false
            };
            this.todoList.push(todoObj);
            Utils.setItem('todoList', this.todoList);
            this.todoLen++;
            this.todo = ""
        },
        //单选框改变时，done也改变
        changeToDo(index) {
            if(!this.todoList[index].done) {
                this.todoLen--;
                this.todoList[index].done = true;
                Utils.setItem('todoList', this.todoList)
            }else {
                this.todoLen++;
                this.todoList[index].done = false;
                Utils.setItem('todoList', this.todoList)
            } 
        },
        //删除事项
        deleteToDo(index,done) {
            if(done) {
                this.todoLen--;
            }
            this.todoList.splice(index,1);
            Utils.setItem('todoList', this.todoList);
            if(this.todoList.length === 0) {
                Utils.removeItem('todoList');
            }
        }
    },
    mounted() {
        //刷新后执行
        this.initTodo();
    }
}
</script>