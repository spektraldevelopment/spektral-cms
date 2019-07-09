<template>
  <v-app dark>
    <Header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>

import store from '../store';

import Header from '../components/header';
import Footer from '../components/footer';


export default {
  store,
  components: {
    Header,
    Footer
  }
}
</script>
