import type { StepsProps } from 'naive-ui';

export type StepStatus = StepsProps['status'];

export interface Step {
  title: string;
  description: string;
  status?: StepStatus;
  isDisabled?: boolean;
}
