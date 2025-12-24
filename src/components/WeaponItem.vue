<template>
  <div class="wrapper">
    <b-button @click="onDelete">
      x
    </b-button>
    <div class="icon_holder" style="height: 200px;">
      <WeaponImage :item="item" size="200px"/>
    </div>
    <div class="weapon_label">
      <span>{{ item.name }}</span>
      <span>{{ item.type }}</span>
    </div>
    <b-card class="bg-dark w-100" no-body>
      <b-list-group flush>
        <b-list-group-item 
          class="bg-dark attribute"
          v-for="attr in attributes"
        >
          <span>{{ attr }}</span>
          <span>{{ parseAttrValue(attr) }}</span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import type { Weapon } from '@/types';
import WeaponImage from './WeaponImage.vue';
  const props = defineProps<{
    item: Weapon,
    attributes: Array<keyof Weapon | keyof typeof specialAttributes>
  }>()
  const item: Weapon = props.item

  const emit = defineEmits(['delete'])
  function onDelete() {
    emit('delete', item.name)
  }
  const specialAttributes: {
    [key: string]: {
      func?: (item: Weapon) => number,
      round?: number,
      multiplier?: boolean
    }
  } = {
    stagger: {
      multiplier: true,
      round: 0.1,
    },
    precision: {
      multiplier: true,
      round: 0.01,
    },
    total_damage: {
      func: (item: Weapon) => item.damage * item.max_ammo,
      round: 10,
    },
    DPS: {
      func: (item: Weapon) => Math.round(item.damage * item.RPM / 60 * 100) / 100,
    },
    reserve_ammo: {
      func: (item: Weapon) => item.max_ammo - item.clip_size
    }
  }
  function parseAttrValue(name: keyof Weapon | keyof typeof specialAttributes) {
    if (name in specialAttributes) {
      function round(val: number, power: number) {
        return Math.round(val / power) * power
      }
      const rule = specialAttributes[name as keyof typeof specialAttributes]
      let value = rule?.func?.(item) ?? item[name as keyof Weapon] as number
      return rule?.round ? round(value, rule.round) : value
    } else {
      return item[name as keyof Weapon]
    }
  }
</script>

<style scoped lang="css">
  .wrapper {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .attribute {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .weapon_label { 
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 55px;
    align-items: center;
  }
</style>