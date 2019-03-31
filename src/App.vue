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
            <h1>Heroes</h1>
            <ul>
              <li v-for="(hero, idx) in heroes" v-bind:key="idx">
                {{hero.name}}
              </li>
            </ul>
          </div>
        </content>
      </main>
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

<!-- Local custom styles -->
<style src="css/style.css"></style>