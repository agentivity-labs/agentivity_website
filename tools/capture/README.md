# Showcase capture

Records an Agentivity showcase app running and edits it into a short looping clip for the website.

```bash
node capture.mjs trip-planner --dry   # check the framing, costs nothing
node capture.mjs trip-planner         # real run: calls the agents, uses model credits
node assemble.mjs trip-planner        # edit the recording into out/trip-planner/trip-planner.mp4
```

The Agentivity API (port 5005) and the showcase must be running. Needs the installed Chrome and ffmpeg;
`sharp` is taken from `../../site/node_modules`.

One file per demo in `scenarios/`. The procedure, the style rules and the known failures are written up
in the `showcase-video` skill (`~/.claude/skills/showcase-video/`).
