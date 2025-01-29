import type { Meta, StoryObj } from '@storybook/vue3';
import CCarousel from './CCarousel.vue';
import CCarouselItem from '../CCarouselItem/CCarouselItem.vue';

const meta: Meta<typeof CCarousel> = {
  title: 'Components/Carousel',
  component: CCarousel,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px"><story/></div>',
    }),
  ],
  argTypes: {
    // slots
    default: {
      control: false,
      type: '()',
    },
    arrow: {
      control: false,
      type: '(info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void })',
    },
    dots: {
      control: false,
      type: '(info: { total: number, currentIndex: number, to: (index: number) => void })',
    },
    // exposed methods
    to: {
      type: '(index: number) => void',
    },
    prev: {
      type: '() => void',
    },
    next: {
      type: '() => void',
    },
    getCurrentIndex: {
      type: '() => number',
    },
    // props
    direction: {
      options: ['horizontal', 'vertical'],
    },
    dotPlacement: {
      options: ['top', 'bottom', 'left', 'right'],
    },
    dotType: {
      options: ['dot', 'line'],
    },
    effect: {
      options: ['slide', 'fade', 'card', 'custom'],
    },
    nextSlideStyle: {
      control: false,
    },
    prevSlideStyle: {
      control: false,
    },
    slidesPerView: {
      options: ['auto', 1, 2, 3],
    },
    transitionStyle: {
      control: false,
    },
    trigger: {
      options: ['click', 'hover'],
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/carousel).**\n\n',
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
      <CCarousel
        style="height: 240px"
        :autoplay="args.autoplay"
        :centeredSlides="args.centeredSlides"
        :currentIndex="args.currentIndex"
        :defaultIndex="args.defaultIndex"
        :direction="args.direction"
        :dotPlacement="args.dotPlacement"
        :dotType="args.dotType"
        :draggable="args.draggable"
        :effect="args.effect"
        :interval="args.interval"
        :keyboard="args.keyboard"
        :loop="args.loop"
        :mousewheel="args.mousewheel"
        :nextSlideStyle="args.nextSlideStyle"
        :prevSlideStyle="args.prevSlideStyle"
        :showArrow="args.showArrow"
        :showDots="args.showDots"
        :slidesPerView="args.slidesPerView"
        :spaceBetween="args.spaceBetween"
        :touchable="args.touchable"
        :transitionStyle="args.transitionStyle"
        :transitionProps="args.transitionProps"
        :trigger="args.trigger"
      >
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="390"
            class="carousel-img"
            src="https://picsum.photos/id/390/600/300"
          >
        </CCarouselItem>
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="391"
            class="carousel-img"
            src="https://picsum.photos/id/391/600/300"
          >
        </CCarouselItem>
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="392"
            class="carousel-img"
            src="https://picsum.photos/id/392/600/300"
          >
        </CCarouselItem>
        <CCarouselItem>
          <img
            style="width: 100%; height: 240px; object-fit: cover;"
            alt="393"
            :style="imgStyles"
            class="carousel-img"
            src="https://picsum.photos/id/393/600/300"
          >
        </CCarouselItem>
      </CCarousel>
    `,
  }),
};
