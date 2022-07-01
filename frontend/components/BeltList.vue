<template>
    <v-row class="d-flex">
        <v-col v-for="b in belts" :key="b.id">
            <v-card @click="$emit('click', b.id)">
                <v-card-title>{{b.alias}}</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Belt {
    id: string,
    alias: string
}

export default defineComponent({
    props: {
        belts: {
            type: Array as PropType<Belt[]>,
            required: true
        }
    },
    setup() {
        
    },
})
</script>
