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

      <scParagraph :innerText="mainParagraph" :editMode="editMode" @onSave="onParaSave"/>
      
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

import scHeading from '../components/spektral-cms/sc-heading';
import scParagraph from '../components/spektral-cms/sc-paragraph';

export default {
  computed: {
   editMode() {
      return this.$store.state.spektralCMS.editMode;
    },
    mainHeading() {
      return this.$store.state.main.mainHeading
    },
    mainParagraph() {
      return this.$store.state.main.mainParagraph
    }
  },
  components : {
    scHeading,
    scParagraph
  },
  methods: {
    ...mapMutations({
      onHeadingSave: 'main/SET_MAIN_HEADING',
      onParaSave: 'main/SET_MAIN_PARAGRAPH'
    })
  }
}
</script>
