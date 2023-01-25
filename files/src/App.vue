<template>
  <div id="app">
    <div>
        <h2>ToDoList</h2>
        <div>
            <input type="text" v-bind:value="value" v-on:input="Input" v-on:keypress.enter="Add">
            <button v-on:click="Add">Add</button>
        </div>
    </div>
    <div>
        <ul>
            <li v-for="(item, index) in MAINLIST" :key:="item.id">
                <div>
                    <input type="checkbox" v-on:change="Check(index, 'notDone')">
                    <span>{{ item.title }}</span>
                    <button class="btn-trash" v-on:click="Delete(index, 'notDone')">🗑️</button>
                </div>
            </li>
        </ul>
        <h2 class="h2-done">Done:</h2>
        <ul>
            <li v-for="(item, index) in doneList" :key="item.id">
                <div>
                    <input type="checkbox" checked="true" v-on:change="Check(index, 'Done')">
                    <span>{{ item.title }}</span>
                    <button class="btn-trash" v-on:click="Delete(index, 'Done')">🗑️</button>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                value: '',
                doneList: []
            }
        },
        computed: {
            ...mapGetters([
                'MAINLIST'
            ]),
        },
        methods: {
            ...mapActions([
                'SAVE_TODO'
            ]),
            Input(e) {
                this.value = e.target.value;
            },
            Add() {
                if(this.value === '') { return };
                this.mainList.push({
                    title: this.value,
                    id: Math.random()
                });
                this.value = '';
            },
            Delete(index, type) {
                const list = type === 'notDone' ? this.mainList : this.doneList;
                list.splice(index,1);
            },
            Check(index, type) {
                if(type === 'notDone') {
                    const doneTask = this.mainList.splice(index,1);
                    this.doneList.push(...doneTask);
                } else {
                    const notDoneTask = this.doneList.splice(index,1);
                    this.mainList.push(notDoneTask);
                }
            }
        },
        mounted() {
            this.GET_TODO()
        }
    }
</script>

<style>
    body {
        font-family: Consolas, monospace;
        font-size: 22px;
        text-align: center;
    }
    h2 {
        margin: 20px;
        padding-bottom: 12px;
        border-bottom-style: groove;
    }
    .h2-done {
        margin: 20px;
        padding-top: 10px;
        padding-bottom: 12px;
        padding-right: 150px;
        border-bottom-style: groove;
    }
    input {
        margin: 5px;
        font-size: 14px;
        border-color: darkgrey;
        border-width: 3px;
    }
    button {
        background-color: darkgrey;
        border: 1px solid black;
        color: white;
        padding: 8px 12px;
        font-size: 12px;
    }
    button:hover {
        background-color: black;
    }
    .btn-trash {
        padding: 4px 4px;
        background-color: white;
        border-color: white;
        font-size: 18px;
    }
    .btn-trash:hover {
        background-color: white;
    }
    li {
        display: flex;
        justify-content: center;
        height: 15px;
        margin-bottom: 25px;
        margin-right: 95px;
    }
</style>