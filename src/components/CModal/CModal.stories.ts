import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CModal from './CModal.vue';
import CButton from '../CButton/CButton.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CModal> = {
  title: 'Components/Modal',
  component: CModal,
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: false,
    },
    isShown: {
      control: false,
    },
    size: {
      options: ['small', 'medium', 'large'],
    },
    'onUpdate:isShown': {
      table: {
        disable: true,
      },
    },
    onEsc: {
      table: {
        disable: true,
      },
    },
    onMaskClick: {
      table: {
        disable: true,
      },
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    onAfterLeave: {
      table: {
        disable: true,
      },
    },

    title: {
      control: false,
    },
    header: {
      control: false,
    },
    'header-extra': {
      control: false,
    },
    footer: {
      control: false,
    },
    actions: {
      control: false,
    },
    default: {
      control: false,
    },
    processing: {
      control: false,
    },
    loading: {
      control: false,
    },
    'loading-header': {
      control: false,
    },
    'loading-content': {
      control: false,
    },
    'loading-footer': {
      control: false,
    },
    'loading-actions': {
      control: false,
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible modal component with customizable size, content, and behavior. It supports loading states, close button, teleporting, and more.',
      },
    },
  },
  render: (args) => ({
    components: { CModal, CButton, CIcon },
    setup() {
      const isModalShown = ref(false);
      const isProcessing = ref(false);

      function doIt() {
        isProcessing.value = true;

        setTimeout(() => {
          isProcessing.value = false;
          isModalShown.value = false;
        }, 3000);
      }

      return { args, isModalShown, isProcessing, doIt };
    },
    template: `
      <CButton @click="isModalShown = !isModalShown">Open Modal</CButton>

      <CModal
        v-model:is-shown="isModalShown"
        :auto-focus="args.autoFocus"
        :close-on-esc="args.closeOnEsc"
        :to="args.to"
        :is-loading="args.isLoading"
        :is-processing="args.isProcessing || isProcessing"
        :has-close-btn="args.hasCloseBtn"
        :size="args.size"
        :width="args.width"
        :mask-closable="args.maskClosable"
        @update:is-shown="args['onUpdate:isShown']"
        @esc="args.onEsc"
        @mask-click="args.onMaskClick"
        @close="args.onClose"
        @after-leave="args.onAfterLeave"
      >
        <template #title>
          Modal title
        </template>

        <template #header-extra>
          <CButton
            secondary
            size="small"
            type="error"
          >
            <template #icon>
              <CIcon
                :is-inline="true"
                name="trash"
              />
            </template>
          </CButton>
        </template>

        Modal content here. There can be anything here: a form, a confirmation question, some other layout.

        <template #actions>
          <CButton
            secondary
            size="small"
            @click="isModalShown = false"
          >
            Cancel
          </CButton>
          <CButton
            secondary
            size="small"
            type="primary"
            @click="doIt"
          >
            Do it!
          </CButton>
        </template>
      </CModal>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'onUpdate:isShown': fn(),
    onClose: fn(),
    onEsc: fn(),
    onMaskClick: fn(),
    onAfterLeave: fn(),
  },
};
