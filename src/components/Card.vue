<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  card: string
}>()

const cardImage = computed(() => {
  return new URL(`../assets/images/${props.card}.svg`, import.meta.url).href
})
</script>

<template>
  <div class="card">
    <img :src="cardImage" :alt="card" />
  </div>
</template>

<style scoped>
.card {
  padding: 0;
}

.card img {
  width: 120px;
  height: auto;
}
</style>
