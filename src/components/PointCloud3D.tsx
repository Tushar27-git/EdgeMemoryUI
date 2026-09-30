import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ClaimRecord } from '../types';

interface PointCloud3DProps {
  claims?: ClaimRecord[];
  isExpanded?: boolean;
  onPointClick?: (claim: ClaimRecord | null, nodeType?: string) => void;
  interactive?: boolean;
}

interface NodeData {
  id: string;
  label: string;
  type: 'project' | 'file' | 'voice' | 'person' | 'claim';
  x: number;
  y: number;
  z: number;
  size: number;
  state?: 'local' | 'queued' | 'synced' | 'conflict';
  claim?: ClaimRecord;
}

export const PointCloud3D: React.FC<PointCloud3DProps> = ({
  claims = [],
  isExpanded = false,
  onPointClick,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    // Primary Hub Nodes from the reference mockup:
    // 1. Folder (Top-Left)
    // 2. Note/File (Center)
    // 3. Mic (Bottom-Left)
    // 4. Person (Right)
    const hubNodes: NodeData[] = [
      { id: 'hub-folder', label: 'Projects Hub', type: 'project', x: -45, y: 38, z: 0, size: 32 },
      { id: 'hub-file', label: 'Claims & Notes', type: 'file', x: -8, y: -10, z: 5, size: 34 },
      { id: 'hub-voice', label: 'Voice Notes', type: 'voice', x: -35, y: -52, z: -5, size: 30 },
      { id: 'hub-person', label: 'People & Contacts', type: 'person', x: 55, y: -16, z: 2, size: 32 },
    ];

    // Background resting points (Amethyst deco dots) and state points matching screenshot spread
    const ambientPoints: NodeData[] = [
      { id: 'pt-01', label: 'Sharma client brief', type: 'claim', x: -85, y: 55, z: 10, size: 7, state: 'synced' },
      { id: 'pt-02', label: 'Ladakh raw audio #04', type: 'claim', x: -75, y: -30, z: 12, size: 8, state: 'queued' },
      { id: 'pt-03', label: 'Due date Oct 16 (Email)', type: 'claim', x: 28, y: 40, z: -10, size: 8, state: 'conflict' },
      { id: 'pt-04', label: 'Due date Oct 18 (Voice)', type: 'claim', x: 42, y: 42, z: -8, size: 8, state: 'conflict' },
      { id: 'pt-05', label: 'TrackShift raytracer notes', type: 'claim', x: -100, y: -10, z: -15, size: 6, state: 'local' },
      { id: 'pt-06', label: 'Riya birthday Thursday', type: 'claim', x: 85, y: 25, z: -15, size: 7, state: 'local' },
      { id: 'pt-07', label: '3 cutdown delivery spec', type: 'claim', x: 18, y: -50, z: 20, size: 6, state: 'synced' },
      { id: 'pt-08', label: 'SSD #2 raw/4k partition', type: 'claim', x: -25, y: 72, z: -20, size: 6 },
      { id: 'pt-09', label: 'Friday invoice reminder', type: 'claim', x: -95, y: -55, z: 5, size: 5 },
      { id: 'pt-10', label: 'Kodak 5207 emulation', type: 'claim', x: 92, y: -52, z: 10, size: 6, state: 'synced' },
      { id: 'pt-11', label: 'Drone battery checklist', type: 'claim', x: -15, y: -75, z: -10, size: 5 },
      { id: 'pt-12', label: 'Audio master final stem', type: 'claim', x: 105, y: 8, z: 20, size: 6 },
      { id: 'pt-13', label: 'Client WhatsApp contract', type: 'claim', x: -55, y: 20, z: -30, size: 6 },
      { id: 'pt-14', label: 'Goa travel dates', type: 'claim', x: 65, y: -68, z: -15, size: 5 },
      { id: 'pt-15', label: 'Physics solver iteration', type: 'claim', x: -70, y: 42, z: 25, size: 5 },
      { id: 'pt-16', label: 'Director feedback reel', type: 'claim', x: 22, y: 68, z: 8, size: 6 },
      { id: 'pt-17', label: 'Equipment cargo manifest', type: 'claim', x: -110, y: 18, z: -8, size: 5 },
      { id: 'pt-18', label: 'Color grade LUT v3', type: 'claim', x: 78, y: 58, z: 15, size: 6 },
      { id: 'pt-19', label: 'Offline cache index', type: 'claim', x: 4, y: 30, z: 12, size: 5 },
      { id: 'pt-20', label: 'Local vector partition', type: 'claim', x: -4, y: -38, z: -12, size: 6 },
    ];

    // Combine all nodes
    const allNodes: NodeData[] = [...hubNodes, ...ambientPoints];

    // Map passed claims if available
    claims.slice(0, 15).forEach((c, idx) => {
      const angle = (idx / 15) * Math.PI * 2;
      const radius = 55 + (idx % 3) * 20;
      allNodes.push({
        id: c.claim_id,
        label: `${c.entity_id}: ${c.value}`,
        type: 'claim',
        x: Math.cos(angle) * radius + (Math.random() - 0.5) * 10,
        y: Math.sin(angle) * radius * 0.7 + (Math.random() - 0.5) * 10,
        z: (Math.sin(angle * 3) * 30),
        size: 7,
        state: c.status === 'disputed' ? 'conflict' : c.tier === 'device' ? 'local' : 'synced',
        claim: c,
      });
    });

    // Node Meshes & Icons
    const nodeMeshes: THREE.Mesh[] = [];

    // Helper to generate textures for hubs and points
    const createHubTexture = (type: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Circle background
      ctx.beginPath();
      ctx.arc(64, 64, 56, 0, Math.PI * 2);
      ctx.fillStyle = '#AB92BF'; // Amethyst
      ctx.fill();

      // Inner icon in white / linen
      ctx.fillStyle = '#FDF1E2';
      ctx.strokeStyle = '#FDF1E2';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (type === 'project') {
        // Folder icon
        ctx.beginPath();
        ctx.moveTo(38, 48);
        ctx.lineTo(54, 48);
        ctx.lineTo(62, 56);
        ctx.lineTo(90, 56);
        ctx.lineTo(90, 84);
        ctx.lineTo(38, 84);
        ctx.closePath();
        ctx.stroke();
      } else if (type === 'file') {
        // Document icon
        ctx.beginPath();
        ctx.moveTo(44, 40);
        ctx.lineTo(72, 40);
        ctx.lineTo(84, 52);
        ctx.lineTo(84, 88);
        ctx.lineTo(44, 88);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(52, 60);
        ctx.lineTo(76, 60);
        ctx.moveTo(52, 70);
        ctx.lineTo(76, 70);
        ctx.stroke();
      } else if (type === 'voice') {
        // Mic icon
        ctx.beginPath();
        ctx.arc(64, 56, 12, Math.PI, 0, false);
        ctx.lineTo(76, 68);
        ctx.arc(64, 68, 12, 0, Math.PI, false);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(64, 68, 18, 0, Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(64, 86);
        ctx.lineTo(64, 94);
        ctx.stroke();
      } else if (type === 'person') {
        // User icon
        ctx.beginPath();
        ctx.arc(64, 52, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(64, 92, 22, Math.PI, 0, false);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Helper to generate textures for state points
    const createPointTexture = (state?: string, size = 64) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const center = size / 2;

      if (state === 'local') {
        // Hollow ring (Amethyst)
        ctx.beginPath();
        ctx.arc(center, center, center * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = '#AB92BF';
        ctx.lineWidth = 6;
        ctx.stroke();
      } else if (state === 'queued') {
        // Half-filled disc (Butter)
        ctx.beginPath();
        ctx.arc(center, center, center * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = '#F1DF88';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center, center, center * 0.7, Math.PI * 0.5, Math.PI * 1.5, false);
        ctx.fillStyle = '#F1DF88';
        ctx.fill();
      } else if (state === 'synced') {
        // Solid disc (Teal)
        ctx.beginPath();
        ctx.arc(center, center, center * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = '#77E0D3';
        ctx.fill();
      } else if (state === 'conflict') {
        // Diamond (Coral)
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = '#F68482';
        ctx.fillRect(-center * 0.5, -center * 0.5, center, center);
        ctx.restore();
      } else {
        // Resting ambient Amethyst disc
        ctx.beginPath();
        ctx.arc(center, center, center * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = '#AB92BF';
        ctx.globalAlpha = 0.75;
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Create Hub & Point Meshes
    allNodes.forEach((node) => {
      const isHub = node.type !== 'claim';
      const planeGeo = new THREE.PlaneGeometry(node.size, node.size);

      const texture = isHub
        ? createHubTexture(node.type)
        : createPointTexture(node.state);

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = node;

      cloudGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Draw Tethers (Lines between Hub Nodes and key claims, exactly like the screenshot!)
    const tetherMaterial = new THREE.LineBasicMaterial({
      color: 0xAB92BF,
      transparent: true,
      opacity: 0.35,
      linewidth: 1,
    });

    const connections = [
      ['hub-folder', 'hub-file'],
      ['hub-file', 'hub-voice'],
      ['hub-file', 'hub-person'],
      ['hub-folder', 'pt-01'],
      ['hub-voice', 'pt-02'],
      ['hub-person', 'pt-06'],
      ['hub-file', 'pt-07'],
      ['hub-file', 'hub-folder'],
    ];

    connections.forEach(([idA, idB]) => {
      const nodeA = allNodes.find((n) => n.id === idA);
      const nodeB = allNodes.find((n) => n.id === idB);
      if (nodeA && nodeB) {
        const points = [
          new THREE.Vector3(nodeA.x, nodeA.y, nodeA.z),
          new THREE.Vector3(nodeB.x, nodeB.y, nodeB.z),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geo, tetherMaterial);
        cloudGroup.add(line);
      }
    });

    // Special conflict tether (connecting the two disputed Sharma delivery claims!)
    const conflictPtA = allNodes.find((n) => n.id === 'pt-03');
    const conflictPtB = allNodes.find((n) => n.id === 'pt-04');
    if (conflictPtA && conflictPtB) {
      const conflictMat = new THREE.LineBasicMaterial({
        color: 0xF68482, // Coral
        transparent: true,
        opacity: 0.75,
      });
      const points = [
        new THREE.Vector3(conflictPtA.x, conflictPtA.y, conflictPtA.z),
        new THREE.Vector3(conflictPtB.x, conflictPtB.y, conflictPtB.z),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const conflictLine = new THREE.Line(geo, conflictMat);
      cloudGroup.add(conflictLine);
    }

    // Interactive Drag / Rotation and Raycasting
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / width) * 2 - 1;
      mouse.y = -(clientY / height) * 2 + 1;

      if (isDragging && interactive) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }

      // Check hover on points
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object.userData as NodeData;
        setHoveredNode(hit);
        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        container.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        container.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      if (container) container.style.cursor = 'grab';
    };

    const handleClick = () => {
      if (hoveredNode && onPointClick) {
        onPointClick(hoveredNode.claim || null, hoveredNode.type);
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle ambient drift (very subtle)
      if (!isDragging) {
        cloudGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.12;
        cloudGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05 + targetRotationX;
      } else {
        cloudGroup.rotation.y += (targetRotationY - cloudGroup.rotation.y) * 0.1;
        cloudGroup.rotation.x += (targetRotationX - cloudGroup.rotation.x) * 0.1;
      }

      // Make billboards always face the camera
      nodeMeshes.forEach((mesh) => {
        mesh.quaternion.copy(camera.quaternion);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, [claims, isExpanded, interactive, onPointClick]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    >
      {/* Floating Hover Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: `${tooltipPos.x + 12}px`,
            top: `${tooltipPos.y + 12}px`,
            pointerEvents: 'none',
            zIndex: 30,
            padding: '8px 12px',
            borderRadius: 'var(--r-sm)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            boxShadow: 'var(--shadow-clay)',
            border: '1px solid var(--line)',
            maxWidth: '240px',
            fontSize: '12px',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
            {hoveredNode.label}
          </div>
          {hoveredNode.state && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                State: {hoveredNode.state}
              </span>
            </div>
          )}
          {hoveredNode.claim && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              Source: {hoveredNode.claim.source.author} ({hoveredNode.claim.source.kind})
            </div>
          )}
        </div>
      )}
    </div>
  );
};
