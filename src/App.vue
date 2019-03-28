<!-- App.vue
  This component is the root component for our Vue application. It is rendered
  in the project root's index.html file with the <div id="app"> tag. The Firebase
  instance exists only within this component.
-->

<template>
  <div id="app">
    <h1 v-for="hero in heroes">{{ hero.name }}</h1>
  </div>
</template>

<script>
  // This line is new!
  import Firebase from 'firebase'
  import config from './config.js'

  // Here we are initializing the Firebase connection.
  let app = Firebase.initializeApp(config)
  let db = app.database()

  export default {
    name: 'app',

    /*
     * This section is added to the original CLI-generated App component. This
     * is where VueFire comes into play, allowing us to link our Vue app to
     * Firebase data relatively simply. More information is on the GitHub page:
     *
     * https://github.com/vuejs/vuefire/
     */

    firestore () {
      return {
        heroes: db.collection('heroes').orderBy('name')
      }
    },

    data () {
      return { heroes: [] }
    },

    // We have added a simple method to add new greetings to our Firebase.
    methods: { },

    components: { }
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
