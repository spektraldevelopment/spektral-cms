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
import scHeading from '../components/spektral-cms/sc-heading';

export default {
  data() {
    return {
      innerText: 'Is this working?'
    }
  },
  computed: {
   editMode() {
      return this.$store.state.spektralCMS.editMode;
    },
  },
  components : {
    scHeading
  }
}
</script>
