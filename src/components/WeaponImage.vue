<template>
  <img 
    :src="`src/assets/weapon_images/${item.type}.png`"
    alt="icon"
    :style="`width: ${size}; height: ${size};`"
  >
</template>
<script setup lang="ts">
import type { Weapon } from '@/types';

  const props = defineProps<{
    item: Weapon,
    size: string
  }>()
</script>