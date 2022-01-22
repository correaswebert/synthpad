<script context="module" lang="ts">
  function encodeRow(row: boolean[]): number {
    // if all values are false, prevents returning zero
    // decoding the hash will then require two params (hash and numCols)
    let hash = 1;

    for (const cell of row) {
      hash <<= 1;
      hash |= cell ? 1 : 0;
    }

    return hash;
  }

  function decodeRow(hash: number): boolean[] {
    let row: boolean[] = [];

    while (hash > 1) {
      const cell = hash & 1 ? true : false;
      // as we are moving from right to left, add the element to the front
      row.unshift(cell);
      hash >>= 1;
    }

    return row;
  }

  export interface SynthpadData {
    grid: boolean[][];
    scale: string;
    bpm: number;
  }

  export function encodeUrl(synthData: SynthpadData): string {
    let url = "";

    for (const row of synthData.grid) {
      const encRow = encodeRow(row);
      url += encRow.toString(16) + "-";
    }

    url += `${synthData.scale}-${synthData.bpm.toString()}`;

    return url;
  }

  export function decodeUrl(url: string): SynthpadData {
    const urlData = url.split("-");

    const bpm = parseInt(urlData.pop());
    const scale = urlData.pop();
    const grid = urlData.map((rowData) => decodeRow(parseInt(rowData, 16)));

    return { grid, scale, bpm };
  }
</script>
