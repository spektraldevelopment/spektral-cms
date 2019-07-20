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
      <scHeading :innerText="innerText" :editMode="editMode" class="foobar"/>
    </v-flex>
  </v-layout>
</template>

<script>

import { mapState } from 'vuex';

import scHeading from '../components/spektral-cms/sc-heading';

export default {
  data() {
    return {
      innerText: 'Is this working?'
    }
  },
  computed: {
    ...mapState({
      editMode: state => state.general.editMode
    })
  },
  components : {
    scHeading
  }
}
</script>
