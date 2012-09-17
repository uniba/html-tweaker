(function(){

  var elm = $('html, html *').children();

  for (var i=0, maxi=elm.length; i<maxi; i+=1) {
    
    if ($(elm[i]).css('margin-left') != '0px') {
      var mt = parseInt($(elm[i]).css('margin-top').replace('px', ''));
      console.log(mt);
      $(elm[i]).css('margin-left', mt + (Math.random() * 50 - 25));
    }
    $(elm[i]).css('color', random_color('rgb'));
    
    //$(elm[i]).css("position") = 'absolute';
    //$(elm[i]).css("color") = '#00ff00';
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
