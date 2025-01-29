import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CPopconfirm from './CPopconfirm.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CPopconfirm> = {
  title: 'Components/Popconfirm',
  component: CPopconfirm,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center;"><story/></div>',
    }),
  ],
  argTypes: {
    trigger: {
      options: ['hover', 'click', 'focus', 'manual'],
    },
    negativeButtonProps: {
      control: false,
    },
    positiveButtonProps: {
      control: false,
    },
    negativeText: {
      control: 'text',
    },
    positiveText: {
      control: 'text',
    },
    default: {
      control: false,
    },
    action: {
      control: false,
    },
    icon: {
      control: false,
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
    /**
     * ToDo: how to address trigger slot that has same name as trigger property
     * open issue on https://github.com/storybookjs/storybook/issues/12850
     */
  },
  parameters: {
    docs: {
      description: {
        component:
          'CPopconfirm is an element typically used to confirm an action before it is carried out. It appears as a small popup when a user attempts to perform a potentially irreversible or important action, such as deleting an item or submitting a form. This helps to prevent accidental or unintended actions by giving the user an opportunity to review their decision.',
      },
    },
  },
  render: (args) => ({
    components: { CPopconfirm, CButton },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CPopconfirm
        :trigger="args.trigger"
        :negative-text="args.negativeText"
        :positive-text="args.positiveText"
        :show-icon="args.showIcon"
        :positive-button-props="args.positiveButtonProps"
        :negative-button-props="args.negativeButtonProps"
        @positive-click="args.onPositiveClick"
        @negative-click="args.onNegativeClick"
      >
        <template #trigger>
          <CButton
            size="small"
            type="info"
          >
            Delete User
          </CButton>
        </template>
        
        <p>
          Confirm user deletion?
        </p>
      </CPopconfirm>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: 'hover',
    onPositiveClick: fn(),
    onNegativeClick: fn(),
  },
};
