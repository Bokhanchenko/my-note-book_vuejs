<template>
  <div id="app">
    <Header />

    <NavMenu
      class="nav-top section"
      :navList="navList"
      :activeNavItemId="activeNavItemId"
      @nav-item-click="setActiveItem($event)">
    </NavMenu>


    <aside class="aside-bar section">
      <AsideNavMenu
        :navList="asideNavMenu"
        :activeAsideItemId="activeAsideItemId"
        @nav-item-click="setActiveAsideItem($event)"
      >

      </AsideNavMenu>
      <!--<nav class="aside-nav">left nav</nav>-->
    </aside>

    <main class="content section">
      <!--<MGame />-->
      <!--<hr>-->
      <!--<Equation />-->
      <!--<hr>-->

    </main>
    <footer class="footer section">footer</footer>
  </div>
</template>

<script>
  import db from './miniDb';

  import Header from './components/Header.vue';
  import MGame from './components/memory-game/MemorGame.vue';
  import Equation from './components/patterns/Equation.vue';
  import NavMenu from './components/NavMenu.vue';
  import AsideNavMenu from './components/AsideNavMenu.vue';


  export default {
    data: function() {
      return {
        db,
        user: db.user,
        navList: db.navList,
        activeNavItemId: null,
        activeAsideItemId: null,
      }
    },
    components: {
      Equation,
      MGame,
      Header,
      NavMenu,
      AsideNavMenu,
    },
    computed: {
      asideNavMenu() {
        const activeNavItem = this.db.navList
          .find(navItem => {
            debugger
            return navItem.id === this.activeAsideItemId
          });

        return activeNavItem.asideList;
      }
    },
    methods: {
      setActiveItem(itemId) {
        this.activeNavItemId = itemId;
      },
      setActiveAsideItem(itemId) {
        this.activeAsideItemId = itemId;
      }
    },
    created() {
//      console.log(db);
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    width: 100vw;
    padding: 10px;
    background-image: url('./assets/back-1.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 50px min-content auto 30px;
    grid-gap: 10px;
    grid-template-areas:
      "hd  hd  hd  hd  hd  hd"
      "nav nav nav nav nav nav"
      "sd  ct  ct  ct  ct  ct"
      "ft  ft  ft  ft  ft  ft";

    .nav-top {
      grid-area: nav;
      background-color: white;
    }
    .main {
      grid-area: mn;
    }
    .footer {
      grid-area: ft;
      background-color: white;
    }
    .aside-bar {
      grid-area: sd;
      background-color: white;
    }
    .aside-nav {
      grid-area: sd;
    }
    .content {
      grid-area: ct;
      background-color: white;
    }
  }

  .section {
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    padding: 3px;
    overflow: auto;
    box-shadow: inset 0 0 10px 1px rgba(0,0,0,0.75);
  }

  .centered {
    justify-self: center;
    align-self: center;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  hr {
    margin: 10px 0;
  }
</style>
