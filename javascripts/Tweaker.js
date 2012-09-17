(function(){

  var elm = $('html, html *').children()
    , timeline = new Timeline(200)
    , counter = 0
    , colorElm = []
    , bgColorElm = []
    , positionElm = []
    , imageElm = []
    , bgImageElm = [];

  for (var i=0, maxi=elm.length; i<maxi; i+=1) {
    if ($(elm[i]).css('position') === 'absolute') {
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
  
  imageElm = $(elm).filter('img');
  for (var i=0, maxi=imageElm.length; i<maxi; i+=1) {
    if ($(imageElm[i]).attr('height') === undefined) {
      $(imageElm[i]).attr('height', $(imageElm[i]).css('height'));
    }
    if ($(imageElm[i]).attr('width') === undefined) {
      $(imageElm[i]).attr('width', $(imageElm[i]).css('width'));
    }
  }

  for (var i=0, maxi=elm.length; i<maxi; i+=1) {
    if ($(elm[i]).css('background-image').substr(0, 3) === 'url') {
      bgImageElm.push(elm[i]);
    }
  }
  
  function updatePosition() {
    for (var i=0, maxi=elm.length; i<maxi; i+=Math.round(Math.random() * 10)) {
      var mt = parseInt($(elm[i]).css('margin-left').replace('px', ''));
      $(elm[i]).css('margin-left', mt + (Math.random() * 100 - 50));
    }
  }

  function updateAbsolutePosition() {
    for (var i=0, maxi=positionElm.length; i<maxi; i+=1) {
      $(positionElm[i]).css('left', (Math.random() * 10) - 5);
      $(positionElm[i]).css('top',  (Math.random() * 10) - 5);
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

  function replaceImgSrc() {
    var imageIndex = Math.round(Math.random() * (imageElm.length - 1))
      , bgImageIndex = Math.round(Math.random() * (bgImageElm.length - 1));  
    $(imageElm[imageIndex]).attr('src','http://www.cheshirecat.jp/images/noise.gif');
    $(bgImageElm[bgImageIndex]).css('background-image','url("http://www.cheshirecat.jp/images/noise.gif")');
  }

  animate();

  function animate() {    
    requestAnimationFrame( animate );

    if (counter > 90 && counter % 1 == 0) {
      replaceImgSrc();
    }
    
    if (counter > 450 && counter % 1 == 0) {
      updateColor();
    }

    if (counter > 500 && counter % 1 == 0) {
      updateAbsolutePosition();
    }

    if (counter > 590 && counter % 1 == 0) {
      updateBgColor();
    }

    if (counter > 600 && counter % 90 == 0) {
      updatePosition();
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
