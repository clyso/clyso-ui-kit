<script setup lang="ts">
  import { h } from 'vue';
  import CDialog from '../CDialog/CDialog.vue';
  import useDialog from '../../composables/useDialog';

  const { dialogs, removeDialog } = useDialog();

  const DialogList = () =>
    dialogs.value.map((dialog) =>
      h(
        CDialog,
        {
          key: dialog.value.id,
          type: dialog.value.type,
          isShown: dialog.value.isShown,
          negativeHandler: dialog.value.negativeHandler,
          positiveHandler: dialog.value.positiveHandler,
          iconName: dialog.value.iconName,
          isLoading: dialog.value.isLoading,
          isProcessing: dialog.value.isProcessing,
          onAfterLeave: () => {
            removeDialog(dialog.value.id);
          },
          'onUpdate:isShown': (value) => {
            dialog.value.isShown = value;
          },
          hasNegative: dialog.value.hasNegative,
          hasPositive: dialog.value.hasPositive,
          isPositiveProcessing: dialog.value.isPositiveProcessing,
          isNegativeProcessing: dialog.value.isNegativeProcessing,
          isPositiveDisabled: dialog.value.isPositiveDisabled,
          isNegativeDisabled: dialog.value.isNegativeDisabled,
          isNegativeDisabledWhenPositiveProcessing:
            dialog.value.isNegativeDisabledWhenPositiveProcessing,
        },
        {
          title: dialog.value.title
            ? () => {
                if (typeof dialog.value.title === 'string') {
                  return dialog.value.title;
                }

                return dialog.value.title?.();
              }
            : undefined,
          default: dialog.value.content
            ? () => {
                if (typeof dialog.value.content === 'string') {
                  return dialog.value.content;
                }

                return dialog.value.content?.();
              }
            : undefined,
          'positive-text': dialog.value.positiveText
            ? () => dialog.value.positiveText
            : undefined,
          'negative-text': dialog.value.negativeText
            ? () => dialog.value.negativeText
            : undefined,
        },
      ),
    );
</script>

<template>
  <DialogList />
</template>
