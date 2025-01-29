import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CPopselect from './CPopselect.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CPopselect> = {
  title: 'Components/Popselect',
  component: CPopselect,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center; gap: 50px; padding: 10px 0 100px;"><story/></div>',
    }),
  ],
  argTypes: {
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'focus', 'manual'],
    },
    options: {
      control: false,
    },
    value: {
      control: false,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
    header: {
      control: false,
      description: 'Header menu slot.',
    },
    action: {
      control: false,
      description: 'Options menu slot.',
    },
    empty: {
      control: false,
      description: 'Empty state slot for the options menu.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/os-theme/components/popselect).**\n\n The component pops a select while hovering over a button.',
      },
    },
  },
  render: (args) => ({
    components: { CPopselect, CButton },
    setup() {
      const model = ref('');

      const options = [
        {
          label: 'Jay Gatsby',
          value: 'jay gatsby',
        },
        {
          label: 'Daisy Buchanan',
          value: 'daisy buchanan',
        },
        {
          label: 'Nick Carraway',
          value: 'nick carraway',
        },
      ];

      return { args, model, options };
    },
    template: `
      <CPopselect
        v-model:value="model"
        :options="options"
        :trigger="args.trigger"
        :show="args.show"
        :placeholder="args.placeholder"
        :disabled="args.disabled"
        :multiple="args.multiple"
        :scrollable="args.scrollable"
        :size="args.size"
        :clearable="args.clearable"
        @update:value="args['onUpdate:value']"
      >
        <CButton>Hover me</CButton>
      </CPopselect>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: 'hover',
    'onUpdate:value': fn(),
  },
};
