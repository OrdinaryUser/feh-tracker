<template>
  <div class="faux-modal main-modal">
    <h1 class="page-title">
      {{hero.name}}
    </h1>
  </div>
</template>

<script>
  import {db} from '../db'
  export default {
    name: 'app',

    data () {
      return { hero: { name: 'NOT LOADING' } }
    },

    firestore () {
      return {
        hero: db.collection('heroes').doc(this.$route.params.id)
      }
    }
  }
</script>
