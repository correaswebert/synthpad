<script context="module" lang="ts">
  import * as Tone from "tone";

  // FIX: type to be determined
  let synth: any;

  let scales = {
    classic: [
      "B3",
      "C#4",
      "F#4",
      "G#4",
      "C#5",
      "D#5",
      "E5",
      "G#5",
      "B5",
      "C#6",
      "F#6",
      "G#6",
    ],
    pentatonic: [
      "C4",
      "D4",
      "E4",
      "G4",
      "A4",
      "C5",
      "D5",
      "E5",
      "G5",
      "A5",
      "C6",
      "D6",
    ],
    chromatic: [
      "C5",
      "C#5",
      "D5",
      "Eb5",
      "E5",
      "F5",
      "F#5",
      "G5",
      "G#5",
      "A5",
      "Bb5",
      "B5",
    ],
    major: [
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5",
      "D5",
      "E5",
      "F5",
      "G5",
    ],
    harmonic_minor: [
      "A4",
      "B4",
      "C5",
      "D5",
      "E5",
      "F5",
      "G#5",
      "A5",
      "B5",
      "C6",
      "D6",
      "E6",
    ],
  };

  let selectedScale = scales["classic"];
  const possibleScales = Object.keys(scales)

  export const selectScale = (scale: string) => {
    if (possibleScales.includes(scale))
      selectedScale = scales[scale]
  }

  export const initAudio = async () => {
    synth = new Tone.PolySynth(Tone.Synth).toDestination()
    synth.set({detune: -1200});
  };

  export const playRow = async (row: boolean[]) => {
    if (!synth) await initAudio();

    let notesToPlay: string[] = [];
    row.forEach((isCellActive, idx) => {
      if (isCellActive) notesToPlay.push(selectedScale[idx])
    })
    
    synth.triggerAttackRelease(notesToPlay, "16n");
  };

  export const playCell = async (index: number) => {
    if (!synth) await initAudio();
    synth.triggerAttackRelease(selectedScale[index], "16n");
  };
</script>
