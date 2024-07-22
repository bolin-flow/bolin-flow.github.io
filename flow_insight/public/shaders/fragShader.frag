#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform int trailCount;
uniform vec2 trail[70];  // Adjust array size as needed.
uniform int particleCount;
uniform vec3 particles[70];  // Adjust array size as needed.
uniform vec3 colors[70];  // Adjust array size as needed.

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.y = 1.0 - st.y;
    vec3 color = vec3(0.0);

    for (int i = 0; i < trailCount; i++) {
        vec2 t = trail[i];
        float d = distance(st, t);
        color += smoothstep(0.02, 0.01, d) * vec3(1.0, 1.0, 1.0);
    }

    for (int i = 0; i < particleCount; i++) {
        vec2 p = particles[i].xy;
        float m = particles[i].z;
        float d = distance(st, p);
        color += smoothstep(0.02, 0.01, d) * colors[i] * m;
    }

    gl_FragColor = vec4(color, 1.0);
}
