<template>
  <div id="app">
   <div class="flexwrap">
      <header>
        <a class="title" href="">
          <img src="./images/feh-logo.png" class="logo" />
          <span>FEH Tracker</span>
        </a>
      </header>
      <main>
        <nav>
          <ul class="faux-modal">
            <li><a href="index.php?page=myUnits">My Units</a></li>
            <li><a href="index.php?page=allUnits">All Units</a></li>
            <li><a href="index.php?page=getHero">Get Hero Data</a></li>
            <li><a href="index.php?page=getHeroList">Hero List</a></li>
          </ul>
        </nav>
        <content>
          <div class="container">
            <p>
              This is the dashboard.
            </p>
          </div>
        </content>
      </main>
    </div>
    <!--
    <div v-for="(hero, idx) in heroes" v-bind:key="idx">
      <h1>{{ hero.name }}</h1>
    </div>
    -->
  </div>
</template>
<!--
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
-->

<!-- Local custom styles -->
<style src="css/style.css"></style>
<!--
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
-->