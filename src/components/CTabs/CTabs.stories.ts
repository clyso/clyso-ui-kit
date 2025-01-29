import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CTabs from './CTabs.vue';
import { type Tab } from '../../types/tabs';
import CTile from '../CTile/CTile.vue';

enum DemoTab {
  HOME = 'HOME',
  GENERAL = 'GENERAL',
  PERSONAL = 'PERSONAL',
  SECURITY = 'SECURITY',
  ADVANCED = 'ADVANCED',
}

const selectedTab = ref(DemoTab.HOME);
const tabs = ref<Tab[]>([
  {
    name: DemoTab.HOME,
    label: 'Home',
  },
  {
    name: DemoTab.GENERAL,
    label: 'General',
  },
  {
    name: DemoTab.PERSONAL,
    label: 'Personal',
  },
  {
    name: DemoTab.ADVANCED,
    label: 'Advanced',
    isDisabled: true,
  },
  {
    name: DemoTab.SECURITY,
    label: 'Security',
  },
]);

const meta: Meta<typeof CTabs> = {
  title: 'Components/Tabs',
  component: CTabs,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="display: grid; gap: 36px"><story/></div>',
    }),
  ],
  argTypes: {
    value: {
      control: false,
    },
    tabs: {
      control: false,
    },
    size: {
      options: ['small', 'medium', 'large'],
    },
    type: {
      options: ['bar', 'line', 'card', 'segment'],
    },
    trigger: {
      options: ['hover', 'click'],
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The CTabs component is a wrapper around Naive UI's NTabs and NTab components, designed to display a collection of tabs. It allows for customizable tab behavior, including type, size, and click handling. The component supports tabs with labels and can trigger events when a tab is clicked.",
      },
    },
  },
  render: (args) => ({
    components: { CTabs, CTile },
    setup() {
      return {
        args,
        selectedTab,
        tabs,
        DemoTab,
      };
    },
    template: `
      <div>
        <CTabs
          v-model:value="selectedTab"
          :tabs="tabs"
          :type="args.type"
          :size="args.size"
          :trigger="args.trigger"
          @click="args.onClick"
          @update:value="args['onUpdate:value']"
        />
        <CTile style="margin-top: 24px; min-height: 200px">
          <div v-if="selectedTab === DemoTab.HOME">Welcome to your kingdom!</div>
          <div v-else-if="selectedTab === DemoTab.GENERAL">The basics, but essential!</div>
          <div v-else-if="selectedTab === DemoTab.PERSONAL">Just for you, buddy!</div>
          <div v-else-if="selectedTab === DemoTab.SECURITY">Lock it down, ninja style!</div>
          <div v-else-if="selectedTab === DemoTab.ADVANCED">Prepare for wizard-level stuff!</div>
        </CTile>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    type: 'card',
    trigger: 'click',
    'onUpdate:value': fn(),
    onClick: fn(),
  },
};

export const Size: Story = {
  render: () => ({
    components: { CTabs },
    setup() {
      return {
        selectedTab,
        tabs,
      };
    },
    template: `
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        size="small"
      />
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        size="medium"
      />
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        size="large"
      />
    `,
  }),
};

export const Type: Story = {
  render: () => ({
    components: { CTabs },
    setup() {
      return {
        selectedTab,
        tabs,
      };
    },
    template: `
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        type="card"
      />
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        type="segment"
      />
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        type="bar"
      />
      <CTabs
        v-model:value="selectedTab"
        :tabs="tabs"
        type="line"
      />
    `,
  }),
};
