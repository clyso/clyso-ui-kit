import type { Meta, StoryObj } from '@storybook/vue3';
import { computed } from 'vue';
import { fn } from '@storybook/test';
import CDropdown from './CDropdown.vue';
import CButton from '../CButton/CButton.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CDropdown> = {
  title: 'Components/Dropdown',
  component: CDropdown,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    options: {
      control: false,
    },
    childrenField: {
      control: 'text',
    },
    keyField: {
      control: 'text',
    },
    labelField: {
      control: 'text',
    },
    nodeProps: {
      control: false,
    },
    menuProps: {
      control: false,
    },
    renderIcon: {
      control: false,
    },
    renderLabel: {
      control: false,
    },
    renderOption: {
      control: false,
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    onClickoutside: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    trigger: {
      options: ['click', 'hover', 'focus', 'manual'],
    },
    placement: {
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    },
    default: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/dropdown)**. In addition Popover props can be used.',
      },
    },
  },
  render: (args) => ({
    components: { CDropdown, CButton, CIcon },
    setup() {
      const options = computed(() => [
        {
          label: 'Jay Gatsby',
          key: 'jay gatsby',
        },
        {
          label: 'Daisy Buchanan',
          key: 'daisy buchanan',
        },
        {
          label: 'Nick Carraway',
          key: 'nick carraway',
        },
        {
          label: 'food',
          key: 'food',
          children: [
            {
              label: 'chicken',
              key: 'chicken',
            },
            {
              label: 'beef',
              key: 'beef',
            },
          ],
        },
      ]);

      return {
        args,
        options,
      };
    },
    template: `
      <CDropdown
        :options="options"
      >
        <CButton style="max-width: 200px">
          <template #icon>
            <CIcon
              :is-inline="true"
              name="ellipsis-horizontal"
            />
          </template>
        </CButton>
      </CDropdown>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClickoutside: fn(),
    onSelect: fn(),
  },
};
