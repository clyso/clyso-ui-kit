import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CButton from './CButton.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CButton> = {
  title: 'Components/Button',
  component: CButton,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap"><story/></div>',
    }),
  ],
  argTypes: {
    onClick: {
      control: false,
    },
    default: {
      control: false,
    },
    icon: {
      control: false,
    },
    attrType: {
      options: ['button', 'submit', 'reset'],
    },
    color: {
      control: 'color',
    },
    iconPlacement: {
      options: ['left', 'right'],
    },
    renderIcon: {
      control: false,
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    textColor: {
      control: 'color',
    },
    type: {
      options: [
        'default',
        'tertiary',
        'primary',
        'success',
        'info',
        'warning',
        'error',
      ],
    },
    tag: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/button).**\n\n',
      },
    },
  },
  render: (args) => ({
    components: { CButton, CIcon },
    setup() {
      return { args };
    },
    template: `
      <CButton
        :attr-type="args.attrType"
        :block="args.block"
        :bordered="args.bordered"
        :circle="args.circle"
        :color="args.color"
        :dashed="args.dashed"
        :disabled="args.disabled"
        :focusable="args.focusable"
        :ghost="args.ghost"
        :native-focus-behavior="args.nativeFocusBehavior"
        :icon-placement="args.iconPlacement"
        :keyboard="args.keyboard"
        :quaternary="args.quaternary"
        :loading="args.loading"
        :render-icon="args.renderIcon"
        :round="args.round"
        :secondary="args.secondary"
        :size="args.size"
        :strong="args.strong"
        :tertiary="args.tertiary"
        :text="args.text"
        :text-color="args.textColor"
        :type="args.type"
        :tag="args.tag"
        @click="args.onClick"
      >
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
        Edit
      </CButton>
      <CButton
        :attr-type="args.attrType"
        :block="args.block"
        :bordered="args.bordered"
        :circle="args.circle"
        :color="args.color"
        :dashed="args.dashed"
        :disabled="args.disabled"
        :focusable="args.focusable"
        :ghost="args.ghost"
        :native-focus-behavior="args.nativeFocusBehavior"
        :icon-placement="args.iconPlacement"
        :keyboard="args.keyboard"
        :quaternary="args.quaternary"
        :loading="args.loading"
        :render-icon="args.renderIcon"
        :round="args.round"
        :secondary="args.secondary"
        :size="args.size"
        :strong="args.strong"
        :tertiary="args.tertiary"
        :text="args.text"
        :text-color="args.textColor"
        :type="args.type"
        :tag="args.tag"
        @click="args.onClick"
      >
        Edit
      </CButton>
      <CButton
        :attr-type="args.attrType"
        :block="args.block"
        :bordered="args.bordered"
        :circle="args.circle"
        :color="args.color"
        :dashed="args.dashed"
        :disabled="args.disabled"
        :focusable="args.focusable"
        :ghost="args.ghost"
        :native-focus-behavior="args.nativeFocusBehavior"
        :icon-placement="args.iconPlacement"
        :keyboard="args.keyboard"
        :quaternary="args.quaternary"
        :loading="args.loading"
        :render-icon="args.renderIcon"
        :round="args.round"
        :secondary="args.secondary"
        :size="args.size"
        :strong="args.strong"
        :tertiary="args.tertiary"
        :text="args.text"
        :text-color="args.textColor"
        :type="args.type"
        :tag="args.tag"
        @click="args.onClick"
      >
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'primary',
    onClick: fn(),
  },
};

export const Basic: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <CButton>Default</CButton>
      <CButton type="tertiary">
        Tertiary
      </CButton>
      <CButton type="primary">
        Primary
      </CButton>
      <CButton type="info">
        Info
      </CButton>
      <CButton type="success">
        Success
      </CButton>
      <CButton type="warning">
        Warning
      </CButton>
      <CButton type="error">
        Error
      </CButton>
    `,
  }),
};

export const Size: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton
        size="tiny"
        type="primary">Tiny</CButton>
      <CButton
        size="small"
        secondary
        type="primary">
        Small
      </CButton>
      <CButton
        size="medium"
        tertiary
        type="primary">
        Medium
      </CButton>
      <CButton
        size="large"
        ghost
        type="primary">
        Large
      </CButton>
      <CButton
        size="tiny"
        circle
        type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton
        size="small"
        secondary
        circle
        type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton
        size="medium"
        tertiary
        circle
        type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton
        size="large"
        ghost
        circle
        type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

// TODO: refactor to reuse template?
export const Secondary: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton secondary>
        Default
      </CButton>
      <CButton secondary type="tertiary">
        Tertiary
      </CButton>
      <CButton secondary type="primary">
        Primary
      </CButton>
      <CButton secondary type="info">
        Info
      </CButton>
      <CButton secondary type="success">
        Success
      </CButton>
      <CButton secondary type="warning">
        Warning
      </CButton>
      <CButton secondary type="error">
        Error
      </CButton>
      <CButton secondary round>
        Default
      </CButton>
      <CButton secondary round type="primary">
        Primary
      </CButton>
      <CButton secondary round type="info">
        Info
      </CButton>
      <CButton secondary round type="success">
        Success
      </CButton>
      <CButton secondary round type="warning">
        Warning
      </CButton>
      <CButton secondary round type="error">
        Error
      </CButton>
      <CButton secondary circle>
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton secondary circle type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton secondary circle type="info">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton secondary circle type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton secondary circle type="warning">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton secondary circle type="error">

        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

