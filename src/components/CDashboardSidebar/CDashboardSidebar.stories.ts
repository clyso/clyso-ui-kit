import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import CDashboardHeader from '../CDashboardHeader/CDashboardHeader.vue';
import CDashboardLayout from '../CDashboardLayout/CDashboardLayout.vue';
import CDashboardPage from '../CDashboardPage/CDashboardPage.vue';
import CIcon from '../CIcon/CIcon.vue';
import CButton from '../CButton/CButton.vue';
import CDashboardSidebar from './CDashboardSidebar.vue';
import CDashboardMenu from '../CDashboardMenu/CDashboardMenu.vue';
import { type DashboardMenuGroup, DashboardMenuItemType } from '../../types';

const meta: Meta<typeof CDashboardSidebar> = {
  title: 'Components/Dashboard/DashboardSidebar',
  component: CDashboardSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The DashboardSidebar is a layout component, wrapper for DashboardMenu.',
      },
    },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: {
      CDashboardLayout,
      CDashboardHeader,
      CIcon,
      CDashboardSidebar,
      CDashboardMenu,
      CDashboardPage,
      CButton,
    },
    setup() {
      const activeItem = ref('HOME_PAGE');
      const isSideMenuShown = ref(true);

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

      return {
        args,
        isSideMenuShown,
        sideMenuItems,
        handleOptionSelect,
      };
    },
    template: `
      <CDashboardLayout :has-side-menu="true">
        <template #header>
          <CDashboardHeader
            user-name="ricky gervais"
            :options="[]"
            :has-side-menu="true"
            :has-user-menu="false"
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
          </CDashboardHeader>
        </template>

        <template #sidebar>
          <CDashboardSidebar>
            <CDashboardMenu 
              v-if="isSideMenuShown"
              :items="sideMenuItems" 
              @select="handleOptionSelect"
              @expand="args.onExpand"/>
            <div v-else
            style="padding: 8px; text-align: center; color: var(--text-color-3);">Sidebar</div>
          </CDashboardSidebar>
        </template>

        <main>
          <CButton secondary @click="isSideMenuShown = !isSideMenuShown">
            {{
              isSideMenuShown ? 'Hide Menu in Sidebar' : 'Show Menu in Sidebar'
            }}
          </CButton>
        </main>
      </CDashboardLayout>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
