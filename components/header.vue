<template>
    <div>
      <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>dB</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/">Work</v-btn>
          <v-btn flat to="/about">About</v-btn>
          <v-btn flat to="/contact">Contact</v-btn>
          <v-btn v-if="!isLoggedIn" flat to="/login">Login</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <scEditBar></scEditBar>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import scEditBar from './spektral-cms/sc-editBar';

export default {
  computed: {
    ...mapState({
      isLoggedIn: state => state.general.isLoggedIn
    })
  },
  components: {
    scEditBar
  }
}
</script>