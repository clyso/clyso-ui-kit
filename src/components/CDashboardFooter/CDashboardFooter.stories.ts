import type { Meta, StoryObj } from '@storybook/vue3';
import { DashboardFooterLink } from '../../types/index';
import CDashboardFooter from './CDashboardFooter.vue';

const meta: Meta<typeof CDashboardFooter> = {
  title: 'Components/Dashboard/DashboardFooter',
  component: CDashboardFooter,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="min-width: 500px"><story/></div>',
    }),
  ],
  argTypes: {
    links: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Footer component.',
      },
    },
  },
  render: (args) => ({
    components: { CDashboardFooter },
    setup() {
      enum FooterLinkId {
        CONTACT = 'CONTACT',
        IMPRINT = 'IMPRINT',
        PRIVACY_POLICY = 'PRIVACY_POLICY',
        CAREER = 'CAREER',
      }

      const links: DashboardFooterLink[] = [
        {
          id: FooterLinkId.CONTACT,
          text: 'Contact',
          url: 'https://www.google.com/search?q=contact',
        },
        {
          id: FooterLinkId.IMPRINT,
          text: 'Imprint',
          url: 'https://www.google.com/search?q=career',
        },
        {
          id: FooterLinkId.PRIVACY_POLICY,
          text: 'Privacy Policy',
          url: 'https://www.google.com/search?q=privacy+policy',
        },
        {
          id: FooterLinkId.CAREER,
          text: 'Career',
          url: 'https://www.google.com/search?q=career',
        },
      ];

      const year = new Date().getFullYear();

      return { args, links, year };
    },
    template: `
      <CDashboardFooter
        :is-centered="args.isCentered"
        :links="links"
      >
        <template #address>1234 Elm Street, Office 56, Springfield, IL 62704, USA</template>
        <template #copyright>© Copyright {{ year }} Rogaikopyta GmbH</template>
        <template #logo>
          <a
            target="_blank"
            href="https://www.themoviedb.org/"
            rel="noopener noreferrer"
            class="logo-link"
          >
            <img src="https://fakeimg.pl/130x60/ffffff,0/?text=LogoHere&font=poppins&font_size=36&text_align=right" />
          </a>
        </template>
      </CDashboardFooter>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
