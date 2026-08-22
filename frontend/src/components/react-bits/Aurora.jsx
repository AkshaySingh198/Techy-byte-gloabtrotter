import { useEffect, useRef } from 'react';

export default function Aurora({
  colorStops = ['#ff7f50', '#006a6a', '#795900'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.8,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.005 * speed;
      ctx.clearRect(0, 0, width, height);

      // Create glowing layered gradient waves
      for (let i = 0; i < colorStops.length; i++) {
        const color = colorStops[i];
        ctx.save();
        ctx.beginPath();

        const offset = i * (Math.PI / 3);
        const yBase = height * 0.4 + (i * height * 0.15);

        ctx.moveTo(0, height);
        ctx.lineTo(0, yBase);

        for (let x = 0; x <= width; x += 15) {
          const sin1 = Math.sin(x * 0.003 + time + offset) * 45 * amplitude;
          const sin2 = Math.cos(x * 0.002 - time * 0.8 + offset) * 35 * amplitude;
          const y = yBase + sin1 + sin2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, yBase - 100, width, height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');

        ctx.globalAlpha = 0.22 * blend;
        ctx.fillStyle = gradient;
        ctx.filter = 'blur(40px)';
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
}
