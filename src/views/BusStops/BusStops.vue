<script setup lang="ts">
  import { Ref, ref, computed, onBeforeMount } from 'vue';
  import AppTable from "@/components/AppTable/AppTable.vue";
  import AppSpinner from "@/components/AppSpinner/AppSpinner.vue";
  import ApiService from "@/services/apiService";
  import { BusStop, MappedStop, Sort } from "@/common/types";

  onBeforeMount(async () => {
    stops.value = await ApiService.getBusStops();
  })

  const stops: Ref<BusStop[]> = ref([]);
  const sorting: Ref<Sort> = ref(Sort.DESC);
  const searchString: Ref<string> = ref('');

  const filteredStops = computed(() => getMappedStops(stops.value, sorting.value).filter((item) => {
    const search = searchString.value.toLowerCase();
    return item.toLowerCase().includes(search)
  }));

  function changeSorting() {
    if (sorting.value === Sort.ASC) {
      return sorting.value = Sort.DESC;
    }
    return sorting.value = Sort.ASC;
  }

  function getMappedStops(stops: BusStop[], sort: Sort = Sort.ASC): MappedStop[] {
    const mappedStops = stops.map(item => item.stop).sort();

    if (sort === Sort.DESC) {
      mappedStops.reverse();
    }

    return [...new Set(mappedStops)];
  }
</script>

<template>
  <div class="bus-stops">
    <div class="bus-stops__header">
      <label
          for="search"
          class="bus-stops__search-label"
      >
        Search
      </label>
      <input
          v-model="searchString"
          class="bus-stops__search-input"
          id="search"
          placeholder="Search..."
      >
    </div>
    <div class="bus-stops__details">
      <transition
          name="fade"
          mode="out-in"
      >
        <AppTable
          v-if="filteredStops.length"
          class="bus-stops__table"
        >
          <template #header>
            <tr>
              <th
                  @click="changeSorting"
                  class="sorting"
                  :class="sorting === Sort.ASC ? 'asc' : 'desc'"
              >
                    <span>
                      Bus Stops
                    </span>
              </th>
            </tr>
          </template>
          <template #default>
            <tr
                v-for="(item, index) in filteredStops"
                :key="index"
            >
              <th>{{ item }}</th>
            </tr>
          </template>
        </AppTable>
        <div
            v-else-if="searchString.length"
            class="bus-stops__no-content"
        >
          No results
        </div>
        <div
            v-else
            class="bus-stops__loading"
        >
          <AppSpinner />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "@/styles/variables.scss";

  .bus-stops {
    display: flex;
    flex-direction: column;
    background: $color-white;
    border-radius: $border-radius;

    &__header {
      padding: 8px;
    }

    &__search-label {
      display: none;
    }

    &__search-input {
      width: 288px;
      height: 40px;
      padding: 16px;
      background-size: 16px;
      background: url('@/assets/search.svg') no-repeat center right 16px;
      border-radius: $border-radius;
      border: 1px solid $color-gray;
      font-size: $font-size-small;
      color: $color-gray-dark;
      outline: none;

      &:hover, &:active, &:focus, &:focus-visible {
        background-image: url('@/assets/search-active.svg');
        border-color: $color-blue;
        color: $color-black;
      }
    }

    &__loading {
      margin: 20px;
      display: flex;
      justify-content: center;
    }

    &__no-content {
      margin: 20px;
      display: flex;
      justify-content: center;
    }

    .sorting {
      cursor: pointer;

      span::after {
        height: 16px;
        width: 16px;
        content: '';
        display: inline-block;
        vertical-align: sub;
      }
      &.asc {
        span::after {
          background: url('@/assets/sort-asc.svg');
        }
      }
      &.desc {
        span::after {
          background: url('@/assets/sort-desc.svg');
        }
      }
    }
  }
</style>
