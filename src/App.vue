<template>
  <div id="app">
    <Header />

    <NavMenu
      class="nav-top section"
      :navList="navList"
      :activeNavItemId="activeNavItemId"
      @nav-item-click="setActiveItem($event)"
    />

    <aside class="aside-bar section">
      <AsideNavMenu
        :navList="asideNavMenu"
        :activeAsideItemId="activeAsideItemId"
        @nav-item-click="setActiveAsideItem($event)"
      />
    </aside>

    <main class="content section">
      <!--<MGame />-->
      <!--<hr>-->
      <!--<Equation />-->
      <!--<hr>-->

      <ContentEditable :content="content" />
    </main>

    <footer class="footer section">Turbo Web Developer Dmitry Kayan</footer>
  </div>
</template>

<script>
  import db from './miniDb';

  import MGame from './components/memory-game/MemorGame.vue';
  import EquationCalc from './components/patterns/Equation.vue';

  import Header from './components/header-block.vue';
  import NavMenu from './components/nav-menu.vue';
  import AsideNavMenu from './components/nav-aside-menu.vue';
  import ContentEditable from './components/content-editable.vue';

  export default {
    components: {
      EquationCalc,
      MGame,
      Header,
      NavMenu,
      AsideNavMenu,
      ContentEditable,
    },
    data() {
      return {
        db,
        user: db.user,
        navList: db.navList,
        activeNavItemId: db.navList[0].id,
        activeAsideItemId: db.navList[0].asideList[0].id,
      }
    },

    computed: {
      asideNavMenu() {
        const { activeNavItemId } = this;

        const asideMenu =  activeNavItemId
          ? db.navList.find(navItem => navItem.id === activeNavItemId).asideList
          : db.navList[0].asideList;

        this.activeAsideItemId = asideMenu[0].id;

        return asideMenu
      },
      content() {
        return this.asideNavMenu.find(item => item.id === this.activeAsideItemId).content;
      }
    },

    methods: {
      setActiveItem(itemId) {
        this.activeNavItemId = itemId;
      },
      setActiveAsideItem(itemId) {
        this.activeAsideItemId = itemId;
      }
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
      text-align: center;
      font-size: .6rem;
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
      padding: 8px;
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
