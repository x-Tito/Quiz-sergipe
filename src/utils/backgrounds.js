const BACKGROUND_STORAGE_KEY = "quiz-sergipe-last-background";

export function pickRandomBackground(backgrounds) {
  if (!Array.isArray(backgrounds) || backgrounds.length === 0) {
    return "";
  }

  if (backgrounds.length === 1) {
    return backgrounds[0];
  }

  const lastBackground =
    typeof window !== "undefined"
      ? window.localStorage.getItem(BACKGROUND_STORAGE_KEY)
      : "";

  const availableBackgrounds = backgrounds.filter((background) => background !== lastBackground);
  const pool = availableBackgrounds.length > 0 ? availableBackgrounds : backgrounds;
  const chosenBackground = pool[Math.floor(Math.random() * pool.length)];

  if (typeof window !== "undefined") {
    window.localStorage.setItem(BACKGROUND_STORAGE_KEY, chosenBackground);
  }

  return chosenBackground;
}
