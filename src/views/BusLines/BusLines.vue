<script setup lang="ts">
  import { Ref, ref, onBeforeMount, computed } from 'vue';
  import AppTable from "@/components/AppTable/AppTable.vue";
  import AppSpinner from "@/components/AppSpinner/AppSpinner.vue";
  import Utils from "@/common/utils";
  import ApiService from "@/services/apiService";
  import { BusStop, Sort } from "@/common/types";

  onBeforeMount(async () => {
    stops.value = await ApiService.getBusStops();
  })

  const stops: Ref<BusStop[]> = ref([]);
  const sorting: Ref<Sort> = ref(Sort.DESC);
  const selectedLine: Ref<number | null> = ref(null);
  const selectedStop: Ref<number | null> = ref(null);

  const lines = computed<number[]>(() => getLines(stops.value));
  const lineStops = computed<BusStop[]>(() => getLineStops(stops.value, selectedLine.value));
  const stopDetails = computed<BusStop[]>(() => getStopDetails(stops.value, selectedLine.value, selectedStop.value));

  function changeSorting() {
    if (sorting.value === Sort.ASC) {
      return sorting.value = Sort.DESC;
    }
    return sorting.value = Sort.ASC;
  }

  function getLines(array: BusStop[]): number[] {
    return [...new Set(array.map(item => item.line))].sort();
  }

  function getLineStops(array: BusStop[], line: number): BusStop[] {
    const filteredArray = array.filter(item => item.line === line);
    const lineStops = [...new Map(filteredArray.map((item) => [item["order"], item])).values()].sort(Utils.compareOrder);

    if (sorting.value === Sort.DESC) {
      return lineStops.reverse();
    }

    return lineStops;
  }

  function getStopDetails(array: BusStop[], line: number, order: number): BusStop[] {
    return array.filter(item => item.line === line && item.order === order).sort(Utils.compareTime);
  }
</script>

<template>
  <div class="bus-lines">
    <div class="bus-lines__header">
      <div class="bus-lines__header-title">
        Select Bus Line
      </div>
      <transition name="fade" mode="out-in">
        <div
            v-if="Object.keys(lines).length"
            class="bus-lines__header-controls"
        >
          <button
              v-for="(line, index) in lines"
              :key="index"
              @click="selectedLine = line; selectedStop = null;"
              :class="{'active': selectedLine === line}"
              type="button"
              class="bus-lines__header-control btn btn-primary"
          >
            {{ line }}
          </button>
        </div>
        <div
            v-else
            class="bus-lines__loading"
        >
          <AppSpinner />
        </div>
      </transition>
    </div>
    <div class="bus-lines__details">
      <div
          class="bus-lines__details-item details-line"
          :class="{'inactive': !selectedLine}"
      >
        <transition
            name="fade"
            mode="out-in"
        >
          <div v-if="selectedLine">
            <div class="details-line__title">
              Bus Line: {{ selectedLine }}
            </div>
            <AppTable class="details-line__table">
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
                    v-for="(item, index) in lineStops"
                    :key="index"
                    @click="selectedStop = item.order"
                    :class="{'active': selectedStop === item.order}"
                >
                  <th>{{ item.stop }}</th>
                </tr>
              </template>
            </AppTable>
          </div>
          <div
              v-else
              class="details-line__placeholder"
          >
            Please select a line
          </div>
        </transition>
      </div>
      <div
          class="bus-lines__details-item details-stop"
          :class="{'inactive': !selectedStop}"
      >
        <transition name="fade" mode="out-in">
          <div v-if="selectedStop">
            <div class="details-stop__title">
              Bus Stop: {{ stopDetails[0].stop }}
            </div>
            <AppTable class="details-stop__table">
              <template #header>
                <tr>
                  <th>Time</th>
                </tr>
              </template>
              <template #default>
                <tr
                    v-for="(stop, index) in stopDetails"
                    :key="index"
                >
                  <th>{{ stop.time }}</th>
                </tr>
              </template>
            </AppTable>
          </div>
          <div
              v-else
              class="details-stop__placeholder"
          >
            {{ selectedLine ? 'Please select a stop' : 'Please select a line'}}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "@/styles/variables.scss";

  .bus-lines {
    height: 100%;
    display: flex;
    row-gap: 16px;
    flex-direction: column;

    &__header {
      padding: 24px;
      background: $color-white;
      border-radius: $border-radius;

      &-title {
        @include font-medium;

        margin-bottom: 8px;
        font-weight: $font-weight-bolder;
      }

      &-controls {
        margin-top: 24px;
        display: flex;
        gap: 8px;
      }

      &-control {
        background-color: $color-blue;

        &:hover, &:focus {
          background-color: $color-blue-darker;
        }

        &.active {
          background-color: $color-blue-darkest;
        }
      }
    }

    &__details {
      margin-bottom: 8px;
      display: flex;
      gap: 16px;
      flex-grow: 1;

      &-item {
        background: $color-white;
        border-radius: $border-radius;
        width: 50%;

        &.inactive {
          border: 2px dashed $color-gray-dark;
        }
      }
    }

    &__loading {
      margin: 20px;
      display: flex;
      justify-content: center;
    }
  }

  .details-line {
    &__title {
      @include font-medium;

      padding: 24px 24px 8px;
      font-weight: $font-weight-bolder;
    }

    &__placeholder {
      @include font-medium;

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-weight: $font-weight-normal;
      color: $color-gray-darker;
    }

    &__table {
      tbody tr {
        &.active {
          color: $color-blue;
        }

        &:hover {
          cursor: pointer;
        }
      }
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

  .details-stop {
    &__title {
      @include font-medium;

      padding: 24px 24px 8px;
      font-weight: $font-weight-bolder;
    }

    &__placeholder {
      @include font-medium;

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-weight: $font-weight-normal;
      color: $color-gray-darker;
    }
  }
</style>
