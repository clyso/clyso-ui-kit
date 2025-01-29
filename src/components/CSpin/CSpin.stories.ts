import type { Meta, StoryObj } from '@storybook/vue3';
import CSpin from './CSpin.vue';

const meta: Meta<typeof CSpin> = {
  title: 'Components/Spin',
  component: CSpin,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="width: 100%; height: 100px; display: flex; justify-content: center;"><story/></div>',
    }),
  ],
  argTypes: {
    contentStyle: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    description: { control: 'text' },
    /**
     * ToDo: how to address description slot that has same name as description property
     * open issue on https://github.com/storybookjs/storybook/issues/12850
     */
    default: {
      control: false,
    },
    icon: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/os-theme/components/spin).**\n\n The component is a graphical representation of a loading process.',
      },
    },
  },
  render: (args) => ({
    components: { CSpin },
    setup() {
      return { args };
    },
    template: `
      <CSpin 
        :size="args.size"
        :show="args.show"
        :description="args.description"
        :rotate="args.rotate"
        :stroke-width="args.strokeWidth"
        :stroke="args.stroke"
        :delay="args.delay"
      />
    `,
  }),
} satisfies Meta<typeof CSpin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    show: true,
  },
};
