<template>
  <svg
      height="60"
      width="60"
      class="spinner"
      viewBox="0 0 50 50"
      aria-hidden="true"
  >
    <circle
        stroke-width="2"
        class="path"
        cx="25"
        cy="25"
        fill="none"
        r="20"
    />
  </svg>
</template>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  .spinner {
    animation: rotate 1.5s linear infinite;

    .path {
      stroke: $color-gray-darker;
      stroke-linecap: round;
      animation: dash 1s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>
