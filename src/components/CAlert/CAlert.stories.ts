import type { Meta, StoryObj } from '@storybook/vue3';
import CAlert from './CAlert.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Alert',
  component: CAlert,
  tags: ['autodocs'],

  argTypes: {
    title: { control: 'text' },
    bordered: { control: 'boolean' },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    default: { control: 'text' },
    header: { control: 'text' },
    icon: { control: 'text' },
  },

  parameters: {
    docs: {
      description: {
        component:
          '**Exactly matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/alert).** \n\n  A customizable alert component for displaying messages to users.',
      },
    },
  },
} satisfies Meta<typeof CAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    default:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    title: 'Success!',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    default:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    title: 'Upload Failed!',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    default:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    title: 'Warning!',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    default:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    title: 'Please note!',
  },
};

export const Default: Story = {
  args: {
    default:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    title: 'Something',
    showIcon: false,
  },
};
