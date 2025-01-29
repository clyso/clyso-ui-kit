import type { Meta, StoryObj } from '@storybook/vue3';
import CCarousel from '../CCarousel/CCarousel.vue';
import CCarouselItem from './CCarouselItem.vue';

const meta: Meta<typeof CCarouselItem> = {
  title: 'Components/CarouselItem',
  component: CCarouselItem,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Used as an item of [Carousel](/docs/components-carousel--docs).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CCarousel, CCarouselItem },
    setup() {
      return { args };
    },
    template: `
      <CCarousel style="height: 240px">
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="390"
            class="carousel-img"
            src="https://picsum.photos/id/299/600/300"
          >
        </CCarouselItem>
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="391"
            class="carousel-img"
            src="https://picsum.photos/id/355/600/300"
          >
        </CCarouselItem>
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="392"
            class="carousel-img"
            src="https://picsum.photos/id/301/600/300"
          >
        </CCarouselItem>
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="393"
            :style="imgStyles"
            class="carousel-img"
            src="https://picsum.photos/id/302/600/300"
          >
        </CCarouselItem>
      </CCarousel>
    `,
  }),
};
