import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CrisisOrb() {
  const mountRef = useRef<HTMLDivElement>(null);
  const calmRef = useRef(0); // 0 = orb (pulsing), 1 = cross (static)

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const goldLight = new THREE.PointLight(0xb8965a, 1.5, 20);
    goldLight.position.set(-4, 2, 3);
    scene.add(goldLight);

    // Group to morph between orb & cross
    const group = new THREE.Group();
    scene.add(group);

    // ORB — pulsing sphere (crisis)
    const orbGeo = new THREE.IcosahedronGeometry(1.5, 6);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xe86a3f,
      emissive: 0xe86a3f,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 1,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    group.add(orb);
    const orbBasePos = (orbGeo.attributes.position as THREE.BufferAttribute).clone();

    // Glow wireframe around orb
    const glowGeo = new THREE.IcosahedronGeometry(1.7, 2);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xe86a3f,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    // CROSS — calm static medical cross (built from boxes)
    const crossMat = new THREE.MeshStandardMaterial({
      color: 0xb8965a,
      emissive: 0xb8965a,
      emissiveIntensity: 0.15,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0,
    });
    const crossGroup = new THREE.Group();
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.4, 0.5), crossMat);
    const hBar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.5), crossMat);
    crossGroup.add(vBar, hBar);
    crossGroup.scale.set(0.85, 0.85, 0.85);
    group.add(crossGroup);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const calm = calmRef.current; // 0..1

      // Orb opacity fades out as calm increases; cross fades in
      orbMat.opacity = 1 - calm;
      glowMat.opacity = 0.25 * (1 - calm);
      crossMat.opacity = calm;

      // Orb chaotic pulsing — strong when calm=0, subsides when calm=1
      const pos = orbGeo.attributes.position as THREE.BufferAttribute;
      const turbulence = (1 - calm) * 0.35;
      for (let i = 0; i < pos.count; i++) {
        const bx = orbBasePos.getX(i);
        const by = orbBasePos.getY(i);
        const bz = orbBasePos.getZ(i);
        const noise =
          Math.sin(t * 3 + bx * 4) * 0.5 +
          Math.cos(t * 2.5 + by * 5) * 0.5;
        const scale = 1 + noise * turbulence;
        pos.setXYZ(i, bx * scale, by * scale, bz * scale);
      }
      pos.needsUpdate = true;
      orbGeo.computeVertexNormals();

      // Orb pulse scale (heartbeat-like) — calms down
      const pulse = 1 + Math.sin(t * 4) * 0.08 * (1 - calm);
      orb.scale.setScalar(pulse);
      glow.scale.setScalar(pulse * 1.05);
      glow.rotation.y = t * 0.3;
      glow.rotation.x = t * 0.15;

      // Emissive flicker (crisis) vs steady (calm)
      orbMat.emissiveIntensity = 0.4 + Math.sin(t * 6) * 0.2 * (1 - calm);

      // Cross gently rotates & settles upright
      crossGroup.rotation.y = (1 - calm) * Math.sin(t) * 0.5 + t * 0.15 * calm;
      crossGroup.rotation.z = (1 - calm) * 0.3;

      // Whole group slow float
      group.position.y = Math.sin(t * 0.8) * 0.12;
      group.rotation.y = Math.sin(t * 0.4) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    // Scroll → calm (0 at top, 1 after ~80vh)
    const onScroll = () => {
      const max = window.innerHeight * 0.8;
      calmRef.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      crossMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
