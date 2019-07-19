<template>
    <div :class="className">
        <h1 v-if="type === 'h1'" v-show="inEditMode === false">{{mutableText}}</h1>
        <h2 v-if="type === 'h2'" v-show="inEditMode === false">{{mutableText}}</h2>
        <h3 v-if="type === 'h3'" v-show="inEditMode === false">{{mutableText}}</h3>
        <h4 v-if="type === 'h4'" v-show="inEditMode === false">{{mutableText}}</h4>
        <h5 v-if="type === 'h5'" v-show="inEditMode === false">{{mutableText}}</h5>
        <h6 v-if="type === 'h6'" v-show="inEditMode === false">{{mutableText}}</h6>
        <input v-show="inEditMode" v-model="mutableText" @input="onInputUpdate"/>
        <div v-show="editMode">
            <button v-show="inEditMode === false" @click="onEdit">Edit</button>
            <button v-show="inEditMode" @click="onSave">Save</button>
            <button v-show="inEditMode" @click="onCancel">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        innerText: {
            type: String
        },
        editMode: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'h1'
        },
        className: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            mutableText: this.innerText,
            inEditMode: false
        }
    },
    methods: {
        onInputUpdate(evt) {
            this.mutableText = evt.target.value;
        },
        onEdit() {
            if(this.inEditMode) {
                this.inEditMode = false;
            } else {
                this.inEditMode = true;
            }
        },
        onSave() {
            this.inEditMode = false;
        },
        onCancel() {
            this.inEditMode = false;
            this.mutableText = this.innerText;
        }
    },
    watch: {
        editMode(newVal) {
            //If user switches out of edit mode
            if(newVal === false) {
                //Take component out of inEditMode
                this.inEditMode = false;
            }
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
