(function(){

  var elm = $('html, html *').children()
    , timeline = new Timeline(200)
    , counter = 0
    , colorElm = []
    , bgColorElm = []
    , positionElm = []
    , imageElm = []
    , bgImageElm = []
    , threejsElm = []
    , threejsObj = [];
    
  // Three.js
  var camera
    , scene
    , renderer
    , controls;

  init();

  function animate() {    
    requestAnimationFrame( animate );

    if (counter == 90) {
      moveDomElemetToCss3d();
    }
    
    if (counter > 90) {
      for (var i=0, maxi=threejsObj.length; i<maxi; i+=1) {
        threejsObj[i].rotation.y += Math.random() * Math.PI / 60;
      }
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
    
    if (counter > 610 && counter % 1 == 0) {
      replaceImgSrc();
    }

    //controls.update();
    renderer.render(scene, camera);

    counter++;
  }

  function moveDomElemetToCss3d() {
    for (var i=0, maxi=threejsElm.length; i<maxi; i+=1) {
      //if ($(threejsElm[i]).css('-webkit-transform') === 'none') {
        createCss3dObject(threejsElm[i]);
        //i = maxi;
      //}
    }
    
    /*
    for (var i=0, maxi=imageElm.length; i<maxi; i+=1) {
      if ($(imageElm[i]).css('-webkit-transform') === 'none') {
        createCss3dObject(imageElm[i]);
        i = maxi;
      }
    }
    
    for (var i=0, maxi=bgImageElm.length; i<maxi; i+=1) {
      if ($(bgImageElm[i]).css('-webkit-transform') === 'none') {
        createCss3dObject(bgImageElm[i]);
        i = maxi;
      }
    }
    */
  }
  
  function createCss3dObject(e) {
		var element = e
		  , object = new THREE.CSS3DObject(element);
    			  
		object.position.x = $(element).offset().left - window.innerWidth  / 2 + $(element).width()  / 2;
		object.position.y = $(element).offset().top  - window.innerHeight / 2 + $(element).height() / 2;
		object.position.z = 0;
		object.rotation.x = 0; //Math.PI / 12 * i;
		object.rotation.y = 0; //Math.PI / 12 * i;
		object.rotation.z = 0; //Math.PI / 12 * i;
		object.scale.x = 1.0;
		object.scale.y = 1.0;
		scene.add(object);
		
		threejsObj.push(object);
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

	function init() {
	
  	// DOM Element Collection
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
    
    threejsElm = $(elm).filter('img');
    
    // Three.js
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(0, 0, 600);

		/*
		controls = new THREE.TrackballControls(camera);

		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;

		controls.noZoom = true;
		controls.noPan = true;

		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;

		controls.keys = [ 65, 83, 68 ];
		*/

		scene = new THREE.Scene();

		renderer = new THREE.CSS3DRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top = 0;
		renderer.domElement.style.zIndex = 100000;
		document.body.appendChild(renderer.domElement);
		
		animate();
	}

})();
