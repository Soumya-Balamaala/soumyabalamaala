

export function contactTrackingID(rowcount) {
  const baseID = "DEVS25";
  const counter = Number(rowcount) + 1; // force it to be a number first
  const formattedCounter = counter.toString().padStart(3, "0"); // 001, 002, etc.
  return `${baseID}${formattedCounter}`;
}
