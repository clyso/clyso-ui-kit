import type { Meta, StoryObj } from '@storybook/vue3';
import CShortList from './CShortList.vue';

const meta: Meta<typeof CShortList> = {
  title: 'Components/ShortList',
  component: CShortList as Record<keyof typeof CShortList, unknown>,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 300px"><story/></div>',
    }),
  ],
  argTypes: {
    list: {
      control: false,
    },
    itemKey: {
      control: false,
    },
    hasMarker: {
      control: 'boolean',
    },
    max: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    default: {
      control: false,
      description: 'Slot for the list item.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component that displays a list of objects presented by a specific property.',
      },
    },
  },
  render: (args) => ({
    components: { CShortList },
    setup() {
      type User = {
        id: number;
        name: string;
      };

      const users: User[] = [
        {
          id: 1,
          name: 'John Smith',
        },
        {
          id: 2,
          name: 'Jane Doe',
        },
        {
          id: 3,
          name: 'Charlie Brown',
        },
        {
          id: 4,
          name: 'Daisy Duck',
        },
      ];

      const itemKey = (user: User) => user.name;

      return { args, users, itemKey };
    },
    template: `
      <CShortList
        :list="users"
        :item-key="itemKey"
        :max="args.max"
        :size="args.size"
        :has-marker="args.hasMarker"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    max: 5,
    size: 'medium',
    hasMarker: true,
  },
};

export const Small: Story = {
  args: {
    max: 5,
    size: 'small',
    hasMarker: true,
  },
};

export const CollapsedList: Story = {
  args: {
    max: 3,
    size: 'medium',
    hasMarker: true,
  },
};
