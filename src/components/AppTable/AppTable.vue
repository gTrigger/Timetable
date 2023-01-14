<template>
  <table class="app-table">
    <thead class="app-table__header">
      <slot name="header"/>
    </thead>
    <tbody class="app-table__body">
      <slot/>
    </tbody>
  </table>
</template>

<style lang="scss">
  @import "@/styles/variables.scss";

  table {
    @include font-small;

    width: 100%;

    thead {
      tr {
        height: 64px;
        border-bottom: 1px solid $color-gray-light;
      }

      th {
        color: $color-gray-darkest;
        font-weight: $font-weight-bolder;
        padding: 0 24px;
      }
    }

    tbody {
      tr {
        height: 55px;
        border-bottom: 1px solid $color-gray-light;

        &:hover {
          background: $color-gray-lighter;
        }
      }

      th {
        font-weight: $font-weight-normal;
        padding: 0 24px;
      }
    }
  }
</style>
