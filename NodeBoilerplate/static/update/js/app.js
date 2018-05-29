var scene, camera, renderer;
var light, controls;
var lastTime;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: false
  });
  renderer.setClearColor(0xd8e7ff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
camera.position.set( 0, 100, 0 );
camera.lookAt( new THREE.Vector3( 50, 50, 50 ) );
// camera.position.y = 80;
// var geometry1 = new THREE.Geometry();
// geometry1.vertices.push(new THREE.Vector3( -1000, 0, 0) );
// geometry1.vertices.push(new THREE.Vector3( 0, 1000, 0) );
// geometry1.vertices.push(new THREE.Vector3( 1000, 0, 0) );
// var material1 = new THREE.LineDashedMaterial( {
// 	color: 0xffffff,
// 	linewidth: 1,
// 	scale: 1,
// 	dashSize: 3,
// 	gapSize: 1,
// } );
// var line1 = new THREE.Line( geometry1, material1 );

// renderer.render( scene, camera );
  // controls = new THREE.FirstPersonControls(camera);
  // controls.movementSpeed = 20;
  // controls.lookSpeed = 0.05;
  // controls.lookVertical = true;

  scene = new THREE.Scene();
  //
  // scene.add(line1);
  //
  scene.fog = new THREE.FogExp2(0xaaaaaa, 0.009);

  light = new THREE.HemisphereLight(0xfffff0, 0x101020, 1.25);
  light.position.set(0.75, 1, 0.25);
  scene.add(light);

  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000, 4, 4),
    new THREE.MeshBasicMaterial({color: 0x333333, side: THREE.DoubleSide})
  );
  plane.rotation.x = -90 * Math.PI / 180;
  scene.add(plane);
  var geometry = new THREE.CubeGeometry(1, 1, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  geometry.faceVertexUvs[0][4][0].set( 0, 0 );
  geometry.faceVertexUvs[0][4][1].set( 0, 0 );
  geometry.faceVertexUvs[0][4][2].set( 0, 0 );
  geometry.faceVertexUvs[0][5][0].set( 0, 0 );
  geometry.faceVertexUvs[0][5][1].set( 0, 0 );
  geometry.faceVertexUvs[0][5][2].set( 0, 0 );
  var building = new THREE.Mesh(geometry);
  var city = new THREE.Geometry();

  var light = new THREE.Color(0xffffff);
  var shadow = new THREE.Color(0x303050);

  var light = new THREE.Color( 0xffffee );
  var shadow = new THREE.Color( 0x303050 );

  for (var i = 0; i < 5000; i++) {
    var value = 1 - Math.random() * Math.random();
    var color = new THREE.Color().setRGB(
      value + Math.random() * 0.001,
      value,
      value + Math.random() * 0.001
    );
    var top = color.clone().multiply(light);
    var bottom = color.clone().multiply(shadow);
    building.position.x = Math.floor(Math.random() * 150 - 80) * 10;
    building.position.z = Math.floor(Math.random() * 150 - 80) * 10;
    building.rotation.y = Math.floor(Math.random() * 150 - 80) * 10;
    building.scale.x = building.scale.z =
      Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
    building.scale.y =
      Math.random() * Math.random() * Math.random() * building.scale.x * 8 + 8;
    var geometry = building.geometry;
    for (var j = 0, jl = geometry.faces.length; j < jl; j++) {
      if (j === 2) {
        geometry.faces[j].vertexColors = [color, color, color, color];
      } else {
        geometry.faces[j].vertexColors = [top, top, bottom, bottom];
      }
    }
    THREE.GeometryUtils.merge(city, building);
  }

  var texture = new THREE.Texture(generateTexture());
  texture.anisotropy = renderer.getMaxAnisotropy();
  texture.needsUpdate = true;

  var mesh = new THREE.Mesh(
    city,
    new THREE.MeshLambertMaterial({
      map: texture,
      vertexColors: THREE.VertexColors
    })
  );
  scene.add(mesh);
  lastTime = performance.now();
}

function generateTexture() {
  var canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 64;

  var context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 32, 64);

  /* To draw the window row, we add some random to simulate lights variations in each windows. */
  for (var y = 2; y < 64; y += 2) {
    for (var x = 3; x < 29; x += 2) {
      var value0 = Math.floor(Math.random() * 32)+100;
      var value1 = Math.floor(Math.random() * 32)+100;
      var value2 = Math.floor(Math.random() * 64)+150;
      context.fillStyle = "rgb(" + [value0, value1, value2].join(",") + ")";
      context.fillRect(x, y, 1, 4);
    }
  }

  var canvas2 = document.createElement("canvas");
  canvas2.width = window.innerHeight;
  canvas2.height = window.innerWidth;

  var context = canvas2.getContext("2d");
  context.imageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.mozImageSmoothingEnabled = false;
  context.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);

  return canvas2;
}
var angle;
var oldAngle;
function animate() {
  requestAnimationFrame(animate);

  var time = performance.now() / 1000;
  camera.rotation.y+=0.001;
  angle+=0.001;
  renderer.render(scene, camera);

  lastTime = time;
}
// var info = document.createElement("div");
// info.style.position = "absolute";
// info.style.left = "0";
// info.style.top = "15px";
// info.style.width = "100%";
// info.style.color = "rgba(0,0,64,0.5)";
// info.style.textAlign = "center";
// info.textContent = "click and hold to move forward";
// document.body.appendChild(info);
