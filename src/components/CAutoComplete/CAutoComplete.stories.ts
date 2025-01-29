import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CAutoComplete from './CAutoComplete.vue';

const options = [
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
  },
  {
    label: 'Drive My Car',
    value: 'song1',
    disabled: true,
  },
  {
    label: 'Norwegian Wood',
    value: 'song2',
  },
  {
    label: "You Won't See",
    value: 'song3',
    disabled: true,
  },
  {
    label: 'Nowhere Man',
    value: 'song4',
  },
  {
    label: 'Think For Yourself',
    value: 'song5',
  },
  {
    label: 'The Word',
    value: 'song6',
  },
  {
    label: 'Michelle',
    value: 'song7',
    disabled: true,
  },
  {
    label: 'What goes on',
    value: 'song8',
  },
  {
    label: 'Girl',
    value: 'song9',
  },
  {
    label: "I'm looking through you",
    value: 'song10',
  },
  {
    label: 'In My Life',
    value: 'song11',
  },
  {
    label: 'Wait',
    value: 'song12',
  },
];

const meta: Meta<typeof CAutoComplete> = {
  title: 'Components/AutoComplete',
  component: CAutoComplete,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
      description: 'For custom input elements, supplied by the user.',
    },
    suffix: {
      control: false,
      description: "Input's suffix content.",
    },
    prefix: {
      control: false,
      description: "Input's prefix content.",
    },
    empty: {
      control: false,
      description: "Menu's content to show when there's no option.",
    },
    onBlur: {
      table: {
        disable: true,
      },
    },
    onFocus: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      control: {
        type: 'text',
        disabled: true,
      },
    },
    getShow: {
      control: false,
    },
    options: {
      table: {
        defaultValue: { summary: '[]' },
      },
      control: false,
    },
    placement: {
      control: 'select',
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
    renderLabel: {
      control: false,
    },
    renderOption: {
      control: false,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    status: {
      options: ['success', 'warning', 'error'],
    },
    to: {
      control: false,
    },
    value: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Exactly matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/auto-complete).** \n\n Dropdown with options to autocomplete the input text.',
      },
    },
  },
  render: (args) => ({
    components: { CAutoComplete },
    setup() {
      const model = ref('');

      return { args, model, options };
    },
    template: `
          <CAutoComplete
            v-model:value="model"
            :options="options"
            :append="args.append"
            :blurAfterSelect="args.blurAfterSelect"
            :clearAfterSelect="args.clearAfterSelect"
            :clearable="args.clearable"
            :defaultValue="args.defaultValue"
            :disabled="args.disabled"
            :loading="args.loading"
            :placeholder="args.placeholder"
            :placement="args.placement"
            :renderLabel="args.renderLabel"
            :renderOption="args.renderOption"
            :showEmpty="args.showEmpty"
            :size="args.size"
            :status="args.status"
            :to="args.to"
            @focus="args.onFocus"
            @blur="args.onBlur"
            @select="args.onSelect"
            @update:value="args['onUpdate:value']"
          />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBlur: fn(),
    onFocus: fn(),
    onSelect: fn(),
    'onUpdate:value': fn(),
  },
};

export const Size: Story = {
  render: (args) => ({
    components: { CAutoComplete },
    setup() {
      const model = ref('');

      return { args, model, options };
    },
    template: `
      <CAutoComplete
        v-bind="args"
        v-model:value="model"
        :options="options"
        clearable
        style="margin-bottom: 12px"
        size="large" />
      <CAutoComplete
        v-bind="args"
        v-model:value="model"
        :options="options"
        clearable
        style="margin-bottom: 12px"
        size="medium" />
      <CAutoComplete
        v-bind="args"
        v-model:value="model"
        :options="options"
        clearable
        size="small" />
    `,
  }),
};

export const Status: Story = {
  render: (args) => ({
    components: { CAutoComplete },
    setup() {
      const model = ref('');

      return { args, model, options };
    },
    template: `
      <CAutoComplete
        v-bind="args"
        v-model:value="model"
        :options="options"
        clearable
        style="margin-bottom: 12px"
        status="warning" />
      <CAutoComplete
        v-bind="args"
        v-model:value="model"
        :options="options"
        clearable
        status="error" />
    `,
  }),
};
