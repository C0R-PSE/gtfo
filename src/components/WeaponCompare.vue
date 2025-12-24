<template>
  <div class="wrapper">
    <div class="header">
      <b-button variant="dark" v-b-toggle.sidebar-weapon-pick>
        добавить
      </b-button>
    </div>
    <div class="holder_wrapper">
      <div class="items_holder">
        <WeaponItem
          :item="weapon"
          :attributes="attributes"
          @delete="toggleItem(weapon.name)"
          v-for="weapon in weapons.main.concat(weapons.special)"
          v-show="selected.includes(weapon.name)"
        />
      </div>
    </div>
  </div>
  <b-sidebar 
    id="sidebar-weapon-pick"
    bg-variant="dark"
    text-variant="light"
    shadow
    width="420px"
  >
    <template #title>
      <div class="d-flex" style="
        align-items: center;
        gap: 25px;
      ">
        <span>Выберите оружие</span>
        <b-button variant="dark" @click="selected = []">
          очистить
        </b-button>
      </div>
    </template>
    <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="flavour-2"
        size="lg"
      >
        <b-list-group flush v-for="category in categories">
          <b-list-group-item 
            class="bg-dark border-0"
            v-b-toggle="category"
          >
            {{ category }}
          </b-list-group-item>
          <b-collapse
            :id="category"
            visible
          >
            <b-list-group-item 
              class="bg-dark weapon_option py-0"
              v-for="weapon in weapons[category]"
              @click="toggleItem(weapon.name)"
            >
              <WeaponImage :item="weapon" size="100px"/>
              <span>{{ weapon.type }}</span>
              <div class="d-flex">
                <b-form-checkbox 
                  class="mr-0"
                  :value="weapon.name"
                  disabled
                  v-if="selected.includes(weapon.name) || selected.length < 4"
                />
              <font-awesome-icon size="lg" icon="fa-solid fa-lock" style="width: 20;" v-else />
              </div>
            </b-list-group-item>
          </b-collapse>
        </b-list-group>
      </b-form-checkbox-group>
    </b-form-group>
  </b-sidebar>
</template>

<script setup lang="ts">
import weaponsData from '@/data/weapons_data.json'
import WeaponItem from './WeaponItem.vue';
import type { Weapon } from '@/types';
import { ref } from 'vue';
import { watch } from 'vue';
import WeaponImage from './WeaponImage.vue';
const weapons = {
  main: weaponsData.main.map((w) => ({
    ...w,
    name: w.manufacturer + ' ' + w.model,
  })) as any as Weapon[],
  special: weaponsData.special.map((w) => ({
    ...w,
    name: w.manufacturer + ' ' + w.model,
  })) as any as Weapon[]
}
const selected = ref<string[]>([])
function toggleItem(name: string) {
  if (selected.value.includes(name)) {
    selected.value = selected.value.filter(selectedName => selectedName !== name)
  } else if (selected.value.length < 4) {
    selected.value.push(name)
  }
}
const categories: Array<'main' | 'special'> = ['main', 'special']
const attributes = ref<Array<any>>([
  'damage',
  'clip_size',
  'RPM',
  'DPS',
  'reload',
  'precision',
  'max_ammo',
  'stagger',
  'total_damage'
])

</script>

<style scoped lang="css">
  .items_holder {
    display: flex;
    flex-direction: row;
    gap: 20px
  }
  .holder_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .weapon_option {
    display: grid;
    grid-template-columns: min-content 1fr 20px;
    align-items: center;
    padding-right: 40px;
    column-gap: 20px;
  }
</style>