import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CIcon from '../CIcon/CIcon.vue';
import CTag from './CTag.vue';
import CAvatar from '../CAvatar/CAvatar.vue';

const meta: Meta<typeof CTag> = {
  title: 'Components/Tag',
  component: CTag,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
      description: 'The content of the tag.',
    },
    avatar: {
      control: false,
      description: "Tag's avatar",
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    'onUpdate:checked': {
      table: {
        disable: true,
      },
    },
    icon: {
      control: false,
      description: "Tag's icon",
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    type: {
      options: ['default', 'primary', 'info', 'warning', 'success', 'error'],
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/tag)** Component to show attributes eye catchy way.',
      },
    },
  },
  render: (args) => ({
    components: { CTag },
    setup() {
      return { args };
    },
    template: `
      <CTag
        :bordered="args.bordered"
        :checkable="args.checkable"
        :checked="args.checked"
        :closable="args.closable"
        :color="args.color"
        :disabled="args.disabled"
        :round="args.round"
        :size="args.size"
        :strong="args.strong"
        :triggerClickOnClose="args.triggerClickOnClose"
        :type="args.type"
      >
        Tag Content
      </CTag>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'primary',
  },
};

export const Type: Story = {
  render: () => ({
    components: { CTag },
    template: `
      <CTag>Default</CTag>
      <CTag type="success">
        Success
      </CTag>
      <CTag type="warning">
        Warning
      </CTag>
      <CTag type="error">
        Error
      </CTag>
      <CTag type="info">
        Info
      </CTag>
      <CTag type="primary">
        Primary
      </CTag>
    `,
  }),
};

export const Borderless: Story = {
  render: () => ({
    components: { CTag },
    template: `
      <CTag :bordered="false">
        Default
      </CTag>
      <CTag :bordered="false" type="success">
        Success
      </CTag>
      <CTag :bordered="false" type="warning">
        Warning
      </CTag>
      <CTag :bordered="false" type="error">
        Error
      </CTag>
      <CTag :bordered="false" type="info">
        Info
      </CTag>
      <CTag :bordered="false" type="primary">
        Primary
      </CTag>
    `,
  }),
};

export const Size: Story = {
  render: (args) => ({
    components: { CTag },
    setup() {
      const onClose = fn();

      return { args, onClose };
    },
    template: `
      <CTag 
        closable
        type="success"
        size="small"
        :bordered="false"
        @close="onClose">
        Small
      </CTag>
      <CTag 
        closable
        type="warning"
        
        @close="onClose">
        Medium
      </CTag>
      <CTag 
        closable
        type="primary"
        size="large"
        @close="onClose">
        Large
      </CTag>
    `,
  }),
};

export const Shape: Story = {
  render: () => ({
    components: { CTag },
    template: `
      <CTag 
        type="success"
        size="small"
        round
        :bordered="false">
        Success
      </CTag>
      <CTag 
        type="warning"
        round>
        Warning
      </CTag>
      <CTag 
        type="error"
        round
        size="large"
        :bordered="false">
        Error
      </CTag>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { CTag },
    setup() {
      const onClose = fn();

      return { args, onClose };
    },
    template: `
      <CTag 
        :closable="true"
        :disabled="true"
        @close="onClose">Default</CTag>
      <CTag
        :closable="true"
        type="success"
        :disabled="true"
        @close="onClose">
        Success
      </CTag>
      <CTag
        :closable="true"
        type="warning"
        :disabled="true"
        @close="onClose">
        Warning
      </CTag>
      <CTag
        :closable="true"
        type="error"
        :disabled="true"
        @close="onClose">
        Error
      </CTag>
      <CTag
        :closable="true"
        type="info"
        :disabled="true"
        @close="onClose">
        Info
      </CTag>
      <CTag
        :closable="true"
        type="primary"
        :disabled="true"
        @close="onClose">
        Info
      </CTag>
    `,
  }),
};

export const Avatar: Story = {
  render: (args) => ({
    components: { CTag, CAvatar },
    setup() {
      const onClose = fn();

      return { args, onClose };
    },
    template: `
      <CTag 
        :closable="true"
        type="primary"
        @close="onClose">
        <template #avatar>
          <CAvatar
            name="Jesse James"
            round
            size="small" />
        </template>
        Jesse James
      </CTag>
      <CTag
        :closable="true"
        type="info"
        :bordered="false"
        @close="onClose">
        <template #avatar>
          <CAvatar
            src="https://picsum.photos/id/370/200/300"
            size="large" />
        </template>
        Another Tag
      </CTag>
      <CTag
        :closable="true"
        type="success"
        :bordered="false"
        round
        @close="onClose">
        <template #avatar>
          <CAvatar
            src="https://picsum.photos/id/371/200/300"
            round
            size="large" />
        </template>
        One more
      </CTag>
    `,
  }),
};

export const Icon: Story = {
  render: () => ({
    components: { CTag, CIcon },
    template: `
      <CTag type="success">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="checkmark-circle"
          />
        </template>
        Checked
      </CTag>
      <CTag
        type="error"
        round
        :bordered="false">
        <template #icon>
          <CIcon
            :is-inline="true"
            name="close-circle"
          />
        </template>
        Error
      </CTag>
    `,
  }),
};
