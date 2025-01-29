import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import { fn } from '@storybook/test';
import CSteps from './CSteps.vue';
import type { Step } from '../../types';
import CButton from '../CButton/CButton.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CSteps> = {
  title: 'Components/Steps',
  component: CSteps,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: false,
    },
    status: {
      options: ['process', 'finish', 'error', 'wait'],
    },
    steps: {
      control: false,
    },
    size: {
      options: ['small', 'medium'],
    },
    default: {
      control: false,
      description: 'Default slot',
    },
    'finish-icon': {
      control: false,
      description: "'finish' status button deploy.",
    },
    'error-icon': {
      control: false,
      description: "'error' status button deploy.",
    },
    'onUpdate:current': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/steps) but has additional property steps**',
      },
    },
  },
  render: (args) => ({
    components: { CSteps, CButton, CIcon },
    setup() {
      const currentStep = ref(1);

      const steps = computed<Step[]>(() => [
        {
          title: 'I Me Mine',
          description: '',
        },
        {
          title: 'Let It Be',
          description: '',
        },
        {
          title: 'Come Together',
          description: '',
        },
        {
          title: 'Something',
          description: '',
        },
      ]);

      function goNext() {
        if (currentStep.value < 4) {
          currentStep.value += 1;
        }
      }

      function goBack() {
        if (currentStep.value > 1) {
          currentStep.value -= 1;
        }
      }

      return {
        args,
        currentStep,
        steps,
        goNext,
        goBack,
      };
    },
    template: `
      <CSteps
        :steps="steps"
        :current="currentStep"
        :status="args.status"
        :size="args.size"
        :vertical="args.vertical"
        @update:current="args['onUpdate:current']"
        style="margin-bottom: 30px"
      />
      <div>
        <div 
          v-if="currentStep === 1"
        >
          All through the day, I me mine I me mine, I me mine
        </div>
        <div 
          v-else-if="currentStep === 2"
        >
          When I find myself in times of trouble Mother Mary comes to me
        </div>
        <div 
          v-else-if="currentStep === 3"
        >
          Here come old flat top He come grooving up slowly
        </div>
        <div 
          v-else-if="currentStep === 4"
        >
          Something in the way she moves Attracts me like no other lover
        </div>
      </div>
      <div style="margin-top: 30px; display: flex; gap: 15px;">
        <CButton 
          @click="() => goBack()"
          :disabled="currentStep === 1"
        >
          <CIcon
            :is-inline="true"
            name="arrow-back"
          />
        </CButton>
        <CButton 
          @click="() => goNext()"
          :disabled="currentStep === 4"
        >
          <CIcon
            :is-inline="true"
            name="arrow-forward"
          />
        </CButton>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 1,
    status: 'process',
    'onUpdate:current': fn(),
  },
};
