import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import { fn } from '@storybook/test';
import CKeyValueListInput from './CKeyValueListInput.vue';
import type { KeyValueItem } from '../../types';

const meta: Meta<typeof CKeyValueListInput> = {
  title: 'Components/KeyValueListInput',
  component: CKeyValueListInput,
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
    items: {
      control: false,
    },
    id: {
      control: 'text',
    },
    hasKeyError: {
      control: false,
    },
    hasValueError: {
      control: false,
    },
    addLabel: {
      control: 'text',
    },
    keyLabel: {
      control: 'text',
    },
    valueLabel: {
      control: 'text',
    },
    onAdd: {
      table: {
        disable: true,
      },
    },
    'onUpdate:items': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The CKeyValueListInput component allows users to manage a dynamic list of key-value pairs. It supports adding, editing, and deleting items with customizable labels for keys and values. The component includes error handling, tooltips, and flexibility for controlling the visibility of item indexes, keys, and delete actions.',
      },
    },
  },
  render: (args) => ({
    components: { CKeyValueListInput },
    setup() {
      const EMPTY_ITEM = { key: '', value: '' };
      const metadata = ref<KeyValueItem[]>([EMPTY_ITEM]);

      type ValidatorKey = 'required' | 'invalid';

      const validator: Record<
        keyof KeyValueItem,
        Record<ValidatorKey, (v: string) => boolean>
      > = {
        key: {
          required: (value: string) => value.length > 0,
          invalid: (value: string) => /^[a-z][-_a-z0-9]{3,62}$/.test(value),
        },
        value: {
          required: (value: string) => value.length > 0,
          invalid: (value: string) => /^[a-z][-_a-z0-9]{3,62}$/.test(value),
        },
      };

      function hasMetadataError(
        prop: keyof KeyValueItem,
        index: number,
        validatorName?: ValidatorKey,
      ): boolean {
        const value = metadata.value[index][prop];
        const errors = Object.keys(validator[prop]).filter(
          (validatorKey) =>
            !validator[prop][validatorKey as ValidatorKey](value),
        );

        if (!errors.length) {
          return false;
        }

        if (!validatorName) {
          return true;
        }

        return errors.includes(validatorName);
      }

      const hasError = computed(() =>
        metadata.value.some(
          (_, index) =>
            hasMetadataError('key', index) || hasMetadataError('value', index),
        ),
      );

      function addItem() {
        args.onAdd?.();

        if (hasError.value) {
          return;
        }

        metadata.value.push(EMPTY_ITEM);
      }

      return {
        args,
        metadata,
        hasMetadataError,
        hasError,
        addItem,
      };
    },
    template: `
      <CKeyValueListInput
        :id="args.fieldId"
        v-model:items="metadata"
        :is-disabled="args.isDisabled"
        :add-label="args.addLabel"
        :key-label="args.keyLabel"
        :value-label="args.valueLabel"
        :has-labels="args.hasLabels"
        :hasIndexes:="args.hasIndexes"
        :has-error="args.hasError || hasError"
        :has-key-error="paramIndex => hasMetadataError('key', paramIndex)"
        :has-value-error="paramIndex => hasMetadataError('value', paramIndex)"
        @update:items="args['onUpdate:items']"
        @add="addItem"
      >
        <template #key-error="{ index }">
          <template v-if="hasMetadataError('key', index, 'required')">
            Key is required
          </template>
          <template v-else-if="hasMetadataError('key', index, 'invalid')">
            Key is invalid
          </template>
        </template>
        <template #value-error="{ index }">
          <template v-if="hasMetadataError('value', index, 'required')">
            Value is required
          </template>
          <template v-else-if="hasMetadataError('value', index, 'invalid')">
            Value is invalid
          </template>
        </template>
      </CKeyValueListInput>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'metadata',
    index: undefined,
    addLabel: 'Add item',
    keyLabel: 'Data key',
    valueLabel: 'Data value',
    onAdd: fn(),
    'onUpdate:items': fn(),
  },
};
