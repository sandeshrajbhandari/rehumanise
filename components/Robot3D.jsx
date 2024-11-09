"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MeshComponent() {
  const fileUrl = "/robot3d/scene.glb";
  const mesh = useRef();
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} position={[0, -1, 0]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

function CameraInfo() {
  const { camera } = useThree();

  useFrame(() => {
    console.log("Camera Position:", camera.position);
    console.log("Camera FOV:", camera.fov);
  });

  return null;
}

export function Robot3D() {
  return (
    <div className="flex justify-center items-center h-[50vh] border-4v">
      <Canvas
        className="h-full bg-red-200"
        camera={{ position: [-13.33, -0.458, 27.52], fov: 5 }}
      >
        {/* {x: -13.339820686968226, y: -0.4588215645585036, z: 27.52442371138749 */}
        {/* <OrbitControls enableZoom={true} /> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
        {/* <CameraInfo /> This component logs camera position and fov */}
      </Canvas>
    </div>
  );
}
