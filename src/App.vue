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
            <router-link to="/ViewHero">View Hero</router-link>
            <!--
            <li><a href="index.php?page=myUnits">My Units</a></li>
            <li><a href="index.php?page=allUnits">All Units</a></li>
            <li><a href="index.php?page=getHero">Get Hero Data</a></li>
            <li><a href="index.php?page=getHeroList">Hero List</a></li>
            -->
          </ul>
        </nav>
        <content>
          <div class="container">
            <router-view></router-view>
          </div>
        </content>
      </main>
    </div>
  </div>
</template>

<!-- Local custom styles -->
<style src="css/style.css"></style>