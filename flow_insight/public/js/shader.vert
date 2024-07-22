attribute vec3 aPosition;
varying vec2 vPos;

void main() {
  vPos = (aPosition.xy + 1.0) / 2.0;
  gl_Position = vec4(aPosition, 1.0);
}
