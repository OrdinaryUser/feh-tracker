<template>
  <div id="app">
    <div v-for="(hero, idx) in heroes" v-bind:key="idx">
      <h1>{{ hero.name }}</h1>
    </div>
  </div>
</template>

<script>
  import {db} from './db'
  export default {
    name: 'app',

    data () {
      return { heroes: [{name: 'NOT LOADING'}] }
    },

    firestore: {
      heroes: db.collection('heroes')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
