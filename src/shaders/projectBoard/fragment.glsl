uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uTextureAlpha;
uniform vec2 uImageScale;

varying vec2 vUv;

void main()
{
    vec2 textureUv = (vUv - 0.5) / uImageScale + 0.5;
    bool outsideImage = textureUv.x < 0.0 || textureUv.x > 1.0 || textureUv.y < 0.0 || textureUv.y > 1.0;
    vec4 textureColor = outsideImage ? vec4(uColor, 1.0) : texture2D(uTexture, textureUv);

    gl_FragColor = mix(vec4(uColor, 1.0), textureColor, uTextureAlpha);
	#include <colorspace_fragment>
}
