<template>
  <nav class="c-breadcrumb">
    <ul class="c-breadcrumb__list">
      <slot></slot>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-breadcrumb {
    margin-left: - utils.unit(1);
  }
</style>
