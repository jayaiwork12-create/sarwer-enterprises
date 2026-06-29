import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  varying vec2 vUv;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float noise(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0;
    return mix(mix(hash(n), hash(n + 1.0), f.x),
               mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
  }

  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 5; i++) {
      f += w * noise(p);
      p *= 2.0;
      w *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv * vec2(aspect, 1.0);
    float t = uTime * 0.15;

    // Animated background gradient
    vec3 bgCol = mix(
      vec3(0.02, 0.05, 0.07),
      vec3(0.05, 0.12, 0.14),
      uv.y + fbm(p * 2.0 + t) * 0.3
    );

    // Glass refraction zones
    float glass1 = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.6, uv.x);
    float glass2 = smoothstep(0.2, 0.5, uv.x) * smoothstep(0.8, 0.5, uv.x);

    // Chromatic aberration
    float angle = noise(uv * 8.0 + t) * 6.2831853;
    float angle2 = noise(uv * 12.0 - t * 0.7) * 6.2831853;
    vec2 offset = vec2(cos(angle), sin(angle)) * 0.02 * glass1;
    vec2 offset2 = vec2(cos(angle2), sin(angle2)) * 0.015 * glass2;

    // Color channels shifted
    float r = fbm(p * 3.0 + offset * 1.2 + offset2 * 0.5 + vec2(0.02, 0.0) + t);
    float g = fbm(p * 3.0 + offset * 1.0 + offset2 * 0.3 + vec2(0.0, 0.015) + t);
    float b = fbm(p * 3.0 + offset * 0.8 + offset2 * 0.7 + vec2(-0.015, 0.01) + t);

    vec3 chromatic = vec3(r, g, b);

    // Fresnel reflection
    vec2 reflectUV = uv + offset * 1.5;
    float envAngle = atan(reflectUV.y - 0.5, (reflectUV.x - 0.5) * aspect);
    vec3 envColor = 0.5 + 0.5 * vec3(
      cos(envAngle + 4.4),
      cos(envAngle + 4.4 + 2.094),
      cos(envAngle + 4.4 + 4.189)
    );

    float fresnel = 0.8 + 0.2 * sin(uv.x * 12.566) * sin(uv.y * 12.566);
    float specular = pow(max(0.0, sin(uv.x * 31.416) * sin(uv.y * 31.416)), 16.0);

    // Combine
    vec3 refractionColor = mix(chromatic, bgCol, 0.4) + envColor * 0.3 * fresnel * glass1 + specular * 0.1;

    // God ray sweep
    float godrayProgress = fract(uTime * 0.03);
    float godray = max(0.0, 1.0 - abs(uv.y - godrayProgress)) * max(0.0, uv.x - 0.3) * 0.15;

    // Mouse light interaction
    float mouseLight = 0.0;
    if (uMouseActive > 0.5) {
      vec2 mouseUV = uMouse;
      float dist = length(uv - mouseUV);
      mouseLight = exp(-dist * dist * 20.0) * 0.4;
    }

    // Dust particles
    float dust = 0.0;
    for (float i = 0.0; i < 25.0; i++) {
      float fi = i / 25.0;
      float speed = 0.15 + fi * 0.25;
      float dx = sin(uTime * speed + fi * 100.0) * 0.06 + fi * 0.4;
      float dy = cos(uTime * speed * 0.7 + fi * 200.0) * 0.04 + fi * 0.15;
      float dSize = 0.002 + fi * 0.003;
      dust += smoothstep(dSize, 0.0, length(vec2(uv.x - dx, uv.y - dy)));
    }
    dust *= 0.4;

    // Final composition
    vec3 color = mix(bgCol, refractionColor, glass1 * 0.7 + glass2 * 0.3);
    color += godray * vec3(0.3, 0.5, 0.5);
    color += dust * vec3(0.6, 0.7, 0.6);
    color += mouseLight * vec3(0.04, 0.3, 0.25);

    // Vignette
    float vig = 1.0 - smoothstep(0.4, 1.3, length(vUv - 0.5) * 2.0);
    color *= (0.65 + 0.35 * vig);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function RefractionPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0 },
    }),
    [size.width, size.height]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.target as HTMLElement)?.closest('canvas')?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = 1;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      mat.uniforms.uMouseActive.value = mouseRef.current.active;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function RefractionCanvas() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
      >
        <RefractionPlane />
      </Canvas>
    </div>
  );
}
