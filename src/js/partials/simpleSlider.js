class SimpleSlider {
  constructor(element, options = {}) {
    this.slider = document.querySelector(element);
    this.initialized = false;

    this.options  = Object.assign({
      wrapper: '.wrapper',
      item: '.item',
      marginItem: 15,
      prevBtn: '.btn-prev',
      nextBtn: '.btn-next',
      btnDisablesClass: 'is-disabled'
    }, options);

    // if (!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
    //   this.init();
    // }
    this.init();

    if ((document.body.clientWidth <= 1024) && (this.initialized)) {
      this.disable();
    }


    window.addEventListener('resize', () => {
      if ((document.body.clientWidth > 1024) && !(this.initialized)) {
        this.init();
        this.wrapper.style.transform = 'translateX(0px)';
        this._setDefaultArrow();
      }

      if ((document.body.clientWidth <= 1024) && (this.initialized)) {
        this.disable();
      }
    });
  }

  init () {
    this.initialized = true;
    this.wrapper = this.slider.querySelector(this.options.wrapper);
    this.item = this.slider.querySelector(this.options.item);
    this.prevBtn = document.querySelector(this.options.prevBtn);
    this.nextBtn = document.querySelector(this.options.nextBtn);

    this.marginItem = this.options.marginItem;

    this.slider.style.overflowX = 'hidden';

    this._setDefaultArrow();

    this.nextBtn.addEventListener('click', (event) => {
      if(!event.detail || event.detail == 1){
        this.move('next');
      }
    });

    this.prevBtn.onclick = (event) => {
      if(!event.detail || event.detail == 1){
        this.move('prev');
      }
    }
  }

  _setDefaultArrow() {
      this.prevBtn.classList.add(this.options.btnDisablesClass);
      this.nextBtn.classList. remove(this.options.btnDisablesClass);
  }

  disable() {
    this.initialized = false;
    this.slider.style.overflowX = 'auto';
  }

  move(direction) {
    let curItemWidth = this.item.offsetWidth;

    let _getTranslateX = (myElement) =>{
      let style = window.getComputedStyle(myElement);
      let matrix = new WebKitCSSMatrix(style.webkitTransform);
      return matrix.m41;
    }

    let _getCountItemOffset = () => {
      return Math.floor(this.slider.offsetWidth/curItemWidth);
    }

    let curTranslate = _getTranslateX(this.wrapper);

    let offset = _getCountItemOffset() * (curItemWidth + this.marginItem);

    let newVal;

    if (direction == 'prev') {
      newVal = curTranslate + offset;
      if (newVal > 0) {
        newVal = 0;
      }
      else {
        this.nextBtn.classList. remove(this.options.btnDisablesClass);
      }

      if ((newVal + offset) > 0) {
        this.prevBtn.classList. add(this.options.btnDisablesClass);
      }
    }
    else {
      newVal = curTranslate - offset;

      if (Math.abs(newVal) > this.wrapper.scrollWidth) {
        newVal = curTranslate;
      }
      else {
        this.prevBtn.classList. remove(this.options.btnDisablesClass);
      }

      if (Math.abs(newVal - offset) >= this.wrapper.scrollWidth) {
        this.nextBtn.classList. add(this.options.btnDisablesClass);
      }
    }
    this.wrapper.style.transform = 'translateX('+ newVal +'px)';
  }
}
