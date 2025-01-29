import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import { fn } from '@storybook/test';
import CInput from './CInput.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CInput> = {
  title: 'Components/Input',
  component: CInput,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    count: {
      control: false,
      description: 'Word count.',
    },
    'clear-icon': {
      control: false,
      description: 'Custom clear icon.',
    },
    'password-invisible-icon': {
      control: false,
      description: 'Password toggle icon when password is invisible.',
    },
    'password-visible-icon': {
      control: false,
      description: 'Password toggle icon when password is visible.',
    },
    prefix: {
      control: false,
      description: 'Prefix content slot.',
    },
    suffix: {
      control: false,
      description: 'Suffix content slot.',
    },
    separator: {
      table: {
        disable: true,
      },
    },
    showPasswordOn: {
      options: ['click', 'mousedown'],
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    status: {
      options: ['success', 'warning', 'error'],
    },
    type: {
      options: ['text', 'password', 'textarea'],
    },
    allowInput: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/input) but has additional properties: `hasError`, `id`.**',
      },
    },
  },
  render: (args) => ({
    components: { CInput },
    setup() {
      const value = ref('');

      return {
        args,
        value,
        fn,
      };
    },
    template: `
      <CInput
        id="default-tag-input"
        style="max-width: 500px"
        v-model:value="value"
        :hasError="args.hasError"
        :id="args.id"
        :allowInput="args.allowInput"
        :autofocus="args.autofocus"
        :autosize="args.autosize"
        :clearable="args.clearable"
        :countGraphemes="args.countGraphemes"
        :defaultValue="args.defaultValue"
        :disabled="args.disabled"
        :inputProps="args.inputProps"
        :loading="args.loading"
        :maxlength="args.maxlength"
        :minlength="args.minlength"
        :passivelyActivated="args.passivelyActivated"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        :renderCount="args.renderCount"
        :round="args.round"
        :rows="args.rows"
        :showCount="args.showCount"
        :showPasswordOn="args.showPasswordOn"
        :size="args.size"
        :status="args.status"
        :type="args.type"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const Size: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const value = ref('');

      return { value };
    },
    template: `
      <CInput 
        v-model:value="value"
        clearable
        size="tiny"/>
      <CInput 
        v-model:value="value"
        clearable
        size="small"/>
      <CInput 
        v-model:value="value"
        clearable
        size="medium"/>
      <CInput 
        v-model:value="value"
        clearable
        size="large"/>
    `,
  }),
};

export const Prefix: Story = {
  render: (args) => ({
    components: { CInput, CIcon },
    setup() {
      const value = ref('');

      return { args, value };
    },
    template: `
      <CInput 
        style="max-width: 500px"
        v-model:value="value"
        clearable>
        <template #prefix>
          <CIcon :is-inline="true" name="search"></CIcon>
        </template>
      </CInput>
    `,
  }),
};

export const Suffix: Story = {
  render: (args) => ({
    components: { CInput, CIcon },
    setup() {
      const value = ref('');
      const isValid = computed(() => value.value.length > 3);

      return { args, value, isValid };
    },
    template: `
      <CInput 
        style="max-width: 500px"
        v-model:value="value"
        clearable>
        <template #suffix>
          <CIcon 
            v-if="isValid"
            style="color: var(--success-color);"
            :is-inline="true" name="checkmark-circle"></CIcon>
          <CIcon 
            v-else
            style="color: var(--error-color);"
            :is-inline="true" name="close-circle"></CIcon>
        </template>
      </CInput>
    `,
  }),
};

export const Password: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const value = ref('');

      return { value };
    },
    template: `
      <CInput 
        style="max-width: 500px"
        v-model:value="value"
        placeholder="Password"
        show-password-on="click"
        type="password"/>
    `,
  }),
};

export const Textarea: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const value = ref('');

      return { value };
    },
    template: `
      <CInput 
        style="max-width: 500px"
        v-model:value="value"
        :rows="5"
        placeholder="Description"
        type="textarea"/>
    `,
  }),
};

export const AllowInput: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const value = ref('');
      const allowInput = (str: string) => !str || /^\d+$/.test(str);

      return { value, allowInput };
    },
    template: `
      <CInput 
        style="max-width: 500px"
        v-model:value="value"
        :rows="5"
        :allow-input="allowInput"
        placeholder="Numbers only"/>
    `,
  }),
};
