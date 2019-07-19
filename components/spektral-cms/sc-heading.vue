<template>
    <div>
        <h1 v-show="editMode === false">{{mutableText}}</h1>
        <input v-show="editMode" v-model="mutableText" @input="onInputUpdate"/>
    </div>
</template>

<script>
export default {
    props: ['innerText', 'editMode'],
    data() {
        return {
            mutableText: this.innerText
        }
    },
    methods: {
        onInputUpdate(evt) {
            this.mutableText = evt.target.value;
        }
    },
    watch: {
        editMode(newVal, oldVal) {
            console.log("Edit Mode: newVal: ", newVal, " oldVal: ", oldVal);
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
