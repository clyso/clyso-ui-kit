import type { Meta, StoryObj } from '@storybook/vue3';
import CTooltip from './CTooltip.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CTooltip> = {
  title: 'Components/Tooltip',
  component: CTooltip,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center; gap: 50px; padding: 25px 0;"><story/></div>',
    }),
  ],
  argTypes: {
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
    },
    /**
     * ToDo: how to address trigger slot that has same name as trigger property
     * open issue on https://github.com/storybookjs/storybook/issues/12850
     */
    placement: {
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    },
    width: {
      control: 'number',
    },
    default: {
      control: false,
    },
    footer: {
      control: false,
    },
    header: {
      control: false,
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/os-theme/components/tooltip).**\n\n The component behaves like a popover but has a different look.',
      },
    },
  },

  render: (args) => ({
    components: { CTooltip, CButton },
    setup() {
      return { args };
    },
    template: `
      <CTooltip
        :trigger="args.trigger"
        :placement="args.placement"
        :duration="args.duration"
        :delay="args.delay"
        :disabled="args.disabled"
        :show="args.show"
        :show-arrow="args.showArrow"
      >
        <template #trigger>
          <CButton>
            Hover me
          </CButton>
        </template>
        This is my tooltip content
      </CTooltip>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showArrow: true,
    trigger: 'hover',
  },
};

export const Trigger: Story = {
  render: () => ({
    components: { CTooltip, CButton },
    setup() {},
    template: `
      <div style="display: flex; gap: 50px;">
        <CTooltip
          trigger="hover"
        >
          <template #trigger>
            <CButton>
              Hover me
            </CButton>
          </template>
          This is my tooltip content
        </CTooltip>
        <CTooltip
          trigger="click"
          placement="bottom"
        >
          <template #trigger>
            <CButton>
              Click me
            </CButton>
          </template>
          This is my tooltip content
        </CTooltip>
      </div>
    `,
  }),
};
