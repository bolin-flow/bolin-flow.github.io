precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_points[30];
uniform vec3 u_colors[3];

varying vec2 vPos;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float d = 0.0;
  vec3 color = vec3(1.0);

  for(int i = 0; i < 30; i++) {
    d += 0.1 / distance(st, u_points[i] / u_resolution);
  }

  color = mix(u_colors[0], u_colors[1], smoothstep(0.1, 0.2, d));
  color = mix(color, u_colors[2], smoothstep(0.2, 0.3, d));

  gl_FragColor = vec4(color, 1.0);
}
