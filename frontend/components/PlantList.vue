<template>
    <v-row class="d-flex">
        <v-col v-for="p in plants" :key="p.id" class="d-flex">
            <v-card @click="$emit('click', p.id)">
                <v-card-title>{{p.alias}}</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Plant {
    id: string,
    alias: string
}

export default defineComponent({
    props: {
        plants: {
            type: Array as PropType<Plant[]>,
            required: true
        }
    },
    setup() {
        
    },
})
</script>
