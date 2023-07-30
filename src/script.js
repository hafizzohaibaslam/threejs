import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/fontloader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture1 = textureLoader.load('/textures/matcaps/8.png')


const fontLoader = new FontLoader()


fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>{
        const textGeometry  = new TextGeometry(
            'Zohaib Aslam',
            {
                font: font,
                size:0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            }
        )

// we are going this to center the text   
// we minus 0.02 bcz it was not perfectly centered becasue of the segments and the bevels 

// textGeometry.computeBoundingBox()

//         textGeometry.translate(
//            - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
//           -  (textGeometry.boundingBox.max.y - 0.02) * 0.5,
//            - (textGeometry.boundingBox.max.z - 0.03) * 0.5

//         )

textGeometry.center()

        // console.log(textGeometry.boundingBox)

        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap:matcapTexture1
        })
       let text = new THREE.Mesh(textGeometry,textMaterial)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
            const donutMaterial = new THREE.MeshMatcapMaterial()
            donutMaterial.matcap = matcapTexture
            // donutMaterial.color = new THREE.Color('red')
            donutMaterial.metalness = 2
            donutMaterial.roughness = 1
donutMaterial.displacementScale = 0.05


        for(let i=0; i<3000;i ++)
        {
            
          let  donut = new THREE.Mesh(donutGeometry,donutMaterial)

            donut.position.x = (Math.random()- 0.5 ) * 50
            donut.position.y = (Math.random()- 0.5 ) * 50
            donut.position.z = (Math.random()- 0.5 ) * 50

            donut.rotation.x = Math.random() *  Math.PI
            donut.rotation.y = Math.random() *  Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale,scale)

            scene.add(donut)
        }

    }
)





/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update object 

    // donut.rotation.y = 0.30 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()