export const Tertiary: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton tertiary>
        Default
      </CButton>
      <CButton tertiary type="tertiary">
        Tertiary
      </CButton>
      <CButton tertiary type="primary">
        Primary
      </CButton>
      <CButton tertiary type="info">
        Info
      </CButton>
      <CButton tertiary type="success">
        Success
      </CButton>
      <CButton tertiary type="warning">
        Warning
      </CButton>
      <CButton tertiary type="error">
        Error
      </CButton>
      <CButton tertiary round>
        Default
      </CButton>
      <CButton tertiary round type="primary">
        Primary
      </CButton>
      <CButton tertiary round type="info">
        Info
      </CButton>
      <CButton tertiary round type="success">
        Success
      </CButton>
      <CButton tertiary round type="warning">
        Warning
      </CButton>
      <CButton tertiary round type="error">
        Error
      </CButton>
      <CButton tertiary circle>
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton tertiary circle type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton tertiary circle type="info">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton tertiary circle type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton tertiary circle type="warning">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton tertiary circle type="error">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

export const Quaternary: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton quaternary>
        Default
      </CButton>
      <CButton quaternary type="tertiary">
        Tertiary
      </CButton>
      <CButton quaternary type="primary">
        Primary
      </CButton>
      <CButton quaternary type="info">
        Info
      </CButton>
      <CButton quaternary type="success">
        Success
      </CButton>
      <CButton quaternary type="warning">
        Warning
      </CButton>
      <CButton quaternary type="error">
        Error
      </CButton>
      <CButton quaternary round>
        Default
      </CButton>
      <CButton quaternary round type="primary">
        Primary
      </CButton>
      <CButton quaternary round type="info">
        Info
      </CButton>
      <CButton quaternary round type="success">
        Success
      </CButton>
      <CButton quaternary round type="warning">
        Warning
      </CButton>
      <CButton quaternary round type="error">
        Error
      </CButton>
      <CButton quaternary circle>
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton quaternary circle type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton quaternary circle type="info">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton quaternary circle type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton quaternary circle type="warning">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton quaternary circle type="error">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

export const Ghost: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton ghost>
        Default
      </CButton>
      <CButton ghost type="tertiary">
        Tertiary
      </CButton>
      <CButton ghost type="primary">
        Primary
      </CButton>
      <CButton ghost type="info">
        Info
      </CButton>
      <CButton ghost type="success">
        Success
      </CButton>
      <CButton ghost type="warning">
        Warning
      </CButton>
      <CButton ghost type="error">
        Error
      </CButton>
      <CButton ghost round>
        Default
      </CButton>
      <CButton ghost round type="primary">
        Primary
      </CButton>
      <CButton ghost round type="info">
        Info
      </CButton>
      <CButton ghost round type="success">
        Success
      </CButton>
      <CButton ghost round type="warning">
        Warning
      </CButton>
      <CButton ghost round type="error">
        Error
      </CButton>
      <CButton ghost circle>
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton ghost circle type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton ghost circle type="info">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton ghost circle type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton ghost circle type="warning">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton ghost circle type="error">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

export const Dashed: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton dashed>
        Default
      </CButton>
      <CButton dashed type="tertiary">
        Tertiary
      </CButton>
      <CButton dashed type="primary">
        Primary
      </CButton>
      <CButton dashed type="info">
        Info
      </CButton>
      <CButton dashed type="success">
        Success
      </CButton>
      <CButton dashed type="warning">
        Warning
      </CButton>
      <CButton dashed type="error">
        Error
      </CButton>
      <CButton dashed round>
        Default
      </CButton>
      <CButton dashed round type="primary">
        Primary
      </CButton>
      <CButton dashed round type="info">
        Info
      </CButton>
      <CButton dashed round type="success">
        Success
      </CButton>
      <CButton dashed round type="warning">
        Warning
      </CButton>
      <CButton dashed round type="error">
        Error
      </CButton>
      <CButton dashed circle>
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton dashed circle type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton dashed circle type="info">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton dashed circle type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton dashed circle type="warning">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton dashed circle type="error">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};

export const Text: Story = {
  render: () => ({
    components: { CButton, CIcon },
    template: `
      <CButton text>
        Default
      </CButton>
      <CButton text type="tertiary">
        Tertiary
      </CButton>
      <CButton text type="primary">
        Primary
      </CButton>
      <CButton text type="info">
        Info
      </CButton>
      <CButton text type="success">
        Success
      </CButton>
      <CButton text type="warning">
        Warning
      </CButton>
      <CButton text type="error">
        Error
      </CButton>
      <CButton text round>
        Default
      </CButton>
      <CButton text round type="primary">
        Primary
      </CButton>
      <CButton text round type="info">
        Info
      </CButton>
      <CButton text round type="success">
        Success
      </CButton>
      <CButton text round type="warning">
        Warning
      </CButton>
      <CButton text round type="error">
        Error
      </CButton>
      <CButton text circle>
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton text circle type="primary">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton text circle type="info">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton text circle type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton text circle type="warning">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
      <CButton text circle type="error">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="pencil"
          />
        </template>
      </CButton>
    `,
  }),
};
