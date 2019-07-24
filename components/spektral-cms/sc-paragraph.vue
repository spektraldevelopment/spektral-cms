<template>
    <div class="sc-paragraph">
        <p v-show="inEditMode === false">{{mutableText}}</p>
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
            this.$emit('onSave', this.mutableText);
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

