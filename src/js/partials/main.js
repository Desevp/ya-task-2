
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




  // var fixed = document.getElementById('fixed');
  // console.log(fixed);
  //
  // fixed.addEventListener('touchmove', function(e) {
  //
  //     e.preventDefault();
  //
  // }, false);
