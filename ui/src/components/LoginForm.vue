<template>
  <form class="form-wrapper section shadow" name="form" @keypress.enter.prevent="$emit('login', value)">
    <div class="form-row">
      <h1 class="title centered block">My-notebook</h1>
    </div>

    <div class="form-row">
      <div class="title form-row">Login</div>
      <input type="text" class="input" v-model="value.login" placeholder="Username" />
    </div>

    <div class="form-row">
      <div class="title form-row">Password</div>
      <input type="password" class="input" v-model="value.password" placeholder="Password" />
    </div>

    <div class="buttons-container">
      <button
        class="btn login"
        type="button"
        @click="$emit('login', value)"
      >
        Log in
      </button>
      <button
        class="btn login"
        type="button"
        @click="$emit('set-form', 'RegistrationForm')"
      >
        Registration
      </button>
    </div>

    <div :class="['massage', massage.className]" v-if="massage">
      {{ massage.text }} {{ massage.userName || '' }}
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",

  props: {
    value: Object,
    massage: Object
  },
}
</script>