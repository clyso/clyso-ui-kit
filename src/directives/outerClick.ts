import type { Directive } from 'vue';

interface OuterClickHTMLElement extends HTMLElement {
  outerClickEventHandler?: EventListener;
}

export const vOuterClick: Directive<
  OuterClickHTMLElement,
  () => void | undefined
> = {
  mounted(el, binding) {
    const onOuterClickFn = binding.value;

    if (!onOuterClickFn) {
      return;
    }

    const isCapture = binding.modifiers.capture;
    const handler = (event: Event) => {
      if (event.target instanceof Node && !el.contains(event.target)) {
        onOuterClickFn();
      }
    };

    el.outerClickEventHandler = handler;
    document.addEventListener('click', handler, isCapture);
  },
  unmounted(el, binding) {
    if (!el.outerClickEventHandler) {
      return;
    }

    const isCapture = binding.modifiers.capture;

    document.removeEventListener('click', el.outerClickEventHandler, isCapture);
  },
};
