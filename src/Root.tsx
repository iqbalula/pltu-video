import React from "react";
import { registerRoot, Composition, staticFile } from "remotion";
import { PLTUComposition } from "./PLTUComposition";
import { videoMeta } from "./data/scenes";

const voiceover = staticFile("voiceover.mp3");

registerRoot(() => (
  <>
    <Composition
      id="PLTUComposition"
      component={PLTUComposition}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={videoMeta.totalFrames}
      defaultProps={{}}
      audio={voiceover}
    />
  </>
));