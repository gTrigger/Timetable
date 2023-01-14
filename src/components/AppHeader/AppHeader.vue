<script setup lang="ts">
  import RouteName from "@/router/RouteName";
</script>

<template>
  <header class="app-header">
    <div class="app-header-title">
      Stops Board
    </div>
    <nav class="app-header-nav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
              :to="{ name: RouteName.BUS_LINES }"
              class="app-header-nav__link"
          >
            Lines
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
              :to="{ name: RouteName.BUS_STOPS }"
              class="app-header-nav__link"
          >
            Stops
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
  @import "@/styles/variables.scss";

  .app-header {
    color: $color-black;
  }

  .app-header-nav {
    background: $color-white;
    height: 64px;
    border-radius: $border-radius;

    .navbar-nav {
      flex-direction: row;
      height: inherit;
      padding: 0 24px;
      list-style: none;
    }

    .nav-item {
      display: flex;
    }

    .app-header-nav__link {
      @include font-medium;

      padding: 20px 24px;
      color: $color-gray-dark;
      font-weight: $font-weight-bold;
      text-decoration: none;

      &.router-link-active {
        border-bottom: 2px solid $color-blue;
        color: $color-black;
      }
    }
  }

  .app-header-title {
    @include font-large;

    margin: 12px 0 28px;
    font-weight: $font-weight-bold;
  }
</style>
