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
      <button @click="onEditMode">Edit Mode</button>
      <scHeading :innerText="innerText" :editMode="editMode" class="foobar"/>
    </v-flex>
  </v-layout>
</template>

<script>

import scHeading from '../components/spektral-cms/sc-heading';

export default {
  data() {
    return {
      editMode: false,
      innerText: 'Is this working?'
    }
  },
  components : {
    scHeading
  },
  methods: {
    onEditMode() {
      if(this.editMode) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
      console.log('This edit mode: ', this.editMode);
    }
  }
}
</script>
