(function() {

  // открытие мобильного меню

  class toggleMenu {
    constructor(btnClass) {
      this.burger = document.querySelector(btnClass);
      this.init();
    }

    init() {
      let blurEl = document.querySelector('main');
      let blurHeader = document.querySelector('.header__logo');
      this.burger.addEventListener('click', function() {
        this.classList.toggle('burger--is-active');
        blurEl.classList.toggle('is-blur');
        blurHeader.classList.toggle('is-blur');
      });
    }
  }

  new toggleMenu('.js-menu');


  // Подключение слайдеров
  new SimpleSlider('.js-script-slider', {
    wrapper: '.slider__inner',
    item: '.slider__item',
    margin: 15,
    btnWrapper: '.js-script-slider-btns',
    btnDisablesClass: 'slider-arrows__btn--is-disabled'
  });

  new SimpleSlider('.js-device-slider', {
    wrapper: '.slider__inner',
    item: '.slider__item',
    margin: 15,
    btnWrapper: '.js-device-slider-btns',
    btnDisablesClass: 'slider-arrows__btn--is-disabled'
  });

  // Подключение крутилки
  let roundSliderEl = document.querySelector('.js-round-slider');

  if (roundSliderEl) {
    let roundSliser = new CircularSlider(roundSliderEl, {
      min: 45,
      max: 315,
      offsetAngle: -90,
      minValue: 18,
      maxValue: 25,
      beginValue: 23
    });

    let roundSliderElement = roundSliser.element;
    let roundSliderText = roundSliderElement.querySelector('.round-slider__inner');

    roundSliderElement.oninput = function() {
      roundSliderText.innerHTML = '+' + roundSliser.value;
    }
  }

  // Подключение фильтров в попапах
  let temperatureFilters = document.querySelector('.js-filters-temperature');

  if (temperatureFilters) {
    new RangeFilters(temperatureFilters, '.js-range-temperature');
  }

  let lightingFilters = document.querySelector('.js-filters-lighting');

  if (lightingFilters) {
    new RangeFilters(lightingFilters, '.js-range-lighting');
  }

  // Подключение модальных окон

  let temperatureModal = new Modal('temperatureModal');
  let lightingModal = new Modal('lightingModal');
  let roundModal = new Modal('roundModal');


  let buttonsOpenModal = document.querySelectorAll('.js-open-modal');

  for (var i = 0; i < buttonsOpenModal.length; i++) {
    let type = buttonsOpenModal[i].getAttribute('data-modal-type');

    switch(type) {
      case 'temperature':
        buttonsOpenModal[i].addEventListener('click', function(){
          temperatureModal.open();
        });
        break;
      case 'lighting':
        buttonsOpenModal[i].addEventListener('click', function(){
          lightingModal.open();
        });
        break;
      case 'round':
        buttonsOpenModal[i].addEventListener('click', function(){
          roundModal.open();
        });
        break;
    }
  }
})();
//
// const isIosDevice =
//   typeof window !== 'undefined' &&
//   window.navigator &&
//   window.navigator.platform &&
//   /iPad|iPhone|iPod|(iPad Simulator)|(iPhone Simulator)|(iPod Simulator)/.test(window.navigator.platform);
//
//
// console.log(isIosDevice);
//
// let test = document.querySelector('body');
