<template>
  <div class="faux-modal main-modal">
    <h1 class="page-title">
      All Heroes
    </h1>
    <table id='hero_list'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th>Move Type</th>
          <th>Weapon Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hero in heroes" v-bind:key="hero.id">
          <td>
            <router-link :to="{ name: 'hero', params: { id: hero.id } }">
              {{hero.name}}
            </router-link>
          </td>
          <td>
            {{hero.color}}
          </td>
          <td>
            {{hero.moveType}}
          </td>
          <td>
            {{hero.weaponType}}
          </td>
        </tr>
      </tbody>
    </table>
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