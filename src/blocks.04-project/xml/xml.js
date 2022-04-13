import {filter, map} from 'lodash';

const ClassName = {
  BLOCK: 'xml',
  RESULT: 'xml__result',
  TRYCOUNT: 'xml__number',
};

const Selector = {
  SEND: '[data-trigger="send"]',
};

class Xml {
  constructor(elem) {
    this.block = elem;
    this.sendButton = this.block.querySelector(Selector.SEND);
    this.result = this.block.getElementsByClassName(ClassName.RESULT).item(0);
    this.tryCount = this.block.getElementsByClassName(ClassName.TRYCOUNT).item(0);

    this.buttonHandler = this.buttonHandler.bind(this);
    this.sendAjax = this.sendAjax.bind(this);

    this.init();
  }

  init() {
    this.sendButton.addEventListener('click', this.buttonHandler);
  }

  buttonHandler(event) {
    const tryCount = 0;
    event.preventDefault();
    this.sendAjax(tryCount);
  }

  sendAjax(tryCount) {
    const promise = new Promise((resolve, reject) => {

      ++tryCount;
      console.log(tryCount);

      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://jsonplaceholder.typicode.com/ussers?_limit=3');
      xhr.responseType = 'json';

      xhr.send();

      xhr.addEventListener('load', () => {
        if (xhr.status <= 201) {
          resolve(xhr.response);
        }
        reject(xhr.status);
      });
    })
      .then((data) => {
        this.resultUpdate(data);
        this.tryCountUpdate(tryCount);
    })
      .catch((error) => {
        if (tryCount < 5) {
          this.sendAjax(tryCount);
          this.tryCountUpdate(tryCount);
        }
        this.errorUpdate(error);
      });
  }

  tryCountUpdate(tryCount) {
    console.log(this.tryCount);
    this.tryCount.textContent = 'Количество попыток: ' + tryCount;
  }

  resultUpdate(data) {
    const users = [];

    data.forEach((item) => {
      users.push(item.name);
    });

    this.result.textContent = 'Результат: ' + users.join(' ');
  }

  errorUpdate(error) {
    this.result.textContent = 'Код ошибки: ' + error;
  }

  static getAllInstances() {
    return map(filter(Xml.getAllBlocks(), ({ins}) => ins), (item) => item.ins);
  }

  static getAllBlocks() {
    return Array.from(document.getElementsByClassName(ClassName.BLOCK));
  }

  static initAllBlocks() {
    const Blocks = Xml.getAllBlocks();
    Blocks.forEach((block) => {
      if (block.ins) return;
      block.ins = new Xml(block);
    });
  }
}

// Инициализация;
Xml.initAllBlocks();
export default Xml;
