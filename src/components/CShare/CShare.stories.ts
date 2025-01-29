import type { Meta, StoryObj } from '@storybook/vue3';
import CShare from './CShare.vue';
import type { ShareDataObject } from '../../types/share';

const meta: Meta<typeof CShare> = {
  title: 'Components/Share',
  component: CShare,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center; gap: 24px"><story/></div>',
    }),
  ],
  argTypes: {
    data: {
      control: false,
    },
    mediaList: {
      control: 'check',
      options: ['copyLink', 'telegram', 'whatsapp', 'xTwitter', 'facebook'],
    },
    default: {
      control: false,
      description: 'Default slot',
    },
    'share-button-text': {
      control: false,
      description: 'Share button text slot',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CShare is a clickable element that allows users to share content with others. This button facilitates sharing content via social media platforms, messaging apps, or links. The share button is commonly used to increase engagement and make it easier for users to spread content across different networks.',
      },
    },
  },
  render: (args) => ({
    components: { CShare },
    setup() {
      const shareData: ShareDataObject = {
        url: 'http://naive.ui',
      };

      return {
        args,
        shareData,
      };
    },
    template: ` 
      <CShare
        :data="shareData"
        :media-list="args.mediaList"
        :copy-tooltip-success-text="args.copyTooltipSuccessText"
        :failedText="args.failedText"
        :is-disabled="args.isDisabled"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
