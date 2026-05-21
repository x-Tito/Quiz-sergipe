const STORAGE_KEY = "quiz-sergipe-progress";

const DEFAULT_PROGRESS = {
  phases: {
    saoJoao: { completed: false, acertos: 0, totalPerguntas: 10, medalha: null },
    cordel: { completed: false, acertos: 0, totalPerguntas: 10, medalha: null },
    caranguejo: { completed: false, acertos: 0, totalPerguntas: 10, medalha: null }
  }
};

const PHASE_META = {
  saoJoao: {
    nome: "São João",
    recompensa: "Fogueira cerimonial acesa"
  },
  cordel: {
    nome: "Cordel",
    recompensa: "Folheto dourado desbloqueado"
  },
  caranguejo: {
    nome: "Caranguejo",
    recompensa: "Costa sergipana restaurada"
  }
};

function cloneDefaultProgress() {
  return JSON.parse(JSON.stringify(DEFAULT_PROGRESS));
}

export function getMedalForScore(acertos, totalPerguntas) {
  if (acertos >= totalPerguntas) {
    return "lendaria";
  }

  if (acertos >= totalPerguntas - 3) {
    return "ouro";
  }

  if (acertos >= 5) {
    return "prata";
  }

  if (acertos >= 2) {
    return "bronze";
  }

  return "aprendiz";
}

export function getMedalLabel(medalha) {
  const labels = {
    lendaria: "Lendária",
    ouro: "Ouro",
    prata: "Prata",
    bronze: "Bronze",
    aprendiz: "Aprendiz"
  };

  return labels[medalha] ?? "Sem medalha";
}

export function getPhaseMeta() {
  return PHASE_META;
}

export function getProgress() {
  if (typeof window === "undefined") {
    return cloneDefaultProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return cloneDefaultProgress();
    }

    const parsed = JSON.parse(raw);

    return {
      phases: {
        ...cloneDefaultProgress().phases,
        ...parsed.phases
      }
    };
  } catch {
    return cloneDefaultProgress();
  }
}

export function savePhaseProgress(phaseKey, acertos, totalPerguntas) {
  const medalha = getMedalForScore(acertos, totalPerguntas);
  const progress = getProgress();

  if (!phaseKey || !progress.phases[phaseKey]) {
    return {
      completed: false,
      acertos,
      totalPerguntas,
      medalha
    };
  }

  progress.phases[phaseKey] = {
    completed: true,
    acertos,
    totalPerguntas,
    medalha
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  return progress.phases[phaseKey];
}

export function getCompletedPhasesCount() {
  const progress = getProgress();
  return Object.values(progress.phases).filter((phase) => phase.completed).length;
}

export function getRestoredRegionsCount(totalRegions) {
  const completed = getCompletedPhasesCount();
  return Math.min(totalRegions, Math.round((completed / 3) * totalRegions));
}

export function getUnlockedRewards() {
  const progress = getProgress();

  return Object.entries(progress.phases)
    .filter(([, phase]) => phase.completed)
    .map(([phaseKey]) => ({
      phaseKey,
      ...PHASE_META[phaseKey]
    }));
}

export function resetProgress() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
