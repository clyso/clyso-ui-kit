import type { Meta, StoryObj } from '@storybook/vue3';
import CAvatar from './CAvatar.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CAvatar> = {
  title: 'Components/Avatar',
  component: CAvatar,
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
      description: 'The content of the avatar.',
    },
    name: {
      control: 'text',
    },
    color: {
      control: 'color',
    },
    intersectionObserverOptions: {
      control: false,
    },
    lazy: {
      control: false,
    },
    objectFit: {
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    },
    renderFallback: {
      control: false,
    },
    renderPlaceholder: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/avatar) but has additional property: `name`.**\n\n Component to display userpics.',
      },
    },
  },
  render: (args) => ({
    components: { CAvatar },
    setup() {
      return { args };
    },
    template: `
      <CAvatar
        :name="args.name"
        :bordered="args.bordered"
        :color="args.color"
        :fallbackSrc="args.fallbackSrc"
        :imgProps="args.imgProps"
        :intersectionObserverOptions="args.intersectionObserverOptions"
        :lazy="args.lazy"
        :objectFit="args.objectFit"
        :renderFallback="args.renderFallback"
        :renderPlaceholder="args.renderPlaceholder"
        :round="args.round"
        :size="args.size"
        :src="args.src"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    src: 'https://picsum.photos/id/48/200/300',
    color: '#808f12',
    fallbackSrc: 'https://picsum.photos/id/175/200/300',
  },
};

export const Size: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <CAvatar
        name="John Doe"
        color="#808f12"
        size="small" />
      <CAvatar
        name="John Doe"
        size="medium" />
      <CAvatar
        name="John Doe"
        size="large"/>
      <CAvatar
        name="John Doe"
        :size="100" />
    `,
  }),
};

export const Shape: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <CAvatar
        name="Jesse James"
        round 
        size="small" />
      <CAvatar
        round 
        size="medium" />
      <CAvatar
        src="https://picsum.photos/id/370/200/300"
        round
        size="large" />
      <CAvatar
        name="Harry Potter"
        round
        :size="100" />
    `,
  }),
};

export const Fallback: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <CAvatar
        src="https://WRONG.URL"
        fallback-src="https://picsum.photos/id/173/200/300"
        round
        :size="200" />
    `,
  }),
};

export const Icon: Story = {
  render: () => ({
    components: { CAvatar, CIcon },
    template: `
      <CAvatar 
        size="large"
        name="Jesse James">
        <CIcon
          style="color: #d02f4f"
          :is-inline="true"
          name="checkmark-circle"></CIcon>
      </CAvatar>
    `,
  }),
};
