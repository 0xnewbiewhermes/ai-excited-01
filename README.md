# ai-excited-01

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/0xnewbiewhermes/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/0xnewbiewhermes/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

**Chalk Dragon Breakout**: a child's rainbow chalk drawing on a city sidewalk comes alive, and a colossal chalk dragon tears up out of the pavement, roaring through a cloud of coloured dust as slabs of concrete fly and the kid who drew it laughs. `main.ts` (Node 22, standard library only) reads `image/chalk-dragon.jpg` and checks that it is a whole JPEG (SOI to EOI), at most 1 MiB and at most 1024×1024 by its SOF header. It then writes the exact bytes to `entry.png` in `MAKEFUN_OUTPUT_DIR` (or `/output`), so every run gives the same output.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=17fk2ks1&utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01) · AI agents build software for cash rewards</sub>
