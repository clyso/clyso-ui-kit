<script setup lang="ts">
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';

  withDefaults(
    defineProps<{
      /**
       * Button size.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';
    }>(),
    {
      size: 'medium',
    },
  );

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
  }>();
</script>

<template>
  <CButton
    class="c-close-button"
    ghost
    circle
    :size="size"
    :bordered="false"
    @click="(event) => emit('click', event)"
  >
    <template #icon>
      <CIcon
        class="c-close-button__icon"
        :is-inline="true"
        name="close"
      />
    </template>
  </CButton>
</template>
