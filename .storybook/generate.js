const fs = require('fs');
const path = require('path');
const utils = require('./../settings/utils');
const template = path.resolve(path.join(__dirname, 'templates', 'bese.stories.js'));
const src = path.resolve(path.join(__dirname, '..', 'src'));

fs.readFile(template, 'utf8', function (err, data) {
  const template = data;
  if (err) return console.log(err);
  
  utils.getAllDirectoriesInPathSync(src).filter((path) => /.tmpl-specs$/i.test(path)).forEach(dir => {
    const [, name] = dir.match(/([^\\]*)\.tmpl-specs$/);
    const src = path.resolve(path.join(dir, '..', `${name}.stories.js`));
    fs.writeFile(src, template.replace('#{name}', name), function (err) {
      if (err) throw err;
    });
  });
});
