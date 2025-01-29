export interface DescriptionListProps {
  /**
   * Defines the layout direction of the description list.
   * 'column' arranges the items vertically, and 'row' arranges them horizontally.
   */
  direction?: 'column' | 'row';

  /**
   * Specifies the number of rows in the description list.
   * Useful when the list needs to be structured into multiple rows.
   */
  rows?: number;

  /**
   * Specifies the number of columns in the description list.
   * Allows you to distribute items across multiple columns.
   */
  columns?: number;

  /**
   * Determines the placement of the labels relative to their values.
   * 'top' places the label above the value, while 'left' places it to the left.
   */
  labelPlacement?: 'top' | 'left';

  /**
   * Determines the alignment of the labels.
   */
  labelAlignment?: 'center' | 'start';

  /**
   * Sets the size of the description items.
   * Can be 'small', 'medium', or 'large' to match different design requirements.
   */
  size?: 'small' | 'medium' | 'large';
}

export type DescriptionItemConfig = Required<
  Pick<DescriptionListProps, 'labelPlacement' | 'size' | 'labelAlignment'>
>;
