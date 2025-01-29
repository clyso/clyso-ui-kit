import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CKeyValueInput from './CKeyValueInput.vue';
import type { KeyValueItem } from '../../types';

const meta: Meta<typeof CKeyValueInput> = {
  title: 'Components/KeyValueInput',
  component: CKeyValueInput,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px"><story/></div>',
    }),
  ],
  argTypes: {
    'key-error': {
      control: false,
      description: 'Errors slot for key.',
    },
    'value-error': {
      control: false,
      description: 'Errors slot for value.',
    },
    item: {
      control: false,
    },
    id: {
      control: 'text',
    },
    index: {
      control: 'number',
    },
    keyLabel: {
      control: 'text',
    },
    valueLabel: {
      control: 'text',
    },
    onDelete: {
      table: {
        disable: true,
      },
    },
    'onUpdate:item': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A component for rendering key-value pairs with customizable input fields. It allows inline editing of keys and values, supports validation, and includes optional delete functionality. Ideal for managing metadata or other key-value pairs with error handling, tooltips, and labels. Used in KeyValueListInput.',
      },
    },
  },
  render: (args) => ({
    components: { CKeyValueInput },
    setup() {
      const item = ref<KeyValueItem>({
        key: '',
        value: '',
      });

      return {
        args,
        item,
        fn,
      };
    },
    template: `
      <CKeyValueInput
        :id="args.id"
        v-model:item="item"
        :index="args.index"
        :has-key-error="args.hasKeyError"
        :has-value-error="args.hasValueError"
        :is-disabled="args.isDisabled"
        :key-label="args.keyLabel"
        :value-label="args.valueLabel"
        :has-labels="args.hasLabels"
        :has-delete="args.hasDelete"
        @update:item="args['onUpdate:item']"
        @delete="args.onDelete"
      >
        <template #key-error>
          Key has error
        </template>
        <template #value-error>
          Value has error
        </template>
      </CKeyValueInput>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'data',
    hasDelete: false,
    index: undefined,
    onDelete: fn(),
    'onUpdate:item': fn(),
  },
};
