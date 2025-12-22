import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function AgentPath() {
  const ref = useRef();
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, 0, 0),
    new THREE.Vector3(0, 3, -3),
    new THREE.Vector3(4, -2, 2),
    new THREE.Vector3(0, -3, 4),
  ]);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.15) % 1;
    ref.current.position.copy(curve.getPointAt(t));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={2}
      />
    </mesh>
  );
}
