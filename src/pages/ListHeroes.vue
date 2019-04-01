<template>
  <div class="faux-modal main-modal">
    <h1 class="page-title">
      All Heroes
    </h1>
    <ul>
      <li v-for="hero in heroes" v-bind:key="hero.id">
        <router-link :to="{ name: 'hero', params: { id: hero.id } }">
          {{hero.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {db} from '../db'
  export default {
    name: 'app',

    data () {
      return { heroes: [{name: 'NOT LOADING', id: '-1'}] }
    },

    firestore: {
      heroes: db.collection('heroes')
    }
  }
</script>