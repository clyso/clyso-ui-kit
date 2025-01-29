import type { Meta, StoryObj } from '@storybook/vue3';
import { computed } from 'vue';
import type { CookieBannerItem } from '../../types/cookieBanner';
import CCookieBanner from './CCookieBanner.vue';

const meta: Meta<typeof CCookieBanner> = {
  title: 'Components/CookieBanner',
  // Issue with generics in components: https://github.com/storybookjs/storybook/issues/24238
  component: CCookieBanner as Record<keyof typeof CCookieBanner, unknown>,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="height: 500px; overflow: auto">
        <div style="height: 600px; position: relative;"><story/></div>
      </div>`,
    }),
  ],
  argTypes: {
    items: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component. A component that displays a customizable banner to collect cookie consent from users. It can be configured to show or hide, include settings and close options, and specify positioning and expiration details for the consent cookie.',
      },
    },
  },
  render: (args) => ({
    components: { CCookieBanner },
    setup() {
      enum CookieCategory {
        ESSENTIAL = 'ESSENTIAL',
        ANALYTICS = 'ANALYTICS',
      }
      const cookieItems = computed<CookieBannerItem<CookieCategory>[]>(() => [
        {
          id: CookieCategory.ESSENTIAL,
          title: 'Essential Cookies',
          description:
            'These cookies are required to use certain features of our website. One example would be a cookie that lets us know that you have accepted this policy.',
          isEnabled: true,
          isMandatory: true,
        },
        {
          id: CookieCategory.ANALYTICS,
          title: 'Analytics Cookies',
          description:
            'These cookies allow us to track the statistics on website usage to see how many users visit our site, how they navigate, etc. This helps us improve our website and your experience.',
          isEnabled: false,
        },
      ]);

      return { args, cookieItems };
    },
    template: `
      <CCookieBanner 
        :is-shown="true" 
        bottom="0"
        style="top: 100%"
        :items="cookieItems"/>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
