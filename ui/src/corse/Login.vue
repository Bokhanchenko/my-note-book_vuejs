<template>
  <div class="wrapper">
    <component
      :is="formName"
      v-model="input"
      :massage="massage"
      @login="emitLogin"
      @registration="emitRegistration"
      @set-form="setForm"
    />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import RegistrationForm from '../components/RegistrationForm.vue'

const massages = {
  empty: { text: 'A username and password must be present.', className: 'error' },
  wrong: { text: 'The username and / or password is incorrect.', className: 'error' },
  success: { text: `Hello`, userName: '', className: 'success' }
};

export default {
  name: "Login",

  components: {
    LoginForm,
    RegistrationForm,
  },

  data() {
    return {
      massage: null,
      formName: 'LoginForm',
      input: {
        login: '',
        password: '',
        firstName: '',
        lastName: '',
      }
    }
  },

  sockets: {
    userRegistration(result) {
      if (!result || result.error) {
        this.showMassage('wrong', { text: result.error })
      } else {
        this.login(result.user)
      }
    },

    userAuthentication(result) {
      if (!result || result.error) {
        this.showMassage('wrong', { text: result.error })
      } else {
        this.login(result.user)
      }
    }
  },

  methods: {
    setForm(name) {
      this.formName = name
    },

    emitLogin(input) {
      if (input.login !== '' && input.password !== '') {
        this.$socket.emit('userAuthentication', input)
      } else {
        this.showMassage('empty')
      }
    },

    emitRegistration(input) {
      if (input.login !== '' && input.password !== '') {
        this.$socket.emit('userRegistration', input)
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

<style lang="scss">
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
}

.error {
  color: red;
}

.success {
  color: mediumblue;
}
</style>