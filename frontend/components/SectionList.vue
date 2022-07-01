<template>
    <v-row class="d-flex">
        <v-col v-for="s in sections" cols="2"  :key="s.id">
            <v-card @click="$emit('click', s.id)">
                <v-card-title>{{s.alias}}</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Section {
    id: string,
    alias: string
}

export default defineComponent({
    props: {
        sections: {
            type: Array as PropType<Section[]>,
            required: true
        }
    },
    setup() {
        
    },
})
</script>
