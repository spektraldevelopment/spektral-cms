<template>
  <v-toolbar v-if="isLoggedIn">
    <v-toolbar-items>
      <v-btn @click="onEditToggle" flat>Edit Mode</v-btn>
      <v-btn flat>Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.general.isLoggedIn;
    },
    editMode() {
      return this.$store.state.general.editMode;
    },
    txtEditMode() {
      //return this.editMode ? ''
    }
  },
  methods: {
    ...mapActions({
        ACT_EDIT_MODE: "general/ACT_EDIT_MODE"
    }),
    onEditToggle() {
      if (this.editMode) {
        this.ACT_EDIT_MODE(false);
      } else {
        this.ACT_EDIT_MODE(true);
      }
    }
  }
};
</script>