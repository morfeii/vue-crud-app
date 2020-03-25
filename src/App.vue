<template>
  <div id="app">
    <v-app>
    <main-header></main-header>
    <router-view/>
    </v-app>

  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',

  components: {
    'main-header': Header,
  },
};
</script>
