import * as THREE from 'three'

import shaderFragment from '../../shaders/projectBoard/fragment.glsl'
import shaderVertex from '../../shaders/projectBoard/vertex.glsl'

export default function()
{
    const uniforms = {
        uTexture: { value: null },
        uTextureAlpha: { value: null },
        uColor: { value: null },
        uImageScale: { value: new THREE.Vector2(1, 1) }
    }

    const material = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: false,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
