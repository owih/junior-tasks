export const decorators = [
  (Story) => {
    window.getBH(() => {});
    return window.bh.apply(Story());
  },
];

export const parameters = {};
