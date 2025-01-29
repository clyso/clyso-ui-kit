import type { Meta, StoryObj } from '@storybook/vue3';
import CIcon from './CIcon.vue';

const meta: Meta<typeof CIcon> = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  // https://github.com/storybookjs/storybook/issues/24238
  component: CIcon as Record<keyof typeof CIcon, unknown>,
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 24px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    name: {
      control: 'select',
      options: ['add', 'chart', 'search', 'close', 'cloud-upload'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component for svg icons. See instructions on how to setup: [Icons Configuration](/docs/configuration--docs#icons).',
      },
    },
  },
  render: (args) => ({
    components: { CIcon },
    setup() {
      return { args };
    },
    template: `
      <CIcon
        style="color: var(--info-color);"
        :is-inline="args.isInline"
        :name="args.name"
      />
      <CIcon
        :is-inline="args.isInline"
        :width="args.width"
        :height="args.height"
        :name="args.name"
      />
      <CIcon
        style="color: var(--primary-color);"
        :width="args.width"
        :height="args.height"
        :name="args.name"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isInline: false,
    name: 'add',
    width: 40,
    height: 40,
  },
};
