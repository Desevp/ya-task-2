class SimpleSlider {

  constructor(element, options = {}) {
    this.slider = document.querySelector(element);
    this.initialized = false;

    this.options  = Object.assign({
      wrapper: '.devices-swiper__inner',
      item: '.test2__item',
      controls: '.devices-swiper__arrows',
      prevBtn: '.devices-swiper__arrows-prev',
      nextBtn: '.devices-swiper__arrows-next'
    }, options);

    if (!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
      this.init();
    }

    // window.addEventListener('resize', () => {
    //   if ((document.body.clientWidth > 768) && !(this.initialized)) {
    //     this.init();
    //   }
    //
    //   if ((document.body.clientWidth < 768) && (this.initialized)) {
    //     this.disable();
    //   }
    // });
  }

  init () {

    this.initialized = true;
    this.wrapper = this.slider.querySelector(this.options.wrapper);
    this.item = this.slider.querySelector(this.options.item);
    this.prevBtn = document.querySelector(this.options.prevBtn);
    this.nextBtn = document.querySelector(this.options.nextBtn);

    this.widthItem = this.item.offsetWidth;

    this.itemsLenght = this.slider.querySelectorAll(this.options.item).length;

    this.marginItem = 15;

    this.slider.style.overflowX = 'hidden';

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

  disable() {
    this.initialized = false;
    this.slider.style.overflowX = 'auto';
  }

  move(direction) {
    let _getTranslateX = (myElement) =>{
      let style = window.getComputedStyle(myElement);
      let matrix = new WebKitCSSMatrix(style.webkitTransform);
      return matrix.m41;
    }

    let _getCountItemOffset = () => {
      return Math.floor(this.wrapper.offsetWidth/this.item.offsetWidth);
    }

    let curTranslate = _getTranslateX(this.wrapper);
    let offset = _getCountItemOffset() * (this.widthItem + this.marginItem);

    let newVal;

    if (direction == 'prev') {
      newVal = curTranslate + offset;
      if (newVal > 0) {
        newVal = 0;
      }
    }
    else {
      newVal = curTranslate - offset;
      if (Math.abs(newVal) > this.wrapper.scrollWidth) {
        newVal = curTranslate;
      }
    }
    this.wrapper.style.transform = 'translateX('+ newVal +'px)';
  }
}

let test = new SimpleSlider('.devices-swiper', {

});

let test2 = new SimpleSlider('.test-slider', {
  wrapper: '.test',
  item: '.test__item',
  prevBtn: '.prev',
  nextBtn: '.next'
});
