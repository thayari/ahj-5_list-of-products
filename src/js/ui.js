import List from './list';

export default class Ui {
  constructor() {
    this.list = new List();
    this.listContainer = document.querySelector('.list-container');
    this.addButton = document.querySelector('.add');
    this.modalAdd = document.querySelector('.modal-add');
    this.modalEdit = document.querySelector('.modal-edit');
    this.formAdd = document.getElementById('form-add');
    this.formEdit = document.getElementById('form-edit');
  }

  start() {
    if (localStorage.list) {
      this.list.load();
    }
    this.list.makeHtmlList();
    this.addEvents();
  }

  addEvents() {
    this.listContainer.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('delete')) {
        this.list.delete(event.target.closest('.item'));
        event.target.closest('.item').remove();
      } else if (event.target.classList.contains('edit')) {
        Ui.showModal(this.modalEdit);
        this.find = this.list.findItem(event.target.closest('.item'));
        document.getElementById('edit-title').value = this.find[0].title;
        document.getElementById('edit-price').value = this.find[0].price;
      }
    });

    this.addButton.addEventListener('click', () => {
      Ui.showModal(this.modalAdd);
    });

    this.formAdd.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputTitle = document.getElementById('add-title').value;
      const inputPrice = document.getElementById('add-price').value;
      this.list.addNewCard(inputTitle, inputPrice);
      this.formAdd.reset();
      Ui.hideModal(this.modalAdd);
    });

    this.formEdit.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputTitle = document.getElementById('edit-title').value;
      const inputPrice = document.getElementById('edit-price').value;
      this.list.edit(this.find[0], inputTitle, inputPrice);
      Ui.hideModal(this.modalEdit);
      delete this.find;
    });

    const cancelButtons = document.querySelectorAll('.cancel');
    cancelButtons.forEach((element) => {
      element.addEventListener('click', () => {
        Ui.hideModal(element.closest('.modal'));
      });
    });
  }

  static showModal(element) {
    document.querySelector('.bg').classList.remove('hidden');
    element.classList.remove('hidden');
  }

  static hideModal(element) {
    document.querySelector('.bg').classList.add('hidden');
    element.classList.add('hidden');
  }
}
