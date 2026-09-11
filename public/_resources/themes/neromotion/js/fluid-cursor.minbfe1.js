"use strict";

function initFluidAnimation() {
	f();
	const e = document.getElementsByTagName("canvas")[0];
	pe();
	let n = {
		SIM_RESOLUTION: 128,
		CAPTURE_RESOLUTION: 1024,
		DYE_RESOLUTION: 512,
		DENSITY_DISSIPATION: 1.8,
		VELOCITY_DISSIPATION: 2.8,
		PRESSURE: 0,
		PRESSURE_ITERATIONS: 15,
		CURL: 5,
		SPLAT_FORCE: 8e3,
		SPLAT_RADIUS: .08,
		SHADING: !0,
		COLORFUL: !0,
		BLOOM: !1,
		BLOOM_INTENSITY: .8,
		BLOOM_THRESHOLD: .6,
		BLOOM_ITERATIONS: 5,
		BLOOM_RESOLUTION: 256,
		BLOOM_SOFT_KNEE: .05,
		SUNRAYS: !1,
		SUNRAYS_RESOLUTION: 196,
		SUNRAYS_WEIGHT: 1,
		BACK_COLOR: {
			r: 0,
			g: 0,
			b: 0
		},
		TRANSPARENT: !0,
		COLOR_UPDATE_SPEED: 12,
		PAUSED: !1
	};

	function t() {
		this.id = -1, this.texcoordX = 0, this.texcoordY = 0, this.prevTexcoordX = 0, this.prevTexcoordY = 0, this.deltaX = 0, this.deltaY = 0, this.down = !1, this.moved = !1, this.color = [30, 0, 300]
	}
	"ontouchstart" in document.documentElement && (n = {
		SIM_RESOLUTION: 128,
		CAPTURE_RESOLUTION: 1024,
		DYE_RESOLUTION: 1024,
		DENSITY_DISSIPATION: 1.8,
		VELOCITY_DISSIPATION: 2.8,
		PRESSURE: 0,
		PRESSURE_ITERATIONS: 15,
		CURL: 5,
		SPLAT_FORCE: 8e3,
		SPLAT_RADIUS: .08,
		SHADING: !0,
		COLORFUL: !0,
		BLOOM: !0,
		BLOOM_INTENSITY: .5,
		BLOOM_THRESHOLD: .2,
		BLOOM_ITERATIONS: 5,
		BLOOM_RESOLUTION: 256,
		BLOOM_SOFT_KNEE: .01,
		SUNRAYS: !0,
		SUNRAYS_RESOLUTION: 196,
		SUNRAYS_WEIGHT: 1,
		BACK_COLOR: {
			r: 0,
			g: 0,
			b: 0
		},
		TRANSPARENT: !0,
		COLOR_UPDATE_SPEED: 10,
		PAUSED: !1
	});
	let r = [];
	r.push(new t);
	const {
		gl: i,
		ext: o
	} = a(e);

	function a(e) {
		const n = {
			alpha: !0,
			depth: !1,
			stencil: !1,
			antialias: !1,
			preserveDrawingBuffer: !1
		};
		let t = e.getContext("webgl2", n);
		const r = !!t;
		let i, o;
		r || (t = e.getContext("webgl", n) || e.getContext("experimental-webgl", n)), r ? (t.getExtension("EXT_color_buffer_float"), o = t.getExtension("OES_texture_float_linear")) : (i = t.getExtension("OES_texture_half_float"), o = t.getExtension("OES_texture_half_float_linear")), t.clearColor(0, 0, 0, 1);
		const a = r ? t.HALF_FLOAT : i.HALF_FLOAT_OES;
		let l, c, f;
		return r ? (l = u(t, t.RGBA16F, t.RGBA, a), c = u(t, t.RG16F, t.RG, a), f = u(t, t.R16F, t.RED, a)) : (l = u(t, t.RGBA, t.RGBA, a), c = u(t, t.RGBA, t.RGBA, a), f = u(t, t.RGBA, t.RGBA, a)), {
			gl: t,
			ext: {
				formatRGBA: l,
				formatRG: c,
				formatR: f,
				halfFloatTexType: a,
				supportLinearFiltering: o
			}
		}
	}

	function u(e, n, t, r) {
		if (!l(e, n, t, r)) switch (n) {
			case e.R16F:
				return u(e, e.RG16F, e.RG, r);
			case e.RG16F:
				return u(e, e.RGBA16F, e.RGBA, r);
			default:
				return null
		}
		return {
			internalFormat: n,
			format: t
		}
	}

	function l(e, n, t, r) {
		let i = e.createTexture();
		e.bindTexture(e.TEXTURE_2D, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, n, 4, 4, 0, t, r, null);
		let o = e.createFramebuffer(),
			a;
		return e.bindFramebuffer(e.FRAMEBUFFER, o), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, i, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE
	}

	function c() {
		var e = new dat.GUI({
			width: 500
		});
		e.add(n, "SIM_RESOLUTION", {
			32: 32,
			64: 64,
			128: 128,
			256: 256
		}).name("SIM_RESOLUTION").onFinishChange(ve), e.add(n, "CAPTURE_RESOLUTION", {
			1024: 1024,
			512: 512,
			256: 256,
			128: 128
		}).name("CAPTURE_RESOLUTION").onFinishChange(ve), e.add(n, "DYE_RESOLUTION", {
			1024: 1024,
			512: 512,
			256: 256,
			128: 128
		}).name("DYE_RESOLUTION").onFinishChange(ve), e.add(n, "DENSITY_DISSIPATION", 0, 10).name("DENSITY_DISSIPATION").step(.1), e.add(n, "VELOCITY_DISSIPATION", 0, 10).name("VELOCITY_DISSIPATION").step(.1), e.add(n, "PRESSURE", 0, 2).name("PRESSURE").step(.1), e.add(n, "PRESSURE_ITERATIONS", 0, 100).name("PRESSURE_ITERATIONS").step(1), e.add(n, "CURL", 0, 50).name("CURL").step(1), e.add(n, "SPLAT_FORCE", 0, 1e4).name("SPLAT_FORCE").step(1), e.add(n, "SPLAT_RADIUS", .01, 2).name("SPLAT_RADIUS").step(.01), e.add(n, "SHADING").name("SHADING").onFinishChange(Se);
		let t = e.addFolder("Bloom");
		t.add(n, "BLOOM").name("enabled").onFinishChange(Se), t.add(n, "BLOOM_INTENSITY", .1, 5).name("BLOOM_INTENSITY").step(.1), t.add(n, "BLOOM_THRESHOLD", 0, 10).name("BLOOM_THRESHOLD").step(.1), t.add(n, "BLOOM_ITERATIONS", 0, 20).name("BLOOM_ITERATIONS").step(1).onFinishChange(ve), t.add(n, "BLOOM_RESOLUTION", {
			1024: 1024,
			512: 512,
			256: 256,
			128: 128
		}).name("BLOOM_RESOLUTION").onFinishChange(ve), t.add(n, "BLOOM_SOFT_KNEE", .01, 2).name("BLOOM_SOFT_KNEE").step(.01);
		let r = e.addFolder("Sunrays");
		r.add(n, "SUNRAYS").name("enabled").onFinishChange(Se), r.add(n, "SUNRAYS_WEIGHT", .1, 10).name("SUNRAYS_WEIGHT").step(.1), r.add(n, "SUNRAYS_RESOLUTION", {
			32: 32,
			64: 64,
			128: 128,
			196: 196,
			256: 256
		}).name("SUNRAYS_RESOLUTION").onFinishChange(ve);
		let i = e.addFolder("Colors");
		i.add(n, "COLORFUL").name("COLORFUL"), i.add(n, "COLOR_UPDATE_SPEED", 1, 20).name("COLOR_UPDATE_SPEED").step(1), f() && e.close()
	}

	function f() {
		return /Mobi|Android/i.test(navigator.userAgent)
	}
	f() && (n.DYE_RESOLUTION = 512), o.supportLinearFiltering || (n.DYE_RESOLUTION = 512, n.SHADING = !1, n.BLOOM = !1, n.SUNRAYS = !1);
	class v {
		constructor(e, n) {
			this.vertexShader = e, this.fragmentShaderSource = n, this.programs = [], this.activeProgram = null, this.uniforms = []
		}
		setKeywords(e) {
			let n = 0;
			for (let t = 0; t < e.length; t++) n += Qe(e[t]);
			let t = this.programs[n];
			if (null == t) {
				let r = E(i.FRAGMENT_SHADER, this.fragmentShaderSource, e);
				t = s(this.vertexShader, r), this.programs[n] = t
			}
			t !== this.activeProgram && (this.uniforms = T(t), this.activeProgram = t)
		}
		bind() {
			i.useProgram(this.activeProgram)
		}
	}
	class m {
		constructor(e, n) {
			this.uniforms = {}, this.program = s(e, n), this.uniforms = T(this.program)
		}
		bind() {
			i.useProgram(this.program)
		}
	}

	function s(e, n) {
		let t = i.createProgram();
		return i.attachShader(t, e), i.attachShader(t, n), i.linkProgram(t), i.getProgramParameter(t, i.LINK_STATUS) || console.trace(i.getProgramInfoLog(t)), t
	}

	function T(e) {
		let n = [],
			t = i.getProgramParameter(e, i.ACTIVE_UNIFORMS);
		for (let r = 0; r < t; r++) {
			let t = i.getActiveUniform(e, r).name;
			n[t] = i.getUniformLocation(e, t)
		}
		return n
	}

	function E(e, n, t) {
		n = d(n, t);
		const r = i.createShader(e);
		return i.shaderSource(r, n), i.compileShader(r), i.getShaderParameter(r, i.COMPILE_STATUS) || console.trace(i.getShaderInfoLog(r)), r
	}

	function d(e, n) {
		if (null == n) return e;
		let t = "";
		return n.forEach(e => {
			t += "#define " + e + "\n"
		}), t + e
	}
	const h = E(i.VERTEX_SHADER, "\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),
		R = E(i.VERTEX_SHADER, "\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        float offset = 1.33333333;\n        vL = vUv - texelSize * offset;\n        vR = vUv + texelSize * offset;\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),
		S = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;\n        sum += texture2D(uTexture, vL) * 0.35294117;\n        sum += texture2D(uTexture, vR) * 0.35294117;\n        gl_FragColor = sum;\n    }\n"),
		g = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        gl_FragColor = texture2D(uTexture, vUv);\n    }\n"),
		x = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n"),
		D = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n\n    uniform vec4 color;\n\n    void main () {\n        gl_FragColor = color;\n    }\n"),
		_ = "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform sampler2D uBloom;\n    uniform sampler2D uSunrays;\n    uniform sampler2D uDithering;\n    uniform vec2 ditherScale;\n    uniform vec2 texelSize;\n\n    vec3 linearToGamma (vec3 color) {\n        color = max(color, vec3(0));\n        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n    }\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n\n    #ifdef SHADING\n        vec3 lc = texture2D(uTexture, vL).rgb;\n        vec3 rc = texture2D(uTexture, vR).rgb;\n        vec3 tc = texture2D(uTexture, vT).rgb;\n        vec3 bc = texture2D(uTexture, vB).rgb;\n\n        float dx = length(rc) - length(lc);\n        float dy = length(tc) - length(bc);\n\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        c *= diffuse;\n    #endif\n\n    #ifdef BLOOM\n        vec3 bloom = texture2D(uBloom, vUv).rgb;\n    #endif\n\n    #ifdef SUNRAYS\n        float sunrays = texture2D(uSunrays, vUv).r;\n        c *= sunrays;\n    #ifdef BLOOM\n        bloom *= sunrays;\n    #endif\n    #endif\n\n    #ifdef BLOOM\n        float noise = texture2D(uDithering, vUv * ditherScale).r;\n        noise = noise * 2.0 - 1.0;\n        bloom += noise / 255.0;\n        bloom = linearToGamma(bloom);\n        c += bloom;\n    #endif\n\n        float a = max(c.r, max(c.g, c.b));\n        gl_FragColor = vec4(c, a);\n    }\n",
		p = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform vec3 curve;\n    uniform float threshold;\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n        float br = max(c.r, max(c.g, c.b));\n        float rq = clamp(br - curve.x, 0.0, curve.y);\n        rq = curve.z * rq * rq;\n        c *= max(rq, br - threshold) / max(br, 0.0001);\n        gl_FragColor = vec4(c, 0.0);\n    }\n"),
		O = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 sum = vec4(0.0);\n        sum += texture2D(uTexture, vL);\n        sum += texture2D(uTexture, vR);\n        sum += texture2D(uTexture, vT);\n        sum += texture2D(uTexture, vB);\n        sum *= 0.25;\n        gl_FragColor = sum;\n    }\n"),
		A = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform float intensity;\n\n    void main () {\n        vec4 sum = vec4(0.0);\n        sum += texture2D(uTexture, vL);\n        sum += texture2D(uTexture, vR);\n        sum += texture2D(uTexture, vT);\n        sum += texture2D(uTexture, vB);\n        sum *= 0.25;\n        gl_FragColor = sum * intensity;\n    }\n"),
		L = E(i.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 c = texture2D(uTexture, vUv);\n        float br = max(c.r, max(c.g, c.b));\n        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);\n        gl_FragColor = c;\n    }\n"),
		U = E(i.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float weight;\n\n    #define ITERATIONS 16\n\n    void main () {\n        float Density = 0.3;\n        float Decay = 0.95;\n        float Exposure = 0.7;\n\n        vec2 coord = vUv;\n        vec2 dir = vUv - 0.5;\n\n        dir *= 1.0 / float(ITERATIONS) * Density;\n        float illuminationDecay = 1.0;\n\n        float color = texture2D(uTexture, vUv).a;\n\n        for (int i = 0; i < ITERATIONS; i++)\n        {\n            coord -= dir;\n            float col = texture2D(uTexture, coord).a;\n            color += col * illuminationDecay * weight;\n            illuminationDecay *= Decay;\n        }\n\n        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);\n    }\n"),
		N = E(i.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n"),
		I = E(i.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n\n    void main () {\n    #ifdef MANUAL_FILTERING\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        vec4 result = bilerp(uSource, coord, dyeTexelSize);\n    #else\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        vec4 result = texture2D(uSource, coord);\n    #endif\n        float decay = 1.0 + dissipation * dt;\n        gl_FragColor = result / decay;\n    }", o.supportLinearFiltering ? null : ["MANUAL_FILTERING"]),
		F = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n"),
		y = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n"),
		B = E(i.FRAGMENT_SHADER, "\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity += force * dt;\n        velocity = min(max(velocity, -1000.0), 1000.0);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"),
		b = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n"),
		w = E(i.FRAGMENT_SHADER, "\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"),
		P = (i.bindBuffer(i.ARRAY_BUFFER, i.createBuffer()), i.bufferData(i.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), i.STATIC_DRAW), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, i.createBuffer()), i.bufferData(i.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), i.STATIC_DRAW), i.vertexAttribPointer(0, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(0), (e, n = !1) => {
			null == e ? (i.viewport(0, 0, i.drawingBufferWidth, i.drawingBufferHeight), i.bindFramebuffer(i.FRAMEBUFFER, null)) : (i.viewport(0, 0, e.width, e.height), i.bindFramebuffer(i.FRAMEBUFFER, e.fbo)), n && (i.clearColor(0, 0, 0, 1), i.clear(i.COLOR_BUFFER_BIT)), i.drawElements(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0)
		});
	let C, M, Y, X, z, G, H = [],
		V, W, K = Re("./_resources/themes/neromotion/img/fluid_cursor_LDR_LLL1_0.png");
	const k = new m(R, S),
		q = new m(h, g),
		j = new m(h, x),
		J = new m(h, D),
		Q = new m(h, p),
		Z = new m(h, O),
		ee = new m(h, A),
		ne = new m(h, L),
		te = new m(h, U),
		re = new m(h, N),
		ie = new m(h, I),
		oe = new m(h, F),
		ae = new m(h, y),
		ue = new m(h, B),
		le = new m(h, b),
		ce = new m(h, w),
		fe = new v(h, _);

	function ve() {
		let e = $e(n.SIM_RESOLUTION),
			t = $e(n.DYE_RESOLUTION);
		const r = o.halfFloatTexType,
			a = o.formatRGBA,
			u = o.formatRG,
			l = o.formatR,
			c = o.supportLinearFiltering ? i.LINEAR : i.NEAREST;
		i.disable(i.BLEND), C = null == C ? Ee(t.width, t.height, a.internalFormat, a.format, r, c) : he(C, t.width, t.height, a.internalFormat, a.format, r, c), M = null == M ? Ee(e.width, e.height, u.internalFormat, u.format, r, c) : he(M, e.width, e.height, u.internalFormat, u.format, r, c), Y = Te(e.width, e.height, l.internalFormat, l.format, r, i.NEAREST), X = Te(e.width, e.height, l.internalFormat, l.format, r, i.NEAREST), z = Ee(e.width, e.height, l.internalFormat, l.format, r, i.NEAREST), me(), se()
	}

	function me() {
		let e = $e(n.BLOOM_RESOLUTION);
		const t = o.halfFloatTexType,
			r = o.formatRGBA,
			a = o.supportLinearFiltering ? i.LINEAR : i.NEAREST;
		G = Te(e.width, e.height, r.internalFormat, r.format, t, a), H.length = 0;
		for (let i = 0; i < n.BLOOM_ITERATIONS; i++) {
			let n = e.width >> i + 1,
				o = e.height >> i + 1;
			if (n < 2 || o < 2) break;
			let u = Te(n, o, r.internalFormat, r.format, t, a);
			H.push(u)
		}
	}

	function se() {
		let e = $e(n.SUNRAYS_RESOLUTION);
		const t = o.halfFloatTexType,
			r = o.formatR,
			a = o.supportLinearFiltering ? i.LINEAR : i.NEAREST;
		V = Te(e.width, e.height, r.internalFormat, r.format, t, a), W = Te(e.width, e.height, r.internalFormat, r.format, t, a)
	}

	function Te(e, n, t, r, o, a) {
		i.activeTexture(i.TEXTURE0);
		let u = i.createTexture();
		i.bindTexture(i.TEXTURE_2D, u), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, a), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, a), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.texImage2D(i.TEXTURE_2D, 0, t, e, n, 0, r, o, null);
		let l = i.createFramebuffer(),
			c, f;
		return i.bindFramebuffer(i.FRAMEBUFFER, l), i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, u, 0), i.viewport(0, 0, e, n), i.clear(i.COLOR_BUFFER_BIT), {
			texture: u,
			fbo: l,
			width: e,
			height: n,
			texelSizeX: 1 / e,
			texelSizeY: 1 / n,
			attach: e => (i.activeTexture(i.TEXTURE0 + e), i.bindTexture(i.TEXTURE_2D, u), e)
		}
	}

	function Ee(e, n, t, r, i, o) {
		let a = Te(e, n, t, r, i, o),
			u = Te(e, n, t, r, i, o);
		return {
			width: e,
			height: n,
			texelSizeX: a.texelSizeX,
			texelSizeY: a.texelSizeY,
			get read() {
				return a
			},
			set read(e) {
				a = e
			},
			get write() {
				return u
			},
			set write(e) {
				u = e
			},
			swap() {
				let e = a;
				a = u, u = e
			}
		}
	}

	function de(e, n, t, r, o, a, u) {
		let l = Te(n, t, r, o, a, u);
		return q.bind(), i.uniform1i(q.uniforms.uTexture, e.attach(0)), P(l), l
	}

	function he(e, n, t, r, i, o, a) {
		return e.width === n && e.height === t ? e : (e.read = de(e.read, n, t, r, i, o, a), e.write = Te(n, t, r, i, o, a), e.width = n, e.height = t, e.texelSizeX = 1 / n, e.texelSizeY = 1 / t, e)
	}

	function Re(e) {
		let n = i.createTexture();
		i.bindTexture(i.TEXTURE_2D, n), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.REPEAT), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.REPEAT), i.texImage2D(i.TEXTURE_2D, 0, i.RGB, 1, 1, 0, i.RGB, i.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));
		let t = {
				texture: n,
				width: 1,
				height: 1,
				attach: e => (i.activeTexture(i.TEXTURE0 + e), i.bindTexture(i.TEXTURE_2D, n), e)
			},
			r = new Image;
		return r.onload = () => {
			t.width = r.width, t.height = r.height, i.bindTexture(i.TEXTURE_2D, n), i.texImage2D(i.TEXTURE_2D, 0, i.RGB, i.RGB, i.UNSIGNED_BYTE, r)
		}, r.src = e, t
	}

	function Se() {
		let e = [];
		n.SHADING && e.push("SHADING"), n.BLOOM && e.push("BLOOM"), n.SUNRAYS && e.push("SUNRAYS"), fe.setKeywords(e)
	}
	Se(), ve();
	let ge = Date.now(),
		xe = 0;

	function De() {
		const e = _e();
		pe() && ve(), Oe(e), Ae(), n.PAUSED || Le(e), Ue(null), requestAnimationFrame(De)
	}

	function _e() {
		let e = Date.now(),
			n = (e - ge) / 1e3;
		return n = Math.min(n, .016666), ge = e, n
	}

	function pe() {
		let n = Je(e.clientWidth),
			t = Je(e.clientHeight);
		return (e.width !== n || e.height !== t) && (e.width = n, e.height = t, !0)
	}

	function Oe(e) {
		n.COLORFUL && (xe += e * n.COLOR_UPDATE_SPEED, xe >= 1 && (xe = qe(xe, 0, 1), r.forEach(e => {
			e.color = We()
		})))
	}

	function Ae() {
		r.forEach(e => {
			e.moved && (e.moved = !1, be(e))
		})
	}

	function Le(e) {
		i.disable(i.BLEND), ae.bind(), i.uniform2f(ae.uniforms.texelSize, M.texelSizeX, M.texelSizeY), i.uniform1i(ae.uniforms.uVelocity, M.read.attach(0)), P(X), ue.bind(), i.uniform2f(ue.uniforms.texelSize, M.texelSizeX, M.texelSizeY), i.uniform1i(ue.uniforms.uVelocity, M.read.attach(0)), i.uniform1i(ue.uniforms.uCurl, X.attach(1)), i.uniform1f(ue.uniforms.curl, n.CURL), i.uniform1f(ue.uniforms.dt, e), P(M.write), M.swap(), oe.bind(), i.uniform2f(oe.uniforms.texelSize, M.texelSizeX, M.texelSizeY), i.uniform1i(oe.uniforms.uVelocity, M.read.attach(0)), P(Y), j.bind(), i.uniform1i(j.uniforms.uTexture, z.read.attach(0)), i.uniform1f(j.uniforms.value, n.PRESSURE), P(z.write), z.swap(), le.bind(), i.uniform2f(le.uniforms.texelSize, M.texelSizeX, M.texelSizeY), i.uniform1i(le.uniforms.uDivergence, Y.attach(0));
		for (let e = 0; e < n.PRESSURE_ITERATIONS; e++) i.uniform1i(le.uniforms.uPressure, z.read.attach(1)), P(z.write), z.swap();
		ce.bind(), i.uniform2f(ce.uniforms.texelSize, M.texelSizeX, M.texelSizeY), i.uniform1i(ce.uniforms.uPressure, z.read.attach(0)), i.uniform1i(ce.uniforms.uVelocity, M.read.attach(1)), P(M.write), M.swap(), ie.bind(), i.uniform2f(ie.uniforms.texelSize, M.texelSizeX, M.texelSizeY), o.supportLinearFiltering || i.uniform2f(ie.uniforms.dyeTexelSize, M.texelSizeX, M.texelSizeY);
		let t = M.read.attach(0);
		i.uniform1i(ie.uniforms.uVelocity, t), i.uniform1i(ie.uniforms.uSource, t), i.uniform1f(ie.uniforms.dt, e), i.uniform1f(ie.uniforms.dissipation, n.VELOCITY_DISSIPATION), P(M.write), M.swap(), o.supportLinearFiltering || i.uniform2f(ie.uniforms.dyeTexelSize, C.texelSizeX, C.texelSizeY), i.uniform1i(ie.uniforms.uVelocity, M.read.attach(0)), i.uniform1i(ie.uniforms.uSource, C.read.attach(1)), i.uniform1f(ie.uniforms.dissipation, n.DENSITY_DISSIPATION), P(C.write), C.swap()
	}

	function Ue(e) {
		n.BLOOM && Fe(C.read, G), n.SUNRAYS && (ye(C.read, C.write, V), Be(V, W, 1)), null != e && n.TRANSPARENT ? i.disable(i.BLEND) : (i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA), i.enable(i.BLEND)), n.TRANSPARENT || Ne(e, ke(n.BACK_COLOR)), Ie(e)
	}

	function Ne(e, n) {
		J.bind(), i.uniform4f(J.uniforms.color, n.r, n.g, n.b, 1), P(e)
	}

	function Ie(e) {
		let t = null == e ? i.drawingBufferWidth : e.width,
			r = null == e ? i.drawingBufferHeight : e.height;
		if (fe.bind(), n.SHADING && i.uniform2f(fe.uniforms.texelSize, 1 / t, 1 / r), i.uniform1i(fe.uniforms.uTexture, C.read.attach(0)), n.BLOOM) {
			i.uniform1i(fe.uniforms.uBloom, G.attach(1)), i.uniform1i(fe.uniforms.uDithering, K.attach(2));
			let e = je(K, t, r);
			i.uniform2f(fe.uniforms.ditherScale, e.x, e.y)
		}
		n.SUNRAYS && i.uniform1i(fe.uniforms.uSunrays, V.attach(3)), P(e)
	}

	function Fe(e, t) {
		if (H.length < 2) return;
		let r = t;
		i.disable(i.BLEND), Q.bind();
		let o = n.BLOOM_THRESHOLD * n.BLOOM_SOFT_KNEE + 1e-4,
			a = n.BLOOM_THRESHOLD - o,
			u = 2 * o,
			l = .25 / o;
		i.uniform3f(Q.uniforms.curve, a, u, l), i.uniform1f(Q.uniforms.threshold, n.BLOOM_THRESHOLD), i.uniform1i(Q.uniforms.uTexture, e.attach(0)), P(r), Z.bind();
		for (let e = 0; e < H.length; e++) {
			let n = H[e];
			i.uniform2f(Z.uniforms.texelSize, r.texelSizeX, r.texelSizeY), i.uniform1i(Z.uniforms.uTexture, r.attach(0)), P(n), r = n
		}
		i.blendFunc(i.ONE, i.ONE), i.enable(i.BLEND);
		for (let e = H.length - 2; e >= 0; e--) {
			let n = H[e];
			i.uniform2f(Z.uniforms.texelSize, r.texelSizeX, r.texelSizeY), i.uniform1i(Z.uniforms.uTexture, r.attach(0)), i.viewport(0, 0, n.width, n.height), P(n), r = n
		}
		i.disable(i.BLEND), ee.bind(), i.uniform2f(ee.uniforms.texelSize, r.texelSizeX, r.texelSizeY), i.uniform1i(ee.uniforms.uTexture, r.attach(0)), i.uniform1f(ee.uniforms.intensity, n.BLOOM_INTENSITY), P(t)
	}

	function ye(e, t, r) {
		i.disable(i.BLEND), ne.bind(), i.uniform1i(ne.uniforms.uTexture, e.attach(0)), P(t), te.bind(), i.uniform1f(te.uniforms.weight, n.SUNRAYS_WEIGHT), i.uniform1i(te.uniforms.uTexture, t.attach(0)), P(r)
	}

	function Be(e, n, t) {
		k.bind();
		for (let r = 0; r < t; r++) i.uniform2f(k.uniforms.texelSize, e.texelSizeX, 0), i.uniform1i(k.uniforms.uTexture, e.attach(0)), P(n), i.uniform2f(k.uniforms.texelSize, 0, e.texelSizeY), i.uniform1i(k.uniforms.uTexture, n.attach(0)), P(e)
	}

	function be(e) {
		let t = e.deltaX * n.SPLAT_FORCE,
			r = e.deltaY * n.SPLAT_FORCE;
		we(e.texcoordX, e.texcoordY, t, r, e.color)
	}

	function we(t, r, o, a, u) {
		re.bind(), i.uniform1i(re.uniforms.uTarget, M.read.attach(0)), i.uniform1f(re.uniforms.aspectRatio, e.width / e.height), i.uniform2f(re.uniforms.point, t, r), i.uniform3f(re.uniforms.color, o, a, 0), i.uniform1f(re.uniforms.radius, Pe(n.SPLAT_RADIUS / 100)), P(M.write), M.swap(), i.uniform1i(re.uniforms.uTarget, C.read.attach(0)), i.uniform3f(re.uniforms.color, u.r, u.g, u.b), P(C.write), C.swap()
	}

	function Pe(n) {
		let t = e.width / e.height;
		return t > 1 && (n *= t), n
	}
	De();
	let Ce = Je(0),
		Me = Je(0),
		Ye = r.find(e => -1 === e.id);

	function Xe(n, t, r, i) {
		n.id = t, n.down = !0, n.moved = !1, n.texcoordX = r / e.width, n.texcoordY = 1 - i / e.height, n.prevTexcoordX = n.texcoordX, n.prevTexcoordY = n.texcoordY, n.deltaX = 0, n.deltaY = 0, n.color = We()
	}

	function ze(n, t, r) {
		n.prevTexcoordX = n.texcoordX, n.prevTexcoordY = n.texcoordY, n.texcoordX = t / e.width, n.texcoordY = 1 - r / e.height, n.deltaX = He(n.texcoordX - n.prevTexcoordX), n.deltaY = Ve(n.texcoordY - n.prevTexcoordY), n.moved = Math.abs(n.deltaX) > 0 || Math.abs(n.deltaY) > 0
	}

	function Ge(e) {
		e.down = !1
	}

	function He(n) {
		let t = e.width / e.height;
		return t < 1 && (n *= t), n
	}

	function Ve(n) {
		let t = e.width / e.height;
		return t > 1 && (n /= t), n
	}

	function We() {
		let e = Ke(Math.random(), 1, 1);
		return e.r *= .15, e.g *= .15, e.b *= .15, e
	}

	function Ke(e, n, t) {
		let r, i, o, a, u, l, c, f;
		switch (a = Math.floor(6 * e), u = 6 * e - a, l = t * (1 - n), c = t * (1 - u * n), f = t * (1 - (1 - u) * n), a % 6) {
			case 0:
				r = t, i = f, o = l;
				break;
			case 1:
				r = c, i = t, o = l;
				break;
			case 2:
				r = l, i = t, o = f;
				break;
			case 3:
				r = l, i = c, o = t;
				break;
			case 4:
				r = f, i = l, o = t;
				break;
			case 5:
				r = t, i = l, o = c
		}
		return {
			r: r,
			g: i,
			b: o
		}
	}

	function ke(e) {
		return {
			r: e.r / 255,
			g: e.g / 255,
			b: e.b / 255
		}
	}

	function qe(e, n, t) {
		let r = t - n;
		return 0 === r ? n : (e - n) % r + n
	}

	function $e(e) {
		let n = i.drawingBufferWidth / i.drawingBufferHeight;
		n < 1 && (n = 1 / n);
		let t = Math.round(e),
			r = Math.round(e * n);
		return i.drawingBufferWidth > i.drawingBufferHeight ? {
			width: r,
			height: t
		} : {
			width: t,
			height: r
		}
	}

	function je(e, n, t) {
		return {
			x: n / e.width,
			y: t / e.height
		}
	}

	function Je(e) {
		let n = window.devicePixelRatio || 1;
		return Math.floor(e * n)
	}

	function Qe(e) {
		if (0 === e.length) return 0;
		let n = 0;
		for (let t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
		return n
	}
	null == Ye && (Ye = new t), Xe(Ye, -1, Ce, Me), window.addEventListener("mousemove", e => {
		if (!$("canvas").hasClass("disabled")) {
			let n = r[0],
				t, i;
			if (!n.down) return;
			ze(n, Je(e.x), Je(e.y))
		}
	}), window.addEventListener("touchstart", e => {
		if (!$("canvas").hasClass("disabled")) {
			const n = e.targetTouches;
			for (; n.length >= r.length;) r.push(new t);
			for (let e = 0; e < n.length; e++) {
				let t = Je(n[e].clientX),
					i = Je(n[e].clientY);
				Xe(r[e + 1], n[e].identifier, t, i)
			}
		}
	}), window.addEventListener("touchmove", e => {
		if (!$("canvas").hasClass("disabled")) {
			const n = e.targetTouches;
			for (let e = 0; e < n.length; e++) {
				let t = r[e + 1],
					i, o;
				t.down && ze(t, Je(n[e].clientX), Je(n[e].clientY))
			}
		}
	}, !1), window.addEventListener("touchend", e => {
		if (!$("canvas").hasClass("disabled")) {
			const n = e.changedTouches;
			for (let e = 0; e < n.length; e++) {
				let t = r.find(t => t.id === n[e].identifier);
				null != t && Ge(t)
			}
		}
	})
}