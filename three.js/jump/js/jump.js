const result = {
  'CUR_IN': 'falled_in_current_cube',
  'CUR_OUT': 'falled_out_current_cube',
  'NEXT_IN': 'falled_in_next_cube',
  'NEXT_OUT': 'falled_out_next_cube',
  'OUT': 'not_in_any_cube'
}
const fallingResult = {
  'LEFT_TOP_OUT': 'left_top_out',
  'LEFT_BOTTOM_OUT': 'left_bottom_out',
  'RIGHT_TOP_OUT': 'right_top_out',
  'RIGHT_BOTTOM_OUT': 'right_bottom_out',
  'OUT': 'not_in_any_cube'
}

class JumpGame {
  constructor () {
    this.config = {
      background: 0x424242,
      cubeWidth: 10,
      cubeHeight: 5,
      cubeDeep: 10,
      cubeColor: 0xcccccc,
      jumperWidth: 2,
      jumperHeight: 4,
      jumperDeep: 2,
      jumperColor: 0xff4400,
      cubeBottom: -2.5
    }
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.cubes = [];
    this.cubeState = {
      nextCubeDirection: ''
    }
    this.jumperState = {
      ready: false,
      xSpeed: 0,
      ySpeed: 0
    }
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -50,
      window.innerWidth / 50,
      window.innerHeight / 50,
      window.innerHeight / -50,
      1,
      5000
    );
    this.cameraPosition = { current: new THREE.Vector3(0, 0, 0), next: new THREE.Vector3() };
    this.renderer = new THREE.WebGLRenderer();
    this.result = {
      location: result.CUR_IN
    }
    this.fallingState = {
      isFallingEnd: false,
      fallingSpeed: 0.1,
    }
    this.score = 0;
  }

  init () {
    this._addAxesHelper();
    this._setCamera();
    this._setLight();
    this._setRenderer();

    this._createCube();
    this._createCube();
    this._createJumper();

    this._updateCamera();
    this._render();

    window.addEventListener('resize', () => {
      this._handleWindowResize();
    });

    let canvas = document.querySelector('canvas');

    canvas.addEventListener('mousedown', () => {
      this._handleMouseDown();
    })
    canvas.addEventListener('mouseup', () => {
      this._handleMouseUp();
    })
  }

  _addSuccessCallback (cb) {
    this.successCallback = cb;
  }

  _addFailCallback (cb) {
    this.failCallback = cb;
  }

  _addAxesHelper () {
    let axesHelper = new THREE.AxesHelper(30);
    this.scene.add(axesHelper);
  }

  _updateCameraPosition () {
    let lastIndex = this.cubes.length - 1;
    let pointA = {
      x: this.cubes[lastIndex - 1].position.x,
      z: this.cubes[lastIndex - 1].position.z
    }
    let pointB = {
      x: this.cubes[lastIndex].position.x,
      z: this.cubes[lastIndex].position.z
    }

    this.cameraPosition.next = new THREE.Vector3((pointA.x + pointB.x) / 2, 0, (pointA.z + pointB.z) / 2)
  }

  _updateCamera () {
    if (
      this.cameraPosition.current.x > this.cameraPosition.next.x || 
      this.cameraPosition.current.z > this.cameraPosition.next.z
    ) {
      if (this.cubeState.nextCubeDirection === 'left') {
        this.cameraPosition.current.x -= 0.1;
      } else {
        this.cameraPosition.current.z -= 0.1;
      }

      if (this.cameraPosition.current.x - this.cameraPosition.next.x < 0.1) {
        this.cameraPosition.current.x = this.cameraPosition.next.x;
      } else if (this.cameraPosition.current.z - this.cameraPosition.next.z < 0.1) {
        this.cameraPosition.current.z = this.cameraPosition.next.z;
      }
    }
    this.camera.lookAt(this.cameraPosition.current);
    this._render();
    requestAnimationFrame(() => {
      this._updateCamera();
    });
  }

  _createCube () {
    let geometry = new THREE.CubeGeometry(
      this.config.cubeWidth,
      this.config.cubeHeight,
      this.config.cubeDeep
    );
    let meterial = new THREE.MeshLambertMaterial({ color: this.config.cubeColor });
    let cube = new THREE.Mesh(geometry, meterial);
    if (this.cubes.length) {
      this.cubeState.nextCubeDirection = Math.random() > 0.5 ? 'left' : 'right';

      cube.position.x = this.cubes[this.cubes.length - 1].position.x;
      cube.position.y = this.cubes[this.cubes.length - 1].position.y;
      cube.position.z = this.cubes[this.cubes.length - 1].position.z;

      if (this.cubeState.nextCubeDirection === 'left') {
        cube.position.x -= 20;
      } else {
        cube.position.z -= 20;
      }
    }
    this.cubes.push(cube);
    this.scene.add(cube);
    if (this.cubes.length > 1) {
      this._updateCameraPosition();
    }
  }

  _createJumper () {
    let gemoetry = new THREE.CubeGeometry(this.config.jumperWidth, this.config.jumperHeight, this.config.jumperDeep);
    let material = new THREE.MeshLambertMaterial({ color: this.config.jumperColor });
    this.jumper = new THREE.Mesh(gemoetry, material);
    gemoetry.translate(0, 2.5, 0);
    this.jumper.position.y = 2;
    this.scene.add(this.jumper);
  }

  _handleWindowResize () {
    this._setSize();
    this.camera.left = this.size.width / -50;
    this.camera.right = this.size.width / 50;
    this.camera.top = this.size.height / 50;
    this.camera.bottom = this.size.height / -50;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.size.width, this.size.height);
    this._render();
  } 

  _handleMouseDown () {
    if (!this.jumperState.ready) {
      this.jumper.scale.y -= 0.01;
      this.jumperState.xSpeed += 0.002;
      this.jumperState.ySpeed += 0.003;
      this._render();
      requestAnimationFrame(() => {
        this._handleMouseDown();
      });
    }
  }

  _handleMouseUp () {
    this.jumperState.ready = true;
    if (this.jumper.position.y >= 2) {
      if (this.jumper.scale.y < 1) {
        this.jumper.scale.y += 0.007;
      }
      if (this.cubeState.nextCubeDirection === 'left') {
        this.jumper.position.x -= this.jumperState.xSpeed;
      } else {
        this.jumper.position.z -= this.jumperState.xSpeed;
      }
      this.jumper.position.y += this.jumperState.ySpeed;
      this.jumperState.ySpeed -= 0.002;
      this._render();
      requestAnimationFrame(() => {
        this._handleMouseUp();
      });
    } else {
      this.jumper.scale.y = 1;
      this.jumper.position.y = 2;
      this.jumperState.ready = false;
      this.jumperState.xSpeed = 0;
      this.jumperState.ySpeed = 0;
      this._checkInCube();

      if (this.result.location === result.NEXT_IN) {
        this.score++;
        this.successCallback(this.score);
        this._createCube();
        this._render();
      } else {
        this._falling();
      }
    }
  }

  _falling () {
    if (this.result.location === result.NEXT_OUT) {
      if (this.cubeState.nextCubeDirection === 'left') {
        if (this.jumper.position.x > this.cubes[this.cubes.length - 1].position.x) {
          this._fallingDirection(fallingResult.LEFT_BOTTOM_OUT);
        } else {
          this._fallingDirection(fallingResult.LEFT_TOP_OUT);
        }
      } else {
        if (this.jumper.position.z > this.cubes[this.cubes.length - 1].position.z) {
          this._fallingDirection(fallingResult.RIGHT_BOTTOM_OUT);
        } else {
          this._fallingDirection(fallingResult.RIGHT_TOP_OUT);
        }
      }
    } else if (this.result.location === result.CUR_OUT) {
      if (this.cubeState.nextCubeDirection === 'left') {
        this._fallingDirection(fallingResult.LEFT_TOP_OUT);
      } else {
        this._fallingDirection(fallingResult.RIGHT_TOP_OUT);
      }
    } else if (this.result.location === result.OUT) {
      this._fallingDirection(fallingResult.OUT);
    }
  }

  _fallingDirection (direction) {
    let axis = direction.includes('left') ? 'z' : 'x';
    let jumpperRotation = this.jumper.rotation[axis];
    let falledPosition = this.config.cubeBottom + this.config.jumperHeight / 2;
    
    let shouldRotate;

    if (direction === fallingResult.LEFT_TOP_OUT) {
      jumpperRotation += 0.1;
      shouldRotate = jumpperRotation < Math.PI / 2;
    } else if (direction === fallingResult.LEFT_BOTTOM_OUT) {
      jumpperRotation -= 0.1;
      shouldRotate = jumpperRotation > -Math.PI / 2;
    } else if (direction === fallingResult.RIGHT_TOP_OUT) {
      jumpperRotation -= 0.1;
      shouldRotate = jumpperRotation > -Math.PI / 2;
    } else if (direction === fallingResult.RIGHT_BOTTOM_OUT) {
      jumpperRotation += 0.1;
      shouldRotate = jumpperRotation < Math.PI / 2;
    } else if (direction === fallingResult.OUT) {
      falledPosition = this.config.cubeBottom;
      shouldRotate = false;
    }

    if (!this.fallingState.isFallingEnd) {
      if (shouldRotate) {
        this.jumper.rotation[axis] = jumpperRotation;
      } else if (this.jumper.position.y > falledPosition) {
        this.jumper.position.y -= this.fallingState.fallingSpeed;
      } else {
        this.fallingState.isFallingEnd = true;
      }
      this._render();
      requestAnimationFrame(() => {
        this._falling();
      });
    } else {
      this.failCallback(this.score);
    }
  }

  _checkInCube () {
    let currentDistance,
        nextDistance;

    const relativeDistance = (this.config.cubeWidth + this.config.jumperWidth) / 2;

    if (this.cubeState.nextCubeDirection === 'left') {
      currentDistance = Math.abs(this.cubes[this.cubes.length - 2].position.x - this.jumper.position.x);
      nextDistance = Math.abs(this.cubes[this.cubes.length - 1].position.x - this.jumper.position.x );

    } else {
      currentDistance = Math.abs(this.cubes[this.cubes.length - 2].position.z - this.jumper.position.z);
      nextDistance = Math.abs(this.cubes[this.cubes.length - 1].position.z  - this.jumper.position.z);
    }

    if (currentDistance < relativeDistance) {
      // 在当前跳板中
      this.result.location = currentDistance < this.config.cubeWidth / 2 ? result.CUR_IN : result.CUR_OUT;
    } else if (nextDistance < relativeDistance) {
      this.result.location = nextDistance < this.config.cubeWidth / 2 ? result.NEXT_IN : result.NEXT_OUT;
    } else {
      this.result.location = result.OUT;
    }
  }

  _setSize () {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  _setCamera () {
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(this.cameraPosition.current);
  }

  _setLight () {
    let directionlLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionlLight.position.set(3, 10, 5);
    this.scene.add(directionlLight);
  }

  _setRenderer () {
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setClearColor(this.config.background);
    document.body.appendChild(this.renderer.domElement);
  }

  _render () {
    this.renderer.render(this.scene, this.camera);
  }

  _restart () {
    this.cubeState = {
      nextCubeDirection: ''
    }
    this.jumperState = {
      ready: false,
      xSpeed: 0,
      ySpeed: 0
    }
    this.cameraPosition = {
      current: new THREE.Vector3(0, 0, 0),
      next: new THREE.Vector3()
    };
    this.result = {
      location: result.CUR_IN
    }
    this.fallingState = {
      isFallingEnd: false,
      fallingSpeed: 0.1,
    }
    this.score = 0;

    this.scene.remove(this.jumper);
    this.cubes.forEach(item => this.scene.remove(item));
    this.cubes = [];

    this._createCube();
    this._createCube();
    this._createJumper();
    this._updateCamera();
  }
}