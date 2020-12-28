module.exports.getExample = (entries) => entries.keys().reduce((acc, path) => {
  const [, block, variant] = path.match(/([^/]*)\.tmpl-specs\/(.*)\.bemjson\.js$/);
  const json = entries(path);
  const Variant = () => json;
  acc[variant] = Variant;
  Variant.parameters = {
    notes: {
      markdown: `
      # Блок ${block}
      ${'```json'}
      ${JSON.stringify(json, null, 2)}
      ${'```'}
      `,
    },
  };
  return acc;
}, {});
