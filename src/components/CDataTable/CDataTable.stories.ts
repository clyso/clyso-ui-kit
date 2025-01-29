import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, h, onMounted, ref } from 'vue';
import CDataTable from './CDataTable.vue';
import CTableCellLink from '../CTableCellLink/CTableCellLink.vue';
import {
  type DataTablePaginationObject,
  type DataTableSortState,
} from '../../types/dataTable';
import CBooleanIndicator from '../CBooleanIndicator/CBooleanIndicator.vue';
import CTag from '../CTag/CTag.vue';
import CButton from '../CButton/CButton.vue';
import CResult from '../CResult/CResult.vue';
import CTooltip from '../CTooltip/CTooltip.vue';
import CIcon from '../CIcon/CIcon.vue';
import CInput from '../CInput/CInput.vue';
import CTile from '../CTile/CTile.vue';
import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissionLevels: string[];
  department: string;
  isActive: boolean;
}

const meta: Meta<typeof CDataTable> = {
  title: 'Components/DataTable',
  component: CDataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `The **CDataTable** component is a wrapper around Naive UI’s **[NDataTable](https://www.naiveui.com/en-US/dark/components/data-table)**, designed to simplify working with data tables. 
          It provides enhanced functionality, including slot-based rendering for columns, support for sorting, filtering, pagination, 
          and customizable handling of loading, error, and empty states. Additionally, it allows toggling the visibility of the expand column 
          when using expandable rows and supports both controlled and uncontrolled states.`,
      },
    },
  },
  argTypes: {
    columns: {
      control: false,
    },
    pagination: {
      control: false,
    },
    error: {
      control: false,
    },
    empty: {
      control: false,
    },
    loading: {
      control: false,
    },
  },
  render: (args) => ({
    components: {
      CDataTable,
      CTableCellLink,
      CBooleanIndicator,
      CTag,
      CButton,
      CResult,
      CTooltip,
      CIcon,
      CInput,
      CTile,
      CCollapseTransition,
    },
    setup() {
      const users = ref<User[]>([]);
      const selectedKeys = ref([]);
      const isLoading = ref(false);
      const hasError = ref(false);

      async function getUsers() {
        isLoading.value = true;

        try {
          await new Promise<void>((resolve, reject) => {
            setTimeout(() => (Math.random() > 0.8 ? reject : resolve)(), 500);
          });
          users.value = [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              permissionLevels: ['Admin', 'Editor'],
              department: 'Sales',
              isActive: true,
            },
            {
              id: 2,
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane.smith@example.com',
              permissionLevels: ['Viewer'],
              department: 'Marketing',
              isActive: false,
            },
            {
              id: 3,
              firstName: 'Michael',
              lastName: 'Johnson',
              email: 'michael.johnson@example.com',
              permissionLevels: ['Editor'],
              department: 'Engineering',
              isActive: true,
            },
            {
              id: 4,
              firstName: 'Emily',
              lastName: 'Davis',
              email: 'emily.davis@example.com',
              permissionLevels: ['Admin'],
              department: 'Product',
              isActive: true,
            },
            {
              id: 5,
              firstName: 'Chris',
              lastName: 'Brown',
              email: 'chris.brown@example.com',
              permissionLevels: ['Viewer'],
              department: 'UI/UX',
              isActive: true,
            },
            {
              id: 6,
              firstName: 'Jessica',
              lastName: 'Martinez',
              email: 'jessica.martinez@example.com',
              permissionLevels: ['Editor'],
              department: 'Marketing',
              isActive: false,
            },
            {
              id: 7,
              firstName: 'David',
              lastName: 'Taylor',
              email: 'david.taylor@example.com',
              permissionLevels: ['Admin', 'Viewer'],
              department: 'Management',
              isActive: true,
            },
            {
              id: 8,
              firstName: 'Sophia',
              lastName: 'White',
              email: 'sophia.white@example.com',
              permissionLevels: ['Viewer', 'Editor'],
              department: 'Legal',
              isActive: false,
            },
            {
              id: 9,
              firstName: 'Daniel',
              lastName: 'Moore',
              email: 'daniel.moore@example.com',
              permissionLevels: ['Admin'],
              department: 'Finance',
              isActive: true,
            },
            {
              id: 10,
              firstName: 'Olivia',
              lastName: 'Harris',
              email: 'olivia.harris@example.com',
              permissionLevels: ['Editor', 'Viewer'],
              department: 'HR',
              isActive: true,
            },
            {
              id: 11,
              firstName: 'Matthew',
              lastName: 'Clark',
              email: 'matthew.clark@example.com',
              permissionLevels: ['Viewer'],
              department: 'Operations',
              isActive: false,
            },
            {
              id: 12,
              firstName: 'Abigail',
              lastName: 'Lewis',
              email: 'abigail.lewis@example.com',
              permissionLevels: ['Admin', 'Editor'],
              department: 'Support',
              isActive: true,
            },
          ];
          hasError.value = false;
        } catch (error) {
          hasError.value = true;
          throw error;
        } finally {
          isLoading.value = false;
        }
      }

      onMounted(getUsers);

      const page = ref(1);
      const sorter = ref<DataTableSortState | null>(null);

      const handleSortingChange = async (
        newSorter: DataTableSortState | null,
      ) => {
        if (!users.value.length) {
          return;
        }

        sorter.value = newSorter;
        page.value = 1;
      };

      const columns = computed(() => [
        {
          type: 'selection',
        },
        {
          type: 'expand',
          renderExpand: () =>
            h(
              'div',
              {
                style: {
                  padding: '40px',
                },
              },
              [
                'Row expanded. More information about user can be displayed here.',
              ],
            ),
        },
        {
          title: 'Name',
          key: 'name',
          sorter: true,
        },
        {
          title: 'Email',
          key: 'email',
          sorter: true,
        },
        {
          title: 'Department',
          key: 'department',
          sorter: true,
        },
        {
          title: 'Permissions',
          key: 'permissionLevels',
          sorter: false,
        },
        {
          title: 'Status',
          key: 'isActive',
          sorter: true,
        },
        {
          title: 'Actions',
          key: 'actions',
        },
      ]);
      const rowKey = (row: User) => row.id;

      const handlePageChange = async (newPage: number) => {
        page.value = newPage;
      };

      const PAGE_SIZES = [10, 20, 30, 50, 100];
      const pageSize = ref(PAGE_SIZES[0]);
      const EMPTY_CONTENT = '—';

      const nameFilter = ref('');
      const filteredUsers = computed(() =>
        users.value.filter((user) => {
          if (!nameFilter.value) {
            return true;
          }

          return `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(nameFilter.value.trim().toLowerCase());
        }),
      );

      const isFiltered = computed(() => nameFilter.value !== '');

      function clearFilter() {
        nameFilter.value = '';
      }

      const computedUsers = computed<User[]>(() => {
        const start = (page.value - 1) * pageSize.value;
        const end = page.value * pageSize.value;

        const pageUsers = [...filteredUsers.value];

        if (!sorter.value?.order) {
          return pageUsers.slice(start, end);
        }

        const compare = <T>(a: T, b: T) => {
          if (sorter.value?.order === 'ascend') {
            return a > b ? -1 : 1;
          }

          return a > b ? 1 : -1;
        };

        pageUsers.sort((userA, userB) => {
          if (!sorter.value) {
            return 0;
          }

          if (sorter.value.columnKey === 'name') {
            return compare(
              `${userA.firstName} ${userA.lastName}`,
              `${userB.firstName} ${userB.lastName}`,
            );
          }

          const valueA: string = userA[
            sorter.value.columnKey as keyof User
          ] as string;
          const valueB: string = userB[
            sorter.value.columnKey as keyof User
          ] as string;

          return compare(valueA, valueB);
        });

        return pageUsers.slice(start, end);
      });

      const pagination = computed<DataTablePaginationObject>(() => ({
        page: page.value,
        pageSize: pageSize.value,
        showSizePicker: true,
        pageSizes: PAGE_SIZES,
        pageCount: Math.ceil(filteredUsers.value.length / pageSize.value),
        itemCount: filteredUsers.value.length,
        prefix({ itemCount }) {
          if (isLoading.value || hasError.value) {
            return '';
          }

          if (isFiltered.value) {
            return `Filtered: ${filteredUsers.value.length} / Total: ${users.value.length}`;
          }

          return `Total: ${itemCount}`;
        },
      }));

      const handlePageSizeUpdate = (newPageSize: number) => {
        pageSize.value = newPageSize;
        page.value = 1;
      };

      const expandedRowKeys = ref<string[]>([]);

      function setExpandedRowKey(key: string) {
        expandedRowKeys.value = expandedRowKeys.value.includes(key)
          ? []
          : [key];
      }

      return {
        args,
        selectedKeys,
        columns,
        users,
        page,
        sorter,
        handleSortingChange,
        rowKey,
        handlePageChange,
        handlePageSizeUpdate,
        isLoading,
        hasError,
        pageSize,
        PAGE_SIZES,
        getUsers,
        EMPTY_CONTENT,
        expandedRowKeys,
        setExpandedRowKey,
        nameFilter,
        filteredUsers,
        clearFilter,
        isFiltered,
        computedUsers,
        pagination,
      };
    },
    template: `
      <CTile 
        style="margin-bottom: 24px"
        class="filters">
          <CInput 
            style="max-width: 300px"
            placeholder="Filter by name"
            v-model:value="nameFilter" 
            clearable></CInput>
      </CTile>
      
      <CCollapseTransition
        style="margin-bottom: 12px"
        :show="selectedKeys.length > 0">
        <span
         
          v-if="selectedKeys.length">Selected: {{ selectedKeys.length }}</span>
      </CCollapseTransition>
      
      <CDataTable
        v-model:checked-row-keys="selectedKeys"
        :columns="columns"
        :data="computedUsers"
        selectable
        virtual-scroll
        max-height="500"
        :is-loading="args.isLoading || isLoading"
        :has-error="args.hasError || hasError"
        :pagination="pagination"
        :is-controlled="true"
        :bordered="false"
        :sorter="sorter"
        :row-key="rowKey"
        :show-expand-column="args.showExpandColumn"
        :expanded-row-keys="expandedRowKeys"
        @update:sorter="handleSortingChange"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeUpdate"
        @retry="getUsers"
      >
        <template #name="{ rowData }">
          <CTableCellLink to="/">
            {{ rowData.firstName }} {{ rowData.lastName }}
          </CTableCellLink>
        </template>
        
        <template #permissionLevels="{ rowData }">
          <div style="display: flex; align-items: center; gap: 8px">
            <CTag 
              v-for="level in rowData.permissionLevels"
              :type="level=== 'Admin' ? 'info' : level=== 'Editor' ? 'warning' : 'default'"
            >
              {{ level }}
            </CTag>
          </div>
        </template>

        <template #isActive="{ rowData }">
          <div style="display: flex; align-items: center; gap: 8px">
            <CBooleanIndicator :value="rowData.isActive"/>

            {{ rowData.isActive ? 'Active' : 'Inactive' }}
          </div>
        </template>

        <template #actions="{ rowData }">
          <div style="display: flex; align-items: center; gap: 8px">
            <CTooltip :delay="500">
              <template #trigger>
                <CButton
                  secondary
                  size="tiny"
                  type="warning"
                  @click="() => setExpandedRowKey(rowData.id)"
                >
                  <template #icon>
                    <CIcon
                      :is-inline="true"
                      name="pencil"
                    />
                  </template>
                </CButton>
              </template>

              Edit
            </CTooltip>
            <CTooltip :delay="500">
              <template #trigger>
                <CButton
                  secondary
                  size="tiny"
                  type="error"
                >
                  <template #icon>
                    <CIcon
                      :is-inline="true"
                      name="trash"
                    />
                  </template>
                </CButton>
              </template>

              Delete
            </CTooltip>
          </div>
        </template>

        <template #error>
          <CResult
            type="error"
            size="large"
            :max-width="600"
            @positive-click="getUsers"
          >
            <template #title>
              Error Occurred
            </template>

            <p style="white-space: pre-line;">Error is shown randomly to show the error slot.</p>

            <template #positive-text>
              Retry
            </template>
          </CResult>
        </template>

        <template #empty>
          <CResult
            v-if="isFiltered"
            type="empty"
            size="large"
            icon-name="person"
            :max-width="600"
            @positive-click="clearFilter"
          >
            <template #title>
              No Users found
            </template>

            <p style="white-space: pre-line;">No users match you filter criteria. To clear the filters please press a button below.</p>

            <template #positive-text>
              Clear Filters
            </template>
          </CResult>
          <CResult
            v-else
            type="empty"
            size="large"
            icon-name="person"
            :max-width="600"
          >
            <template #title>
              No Users yet
            </template>

            <p style="white-space: pre-line;">To add a user please click a button below.</p>

            <template #actions>
              <CButton
                type="primary"
                size="large"
              >
                <template #icon>
                  <CIcon
                    :is-inline="true"
                    name="add"
                  />
                </template>

                Add User
              </CButton>
            </template>
          </CResult>
        </template>
      </CDataTable>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showExpandColumn: false,
  },
};
