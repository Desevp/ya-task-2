class CircularSlider {
  constructor(element, options = {}) {
    this.element = element;
    this.value = 0;
    this.degree = 0;
    this.options  = Object.assign({
      min: 0,
      max: 360,
      offsetAngle: 0,
      minValue: 0,
      maxValue: 100,
      beginValue: 0,
      scaleSvg: true
    }, options);

    this.isTouch = this._isTouchDevice();

    this.init();
  }

  init() {
    let el = this.element;
    let min = this.options.min;
    let max = this.options.max;
    let minValue = this.options.minValue;
    let maxValue = this.options.maxValue;
    let offsetAngle = this.options.offsetAngle;
    let beginValue = (this.options.beginValue >= minValue)?this.options.beginValue:this.options.minValue;
    let degToValue = (degree) => Math.round((maxValue - minValue)/(max - min) * (degree - min) + minValue);
    let valueToDeg = (value) => Math.round((value - minValue) * (max-min)/(maxValue - minValue) + min);

    this.degree = valueToDeg(beginValue);
    this.value = this.options.beginValue;

    let angleFormInput = (container) => {
      let input = container.querySelector('input');
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        container.appendChild(input);
      }
      return input;
    }

    let anglePivotElem = (container) => {
      let pivot = container.querySelector('.pivot');
      if(!pivot) {
        pivot = document.createElement('div');
        pivot.className = 'round-slider__pivot';
        container.appendChild(pivot);
      }
      return pivot;
    }

    this.input = angleFormInput(el);
    let pivot = anglePivotElem(el);

    let radToDeg = (rad) => rad * (180/Math.PI);

    let getCenter = (element) => {
      let rect = element.getBoundingClientRect();
      return [
        rect.left + (rect.width / 2),
        rect.top + (rect.height / 2),
      ];
    }

    let angle = (vector, element) => {
      let center = getCenter(element);
      let x = vector[0] - center[0];
      let y = vector[1] - center[1];
      let deg = radToDeg(Math.atan2(y, x));
      deg = deg + 180 - offsetAngle;

      if (deg > 360) deg += -360;
      if (deg < 0) deg += 360;

      return deg;
    }

    if (this.options.scaleSvg) {
      let scale = document.querySelector('.round-slider__scale');
      scale.style.transform = 'rotate(' + (91 + offsetAngle + min)+'deg)';

      let path = document.getElementById('circle');
      let pathLegth = Math.floor(path.getTotalLength() - 10);

      this.pathCircleLegth = pathLegth;
      this.redraw(path, max);

      let pathActive = document.getElementById('scale');

      this.pathActive = pathActive;
      this.redraw(pathActive, valueToDeg(beginValue));
    }

    let updateView = () => {
      let rotateAngle = this.degree + offsetAngle;
      pivot.style.transform = 'rotate(' + rotateAngle  + 'deg)';
      this.input.value = this.value;

      this.redraw(this.pathActive, this.degree);
    }

    updateView();

    let fireEvent = (element, name) => {
      if ('createEvent' in document) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(name, false, true);
        element.dispatchEvent(event);
      } else {
        element.fireEvent('on'+name);
      }
    }

    let updateWithEvent = (event, done) => {
      let vector;

      if ((event.clientX) && (event.clientY)) {
        vector = [event.clientX, event.clientY];
      }
      else if (event.changedTouches) {
        vector = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
      }
      event.preventDefault();

      let deg = angle(vector, el);

      this.degree = Math.round(deg);

      if ((deg >= min) && (deg <=max)) {
        this.value = degToValue(deg);
        updateView();
      }

      fireEvent(el, done ? 'change' : 'input');
    }

    let beginTracking = (e) => {
      let endTracking = (e) => {
        updateWithEvent(e, true);

        el.removeEventListener('mousemove', duringTracking, false);
        document.body.removeEventListener('mouseup', endTracking, false);

        if (this.isTouch) {
          el.removeEventListener('touchmove', duringTracking, false);
          document.body.removeEventListener('touchend', endTracking, false);
        }
      }

      let duringTracking = (e) => {
        updateWithEvent(e);
      }

      el.addEventListener('mousemove', duringTracking, false);
      document.body.addEventListener('mouseup', endTracking, false);

      if (this.isTouch) {
        el.addEventListener('touchmove', duringTracking, false);
        document.body.addEventListener('touchend', endTracking, false);
      }
    }

    el.addEventListener('mousedown', beginTracking, false);

    if (this.isTouch) {
      el.addEventListener('touchstart', beginTracking, false);
    }
  }

  redraw(el, deg){
    el.setAttribute('stroke-dashoffset', ((this.pathCircleLegth/360)*(deg - this.options.min)));
  }

  _isTouchDevice() {
    return 'ontouchstart' in window        // works on most browsers
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
  }
}
