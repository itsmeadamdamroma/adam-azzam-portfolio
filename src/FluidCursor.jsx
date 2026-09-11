import { useEffect, useRef } from 'react'

/*
 Fluid cursor WebGL — portato dal tema "neromotion" (romarte).
 Simulazione fluida che segue il mouse, canvas fixed dietro il contenuto (z-index -2).
 Disabilitata su touch/coarse pointer. Nessuna dipendenza nuova.
*/
const CONFIG = {
  SIM_RESOLUTION: 128, DYE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 1.8, VELOCITY_DISSIPATION: 2.8,
  PRESSURE: 0, CURL: 5, SPLAT_FORCE: 8000, SPLAT_RADIUS: 0.08,
  COLOR_UPDATE_SPEED: 12,
}

const VERT = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main () { vUv = aPosition * 0.5 + 0.5; gl_Position = vec4(aPosition, 0.0, 1.0); }
`

/* Splat di colore nello spazio velocity+dye */
const SPLAT = `
  precision highp float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`

/* Advect: muove dye con velocity, dissipazione esponenziale */
const ADVECT = `
  precision highp float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = texture2D(uSource, coord);
    float decay = 1.0 + dissipation * dt;
    gl_FragColor = result / decay;
  }
`

/* Curl/vorticità per movimento fluido (opzionale, legge velocity) */
const CURL = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`

/* Vorticity confinement: aggiunge forza di vorticità alla velocity */
const VORTICITY = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`

/* Display: mostra dye in RGB, alpha = max canale (composita su nero) */
const DISPLAY = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
  }
`

/* Vertex con var adiacenti per curl/vorticity */
const VERT_ADJ = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

function compile(gl, type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
function mkProgram(gl, vs, fsSrc) {
  const p = gl.createProgram()
  gl.attachShader(p, vs)
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fsSrc))
  gl.linkProgram(p)
  const u = {}
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < n; i++) { const name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name) }
  return { p, u }
}

function createFBO(gl, w, h, filter) {
  gl.activeTexture(gl.TEXTURE0)
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.viewport(0, 0, w, h)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  return { texture: tex, fbo, width: w, height: h, texelSizeX: 1 / w, texelSizeY: 1 / h, attach: (id) => { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, tex); return id } }
}

function doubleFBO(gl, w, h, filter) {
  let a = createFBO(gl, w, h, filter), b = createFBO(gl, w, h, filter)
  return {
    width: w, height: h, texelSizeX: a.texelSizeX, texelSizeY: a.texelSizeY,
    get read() { return a }, set read(v) { a = v },
    get write() { return b }, set write(v) { b = v },
    swap() { const t = a; a = b; b = t },
  }
}

function hsvToRgb(h) {
  const i = Math.floor(6 * h), f = 6 * h - i, v = 1
  const p = 0, q = 1 - f, t = f
  switch (i % 6) {
    case 0: return [v, t, p]; case 1: return [q, v, p]; case 2: return [p, v, t]
    case 3: return [p, q, v]; case 4: return [t, p, v]; default: return [v, p, q]
  }
}
function randomColor() {
  const [r, g, b] = hsvToRgb(Math.random())
  return { r: r * 0.15, g: g * 0.15, b: b * 0.15 }
}

