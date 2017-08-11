<template>
  <div>
    <h1>Testing AUTH</h1>
    <login-form></login-form>
    <nuxt/>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  components: { LoginForm }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
a:hover, button:hover {
  cursor: pointer;
}
</style>
