import { useEffect, useRef } from 'react';

export default function PointerTrail() {
  const auraRef = useRef<HTMLSpanElement>(null);
  const sparkLayerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const sparkLayer = sparkLayerRef.current;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!aura || !sparkLayer || !finePointer || reducedMotion) return;

    let frame = 0;
    let targetX = -80;
    let targetY = -80;
    let targetAngle = 0;
    let previousX = -80;
    let previousY = -80;
    let previousTime = performance.now();
    let lastSparkTime = 0;

    const animate = () => {
      frame = 0;
      aura.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) rotate(${targetAngle}rad)`;
    };

    const createSpark = (
      x: number,
      y: number,
      directionX: number,
      directionY: number,
      speed: number,
      flare = false,
    ) => {
      const spark = document.createElement('i');
      spark.className = flare ? 'pointer-spark is-flare' : 'pointer-spark';

      const normalX = -directionY;
      const normalY = directionX;
      const backwardTravel = 13 + Math.random() * (22 + Math.min(speed, 2.2) * 10);
      const sideTravel = (Math.random() - .5) * (18 + Math.min(speed, 2.2) * 10);
      const endX = x - directionX * backwardTravel + normalX * sideTravel;
      const endY = y - directionY * backwardTravel + normalY * sideTravel + 10 + Math.random() * 24;
      const startRotation = Math.atan2(directionY, directionX) * (180 / Math.PI) + 90 + (Math.random() - .5) * 44;
      const duration = flare ? 260 + Math.random() * 160 : 340 + Math.random() * 340;

      sparkLayer.appendChild(spark);
      while (sparkLayer.childElementCount > 68) sparkLayer.firstElementChild?.remove();

      const animation = spark.animate(
        [
          {
            opacity: flare ? .96 : 1,
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${startRotation}deg) scale(1)`,
          },
          {
            opacity: 0,
            transform: `translate3d(${endX}px, ${endY}px, 0) rotate(${startRotation + (Math.random() - .5) * 90}deg) scale(${flare ? 1.8 : .12})`,
          },
        ],
        { duration, easing: 'cubic-bezier(.12,.7,.18,1)', fill: 'forwards' },
      );
      animation.onfinish = () => spark.remove();
      animation.oncancel = () => spark.remove();
    };

    const scatterSparks = (x: number, y: number, dx: number, dy: number, speed: number) => {
      const distance = Math.hypot(dx, dy);
      if (distance < 1) return;
      const directionX = dx / distance;
      const directionY = dy / distance;
      const sparkCount = speed > 1.45 ? 4 : speed > .72 ? 3 : 2;

      for (let index = 0; index < sparkCount; index += 1) {
        createSpark(x, y, directionX, directionY, speed);
      }
      if (speed > 1.1 && Math.random() > .48) createSpark(x, y, directionX, directionY, speed, true);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const dx = event.clientX - previousX;
      const dy = event.clientY - previousY;
      const distance = Math.hypot(dx, dy);
      const elapsed = Math.max(8, now - previousTime);
      const speed = distance / elapsed;

      targetX = event.clientX;
      targetY = event.clientY;
      if (distance > .5) targetAngle = Math.atan2(dy, dx);
      aura.classList.add('is-visible');
      if (!frame) frame = requestAnimationFrame(animate);

      if (distance > 5 && now - lastSparkTime > 18) {
        scatterSparks(event.clientX, event.clientY, dx, dy, speed);
        lastSparkTime = now;
      }

      previousX = event.clientX;
      previousY = event.clientY;
      previousTime = now;
    };

    const handlePointerLeave = () => aura.classList.remove('is-visible');
    const handleBlur = () => aura.classList.remove('is-visible');

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', handleBlur);
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('pointerleave', handlePointerLeave);
      sparkLayer.replaceChildren();
    };
  }, []);

  return (
    <>
      <span ref={sparkLayerRef} className="pointer-spark-layer" aria-hidden="true" />
      <span ref={auraRef} className="pointer-aura" aria-hidden="true" />
    </>
  );
}
