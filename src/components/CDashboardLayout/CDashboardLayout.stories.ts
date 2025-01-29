import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import type { DropdownOption } from 'naive-ui/es/dropdown/src/interface';
import { fn } from '@storybook/test';
import CDashboardHeader from '../CDashboardHeader/CDashboardHeader.vue';
import CDashboardFooter from '../CDashboardFooter/CDashboardFooter.vue';
import CDashboardLayout from './CDashboardLayout.vue';
import CDashboardPage from '../CDashboardPage/CDashboardPage.vue';
import CTile from '../CTile/CTile.vue';
import CIcon from '../CIcon/CIcon.vue';
import CDashboardSidebar from '../CDashboardSidebar/CDashboardSidebar.vue';
import CDashboardMenu from '../CDashboardMenu/CDashboardMenu.vue';
import {
  DashboardFooterLink,
  type DashboardMenuGroup,
  DashboardMenuItemType,
  I18nLocale,
} from '../../types';

const meta: Meta<typeof CDashboardLayout> = {
  title: 'Components/Dashboard/DashboardLayout',
  component: CDashboardLayout,
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:navMeta': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The DashboardLayout component provides a structured layout for dashboards, including slots for the header, side menu, content, and footer. It manages and exposes `navMeta`, which offers details such as `isSideMenuMinimized`, `isSideMenuHovered`, `isSideMenuOpen`, `isTopMenuOpen`, `isMobile`, `viewportWidth`, `headerHeight`, `sideMenuWidth`, and `scrollTop`. This metadata can be injected into child components as needed.',
      },
    },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: {
      CDashboardLayout,
      CDashboardHeader,
      CDashboardFooter,
      CIcon,
      CDashboardSidebar,
      CDashboardMenu,
      CDashboardPage,
      CTile,
    },
    setup() {
      const activeItem = ref('HOME_PAGE');

      const locale = ref<I18nLocale>(I18nLocale.EN);

      function handleOptionSelect(value: string) {
        activeItem.value = value;
      }

      const sideMenuItems = computed<DashboardMenuGroup[]>(() => [
        {
          key: 'HOME',
          children: [
            {
              key: 'HOME_PAGE',
              title: 'Home',
              type: DashboardMenuItemType.LINK,
              iconName: 'home',
              to: '/',
              isHidden: false,
              isActive: activeItem.value === 'HOME_PAGE',
            },
          ],
        },

        {
          key: 'GROUP_1',
          title: 'Group 1',
          isHidden: false,
          children: [
            {
              key: 'EXPANDABLE',
              title: 'Expandable',
              type: DashboardMenuItemType.BUTTON,
              iconName: 'search',
              isHidden: false,
              isActive:
                activeItem.value === 'ExpOption1' ||
                activeItem.value === 'ExpOption2',
              children: [
                {
                  key: 'ExpOption1',
                  title: 'Subitem 1',
                  type: DashboardMenuItemType.LINK,
                  to: '/',
                  isHidden: false,
                  isActive: activeItem.value === 'ExpOption1',
                },
                {
                  key: 'ExpOption2',
                  title: 'Subitem 2',
                  type: DashboardMenuItemType.LINK,
                  to: '/',
                  isHidden: false,
                  isActive: activeItem.value === 'ExpOption2',
                },
              ],
            },
            {
              key: 'G1Item2',
              title: 'Item 2',
              type: DashboardMenuItemType.LINK,
              iconName: 'key',
              to: '/',
              isHidden: false,
              isActive: activeItem.value === 'G1Item2',
            },
            {
              key: 'G1Item3',
              title: 'Item 3',
              type: DashboardMenuItemType.LINK,
              iconName: 'briefcase',
              to: '/',
              isHidden: false,
              isActive: activeItem.value === 'G1Item3',
            },
          ],
        },

        {
          key: 'GROUP_2',
          title: 'Group 2',
          isHidden: false,
          children: [
            {
              key: 'G2Item1',
              title: 'Item 1',
              type: DashboardMenuItemType.LINK,
              iconName: 'calendar',
              to: '/',
              isHidden: false,
              isActive: activeItem.value === 'G2Item1',
            },
            {
              key: 'G2Item2',
              title: 'Item 2',
              type: DashboardMenuItemType.LINK,
              iconName: 'documents',
              to: '/',
              isHidden: false,
              isActive: activeItem.value === 'G2Item2',
            },
          ],
        },
      ]);

      const userMenuOptions = computed<DropdownOption[]>(() => [
        {
          label: 'Settings',
          key: 'SETTINGS',
        },
        {
          label: 'Logout',
          key: 'LOGOUT',
        },
      ]);

      enum FooterLinkId {
        CONTACT = 'CONTACT',
        IMPRINT = 'IMPRINT',
        PRIVACY_POLICY = 'PRIVACY_POLICY',
        CAREER = 'CAREER',
      }

      const footerLinks: DashboardFooterLink[] = [
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

      return {
        args,
        userMenuOptions,
        sideMenuItems,
        handleOptionSelect,
        locale,
        footerLinks,
      };
    },
    template: `
      <CDashboardLayout
        :has-side-menu="args.hasSideMenu"
        @update:nav-meta="args['onUpdate:navMeta']">
        <template #header>
          <CDashboardHeader
            user-name="ricky.gervais"
            :options="userMenuOptions"
            :has-side-menu="args.hasSideMenu"
          >
            <template #start>
              <div style="display: flex; align-items: center; gap: 8px;">
                <CIcon
                  :is-inline="true"
                  name="eye"
                  style="width: 40px; height: 40px; color: var(--primary-color);"
                />
                <span
                  class="logo__text"
                  style="font-size: 24px; font-family: 'NeueMachina';"
                >Project</span>
              </div>
            </template>

            <template #end>
              <CLanguageSelect
                :value="locale"
                @update:value="(value) => { locale = value }"
              />
            </template>
          </CDashboardHeader>
        </template>

        <template #sidebar>
          <CDashboardSidebar>
            <CDashboardMenu :items="sideMenuItems" @select="handleOptionSelect"/>
          </CDashboardSidebar>
        </template>

        <main>
          <CDashboardPage :has-side-menu="args.hasSideMenu">
            <CTile style="height: 2000px">
              <template #title>Content</template>

              <CTile style="height: 100%; background: var(--text-color-3); opacity: 0.1;">
              </CTile>
            </CTile>
          </CDashboardPage>
        </main>

        <template #footer>
          <CDashboardFooter
            :links="footerLinks"
            :is-centered="false"
          />
        </template>
      </CDashboardLayout>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasSideMenu: true,
    'onUpdate:navMeta': fn(),
  },
};
