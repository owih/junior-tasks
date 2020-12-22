import './../dist/merged.css';
import './../dist/assets/merged.js';

import pretty from  'pretty';
import {document, console} from 'global';
import {forEach, reduce} from 'lodash';

import { withActions } from '@storybook/addon-actions';
import { configure, storiesOf, addParameters} from '@storybook/html';

const tmpls = require.context('./../src', true, /\.tmpl-specs.*\.bemjson\.js$/);
const entry = tmpls.keys();


const getNotes = ({html, bemjson, name}) => {
  let result = `# Блок ${name}\n`;
  result += '## HTML';
  result += '\n```html\n';
  result += html;
  result += '\n```\n\n\n\n';
  result += '## BEMJSON';
  result += '\n```json\n';
  result += bemjson;
  result += '\n```\n\n\n\n';
  return result;
};

getBH((bh) => {
  const entrys = reduce(entry, (acc, path) => {
    const [, name, variant] = path.match(/([^\/]*)\.tmpl-specs\/(.*)\.bemjson\.js$/);
    const json = tmpls(path);
    const bemjson = JSON.stringify(json, null, 2);
    acc[path] = {
      name,
      variant,
      bemjson,
      html: pretty(bh.apply(json), {ocd: true}),
    }
    return acc;
  }, {});
  
  
  addParameters({});
  
  configure((entry) => {
    forEach(entrys, ({name, variant, html, bemjson}) => {
      storiesOf(`Components | ${name}`, module)
        .add(variant, () => html, {
          notes: {
            markdown: getNotes({ html, name, bemjson }),
          }
        });
    });
  }, module);
});
