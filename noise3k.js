/**
 * NOISE3000
 * http://github.com/ezekielaquino/Noise3000
 * Internet film grain in HD
 * MIT License
 */

(function () {
  'use strict';


  window.Noise3k = function (options) {
    options = options || {};

    var noise = document.createElement('div');
    var style = document.createElement('style');
    var width = window.innerWidth * 5;
    var height = window.innerHeight * 5;
    var container = document.body;
    var frames = '';
    var keyframes, elem;

    if (options.container) {
      var wrapper = document.createElement('div');

      container = document.querySelector(options.container);

      // We create a separate wrapper so we dont affect
      // the overflow of the container you specify
      wrapper.classList.add('noise3k-wrapper');
      wrapper.style.width = container.offsetWidth + 'px';
      wrapper.style.height = container.offsetHeight + 'px';
      wrapper.style.position = 'relative';
      container.appendChild(wrapper);

      container = document.querySelector('.noise3k-wrapper');

      width = container.offsetWidth * 5;
      height = container.offsetHeight * 5;
      container.style.overflow = 'hidden';
    }

    // Create random positions on init
    for (var i = 0; i < 100; i++) {
      var px = Math.floor(Math.random() * 30);
      var py = Math.floor(Math.random() * 30);
      frames += i + '% { transform: translate3d('+ px +'%, '+ py +'%, 0) }'
    }

    keyframes = '@keyframes noise3k {'+ frames +'}'

    style.innerHTML = keyframes;
    document.getElementsByTagName('head')[0].appendChild(style);

    noise.classList.add('noise3k');
    noise.style.pointerEvents = 'none';
    noise.style.width = width + 'px';
    noise.style.height = height + 'px';
    noise.style.backgroundImage = 'url(' + grain() + ')';
    noise.style.backgroundSize = 100 * (options.grainSize || 1) + 'px';
    noise.style.top = (window.innerHeight / 2) - (height / 2) + 'px';
    noise.style.left = (window.innerWidth / 2) - (width / 2) + 'px';
    noise.style.position = options.container ? 'absolute': 'fixed';
    noise.style.zIndex = '99999';
    noise.style.animation = 'noise3k 1s infinite';

    container.appendChild(noise);

    elem = document.querySelector('.noise3k');
  }; // Noise3000



  // The grain itself, yup
  function grain() {
    return 'data:image/png;base64,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';
  }


})();