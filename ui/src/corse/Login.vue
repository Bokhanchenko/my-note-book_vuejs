<template>
  <div class="wrapper">
    <form class="form-wrapper section shadow" name="loginForm" @keypress.enter.prevent="emitLogin">
      <div class="form-row">
        <h1 class="title centered block">My-notebook</h1>
      </div>

      <div class="form-row">
        <div class="title form-row">Login</div>
        <input type="text" class="input" v-model="input.login" placeholder="Username" />
      </div>

      <div class="form-row">
        <div class="title form-row">Password</div>
        <input type="password" class="input" v-model="input.password" placeholder="Password" />
      </div>

      <div class="buttons-container">
        <button class="btn login" type="button" @click="emitLogin">Log in</button>
        <button class="btn login" type="button" @click="$router.push('/registration')">Registration</button>
      </div>

      <div :class="['massage', massage.className]" v-if="massage">
        {{ massage.text }} {{ massage.userName || '' }}
      </div>
    </form>
  </div>
</template>

<script>
const massages = {
  empty: { text: 'A username and password must be present.', className: 'error' },
  wrong: { text: 'The username and / or password is incorrect.', className: 'error' },
  success: { text: `Hello`, userName: '', className: 'success' }
};

export default {
  name: "LoginPage",

  data() {
    return {
      massage: null,
      input: {
        login: '',
        password: '',
      }
    }
  },

  sockets: {
    userAuthentication(result) {
      if (!result || result.error) {
        this.showMassage('wrong', result)
      } else {
        this.login(result.user)
      }
    }
  },

  methods: {
    emitLogin() {
      if (this.input.login !== '' && this.input.password !== '') {
        this.$socket.emit('userAuthentication', this.input)
      } else {
        this.showMassage('empty')
      }
    },

    login(user) {
      this.showMassage('success', { userName: user.login });

      this.setUser(user);

      setTimeout(() => {
        this.massage = null;
        this.$router.push({ name: 'notebook' })
      }, 500);
    },

    setUser(user) {
      localStorage.setItem('user',  JSON.stringify(user))
    },

    showMassage(name, object = {}) {
      if (!name) this.massage = null;

      this.massage = Object.assign({}, massages[name], object);

      setTimeout(() => this.massage = null, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
}

.form-wrapper {
  display: block;
  position: relative;
  margin: auto;
  min-width: 350px;
  padding: 20px 20px 40px;
}

.form-row {
  display: block;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;

  & .btn {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px;
  }
}

.input {
  display: block;
  width: 100%;
  padding: 4px 10px;
  overflow: hidden;
}

.massage {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  font-size: 0.8rem;

  &.error {
    color: red;
  }

  &.success {
    color: mediumblue;
  }
}
</style>