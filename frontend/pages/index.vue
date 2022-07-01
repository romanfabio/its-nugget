<template>
  <v-container>
    <PlantList :plants="plants" @click="fetchSections"></PlantList>
    <SectionList v-if="sections != null" :sections="sections" @click="fetchBelts"></SectionList>
    <BeltList v-if="belts != null" :belts="belts"></BeltList>
  </v-container>
</template>

<script lang="ts">
import { AxiosInstance } from 'axios';
import PlantList from '~/components/PlantList.vue';

import { defineComponent } from "vue";
import SectionList from '~/components/SectionList.vue';
import BeltList from '~/components/BeltList.vue';

export default defineComponent({
    name: "IndexPage",
    data() {
      return {
        plants: [],
        sections: null,
        belts: null,
      }
    },
    async asyncData({$axios} : {$axios: AxiosInstance}) {
      const response = await $axios.get('/plant/all');
      return {plants: response.data.values}
    },
    components: { PlantList, SectionList, BeltList },
    methods: {
      async fetchSections(id: string) {
        const response = await this.$axios.get(`/section/all?plant=${id}`);
        this.sections = response.data.values;
      },
      async fetchBelts(id: string) {
        const response = await this.$axios.get(`/belt/all?section=${id}`);
        this.belts = response.data.values;
      }
    }
});
</script>
