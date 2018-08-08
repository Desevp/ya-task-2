class Modal {
  constructor(id) {
    this.modal = document.getElementById(id);
    this.overlay = document.querySelector('.js-overlay');

    this.closeBtn = this.modal.querySelector('.popup__close');
    this.page = document.querySelector('.page');
    this.blurEl = document.querySelector('.page__inner');

    this.closeBtn.addEventListener('click', ()=> {
      this.close();
    });

    this.overlay.addEventListener('click', ()=> {
      this.close();
    });
  }

  open() {
    this.overlay.classList.add('overlay--is-show');
    this.modal.classList.add('popup--is-open');
    this.page.classList.add('is-fixed-overlay');
    this.blurEl.classList.add('is-blur');
  }

  close() {
    this.modal.classList.remove('popup--is-open');
    this.overlay.classList.remove('overlay--is-show');
    this.page.classList.remove('is-fixed-overlay');
    this.blurEl.classList.remove('is-blur');
  }
}
