import * as THREE from 'three'
import shaderFragment from '../../shaders/areaFloorBorder/fragment.glsl'
import shaderVertex from '../../shaders/areaFloorBorder/vertex.glsl'

export default function()
{
    const uniforms = {
        uColor: { value: null },
        uAlpha: { value: null },
        uLoadProgress: { value: null },
        uProgress: { value: null }
    }

    const material = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        // Pushes the border slightly toward the camera during depth
        // comparison (without moving the geometry itself) so it stops
        // z-fighting with the ground plane it sits flush against.
        // Negative values pull toward the camera; magnitude tuned to
        // be enough to resolve flicker without visibly floating the
        // border above the terrain.
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
