import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * The centre-stage WebGL showpiece: a lit studio render of the Spider-Man suit
 * standing on a minimal pedestal. It turns slowly on its pedestal like a display
 * piece; pressing and holding on the figure pauses the spin so it can be
 * inspected, and releasing resumes it. A restrained pointer parallax sits on top.
 *
 * Framing is computed from the model's own bounds rather than hard-coded, so the
 * figure never clips or collides with the surrounding cards at any aspect ratio.
 */

const FRAMINGS = {
  full: { h: 1, cy: 0.5, w: 1 },
  bust: { h: 0.36, cy: 0.82, w: 0.52 },
  head: { h: 0.18, cy: 0.915, w: 0.27 },
}

const STAND_TOP = 0.07
const NARROW = 820
const SPIN_SPEED = 0.18 // rad/s — a slow, showpiece turntable (~35s per turn)

export function HeroStage({
  modelUrl = '/models/hero.glb',
  framing = 'full',
  modelFill = 0.82,
  showStand = true,
  parallax = true,
  exposure = 1,
  dark = false,
}) {
  const mountRef = useRef(null)
  const apiRef = useRef(null)
  const [status, setStatus] = useState('boot')
  const [msg, setMsg] = useState('')
  const [readout, setReadout] = useState('')

  // Keep the latest tweakables readable from inside the render loop without
  // tearing down the whole scene when they change.
  const propsRef = useRef({ framing, modelFill, showStand, parallax, exposure, dark })
  propsRef.current = { framing, modelFill, showStand, parallax, exposure, dark }

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let disposed = false
    let raf = 0
    let frame = 0

    // Turntable state: `spin` accumulates while not held; grabbing the figure
    // (a raycast hit on the model) pauses it until the pointer is released.
    let spin = 0
    let holding = false
    let lastT = null
    let modelRoot = null
    let appliedDark = null
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = exposure
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)

    // Neutral studio IBL — what makes the surfaces read as product photography.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture

    // --- lighting rig: warm key, cool fill, white rim ---
    const key = new THREE.DirectionalLight(0xfff5ea, 2.5)
    key.position.set(1.5, 2.4, 1.9)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.radius = 5
    key.shadow.bias = -0.0008
    key.shadow.normalBias = 0.02
    key.shadow.camera.near = 0.3
    key.shadow.camera.far = 12
    key.shadow.camera.left = -1.6
    key.shadow.camera.right = 1.6
    key.shadow.camera.top = 1.6
    key.shadow.camera.bottom = -1.6
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xe2ecff, 0.6)
    fill.position.set(-2.1, 0.9, 1.4)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xffffff, 0.85)
    rim.position.set(-0.7, 1.3, -2.2)
    scene.add(rim)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x93a0b5, 0.3)
    scene.add(hemi)

    // Default (light-mode) rig intensities, restored when leaving dark mode.
    const RIG = { key: key.intensity, fill: fill.intensity, rim: rim.intensity, hemi: hemi.intensity }

    // --- grounding: real cast shadow + painted contact pool ---
    const catcherGeo = new THREE.PlaneGeometry(8, 8)
    const catcherMat = new THREE.ShadowMaterial({ color: 0x131a2e, opacity: 0.2 })
    const catcher = new THREE.Mesh(catcherGeo, catcherMat)
    catcher.rotation.x = -Math.PI / 2
    catcher.receiveShadow = true
    scene.add(catcher)

    const blobCanvas = document.createElement('canvas')
    blobCanvas.width = blobCanvas.height = 256
    const ctx = blobCanvas.getContext('2d')
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    grad.addColorStop(0, 'rgba(19,26,46,0.55)')
    grad.addColorStop(0.45, 'rgba(19,26,46,0.22)')
    grad.addColorStop(1, 'rgba(19,26,46,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 256)
    const blobTex = new THREE.CanvasTexture(blobCanvas)
    blobTex.colorSpace = THREE.SRGBColorSpace
    const blobGeo = new THREE.PlaneGeometry(1, 1)
    const blobMat = new THREE.MeshBasicMaterial({
      map: blobTex,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    })
    const blob = new THREE.Mesh(blobGeo, blobMat)
    blob.rotation.x = -Math.PI / 2
    blob.position.y = 0.0015
    scene.add(blob)

    // --- pedestal: deliberately quiet infrastructure ---
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x161c2b,
      roughness: 0.62,
      metalness: 0.18,
      envMapIntensity: 0.5,
    })
    const stand = new THREE.Group()
    const plateGeo = new THREE.CylinderGeometry(0.2, 0.225, 0.022, 72)
    const plate = new THREE.Mesh(plateGeo, standMat)
    plate.position.y = 0.011
    const neckGeo = new THREE.CylinderGeometry(0.085, 0.105, 0.05, 48)
    const neck = new THREE.Mesh(neckGeo, standMat)
    neck.position.y = 0.047
    for (const part of [plate, neck]) {
      part.castShadow = true
      part.receiveShadow = true
      stand.add(part)
    }
    stand.visible = showStand
    scene.add(stand)

    // The model hangs off a tilt group so parallax never touches the pedestal.
    const tilt = new THREE.Group()
    tilt.position.y = STAND_TOP
    scene.add(tilt)

    // --- dark-mode key light: a warm overhead source (an unseen hanging bulb)
    // that pools light on the figure from above and casts its shadow down. No
    // visible fixture — the effect reads purely through the lighting. ---
    const LAMP_Y = 1.55
    const bulbLight = new THREE.SpotLight(0xffd9a0, 0, 8, 1.05, 0.5, 1.7)
    bulbLight.position.set(0, LAMP_Y, 0.15)
    bulbLight.target.position.set(0, 0.5, 0)
    bulbLight.castShadow = true
    bulbLight.shadow.mapSize.set(1024, 1024)
    bulbLight.shadow.bias = -0.0009
    bulbLight.shadow.normalBias = 0.02
    bulbLight.shadow.camera.near = 0.4
    bulbLight.shadow.camera.far = 6
    scene.add(bulbLight)
    scene.add(bulbLight.target)

    let modelBox = null

    // --- light/dark composition swap (lights + shadows only) ---
    function applyMode(isDark) {
      bulbLight.intensity = isDark ? 11 : 0
      bulbLight.castShadow = isDark
      key.castShadow = !isDark
      key.intensity = isDark ? 0.3 : RIG.key
      fill.intensity = isDark ? 0.12 : RIG.fill
      rim.intensity = isDark ? 0.25 : RIG.rim
      hemi.intensity = isDark ? 0.06 : RIG.hemi
      if ('environmentIntensity' in scene) scene.environmentIntensity = isDark ? 0.22 : 1
      catcherMat.opacity = isDark ? 0.4 : 0.2
      blobMat.opacity = isDark ? 0.16 : 0.42
      frameCamera()
    }

    // --- framing math ---
    function frameCamera() {
      const rect = mount.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      const aspect = w / h
      if (!modelBox) return

      const size = new THREE.Vector3()
      modelBox.getSize(size)
      const preset = FRAMINGS[propsRef.current.framing] || FRAMINGS.full

      const modelH = size.y
      const targetH = modelH * preset.h
      const targetW = Math.max(size.x, size.z) * preset.w
      const centerY = STAND_TOP + modelH * preset.cy

      let fillFrac = propsRef.current.modelFill
      if (window.innerWidth < NARROW) fillFrac *= 0.92

      const vFov = (camera.fov * Math.PI) / 180
      // Distance so the target height occupies `fillFrac` of the viewport height.
      const distV = targetH / fillFrac / (2 * Math.tan(vFov / 2))
      // Horizontal guard: never let the figure exceed 82% of stage width.
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
      const distH = targetW / 0.82 / (2 * Math.tan(hFov / 2))

      const dist = Math.max(distV, distH) * 1.02
      const extent = Math.max(size.x, size.y, size.z)

      camera.aspect = aspect
      camera.position.set(0, centerY + extent * 0.045, dist)
      camera.lookAt(0, centerY, 0)
      camera.updateProjectionMatrix()
    }

    function resize() {
      const rect = mount.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      renderer.setSize(w, h, false)
      frameCamera()
    }

    // --- material handling: legacy -> standard so the studio IBL reads right ---
    function studioMaterial(src) {
      let mat = src
      const legacy =
        src.isMeshPhongMaterial || src.isMeshLambertMaterial || src.isMeshBasicMaterial
      if (legacy) {
        mat = new THREE.MeshStandardMaterial({
          color: src.color ? src.color.clone() : new THREE.Color(0xffffff),
          map: src.map || null,
          normalMap: src.normalMap || null,
          roughness: 0.55,
          metalness: 0.06,
        })
      }
      mat.envMapIntensity = 0.7
      mat.side = THREE.DoubleSide
      mat.shadowSide = THREE.FrontSide

      // Correct bogus transparency coming out of the source asset.
      if (mat.transparent && mat.opacity < 0.05) {
        mat.transparent = false
        mat.opacity = 1
      }
      if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace
      if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace
      mat.needsUpdate = true
      return mat
    }

    /**
     * Horizontal centre of the figure's contact patch — the vertices sitting in
     * the bottom slice of its bounding box.
     *
     * Centring on the whole-body box instead would leave the feet off the
     * pedestal: in an A-pose the outstretched arms push the overall centre
     * forward, so the figure ends up standing behind the stand and the stand
     * occludes the feet.
     */
    function footprintCenter(object3d, box) {
      const size = new THREE.Vector3()
      box.getSize(size)
      const cutoff = box.min.y + size.y * 0.06
      const v = new THREE.Vector3()
      let minX = Infinity
      let maxX = -Infinity
      let minZ = Infinity
      let maxZ = -Infinity
      let found = 0

      object3d.traverse((child) => {
        const pos = child.isMesh && child.geometry?.attributes?.position
        if (!pos) return
        // Skip meshes that never come near the ground.
        child.geometry.computeBoundingBox()
        const cb = child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld)
        if (cb.min.y > cutoff) return

        for (let i = 0; i < pos.count; i += 1) {
          v.fromBufferAttribute(pos, i)
          child.localToWorld(v)
          if (v.y > cutoff) continue
          found += 1
          if (v.x < minX) minX = v.x
          if (v.x > maxX) maxX = v.x
          if (v.z < minZ) minZ = v.z
          if (v.z > maxZ) maxZ = v.z
        }
      })

      if (!found) return null
      return { x: (minX + maxX) / 2, z: (minZ + maxZ) / 2 }
    }

    function install(root, label) {
      let meshes = 0
      let tris = 0

      root.traverse((child) => {
        if (!child.isMesh) return
        meshes += 1
        child.castShadow = true
        child.receiveShadow = true
        child.frustumCulled = false
        const g = child.geometry
        if (g) {
          tris += g.index ? g.index.count / 3 : (g.attributes.position?.count || 0) / 3
        }
        child.material = Array.isArray(child.material)
          ? child.material.map(studioMaterial)
          : studioMaterial(child.material)
      })

      // Normalize: height = 1 unit, centred on X/Z, feet at y = 0.
      const box = new THREE.Box3().setFromObject(root)
      const size = new THREE.Vector3()
      box.getSize(size)
      const scale = size.y > 0 ? 1 / size.y : 1
      root.scale.setScalar(scale)

      root.updateMatrixWorld(true)
      const box2 = new THREE.Box3().setFromObject(root)
      const center = new THREE.Vector3()
      box2.getCenter(center)
      const foot = footprintCenter(root, box2)
      root.position.x -= foot ? foot.x : center.x
      root.position.z -= foot ? foot.z : center.z
      root.position.y -= box2.min.y

      tilt.add(root)
      tilt.updateMatrixWorld(true)
      modelRoot = root
      modelBox = new THREE.Box3().setFromObject(root)

      // Contact pool scaled to the figure's footprint.
      const bSize = new THREE.Vector3()
      modelBox.getSize(bSize)
      const spread = Math.max(bSize.x, bSize.z) * 2.6
      blob.scale.set(spread, spread, 1)

      frameCamera()
      setReadout(`${label} · ${meshes} meshes · ${Math.round(tris / 1000)}k tris`)
      setStatus('ready')
    }

    // --- load the shipped GLB ---
    setStatus('loading')
    setMsg('')
    const draco = new DRACOLoader()
    draco.setDecoderPath('/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(draco)

    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) return
        install(gltf.scene, modelUrl.split('/').pop())
      },
      undefined,
      (err) => {
        if (disposed) return
        setStatus('error')
        setMsg(
          'The hero model could not be loaded. Check that models/hero.glb is present and served correctly.',
        )
        // eslint-disable-next-line no-console
        console.error('[HeroStage] model load failed', err)
      },
    )

    // --- pointer parallax (model only, eased, no auto-rotation) ---
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }

    function onPointerMove(e) {
      const rect = mount.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    function onPointerLeave() {
      target.x = 0
      target.y = 0
    }

    // Press-and-hold to pause the spin — but only when the press actually lands
    // on the figure (raycast), so clicks on empty stage / pedestal do nothing.
    function onPointerDown(e) {
      if (!modelRoot) return
      const rect = mount.getBoundingClientRect()
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      ndc.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.intersectObject(modelRoot, true).length > 0) {
        holding = true
        mount.classList.add('mcu-grabbing')
      }
    }
    function onPointerRelease() {
      holding = false
      mount.classList.remove('mcu-grabbing')
    }

    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerleave', onPointerLeave)
    mount.addEventListener('pointerdown', onPointerDown)
    // Release on window so letting go outside the stage still resumes the spin.
    window.addEventListener('pointerup', onPointerRelease)
    window.addEventListener('pointercancel', onPointerRelease)

    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    window.addEventListener('resize', resize)
    resize()

    function tick(t) {
      raf = requestAnimationFrame(tick)
      frame += 1

      const now = t ?? performance.now()
      const dt = lastT == null ? 0 : Math.min((now - lastT) / 1000, 0.05)
      lastT = now

      // React to a light/dark switch (also runs once on first frame).
      if (propsRef.current.dark !== appliedDark) {
        appliedDark = propsRef.current.dark
        applyMode(appliedDark)
      }

      // Slow turntable, paused while the figure is being held.
      if (!holding) spin += SPIN_SPEED * dt

      if (propsRef.current.parallax) {
        cur.x += (target.x - cur.x) * 0.055
        cur.y += (target.y - cur.y) * 0.055
      } else {
        cur.x += (0 - cur.x) * 0.055
        cur.y += (0 - cur.y) * 0.055
      }
      tilt.rotation.y = spin + cur.x * 0.07
      tilt.rotation.x = cur.y * 0.035

      stand.visible = propsRef.current.showStand
      renderer.toneMappingExposure = propsRef.current.exposure

      // Catches fullscreen / zoom / devtools changes that fire no resize event.
      if (frame % 20 === 0) {
        const rect = mount.getBoundingClientRect()
        if (
          Math.abs(rect.width - renderer.domElement.clientWidth) > 1 ||
          Math.abs(rect.height - renderer.domElement.clientHeight) > 1
        ) {
          resize()
        }
      }

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', resize)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerleave', onPointerLeave)
      mount.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerRelease)
      window.removeEventListener('pointercancel', onPointerRelease)

      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          for (const m of mats) {
            if (!m) continue
            for (const key of Object.keys(m)) {
              const v = m[key]
              if (v && v.isTexture) v.dispose()
            }
            m.dispose()
          }
        }
      })
      blobTex.dispose()
      envRT.texture.dispose()
      pmrem.dispose()
      draco.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
    // The scene is built once; tweakables are read live via propsRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelUrl])

  const statusLabel =
    status === 'boot' ? 'Starting renderer'
    : status === 'loading' ? 'Loading model'
    : status === 'error' ? 'Model unavailable'
    : ''

  return (
    <div className="mcu-stage mcu-area-stage">
      <div className="mcu-stage-mount" ref={mountRef} />

      {status !== 'ready' && (
        <div className="mcu-status">
          <div className="mcu-status-tile">3D</div>
          <p className="mcu-status-label">{statusLabel}</p>
          {msg && <p className="mcu-status-msg">{msg}</p>}
        </div>
      )}

      {status === 'ready' && readout && (
        <div className="mcu-readout">{readout}</div>
      )}
    </div>
  )
}

export default HeroStage
