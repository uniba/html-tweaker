(function(){

  var elm = $('body *').children()
    , timeline = new Timeline(200)
    , counter = 0
    , colorElm = []
    , bgColorElm = []
    , positionElm = []
    , imageElm = []
    , bgImageElm = []
    , threejsElm = []
    , threejsObj = []
    , threejsElmCounter = [];
    
  var autoFlag = false
    , css3dFlag = false
    , colorFlag = false
    , absolutePositionFlag = false
    , bgColorFlag = false
    , positionFlag = false
    , replaceImgFlag = false;
    
  // Three.js
  var camera
    , scene
    , renderer
    , controls;

  init();

  $(window).keydown(function(e){
    console.log(e.keyCode);
    
    switch(e.keyCode) {
      case 81 : // 'q'
        css3dFlag = !css3dFlag;
        break;

      case 87: // 'w'
        colorFlag = !colorFlag;
        break;
      
      case 69 : // 'e'
        absolutePositionFlag = !absolutePositionFlag;
        break;
        
      case 82 : // 'r'
        bgColorFlag = !bgColorFlag;
        break;
        
      case 84 : // 't'
        positionFlag = !positionFlag;
        break;
        
      case 89 : // 'y'
        replaceImgFlag = !replaceImgFlag;
        break;
    
      case 74 : // 'l'
        autoFlag = false;
        break;
      
      case 76 : // 'j'
        autoFlag = true;
        break;
            
      case 73 : // 'i'
        renderer.domElement.style.zIndex =  100000;
        break;
        
      case 77 : // 'm'
        renderer.domElement.style.zIndex = -100000;
        break;
        
      case 75 : // 'k'        
        controls.enabled = !controls.enabled;
        break;
    }
    
    return false;
  });


  function animate() {    
    requestAnimationFrame( animate );
    
    if (autoFlag) {
      if (css3dFlag && counter % 1 == 0) {
        moveDomElemetToCss3d();
      }
      
      if (colorFlag && counter % 1 == 0) {
        updateColor();
      }
  
      if (absolutePositionFlag && counter % 1 == 0) {
        updateAbsolutePosition();
      }
  
      if (bgColorFlag && counter % 1 == 0) {
        updateBgColor();
      }
  
      if (positionFlag && counter % Math.round(Math.random() * 90) == 0) {
        updatePosition();
        var synth = new Synth(audiolet, 440);
        synth.connect(audiolet.output);
      }
      
      if (replaceImgFlag && counter % 1 == 0) {
        replaceImgSrc();
      }
    }

    if (controls) {
      controls.update();
    }
    scene.position.x = $(window).scrollLeft();
    scene.position.y = $(window).scrollTop();
    
    renderer.render(scene, camera);

    counter++;
  }

  function moveDomElemetToCss3d() {
    // add a new 3d object
    var l = threejsElmCounter.length;
    if (l > 0) {
      createCss3dObject(threejsElm[threejsElmCounter[0]]);
      threejsElmCounter.splice(0, 1);
    }
    
    // rotate objects existing already
    for (var i=0, maxi=threejsObj.length; i<maxi; i+=1) {
      threejsObj[i].rotation.y += Math.PI / 60;
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
		  , object = new THREE.CSS3DObject(element)
		  , posX = $(element).offset().left
		  , posY = $(element).offset().top;
		
		if (posX == 0 && posY == 0) {
  		posX = Math.random() * window.innerWidth;
  		posY = Math.random() * window.innerHeight;
		}
		posX -= window.innerWidth  / 2 - $(element).width()  / 2;
		posY -= window.innerHeight / 2 - $(element).height() / 2;
		
		object.position.x = posX;
		object.position.y = posY;
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
    for (var i=0, maxi=elm.length; i<maxi; i+=Math.round(Math.random() * 100)) {
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
    for (var i=0, maxi=elm.length; i<maxi; i+=1) {
      if ($(elm[i]).css('background-image').substr(0, 3) === 'url' && $(elm[i]).width() < 300) {
        threejsElm.push(elm[i]);
      }
    }
    for (var i=0, maxi=threejsElm.length; i<maxi; i+=1) {
      threejsElmCounter[i] = i;
    }
    shuffleArray(threejsElmCounter);
    
    // Three.js
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(0, 0, 600);

		scene = new THREE.Scene();

		renderer = new THREE.CSS3DRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top = 0;
		renderer.domElement.style.zIndex = 100000;
		document.body.appendChild(renderer.domElement);
		
		controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = true;
    controls.noPan = true;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];
		
		animate();
	}
	
	function shuffleArray(a) {
    var i = a.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = a[--i];
        a[i] = a[j];
        a[j] = t;
    }
    return a;
  }
  
  var audiolet = new Audiolet();
  
  function playExample() {
    var noise = new WhiteNoise(audiolet);
    var filter = new LowPassFilter(audiolet, 200);
    noise.connect(filter);
    filter.connect(audiolet.output);
  }
  playExample();
  
  var Synth = function(audiolet, frequency) {
    AudioletGroup.call(this, audiolet, 0, 1);
    // Basic wave
    this.saw = new Sine(audiolet, frequency);

    // Gain envelope
    this.gain = new Gain(audiolet, 0.1);
    this.env = new PercussiveEnvelope(audiolet, 1, 0.1, 0.1,
        function() {
            this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
        }.bind(this)
    );
    this.envMulAdd = new MulAdd(audiolet, 0.3, 0);

    // Main signal path
    this.saw.connect(this.gain);
    this.gain.connect(this.outputs[0]);

    // Envelope
    this.env.connect(this.envMulAdd);
    this.envMulAdd.connect(this.gain, 0, 1);
  }
  extend(Synth, AudioletGroup); 

})();
