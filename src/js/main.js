document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  @@include('partials/SimpleSlider.js')

  let scriptSlider = new SimpleSlider('.js-script-slider', {
    wrapper: '.slider__inner',
    item: '.slider__item',
    margin: 15,
    btnWrapper: '.js-script-slider-btns',
    btnDisablesClass: 'slider-arrows__btn--is-disabled'
  });

  let deviceSlider = new SimpleSlider('.js-device-slider', {
    wrapper: '.slider__inner',
    item: '.slider__item',
    margin: 15,
    btnWrapper: '.js-device-slider-btns',
    btnDisablesClass: 'slider-arrows__btn--is-disabled'
  });
});

window.onload = function() {

};
