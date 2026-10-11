# ARVINTH.SN — AI Portfolio

A Next.js + TypeScript cinematic portfolio for a Software / AI Engineer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Signature interactions

- Single click/tap the robot to return it to idle.
- Double click/tap to open the holographic AI assistant.
- Triple click/tap to trigger the robot-to-car transition.

The app uses a typed robot state machine, GSAP ScrollTrigger, Framer Motion, React Three Fiber, and Drei. The realistic hero robot is the supplied artwork in `public/robot-hero.png`, layered with a lightweight animated 3D energy field. Portfolio answers are generated only from `data/portfolio.ts`.
