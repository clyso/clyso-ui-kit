import type { Meta, StoryObj } from '@storybook/vue3';
import CAspectRatio from './CAspectRatio.vue';

const meta: Meta<typeof CAspectRatio> = {
  title: 'Components/AspectRatio',
  component: CAspectRatio,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 400px"><story/></div>',
    }),
  ],
  argTypes: {
    ratio: { control: 'text' },
    default: {
      control: false,
      description: 'Content that should match the ratio.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Custom component / Non-Naive UI.** \n\n Maintains a specified aspect ratio for content, ensuring consistent proportions according to specified aspect ratio. Ideal for embedding media and ensuring layout integrity across different screen sizes.',
      },
    },
  },
  render: (args) => ({
    components: { CAspectRatio },
    setup() {
      return { args };
    },
    template: `
      <CAspectRatio :ratio="args.ratio">
        <div style="background: lightgray; width: 100%; height: 100%;">
          {{ args.ratio }}
        </div>
      </CAspectRatio>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SixteenNine: Story = {
  args: {
    ratio: '16:9',
  },
};

export const Square: Story = {
  args: {
    ratio: '1:1',
  },
};

export const FourThree: Story = {
  args: {
    ratio: '4:3',
  },
};
