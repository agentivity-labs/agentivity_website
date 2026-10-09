# Recording the Studio

The Studio is a Flutter web app drawn on a canvas, so the showcase recorder (`../capture.mjs`, which clicks page elements) does not apply.
These three scripts drive it by screen position instead and record a screencast.

1. Start the API (`agentivity-api`, port 5005).
2. `node serve-studio.mjs` serves the compiled Studio (`agentivity_studio/build/web`) on port 5960. The compiled build has no "DEBUG" ribbon; the dev server on 5959 has one.
3. `node session.mjs start http://127.0.0.1:5960/` opens a headless Chrome that stays open between commands.
4. Explore with `node session.mjs do '[["click",x,y],["wait",1500],["shot","name"]]'` and look at the screenshot. Positions are CSS pixels in a 1418×802 view; a screenshot is twice that size.
5. Record with `node rec.mjs <name> '[["click",x,y],["type","text",60],["drag",x1,y1,x2,y2,900],["wait",1200]]'`. A drawn pointer follows the mouse. The result is `<name>.mp4` (bottom status bar cropped out).
6. `node session.mjs stop`.

A recording runs slower than real use: speed it up afterwards (`ffmpeg -i in.mp4 -vf "setpts=PTS/2,fps=30" out.mp4`).

Creating an agent or a team in the Studio writes a file in `agentivity_service/_data/agentic/`. Note `git status --short _data` before and
delete the new files afterwards.

## Things that went wrong, and what to do

- **The theme goes back to dark after a reload.** Click the sun at the bottom left (about 38, 705) before every take.
- **A typed search cannot be replaced in one take**: double-click the word in the search field outside the recording (`session.mjs do '[["dblclick",1040,172]]'`), then start the next take by typing. Join the takes with ffmpeg afterwards.
- **A link is drawn port to port.** Start the drag on the round port itself, not ten pixels beside it: beside it, the drag selects the node and no link appears. Read the port positions on a screenshot taken after the nodes are dropped (a node snaps to the grid).
- **Never drag on a real workflow to move the view.** A drag that starts on a link or a node changes the workflow (the title gets a `*`). Use the view buttons at the bottom left instead (fit, zoom in, zoom out). If a `*` appears on someone's real workflow, leave it and choose **Discard**.
- **Leaving an edited workflow opens a "Leave…?" window**: Discard is at about (841, 425).
- **The view buttons can stop answering** after several windows and drags. Reload the page (`["nav","http://127.0.0.1:5960/",9000]`) and go back to the workflow.
- **Every "Create" writes a file** (`_data/agentic/` for agents and teams, `_data/workflows/` for workflows), even for a take that failed. Compare `git status --short _data` before and after, and delete only the files whose name is the one you typed.
