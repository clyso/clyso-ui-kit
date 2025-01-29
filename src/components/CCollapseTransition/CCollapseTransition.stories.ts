import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CCollapseTransition from './CCollapseTransition.vue';
import CTile from '../CTile/CTile.vue';
import CSwitch from '../CSwitch/CSwitch.vue';

const meta: Meta<typeof CCollapseTransition> = {
  title: 'Components/CollapseTransition',
  component: CCollapseTransition,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px"><story/></div>',
    }),
  ],
  argTypes: {
    show: {
      control: false,
    },
    default: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/collapse-transition).**\n\n',
      },
    },
  },
  render: (args) => ({
    components: { CCollapseTransition, CTile, CSwitch },
    setup() {
      const isShown = ref(true);

      return { args, isShown };
    },
    template: `
        <CSwitch
          size="large"
          v-model:value="isShown">
          <template #checked>
            Show
          </template>
          <template #unchecked>
            Hide
          </template>
        </CSwitch>


        <CCollapseTransition
          style="margin-top: 12px;"
          :show="isShown"
          :appear="args.appear"
        >
          <CTile>
            The quick brown fox jumps over the lazy dog near the bank of the river. Brightly colored zebras wander aimlessly, singing loudly to the rhythm of an invisible drummer. Clouds drift effortlessly across the sky, carrying with them the dreams of small children playing in fields of green. Spoons and forks hold secret meetings at midnight, plotting their next big adventure in the kitchen.
            Underneath the old oak tree, whispers of forgotten stories mingle with the rustling leaves. The sun sets in the east, casting long shadows that dance on the walls of ancient castles. Fish swim through the air, their scales shimmering in the moonlight, while birds dive into the depths of the ocean, seeking treasures hidden in the coral reefs.
          </CTile>
        </CCollapseTransition>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
  },
};
