import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import CButton from '../CButton/CButton.vue';
import CDialogProvider from './CDialogProvider.vue';
import CShortList from '../CShortList/CShortList.vue';
import useDialog from '../../composables/useDialog';

const meta: Meta<typeof CDialogProvider> = {
  title: 'Components/DialogProvider',
  component: CDialogProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A provider component for managing multiple dialogs in your application. It integrates with the useDialog composable to render and control CDialog instances dynamically, supporting custom content, handlers, and dialog states.',
      },
    },
  },
  render: (args) => ({
    components: { CDialogProvider, CButton, CShortList },
    setup() {
      const { createDialog } = useDialog();

      const deleteUser = () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 500);
        });

      const showDialog = () => {
        createDialog({
          type: 'error',
          iconName: 'trash',
          title: 'Confirm Deletion',
          content: () => [
            h(
              'div',
              { style: 'margin-bottom: 8px' },
              'You are about to delete the following 8 users',
            ),
            h(CShortList, {
              list: [
                'Skywalker123',
                'CodeNinja',
                'PixelMaster',
                'QuantumFox',
                'NeonTiger',
                'CyberHawk',
                'ShadowWolf',
                'BlazeStorm',
              ],
              itemKey: (item) => item as string,
              size: 'medium',
              style: 'margin-bottom: 8px',
            }),
            'Are you sure you would like to proceed?',
          ],
          positiveText: 'Confirm Deletion',
          negativeText: 'Abort immediately!!!',
          positiveHandler: () => deleteUser(),
        });
      };

      return { args, showDialog };
    },
    template: `
      <CButton @click="showDialog">Open Dialog</CButton>
      <CDialogProvider/>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
