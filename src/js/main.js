document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  @@include('partials/SimpleSlider.js')

  let scriptSlider = new SimpleSlider('.js-script-slider', {
    wrapper: '.script-slider__inner',
    item: '.script-slider__item',
    prevBtn: '.js-script-slider-prev',
    nextBtn: '.js-script-slider-next'
  });
});

window.onload = function() {

};
