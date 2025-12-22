import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function NeuralConnections() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 40 }, () => new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      )),
    []
  );

  return (
    <>
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) =>
          a.distanceTo(b) < 4 ? (
            <Line
              key={`${i}-${j}`}
              points={[a, b]}
              color="white"
              opacity={0.07}
              transparent
            />
          ) : null
        )
      )}
    </>
  );
}