export default function FluidCursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false })
    if (!gl) return

    const ext = gl.getExtension('OES_texture_half_float')
    const halfFloatType = ext ? ext.HALF_FLOAT_OES : gl.UNSIGNED_BYTE
    const linear = gl.getExtension('OES_texture_half_float_linear') ? gl.LINEAR : gl.NEAREST
    void halfFloatType; void linear

    /* geometria */
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const vsAdj = compile(gl, gl.VERTEX_SHADER, VERT_ADJ)
    const splat = mkProgram(gl, vs, SPLAT)
    const advect = mkProgram(gl, vs, ADVECT)
    const curlP = mkProgram(gl, vsAdj, CURL)
    const vort = mkProgram(gl, vsAdj, VORTICITY)
    const display = mkProgram(gl, vs, DISPLAY)

    let dye, vel, curl
    function getRes(res) {
      let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      if (aspect < 1) aspect = 1 / aspect
      const min = Math.round(res), max = Math.round(res * aspect)
      return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: max, height: min } : { width: min, height: max }
    }
    function initFBOs() {
      const t = halfFloatType
      const f = linear
      dye = doubleFBO(gl, getRes(CONFIG.DYE_RESOLUTION).width, getRes(CONFIG.DYE_RESOLUTION).height, f)
      vel = doubleFBO(gl, getRes(CONFIG.SIM_RESOLUTION).width, getRes(CONFIG.SIM_RESOLUTION).height, f)
      const cRes = getRes(CONFIG.SIM_RESOLUTION)
      curl = createFBO(gl, cRes.width, cRes.height, gl.NEAREST)
    }

    function blit(target) {
      if (target == null) { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null) }
      else { gl.viewport(0, 0, target.width, target.height); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo) }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.floor(canvas.clientWidth * dpr), h = Math.floor(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true }
      return false
    }

    function splatAt(x, y, dx, dy, color) {
      gl.useProgram(splat.p)
      gl.uniform1i(splat.u.uTarget, vel.read.attach(0))
      gl.uniform1f(splat.u.aspectRatio, canvas.width / canvas.height)
      gl.uniform2f(splat.u.point, x, y)
      gl.uniform3f(splat.u.color, dx, dy, 0)
      gl.uniform1f(splat.u.radius, CONFIG.SPLAT_RADIUS / 100)
      blit(vel.write); vel.swap()
      gl.uniform1i(splat.u.uTarget, dye.read.attach(0))
      gl.uniform3f(splat.u.color, color.r, color.g, color.b)
      blit(dye.write); dye.swap()
    }

    function step(dt) {
      gl.disable(gl.BLEND)
      /* curl */
      gl.useProgram(curlP.p)
      gl.uniform2f(curlP.u.texelSize, vel.texelSizeX, vel.texelSizeY)
      gl.uniform1i(curlP.u.uVelocity, vel.read.attach(0))
      blit(curl)
      /* vorticity */
      gl.useProgram(vort.p)
      gl.uniform2f(vort.u.texelSize, vel.texelSizeX, vel.texelSizeY)
      gl.uniform1i(vort.u.uVelocity, vel.read.attach(0))
      gl.uniform1i(vort.u.uCurl, curl.attach(1))
      gl.uniform1f(vort.u.curl, CONFIG.CURL)
      gl.uniform1f(vort.u.dt, dt)
      blit(vel.write); vel.swap()
      /* advect velocity */
      gl.useProgram(advect.p)
      gl.uniform2f(advect.u.texelSize, vel.texelSizeX, vel.texelSizeY)
      gl.uniform1i(advect.u.uVelocity, vel.read.attach(0))
      gl.uniform1i(advect.u.uSource, vel.read.attach(0))
      gl.uniform1f(advect.u.dt, dt)
      gl.uniform1f(advect.u.dissipation, CONFIG.VELOCITY_DISSIPATION)
      blit(vel.write); vel.swap()
      /* advect dye */
      gl.uniform2f(advect.u.texelSize, dye.texelSizeX, dye.texelSizeY)
      gl.uniform1i(advect.u.uVelocity, vel.read.attach(0))
      gl.uniform1i(advect.u.uSource, dye.read.attach(1))
      gl.uniform1f(advect.u.dt, dt)
      gl.uniform1f(advect.u.dissipation, CONFIG.DENSITY_DISSIPATION)
      blit(dye.write); dye.swap()
    }

    function render() {
      gl.disable(gl.BLEND)
      gl.useProgram(display.p)
      gl.uniform1i(display.u.uTexture, dye.read.attach(0))
      blit(null)
    }

    let lastX = null, lastY = null, color = randomColor(), colorTimer = 0
    function onMove(e) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const x = (e.clientX * dpr) / canvas.width
      const y = 1 - (e.clientY * dpr) / canvas.height
      if (lastX == null) { lastX = x; lastY = y }
      const aspect = canvas.width / canvas.height
      let dx = x - lastX, dy = y - lastY
      if (aspect < 1) dx *= aspect; else if (aspect > 1) dy /= aspect
      dx *= CONFIG.SPLAT_FORCE; dy *= CONFIG.SPLAT_FORCE
      lastX = x; lastY = y
      splatAt(x, y, dx, dy, color)
    }

    let raf, last = Date.now()
    function frame() {
      const now = Date.now()
      const dt = Math.min((now - last) / 1000, 0.016666)
      last = now
      if (resize()) initFBOs()
      colorTimer += dt * CONFIG.COLOR_UPDATE_SPEED
      if (colorTimer >= 1) { colorTimer = 0; color = randomColor() }
      step(dt)
      render()
      raf = requestAnimationFrame(frame)
    }

    resize(); initFBOs()
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  return <canvas ref={ref} className="fluid-canvas" aria-hidden="true" />
}
