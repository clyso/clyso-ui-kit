import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import { fn } from '@storybook/test';
import CSelect from './CSelect.vue';

const meta: Meta<typeof CSelect> = {
  title: 'Components/Select',
  component: CSelect,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    childrenField: {
      control: false,
      description: 'Word count.',
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    status: {
      options: ['success', 'warning', 'error'],
    },
    ellipsisTagPopoverProps: {
      control: false,
    },
    filter: {
      control: false,
    },
    maxTagCount: {
      control: 'number',
    },
    menuSize: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    options: {
      control: false,
    },
    placement: {
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
    renderTag: {
      control: false,
    },
    to: {
      control: false,
    },
    value: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
    'onUpdate:show': {
      table: {
        disable: true,
      },
    },
    onBlur: {
      table: {
        disable: true,
      },
    },
    onClear: {
      table: {
        disable: true,
      },
    },
    onFocus: {
      table: {
        disable: true,
      },
    },
    onScroll: {
      table: {
        disable: true,
      },
    },
    onSearch: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/select) but has additional properties: `hasError`, `id`.**',
      },
    },
  },
  render: (args) => ({
    components: { CSelect },
    setup() {
      const value = ref('forrest_gump');
      const options = computed(() => [
        { label: 'Inception', value: 'inception' },
        { label: 'The Dark Knight', value: 'dark_knight' },
        { label: 'Interstellar', value: 'interstellar' },
        { label: 'Parasite', value: 'parasite' },
        { label: 'The Godfather', value: 'godfather' },
        { label: 'Pulp Fiction', value: 'pulp_fiction' },
        { label: 'Fight Club', value: 'fight_club' },
        { label: 'Forrest Gump', value: 'forrest_gump' },
        { label: 'The Matrix', value: 'matrix' },
        { label: 'Gladiator', value: 'gladiator' },
      ]);

      return {
        args,
        value,
        options,
      };
    },
    template: `
      <CSelect
        id="default-tag-input"
        style="max-width: 500px"
        v-model:value="value"
        :consistentMenuWidth="args.consistentMenuWidth"
        :childrenField="args.childrenField"
        :clearable="args.clearable"
        :clearFilterAfterSelect="args.clearFilterAfterSelect"
        :defaultValue="args.defaultValue"
        :disabled="args.disabled"
        :ellipsisTagPopoverProps="args.ellipsisTagPopoverProps"
        :filterable="args.filterable"
        :filter="args.filter"
        :hasError="args.hasError"
        :id="args.id"
        :ignoreComposition="args.ignoreComposition"
        :inputProps="args.inputProps"
        :keyboard="args.keyboard"
        :labelField="args.labelField"
        :loading="args.loading"
        :maxTagCount="args.maxTagCount"
        :menuProps="args.menuProps"
        :menuSize="args.menuSize"
        :multiple="args.multiple"
        :options="options"
        :placeholder="args.placeholder"
        :placement="args.placement"
        :remote="args.remote"
        :renderLabel="args.renderLabel"
        :renderOption="args.renderOption"
        :renderTag="args.renderTag"
        :resetMenuOnOptionsChange="args.resetMenuOnOptionsChange"
        :show="args.show"
        :showArrow="args.showArrow"
        :showCheckmark="args.showCheckmark"
        :showOnFocus="args.showOnFocus"
        :size="args.size"
        :status="args.status"
        :tag="args.tag"
        :to="args.to"
        :value="args.value"
        :valueField="args.valueField"
        :virtualScroll="args.virtualScroll"
        @update:value="args['onUpdate:value']"
        @update:show="args['onUpdate:show']"
        @blur="args.onBlur"
        @select="args.onClear"
        @focus="args.onFocus"
        @scroll="args.onScroll"
        @search="args.onSearch"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    'onUpdate:value': fn(),
    'onUpdate:show': fn(),
    onBlur: fn(),
    onClear: fn(),
    onFocus: fn(),
    onScroll: fn(),
    onSearch: fn(),
  },
};

export const Size: Story = {
  render: () => ({
    components: { CSelect },
    setup() {
      const value = ref('godfather');
      const options = computed(() => [
        { label: 'Inception', value: 'inception' },
        { label: 'The Dark Knight', value: 'dark_knight' },
        { label: 'Interstellar', value: 'interstellar' },
        { label: 'Parasite', value: 'parasite' },
        { label: 'The Godfather', value: 'godfather' },
        { label: 'Pulp Fiction', value: 'pulp_fiction' },
        { label: 'Fight Club', value: 'fight_club' },
        { label: 'Forrest Gump', value: 'forrest_gump' },
        { label: 'The Matrix', value: 'matrix' },
        { label: 'Gladiator', value: 'gladiator' },
      ]);

      return { value, options };
    },
    template: `
      <CSelect 
        v-model:value="value"
        :options="options"
        clearable
        size="tiny"/>
      <CSelect 
        v-model:value="value"
        :options="options"
        clearable
        size="small"/>
      <CSelect 
        v-model:value="value"
        :options="options"
        clearable
        size="medium"/>
      <CSelect 
        v-model:value="value"
        :options="options"
        clearable
        size="large"/>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { CSelect },
    setup() {
      const value = ref(['fight_club', 'gladiator']);
      const options = computed(() => [
        { label: 'Inception', value: 'inception' },
        { label: 'The Dark Knight', value: 'dark_knight' },
        { label: 'Interstellar', value: 'interstellar' },
        { label: 'Parasite', value: 'parasite' },
        { label: 'The Godfather', value: 'godfather' },
        { label: 'Pulp Fiction', value: 'pulp_fiction' },
        { label: 'Fight Club', value: 'fight_club' },
        { label: 'Forrest Gump', value: 'forrest_gump' },
        { label: 'The Matrix', value: 'matrix' },
        { label: 'Gladiator', value: 'gladiator' },
      ]);

      return { value, options };
    },
    template: `
      <CSelect 
        v-model:value="value"
        :options="options"
        style="max-width: 500px"
        clearable
        multiple
        size="large"
        :maxTagCount="2"
      />
    `,
  }),
};
