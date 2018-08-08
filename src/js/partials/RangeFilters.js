class RangeFilters {
  constructor(filtersWr, inputClass) {
    let input = document.querySelector(inputClass);
    if (input) {
      this.init(filtersWr, input);
    }
  }

  init(filtersWr, inputEl) {
    let filterItems = filtersWr.getElementsByClassName('filters__item');
    let activeClass = 'filters__item--is-active';
    let activeElement = filtersWr.getElementsByClassName(activeClass)[0];
    let input = inputEl;
    let defaultFilterItem = filtersWr.querySelector('[data-value="manual"]');

    if (!activeElement) {
      activeElement = filterItems[0];
    }

    let setActive = (el) => {
      activeElement.classList.remove(activeClass);
      el.classList.add(activeClass);
      activeElement = el;
    }

    let changeValue = (el) => {
      let currentElement = el;
      let newValue = currentElement.getAttribute('data-value');

      if (newValue !=='manual') {
        input.value = newValue;
      }
      setActive(currentElement);
    }

    for (let i = 0; i < filterItems.length; i++) {
      filterItems[i].addEventListener('click', function() {
        changeValue(this);
      });
    }

    input.addEventListener('input', function() {
      setActive(defaultFilterItem);
    });
  }
}
