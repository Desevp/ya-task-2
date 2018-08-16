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
    this.blurEl.classList.add('is-blur');
    this.hideScroll();
  }

  close() {
    this.modal.classList.remove('popup--is-open');
    this.overlay.classList.remove('overlay--is-show');
    this.blurEl.classList.remove('is-blur');
    this.showScroll();
  }

  _getScrollbarSize() {
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  }

  _hasScrollbar() {
    return document.body.scrollHeight > document.body.clientHeight;
  }

  hideScroll() {
    document.body._scrollTop = window.pageYOffset;
    document.body.classList.add('is-fixed-overlay');
    document.body.style.position = 'fixed';
    if (this._hasScrollbar()) {
      document.body.style.width = `calc(100% - ${this._getScrollbarSize()}px)`;
    } else {
      document.body.style.width = '100%';
    }
    document.body.style.height = 'calc(100% + ' + document.body._scrollTop+'px)';
    document.body.style.top = -document.body._scrollTop + 'px';
  }

  showScroll() {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.top = '';
    window.scroll(0, document.body._scrollTop);
    document.body.classList.remove('is-fixed-overlay');
  }
}
