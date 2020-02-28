import Card from './card';

export default class List {
  constructor() {
    this.list = [];
    this.idCounter = 0;
    this.listContainer = document.querySelector('.list-container');
  }

  addNewCard(title, price) {
    this.idCounter += 1;
    this.list.push(new Card(title, price, this.idCounter));
    this.makeHtmlList();
  }

  static makeHtmlItem(card) {
    const item = document.createElement('li');
    item.classList.add('item');
    item.dataset.id = card.id;
    item.insertAdjacentHTML('afterbegin', `<div class="information">
      <div class="title">${card.title}</div>
      <div class="price">${card.price}</div>
    </div>
    <div class="buttons">
      <button class="edit">✎</button>
      <button class="delete">×</button>
    </div>`);
    return item;
  }

  makeHtmlList() {
    this.listContainer.innerHTML = '';
    this.list.forEach((item) => {
      this.listContainer.appendChild(List.makeHtmlItem(item));
    });
    this.save();
  }

  delete(element) {
    const find = this.findItem(element)[0];
    this.list.splice(this.list.indexOf(find), 1);
    this.makeHtmlList();
  }

  edit(item, title, price) {
    const i = this.list.indexOf(item);
    this.list[i].title = title;
    this.list[i].price = price;
    this.makeHtmlList();
  }

  findItem(element) {
    return this.list.filter((item) => item.id === Number(element.dataset.id));
  }

  save() {
    localStorage.list = JSON.stringify(this.list);
    localStorage.id = this.idCounter;
  }

  load() {
    this.list = JSON.parse(localStorage.list);
    this.idCounter = Number(localStorage.id);
  }
}
