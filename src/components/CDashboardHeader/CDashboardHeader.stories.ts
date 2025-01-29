import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import type { DropdownOption } from 'naive-ui/es/dropdown/src/interface';
import { fn } from '@storybook/test';
import CDashboardHeader from './CDashboardHeader.vue';
import CDashboardLayout from '../CDashboardLayout/CDashboardLayout.vue';
import CLanguageSelect from '../CLanguageSelect/CLanguageSelect.vue';
import CColorSchemeToggle from '../CColorSchemeToggle/CColorSchemeToggle.vue';
import CDashboardPage from '../CDashboardPage/CDashboardPage.vue';
import CTile from '../CTile/CTile.vue';
import CIcon from '../CIcon/CIcon.vue';
import CDashboardSidebar from '../CDashboardSidebar/CDashboardSidebar.vue';
import CDashboardMenu from '../CDashboardMenu/CDashboardMenu.vue';
import { I18nLocale } from '../../types/i18n';
import {
  ColorScheme,
  type DashboardMenuGroup,
  DashboardMenuItemType,
} from '../../types';

const meta: Meta<typeof CDashboardHeader> = {
  title: 'Components/Dashboard/DashboardHeader',
  component: CDashboardHeader,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="min-height: 400px">
        <story/>
        <div style="min-height: 700px"></div>
      </div>`,
    }),
  ],
  argTypes: {
    options: {
      control: false,
    },
    'onSelect:option': {
      table: {
        disable: true,
      },
    },
    start: {
      control: false,
      description: 'Used for logo.',
    },
    end: {
      control: false,
      description:
        'Used for actions that are displayed on the right side of the header.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Header component that should be used as part of DashboardLayout.',
      },
    },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: {
      CDashboardLayout,
      CDashboardHeader,
      CIcon,
      CLanguageSelect,
      CColorSchemeToggle,
      CDashboardSidebar,
      CDashboardMenu,
      CDashboardPage,
      CTile,
    },
    setup() {
      const activeItem = ref('HOME_PAGE');
      const locale = ref<I18nLocale>(I18nLocale.EN);
      const colorScheme = ref<ColorScheme>(ColorScheme.DARK);

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

      return {
        args,
        userMenuOptions,
        sideMenuItems,
        locale,
        colorScheme,
        handleOptionSelect,
      };
    },
    template: `
      <CDashboardLayout :has-side-menu="args.hasSideMenu">
        <template #header>
          <CDashboardHeader
            :user-name="args.userName"
            :user-email="args.userEmal"
            :options="userMenuOptions"
            :has-side-menu="args.hasSideMenu"
            :has-user-menu="args.hasUserMenu"
            @select:option="args['onSelect:option']"
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

              <CColorSchemeToggle
                :model-value="colorScheme"
                @update:model-value="(value) => { colorScheme = value }"
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
      </CDashboardLayout>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'John Doe',
    userEmail: 'john.doe@gmail.com',
    hasSideMenu: true,
    hasUserMenu: true,
    'onSelect:option': fn(),
  },
};
