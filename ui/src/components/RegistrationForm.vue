<template>
  <form
    class="form-wrapper section shadow"
    name="form"
    @keypress.enter.prevent="$emit('registration', value)"
  >
    <div class="form-row">
      <h1 class="title centered block">My-notebook</h1>
    </div>

    <div class="form-row">
      <div class="title form-row">Login or mail <strong class="error">*</strong></div>
      <input type="text" class="input" v-model="value.login" placeholder="User name" />
    </div>

    <div class="form-row">
      <div class="title form-row">Password <strong class="error">*</strong></div>
      <input type="password" class="input" v-model="value.password" placeholder="Password"/>
    </div>

    <div class="form-row">
      <div class="title form-row">First name</div>
      <input type="text" class="input" v-model="value.firstName" placeholder="First name"/>
    </div>

    <div class="form-row">
      <div class="title form-row">Last name</div>
      <input type="password" class="input" v-model="value.lastName" placeholder="Last name"/>
    </div>

    <div class="buttons-container">
      <button
        class="btn login"
        type="button"
        @click="$emit('set-form', 'LoginForm')"
      >
        Log in
      </button>
      <button
        class="btn login"
        type="button"
        @click="$emit('registration', value)"
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
  name: "RegistrationForm",

  props: {
    value: Object,
    massage: Object
  },
}
</script>