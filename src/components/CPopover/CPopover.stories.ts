import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CPopover from './CPopover.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CPopover> = {
  title: 'Components/Popover',
  component: CPopover,
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
      options: ['click', 'hover', 'focus'],
      description: 'Trigger action for the popover to open.',
      defaultValue: 'hover',
    },
    placement: {
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Position of the popover relative to the target element.',
      defaultValue: 'top',
    },
    width: {
      control: 'number',
    },
    'onUpdate:show': {
      table: {
        disable: true,
      },
    },
    /**
     * ToDo: how to address trigger slot that has same name as trigger property
     * open issue on https://github.com/storybookjs/storybook/issues/12850
     */
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
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/os-theme/components/popover).**\n\n The component pops a some hidden messages around content.',
      },
    },
  },
  render: (args) => ({
    components: { CPopover, CButton },
    setup() {
      return { args };
    },
    template: `
      <CPopover
        :trigger="args.trigger"
        :placement="args.placement"
        :duration="args.duration"
        :delay="args.delay"
        :disabled="args.disabled"
        :show="args.show"
        :show-arrow="args.showArrow"
        :width="args.width"
        @clickoutside="args.onClickoutside"
        @update:show="args['onUpdate:show']"
      >
        <template #trigger>
          <CButton>Hover me</CButton>
        </template>
        This is my popover content
      </CPopover>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: 'hover',
    onClickoutside: fn(),
    'onUpdate:show': fn(),
  },
};

export const Trigger: Story = {
  render: (args) => ({
    components: { CPopover, CButton },
    setup() {
      return { args };
    },
    template: `
      <CPopover
        trigger="hover"
        placement="top"
        :duration="args.duration"
        :delay="args.delay"
        :disabled="args.disabled"
        :show-arrow="args.showArrow"
        :width="args.width"
      >
        <template #trigger>
          <CButton>
            Hover me
          </CButton>
        </template>
        This is my tooltip content
      </CPopover>
      <CPopover
        trigger="click"
        placement="bottom"
        :duration="args.duration"
        :delay="args.delay"
        :disabled="args.disabled"
        :show="args.show"
        :show-arrow="args.showArrow"
        :width="args.width"
      >
        <template #trigger>
          <CButton>
            Click me
          </CButton>
        </template>
        This is my tooltip content
      </CPopover>
    `,
  }),
};
