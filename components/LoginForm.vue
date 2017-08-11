<template>
  <div class="wrapper">
    <a @click.prevent="modalShown=true">
      {{$store.state.authUser ? $store.state.authUser.email : 'Sign in'}} ▾
    </a>
    <div class="modal" v-if="modalShown">
      <a @click.prevent="reset">Close</a>
      <br/><br/>
      <div v-if="$store.state.authUser">
        <form v-if="mode.passwordRecovery">
          <p class="error" v-if="form.error">{{ form.error }}</p>
          <p>Current password<input type="password" v-model="form.currentPassword" /></p>
          <p>New password<input type="password" v-model="form.password" /></p>
          <p>New password (Again)<input type="password" v-model="form.passwordAgain" /></p>
        </form>
        <button @click.prevent="changePassword">Change password</button><br />
        <button @click.prevent="logout">Logout</button>
      </div>
      <div v-else>
        <form  @submit.prevent="auth">
          <p class="error" v-if="form.error">{{ form.error }}</p>
          <p>Email: <input type="text" v-model="form.email" name="email" /></p>
          <p>Password: <input type="password" v-model="form.password" name="password" /></p>
          <p v-if="mode.register">
            Password (Again):
            <input type="password" v-model="form.passwordAgain" name="passwordAgain" />
          </p>
          <button type="submit">
            {{mode.register ? 'Create account' : 'Sign in'}}
          </button>
        </form>
        <a @click.prevent="mode.register=!mode.register" class="form-switch">
          {{mode.register ? 'Sign in' : 'Create account'}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const getDefaultData = () => ({
  modalShown: false,
  form: {
    error: null,
    email: '',
    password: '',
    passwordAgain: '',
    currentPassword: '' // For change password form
  },
  mode: {
    register: false,
    passwordRecovery: false
  }
})

export default {
  data: getDefaultData,
  methods: {
    reset () {
      const d = getDefaultData()
      Object.keys(d).forEach((key) => {
        this.$data[key] = d[key]
      })
    },
    async auth () {
      try {
        if (this.mode.register && this.form.password !== this.form.passwordAgain) {
          throw Error('Passwords should match')
        }
        const action = this.mode.register ? 'register' : 'login'
        await this.$store.dispatch(action, {
          email: this.form.email,
          password: this.form.password
        })
        this.reset()
      } catch (e) {
        this.form.error = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
        this.reset()
      } catch (e) {
        this.form.error = e.message
      }
    },
    async changePassword () {
      if (!this.mode.passwordRecovery) {
        this.mode.passwordRecovery = true
        return
      }
      try {
        if (this.form.password !== this.form.passwordAgain) {
          throw Error('Passwords should match')
        }
        await this.$store.dispatch('changePassword', {
          currentPassword: this.form.currentPassword,
          newPassword: this.form.password
        })
        this.reset()
      } catch (e) {
        this.form.error = e.message
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: underline;
}
.wrapper {
  position: relative;
}
.modal {
  position: absolute;
  left: -1px;
  top: -1px;
  border: 1px solid #888;
  background: #ddd;
  padding: .4em .8em;
}
.modal form {
  margin: 1em auto .2em;
}
.modal .form-switch {
  float: right;
}
.error {
  color: red;
}
</style>