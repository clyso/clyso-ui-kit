import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CDialog from './CDialog.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CDialog> = {
  title: 'Components/Dialog',
  component: CDialog,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
    },
    title: {
      control: false,
    },
    default: {
      control: false,
    },
    actions: {
      control: false,
    },
    'negative-text': {
      control: false,
    },
    'positive-text': {
      control: false,
    },
    type: {
      options: ['confirm', 'error', 'success', 'warning', 'info'],
    },
    iconName: {
      control: 'text',
    },
    positiveHandler: {
      control: false,
    },
    negativeHandler: {
      control: false,
    },
    'onUpdate:isShown': {
      table: {
        disable: true,
      },
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    onPositiveClick: {
      table: {
        disable: true,
      },
    },
    onNegativeClick: {
      table: {
        disable: true,
      },
    },
    onAfterLeave: {
      table: {
        disable: true,
      },
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          'A versatile dialog component built on top of CModal, designed for confirmations, alerts, and custom interactions. It supports flexible slot-based rendering, customizable buttons, loading and processing states, and dynamic icons based on dialog type (e.g., success, error, warning, info).',
      },
    },
  },
  render: (args) => ({
    components: { CDialog, CButton },
    setup() {
      const isDialogShown = ref(false);

      return { args, isDialogShown };
    },
    template: `
      <CButton @click="isDialogShown = !isDialogShown">Open Dialog</CButton>
      <CDialog
        v-model:is-shown="isDialogShown"
        :type="args.type"
        :has-negative="args.hasNegative"
        :has-positive="args.hasPositive"
        :is-loading="args.isLoading"
        :is-processing="args.isProcessing"
        :is-positive-processing="args.isPositiveProcessing"
        :is-negative-processing="args.isNegativeProcessing"
        :is-positive-disabled="args.isPositiveDisabled"
        :is-negative-disabled="args.isNegativeDisabled"
        :is-negative-disabled-when-positive-processing="args.isNegativeDisabledWhenPositiveProcessing"
        :icon-name="args.iconName"
        :positive-handler="args.positiveHandler"
        :negative-handler="args.negativeHandler"
        @update:is-shown="args['onUpdate:isShown']"
        @close="args.onClose"
        @positive-click="args.onPositiveClick"
        @negative-click="args.onNegativeClick"
        @after-leave="args.onAfterLeave"
      >
        <template #title>
          Dialog title
        </template>

        Dialog content here. Confirmation question or something else?
      </CDialog>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'confirm',
    iconName: 'alert-circle',
    positiveHandler: () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      }),
    'onUpdate:isShown': fn(),
    onClose: fn(),
    onPositiveClick: fn(),
    onNegativeClick: fn(),
    onAfterLeave: fn(),
  },
};
