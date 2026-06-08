import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Zap, BrainCircuit, EyeOff, Radio } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  sparkleFreq: number;
  angle: number;
  distance: number;
  orbitalSpeed: number;
}

export default function NeuralOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom states for interactive customization of the neural simulation
  const [orbMode, setOrbMode] = useState<"alpha" | "gamma" | "theta">("alpha");
  const [gravityPull, setGravityPull] = useState<number>(0.15); // gravity towards center
  const [particleCount, setParticleCount] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Mouse coordinate tracking with easing
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isInside: false, speed: 0 });

  // Mode settings mapping
  const modeSettings = {
    alpha: {
      primaryColor: "rgba(77, 163, 255, 1)", // Cyan
      secondaryColor: "rgba(155, 109, 255, 1)", // Deep Purple
      pulseSpeed: 0.04,
      connectionDistance: 60,
      glowRadius: 110,
      emissionRate: 4,
    },
    gamma: {
      primaryColor: "rgba(239, 68, 68, 1)", // Crimson
      secondaryColor: "rgba(245, 158, 11, 1)", // Amber
      pulseSpeed: 0.08,
      connectionDistance: 50,
      glowRadius: 130,
      emissionRate: 6,
    },
    theta: {
      primaryColor: "rgba(16, 185, 129, 1)", // Emerald
      secondaryColor: "rgba(6, 182, 212, 1)", // Cyan-green
      pulseSpeed: 0.02,
      connectionDistance: 80,
      glowRadius: 90,
      emissionRate: 2,
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let orbRotationAngle = 0;
    let pulseProgress = 0;

    // Resizing capability
    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.width; // Keep aspect ratio solid square
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Setup temporary observer for perfect sync with container resizing
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Animation Loop
    const render = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear with very slight fade for trail effects
      ctx.fillStyle = "rgba(7, 11, 20, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Pulse update
      const settings = modeSettings[orbMode];
      pulseProgress += settings.pulseSpeed;
      const pulseFactor = 1 + Math.sin(pulseProgress) * 0.08;
      orbRotationAngle += 0.005;

      // Draw Atmospheric Nebula Backdrop (Under the orb)
      const backgroundGlow = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, settings.glowRadius * pulseFactor * 1.5
      );
      backgroundGlow.addColorStop(0, settings.primaryColor.replace("1)", "0.12)"));
      backgroundGlow.addColorStop(0.5, settings.secondaryColor.replace("1)", "0.04)"));
      backgroundGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = backgroundGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, settings.glowRadius * pulseFactor * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Track mouse coordinates & speed to calculate dynamic trails
      const m = mouseRef.current;
      const dx = m.x - m.lastX;
      const dy = m.y - m.lastY;
      m.speed = Math.sqrt(dx * dx + dy * dy);
      m.lastX = m.x;
      m.lastY = m.y;

      // Emit interactive sparkle trail particles when cursor is active
      if (m.isInside) {
        // Emit count based on speed & settings
        const count = Math.max(1, Math.min(settings.emissionRate, Math.floor(m.speed / 2)));
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spread = Math.random() * 8;
          
          // Random relative velocity with inertia
          const velocityFactor = 1.4;
          const vx = (Math.cos(angle) * (Math.random() * 2 + 1) + dx * 0.1) * velocityFactor;
          const vy = (Math.sin(angle) * (Math.random() * 2 + 1) + dy * 0.1) * velocityFactor;

          particles.push({
            x: m.x + Math.cos(angle) * spread,
            y: m.y + Math.sin(angle) * spread,
            vx,
            vy,
            size: Math.random() * 2.2 + 1.2,
            alpha: 1.0,
            decay: Math.random() * 0.015 + 0.008,
            color: Math.random() > 0.5 ? settings.primaryColor : settings.secondaryColor,
            sparkleFreq: Math.random() * 15 + 5,
            angle: Math.atan2(m.y - centerY, m.x - centerX),
            distance: Math.sqrt((m.x - centerX) ** 2 + (m.y - centerY) ** 2),
            orbitalSpeed: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.015 + 0.005),
          });
        }
      }

      // Emitting ambient synapse sprinkles from the Orb Core itself
      if (Math.random() < 0.25) {
        const angle = Math.random() * Math.PI * 2;
        const startRad = settings.glowRadius * 0.3 * pulseFactor;
        const ex = centerX + Math.cos(angle) * startRad;
        const ey = centerY + Math.sin(angle) * startRad;
        
        particles.push({
          x: ex,
          y: ey,
          vx: Math.cos(angle) * (Math.random() * 1.5 + 0.5),
          vy: Math.sin(angle) * (Math.random() * 1.5 + 0.5),
          size: Math.random() * 1.8 + 0.8,
          alpha: 0.9,
          decay: Math.random() * 0.02 + 0.01,
          color: Math.random() > 0.4 ? settings.secondaryColor : settings.primaryColor,
          sparkleFreq: Math.random() * 10 + 5,
          angle,
          distance: startRad,
          orbitalSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        });
      }

      // Update Particles
      particles = particles.filter(p => {
        // Compute delta vectors from orb core
        const toCenterX = centerX - p.x;
        const toCenterY = centerY - p.y;
        const distToCenter = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);

        // Apply magnetic gravity vector towards center to pull trails into orb
        if (distToCenter > 10) {
          const force = gravityPull * 0.08;
          p.vx += (toCenterX / distToCenter) * force;
          p.vy += (toCenterY / distToCenter) * force;

          // Apply orbital force (rotational swirl around core)
          const rotAngle = p.angle + p.orbitalSpeed;
          p.angle = rotAngle;
          
          // Let them slowly glide into circular patterns
          p.distance += (distToCenter - p.distance) * 0.02;
        }

        // Apply friction decay
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Apply physical positioning
        p.x += p.vx;
        p.y += p.vy;

        // Fade logic
        p.alpha -= p.decay;

        return p.alpha > 0;
      });

      // Update Particle count status
      setParticleCount(particles.length);

      // Draw synapses connection network (Webbing)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < settings.connectionDistance) {
            // Draw connector glowing line with dynamic fading alpha
            const opacity = (1 - dist / settings.connectionDistance) * p1.alpha * p2.alpha * 0.35;
            ctx.strokeStyle = settings.primaryColor.replace("1)", `${opacity})`);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Sparkle particles
      particles.forEach(p => {
        // Sparkle fluctuations (Blink logic)
        const flash = Math.sin(Date.now() * 0.01 * p.sparkleFreq) * 0.2 + 0.85;
        const currentAlpha = Math.max(0, Math.min(1, p.alpha * flash));

        ctx.fillStyle = p.color.replace("1)", `${currentAlpha})`);
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + Math.sin(Date.now() * 0.01) * 0.2), 0, Math.PI * 2);
        ctx.fill();

        // Canvas shadow reset for optimization
        ctx.shadowBlur = 0;
      });

      // Draw central Neural Core structure
      const coreRadius = settings.glowRadius * 0.35 * pulseFactor;
      const coreGlow = ctx.createRadialGradient(
        centerX, centerY, 2,
        centerX, centerY, coreRadius
      );
      coreGlow.addColorStop(0, "rgba(255,255,255,0.95)");
      coreGlow.addColorStop(0.3, settings.primaryColor.replace("1)", "0.8)"));
      coreGlow.addColorStop(0.7, settings.secondaryColor.replace("1)", "0.3)"));
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw concentric holographic rings rotating around core
      ctx.lineWidth = 1;
      ctx.strokeStyle = settings.primaryColor.replace("1)", "0.15)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, settings.glowRadius * 0.7 * pulseFactor, orbRotationAngle, orbRotationAngle + Math.PI * 1.5);
      ctx.stroke();

      ctx.strokeStyle = settings.secondaryColor.replace("1)", "0.1)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, settings.glowRadius * 0.85 * pulseFactor, -orbRotationAngle * 1.5, -orbRotationAngle * 1.5 + Math.PI * 1.2);
      ctx.stroke();

      // Draw dynamic nodes on orbital rings to represent interactive synapses
      const numOrbits = 3;
      for (let i = 0; i < numOrbits; i++) {
        const radius = settings.glowRadius * (0.5 + i * 0.18) * pulseFactor;
        const nodeAngle = orbRotationAngle * (1 + i * 0.3) + (i * Math.PI) / 1.5;
        const nx = centerX + Math.cos(nodeAngle) * radius;
        const ny = centerY + Math.sin(nodeAngle) * radius;

        ctx.fillStyle = i % 2 === 0 ? settings.primaryColor : settings.secondaryColor;
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect nodes back to the center core selectively with faint lines
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [orbMode, gravityPull]);

  // Handle pointer coordinate capture
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  const handlePointerEnter = () => {
    mouseRef.current.isInside = true;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
    setIsHovered(false);
  };

  return (
    <div 
      id="neural-core-orb-container"
      ref={containerRef} 
      className="relative w-full aspect-square max-w-[420px] mx-auto p-4 cursor-crosshair group"
    >
      {/* Visual background framing rings */}
      <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none group-hover:border-[#4DA3FF]/15 transition-colors duration-500"></div>
      <div className="absolute inset-4 rounded-full border border-white/[0.02] pointer-events-none"></div>

      {/* Actual HTML Canvas element for deep calculations */}
      <div 
        className="w-full h-full relative z-10"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block rounded-full"
        />
      </div>

      {/* Overlay interactive heads-up details */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#4DA3FF] rounded-full animate-pulse"></span>
          <span className="text-[9px] text-white/50 tracking-wider font-bold uppercase">CORE ACTIVE</span>
        </div>
        <div className="text-[10px] text-white/30 mt-1 uppercase">ORB RAD: 420px</div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 pointer-events-none font-mono text-right">
        <span className="text-[9px] text-white/40 block">SPARKLE INDEX</span>
        <span className="text-sm font-semibold text-[#4DA3FF] font-mono">{particleCount} active</span>
      </div>

      {/* Floating Interactive Settings (Pill Panel) underneath */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
        
        {/* State modes selector */}
        {(["alpha", "gamma", "theta"] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setOrbMode(mode)}
            className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${
              orbMode === mode 
                ? mode === "alpha" ? "bg-[#4DA3FF]/20 text-[#4DA3FF] border border-[#4DA3FF]/40" 
                : mode === "gamma" ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {mode}
          </button>
        ))}

        <div className="h-3.5 w-[1px] bg-white/15 mx-1"></div>

        {/* Gravity tweak button */}
        <button
          onClick={() => setGravityPull(g => g === 0.15 ? 0.35 : g === 0.35 ? 0.02 : 0.15)}
          className="text-white/50 hover:text-white flex items-center gap-1 text-[9px] font-mono font-bold uppercase cursor-pointer"
          title="Toggle Magnetic Pull Strength"
        >
          <Radio className="w-3 h-3 text-[#9B6DFF]" />
          Pull: {gravityPull === 0.15 ? "Med" : gravityPull === 0.35 ? "Max" : "Min"}
        </button>
      </div>
    </div>
  );
}
