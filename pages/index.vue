<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <scHeading :innerText="mainHeading" :editMode="editMode" class="foobar" @onSave="onHeadingSave"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

import scHeading from '../components/spektral-cms/sc-heading';

export default {
  computed: {
   editMode() {
      return this.$store.state.spektralCMS.editMode;
    },
    mainHeading() {
      return this.$store.state.main.mainHeading
    }
  },
  components : {
    scHeading
  },
  methods: {
    ...mapMutations({
      onHeadingSave: 'main/SET_MAIN_HEADING'
    })
  }
}
</script>
