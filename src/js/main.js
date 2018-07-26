document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  @@include('partials/SimpleSlider.js')

  let scriptSlider = new SimpleSlider('.js-script-slider', {
    wrapper: '.slider__inner',
    item: '.slider__item',
    margin: 15,
    prevBtn: '.js-script-slider-prev',
    nextBtn: '.js-script-slider-next',
    btnDisablesClass: 'slider-arrows__btn--is-disabled'
  });
});

window.onload = function() {

};
