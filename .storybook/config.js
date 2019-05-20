import './../dist/merged.css';
import './../dist/assets/merged.js';

import pretty from  'pretty';
import {document, console} from 'global';

import { withActions } from '@storybook/addon-actions';
import { configure, storiesOf, addParameters} from '@storybook/html';

const tmpls = require.context('./../src', true, /tmpl-specs.*\.bemjson\.js$/);
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

addParameters({});

configure(() => {
  getBH(bh => {
    entry.forEach(path => {
      const json = tmpls(path);
      const match = path.match(/([^\/]*)\.tmpl-specs\/(.*)\.bemjson\.js$/);
      const name = match[1];
      const variant = match[2];
      const bemjson = JSON.stringify(json, null, 2);
      const html = pretty(bh.apply(json), {ocd: true});
      const docs = { name: name, bemjson: bemjson, html: html };
      const notes = getNotes(docs);
      storiesOf(`Components | ${name}`, module)
        .add(variant, () => html, {
          notes: {
            markdown: notes,
          }
        });
    });
  });
}, module);
