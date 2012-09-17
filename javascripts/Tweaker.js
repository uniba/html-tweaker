(function(){

  var elm = $('html, html *').children()
    , timeline = new Timeline(200)
    , counter = 0
    , colorElm = []
    , bgColorElm = []
    , positionElm = [];

  for (var i=0, maxi=elm.length; i<maxi; i+=1) {
    if ($(elm[i]).css('margin-left') && $(elm[i]).css('margin-left') != '0px') {
      positionElm.push(elm[i]);
    }
  }
  
  for (var i=0, maxi=elm.length; i<maxi; i+=1) {
    if ($(elm[i]).css('color')) {
      colorElm.push(elm[i]);
    }
  }

  for (var i=0, maxi=elm.length; i<maxi; i+=1) {
    if ($(elm[i]).css('background-color')) {
      bgColorElm.push(elm[i]);
    }
  }
  
  console.log(positionElm.length);
  console.log(colorElm.length);
  console.log(bgColorElm.length);

  function updatePosition() {
    for (var i=0, maxi=positionElm.length; i<maxi; i+=Math.round(Math.random() * 100)) {
      var mt = parseInt($(positionElm[i]).css('margin-left').replace('px', ''));
      $(positionElm[i]).css('margin-left', mt + (Math.random() * 4 - 2));
    }
  }

  function updateColor() {
    for (var i=0, maxi=colorElm.length; i<maxi; i+=Math.round(Math.random() * 50)) {
      $(colorElm[i]).css('color', random_color('rgb'));
    }
  }

  function updateBgColor() {
    for (var i=0, maxi=bgColorElm.length; i<maxi; i+=Math.round(Math.random() * 1000)) {
      $(bgColorElm[i]).css('background-color', random_color('rgb'));
    }
  }

  animate();

  function animate() {    
    requestAnimationFrame( animate );
    
    if (counter % 1 == 0) {
      updatePosition();
    }
    
    if (counter % 1 == 0) {
      updateColor();
    }
    
    if (counter % 1 == 0) {
      updateBgColor();
    }

    
    counter++;
  }

  // @format (hex|rgb|null) : Format to return, default is integer
  function random_color(format) {
    var rint = Math.round(0xffffff * Math.random());
    switch(format) {
      case 'hex':
        return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
        break;
    
      case 'rgb':
        return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
        break;
    
      default:
        return rint;
        break;
    }
  }

})();
