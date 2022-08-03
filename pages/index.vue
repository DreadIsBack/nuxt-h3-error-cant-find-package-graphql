<template>
  <div>
    {{ JSON.stringify(data) }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      data: [],
    };
  },
  created() {
    useGraphQlNuxt<any>({
      query: `query {
        properties
      }`,
    }).then((response: any) => {
      this.data = response.data.properties;
    });
  },
  methods: {},
});
</script>
