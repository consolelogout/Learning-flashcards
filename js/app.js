/* Flashcards — Les mouvements littéraires
   Deux modes : apprentissage (toutes les infos) et contrôle (vérification). */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const melange = (tab) => {
  const t = tab.slice();
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
};
const auHasard = (tab) => tab[Math.floor(Math.random() * tab.length)];
const SIECLES = [...new Set(MOUVEMENTS.map((m) => m.siecle))];

/* ====================== Thème clair / sombre ====================== */
const themeInit =
  localStorage.getItem("fl-theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = themeInit;
$("#theme-toggle").textContent = themeInit === "dark" ? "☀️" : "🌙";
$("#theme-toggle").addEventListener("click", () => {
  const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  localStorage.setItem("fl-theme", t);
  $("#theme-toggle").textContent = t === "dark" ? "☀️" : "🌙";
});

/* ====================== Statistiques mémorisées ====================== */
const chargerStats = () => {
  try { return JSON.parse(localStorage.getItem("fl-stats")) || {}; }
  catch { return {}; }
};
let STATS = chargerStats();
const noterReponse = (idMvt, juste) => {
  const s = (STATS[idMvt] = STATS[idMvt] || { vues: 0, justes: 0 });
  s.vues++;
  if (juste) s.justes++;
  localStorage.setItem("fl-stats", JSON.stringify(STATS));
};

/* ====================== Rendu d'une fiche ====================== */
function fiche(m, avecTitre = true) {
  const liste = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  const tags = (items) => `<div class="tags">${items.map((i) => `<span class="tag">${i}</span>`).join("")}</div>`;
  return `
    ${avecTitre ? `<h2>${m.nom}</h2><p class="sous-titre">${m.siecle} · ${m.dates}</p>` : ""}
    <div class="champ"><h3>📖 Définition</h3><p>${m.definition}</p></div>
    <div class="champ"><h3>📅 Dates</h3><p>${m.dates}</p></div>
    <div class="champ"><h3>🎯 Principes et caractéristiques</h3>${liste(m.principes)}</div>
    <div class="champ"><h3>💭 Thèmes</h3>${liste(m.themes)}</div>
    <div class="champ"><h3>📚 Genres concernés</h3>${tags(m.genres)}</div>
    <div class="champ"><h3>✒️ Formes et procédés</h3>${liste(m.formes)}</div>
    <div class="champ"><h3>👤 Auteurs représentatifs</h3>${tags(m.auteurs)}</div>`;
}

/* ====================== Navigation entre modes ====================== */
$$(".mode-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".mode-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", b === btn);
    });
    $("#vue-apprentissage").classList.toggle("is-active", btn.dataset.mode === "apprentissage");
    $("#vue-controle").classList.toggle("is-active", btn.dataset.mode === "controle");
    if (btn.dataset.mode === "controle") afficherStatsResume();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ====================== MODE APPRENTISSAGE ====================== */
let selection = MOUVEMENTS.slice();
let index = 0;

const filtreSiecle = $("#filtre-siecle");
filtreSiecle.innerHTML =
  `<option value="tous">Tous les siècles (${MOUVEMENTS.length} mouvements)</option>` +
  SIECLES.map((s) => `<option value="${s}">${s}</option>`).join("");

function appliquerFiltre() {
  const v = filtreSiecle.value;
  selection = v === "tous" ? MOUVEMENTS.slice() : MOUVEMENTS.filter((m) => m.siecle === v);
  index = 0;
  $("#compteur-filtre").textContent = `${selection.length} mouvement${selection.length > 1 ? "s" : ""}`;
  rendreApprentissage();
}
filtreSiecle.addEventListener("change", appliquerFiltre);

$$("[data-sousmode]").forEach((chip) => {
  chip.addEventListener("click", () => {
    $$("[data-sousmode]").forEach((c) => c.classList.toggle("is-active", c === chip));
    ["cartes", "fiches", "frise", "tableau"].forEach((n) =>
      $("#bloc-" + n).classList.toggle("is-active", n === chip.dataset.sousmode)
    );
  });
});

function rendreCarte() {
  const m = selection[index];
  if (!m) return;
  $("#carte").classList.remove("is-flipped");
  $("#carte-siecle").textContent = m.siecle;
  $("#carte-titre").textContent = m.nom;
  $("#carte-contenu").innerHTML = fiche(m);
  $("#progression-cartes").textContent = `${index + 1} / ${selection.length}`;
  document.querySelector(".carte-verso").scrollTop = 0;
}

const retourner = () => $("#carte").classList.toggle("is-flipped");
$("#carte").addEventListener("click", retourner);
$("#carte").addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") { e.preventDefault(); retourner(); }
});
$("#retourner").addEventListener("click", (e) => { e.stopPropagation(); retourner(); });
$("#prec").addEventListener("click", () => {
  index = (index - 1 + selection.length) % selection.length;
  rendreCarte();
});
$("#suiv").addEventListener("click", () => {
  index = (index + 1) % selection.length;
  rendreCarte();
});
$("#melanger").addEventListener("click", () => {
  selection = melange(selection);
  index = 0;
  rendreCarte();
});

document.addEventListener("keydown", (e) => {
  if (!$("#vue-apprentissage").classList.contains("is-active")) return;
  if (!$("#bloc-cartes").classList.contains("is-active")) return;
  if (e.target.matches("input, textarea, select")) return;
  if (e.key === "ArrowRight") $("#suiv").click();
  if (e.key === "ArrowLeft") $("#prec").click();
});

function rendreFiches() {
  $("#liste-fiches").innerHTML = selection
    .map((m) => `<article class="fiche">${fiche(m)}</article>`)
    .join("");
}

function rendreFrise() {
  $("#frise").innerHTML = selection
    .slice()
    .sort((a, b) => a.debut - b.debut)
    .map(
      (m) => `<div class="frise-item">
        <span class="dates-frise">${m.dates} — ${m.siecle}</span>
        <h3>${m.nom}</h3>
        <p>${m.definition}</p>
        <p class="muted"><strong>Auteurs :</strong> ${m.auteurs.join(", ")}</p>
      </div>`
    )
    .join("");
}

function rendreTableau() {
  const lignes = [
    ["Dates", (m) => m.dates],
    ["Définition", (m) => m.definition],
    ["Principes", (m) => `<ul>${m.principes.map((p) => `<li>${p}</li>`).join("")}</ul>`],
    ["Thèmes", (m) => `<ul>${m.themes.map((p) => `<li>${p}</li>`).join("")}</ul>`],
    ["Genres", (m) => m.genres.join(", ")],
    ["Formes et procédés", (m) => `<ul>${m.formes.map((p) => `<li>${p}</li>`).join("")}</ul>`],
    ["Auteurs", (m) => `<ul>${m.auteurs.map((p) => `<li>${p}</li>`).join("")}</ul>`]
  ];
  $("#tableau-recap").innerHTML =
    `<thead><tr><th>Mouvement</th>${selection.map((m) => `<th>${m.nom}<br><span class="muted">${m.siecle}</span></th>`).join("")}</tr></thead>` +
    `<tbody>${lignes
      .map(([label, f]) => `<tr><th>${label}</th>${selection.map((m) => `<td>${f(m)}</td>`).join("")}</tr>`)
      .join("")}</tbody>`;
}

function rendreApprentissage() {
  rendreCarte();
  rendreFiches();
  rendreFrise();
  rendreTableau();
}

/* ====================== MODE CONTRÔLE ====================== */
const portee = $("#quiz-portee");
portee.innerHTML =
  `<option value="tous">Tous les mouvements</option>` +
  SIECLES.map((s) => `<option value="${s}">${s}</option>`).join("");

let quiz = { questions: [], i: 0, score: 0, erreurs: [], parMvt: {} };

/* --- Générateurs de questions --- */
/* Les distracteurs sont toujours puisés dans l'ENSEMBLE des mouvements, jamais
   dans le seul corpus filtré : un siècle ne compte parfois qu'un mouvement, et
   le QCM n'afficherait alors que la bonne réponse. */
function options(bonne, pool, n = 4) {
  const faux = melange([...new Set(pool)].filter((x) => x !== bonne)).slice(0, n - 1);
  return melange([bonne, ...faux]);
}

const TOUS_LES_NOMS = MOUVEMENTS.map((m) => m.nom);
const TOUTES_LES_DATES = MOUVEMENTS.map((m) => m.dates);

function qDefinition(m, corpus) {
  return {
    mvt: m.id,
    consigne: "Reconnaître une définition",
    question: `« ${m.definition} »<br><em>De quel mouvement s'agit-il ?</em>`,
    choix: options(m.nom, TOUS_LES_NOMS),
    bonne: m.nom
  };
}

function qDates(m, corpus) {
  return {
    mvt: m.id,
    consigne: "Retrouver les dates",
    question: `À quelle période situe-t-on <strong>${m.nom}</strong> ?`,
    choix: options(m.dates, TOUTES_LES_DATES),
    bonne: m.dates
  };
}

function qAuteur(m, corpus) {
  const auteur = auHasard(m.auteurs);
  return {
    mvt: m.id,
    consigne: "Situer un auteur",
    question: `À quel mouvement rattache-t-on <strong>${auteur}</strong> ?`,
    choix: options(m.nom, TOUS_LES_NOMS),
    bonne: m.nom,
    aide: `${m.nom} (${m.dates})`
  };
}

function qTrait(m, corpus) {
  const champ = auHasard(["principes", "themes", "formes"]);
  const libelle = { principes: "principe", themes: "thème", formes: "procédé" }[champ];
  const trait = auHasard(m[champ]);
  return {
    mvt: m.id,
    consigne: `Reconnaître un ${libelle}`,
    question: `« ${trait} »<br><em>Ce ${libelle} caractérise quel mouvement ?</em>`,
    choix: options(m.nom, TOUS_LES_NOMS),
    bonne: m.nom
  };
}

function qChrono(m, corpus) {
  // Il faut quatre mouvements à comparer : on élargit si le siècle n'en fournit pas assez.
  const base = corpus.length >= 4 ? corpus : MOUVEMENTS;
  const lot = melange(base.filter((x) => x.id !== m.id)).slice(0, 3).concat(m);
  const cherchePlusAncien = Math.random() < 0.5;
  const trie = lot.slice().sort((a, b) => a.debut - b.debut);
  const bonne = cherchePlusAncien ? trie[0] : trie[trie.length - 1];
  return {
    mvt: bonne.id,
    consigne: "Ordre chronologique",
    question: `Parmi ces mouvements, lequel est le <strong>${cherchePlusAncien ? "plus ancien" : "plus récent"}</strong> ?`,
    choix: melange(lot.map((x) => x.nom)),
    bonne: bonne.nom,
    aide: `${bonne.nom} : ${bonne.dates}`
  };
}

function qLibre(m) {
  const champ = auHasard(["principes", "themes", "formes", "auteurs"]);
  const libelle = {
    principes: "les principes et caractéristiques",
    themes: "les thèmes",
    formes: "les formes et procédés",
    auteurs: "les auteurs représentatifs"
  }[champ];
  return {
    mvt: m.id,
    type: "libre",
    consigne: "Réponse libre — auto-évaluation",
    question: `Citez de mémoire <strong>${libelle}</strong> du mouvement <strong>${m.nom}</strong>.`,
    reponse: m[champ],
    bonne: m[champ].join(" · ")
  };
}

const GENERATEURS = {
  definition: qDefinition,
  dates: qDates,
  auteur: qAuteur,
  trait: qTrait,
  chrono: qChrono,
  libre: (m) => qLibre(m)
};

function construireQuiz() {
  const v = portee.value;
  const corpus = v === "tous" ? MOUVEMENTS : MOUVEMENTS.filter((m) => m.siecle === v);
  const types = $$(".type-q:checked").map((c) => c.value);
  if (!types.length) { alert("Choisissez au moins un type de question."); return null; }
  const nb = parseInt($("#quiz-nb").value, 10);

  const questions = [];
  // On fait tourner les mouvements pour que tous soient interrogés équitablement.
  let reserve = melange(corpus);
  let iType = 0;
  const ordreTypes = melange(types);
  while (questions.length < nb) {
    if (!reserve.length) reserve = melange(corpus);
    const m = reserve.pop();
    const type = ordreTypes[iType++ % ordreTypes.length];
    questions.push(GENERATEURS[type](m, corpus));
  }
  return melange(questions);
}

$("#lancer-quiz").addEventListener("click", () => {
  const questions = construireQuiz();
  if (!questions) return;
  quiz = { questions, i: 0, score: 0, erreurs: [], parMvt: {} };
  montrerEcran("quiz-jeu");
  poserQuestion();
});

function montrerEcran(id) {
  ["quiz-accueil", "quiz-jeu", "quiz-resultats"].forEach((n) =>
    $("#" + n).classList.toggle("is-active", n === id)
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function poserQuestion() {
  const q = quiz.questions[quiz.i];
  $("#quiz-compteur").textContent = `${quiz.i + 1} / ${quiz.questions.length}`;
  $("#quiz-score").textContent = `${quiz.score} pt`;
  $("#quiz-barre").style.width = `${(quiz.i / quiz.questions.length) * 100}%`;
  $("#quiz-consigne").textContent = q.consigne;
  $("#quiz-question").innerHTML = q.question;
  $("#quiz-feedback").hidden = true;
  $("#quiz-suivant").hidden = true;

  const zoneLibre = $("#quiz-libre");
  const zoneQcm = $("#quiz-reponses");

  if (q.type === "libre") {
    zoneQcm.innerHTML = "";
    zoneLibre.hidden = false;
    $("#libre-saisie").value = "";
    $("#libre-correction").hidden = true;
    $("#libre-eval").hidden = true;
    $("#libre-voir").hidden = false;
  } else {
    zoneLibre.hidden = true;
    zoneQcm.innerHTML = "";
    q.choix.forEach((choix) => {
      const b = document.createElement("button");
      b.className = "reponse";
      b.textContent = choix;
      b.addEventListener("click", () => repondre(b, choix, q));
      zoneQcm.appendChild(b);
    });
  }
}

function enregistrer(q, juste) {
  const s = (quiz.parMvt[q.mvt] = quiz.parMvt[q.mvt] || { vues: 0, justes: 0 });
  s.vues++;
  if (juste) { s.justes++; quiz.score++; }
  else quiz.erreurs.push(q);
  noterReponse(q.mvt, juste);
  $("#quiz-score").textContent = `${quiz.score} pt`;
  $("#quiz-suivant").hidden = false;
  $("#quiz-suivant").textContent =
    quiz.i + 1 >= quiz.questions.length ? "Voir les résultats →" : "Question suivante →";
  $("#quiz-suivant").focus();
}

function repondre(bouton, choix, q) {
  const juste = choix === q.bonne;
  $$("#quiz-reponses .reponse").forEach((b) => {
    b.disabled = true;
    if (b.textContent === q.bonne) b.classList.add("bonne");
  });
  if (!juste) bouton.classList.add("mauvaise");

  const fb = $("#quiz-feedback");
  fb.hidden = false;
  fb.className = "feedback " + (juste ? "juste" : "faux");
  fb.innerHTML = juste
    ? `✅ Bonne réponse.${q.aide ? ` <span class="muted">${q.aide}</span>` : ""}`
    : `❌ La bonne réponse était : <strong>${q.bonne}</strong>.${q.aide ? `<br>${q.aide}` : ""}`;
  enregistrer(q, juste);
}

$("#libre-voir").addEventListener("click", () => {
  const q = quiz.questions[quiz.i];
  $("#libre-correction").hidden = false;
  $("#libre-correction").innerHTML =
    `<strong>Réponse attendue :</strong><ul>${q.reponse.map((r) => `<li>${r}</li>`).join("")}</ul>`;
  $("#libre-eval").hidden = false;
  $("#libre-voir").hidden = true;
});

$$("[data-eval]").forEach((b) =>
  b.addEventListener("click", () => {
    const q = quiz.questions[quiz.i];
    const juste = b.dataset.eval === "1";
    $$("[data-eval]").forEach((x) => (x.disabled = true));
    const fb = $("#quiz-feedback");
    fb.hidden = false;
    fb.className = "feedback " + (juste ? "juste" : "faux");
    fb.textContent = juste ? "✅ Compté comme acquis." : "❌ À revoir — ce mouvement sera dans le bilan.";
    enregistrer(q, juste);
  })
);

$("#quiz-suivant").addEventListener("click", () => {
  quiz.i++;
  $$("[data-eval]").forEach((x) => (x.disabled = false));
  if (quiz.i >= quiz.questions.length) afficherResultats();
  else poserQuestion();
});

$("#quiz-abandon").addEventListener("click", () => {
  if (confirm("Arrêter le contrôle en cours ?")) montrerEcran("quiz-accueil");
});

function afficherResultats() {
  const total = quiz.questions.length;
  const pct = Math.round((quiz.score / total) * 100);
  const note = Math.round((quiz.score / total) * 20 * 10) / 10;
  const mention =
    pct >= 90 ? "Excellent — c'est acquis !" :
    pct >= 75 ? "Très bien, quelques détails à consolider." :
    pct >= 50 ? "Des bases correctes : reprenez les fiches en rouge." :
    "À retravailler : passez d'abord en mode apprentissage.";

  $("#score-final").innerHTML =
    `<strong>${quiz.score} / ${total}</strong> — ${pct}% <span class="mention">Soit ${note}/20 · ${mention}</span>`;

  $("#bilan-mouvements").innerHTML = Object.entries(quiz.parMvt)
    .map(([id, s]) => {
      const m = MOUVEMENTS.find((x) => x.id === id);
      const p = Math.round((s.justes / s.vues) * 100);
      return `<div class="bilan-ligne">
        <span class="nom-mvt">${m ? m.nom : id}</span>
        <span class="bilan-jauge"><span style="width:${p}%;background:${p >= 60 ? "var(--ok)" : "var(--ko)"}"></span></span>
        <span class="muted">${s.justes}/${s.vues}</span>
      </div>`;
    })
    .join("");

  $("#revisions").innerHTML = quiz.erreurs.length
    ? quiz.erreurs
        .map(
          (q) => `<div class="revision">
            <div>${q.question}</div>
            <div class="att">→ ${q.bonne}</div>
          </div>`
        )
        .join("")
    : `<p class="muted">Aucune erreur. Bravo !</p>`;

  $("#quiz-barre").style.width = "100%";
  montrerEcran("quiz-resultats");
  afficherStatsResume();
}

$("#rejouer").addEventListener("click", () => montrerEcran("quiz-accueil"));

$("#reviser-erreurs").addEventListener("click", () => {
  const rates = Object.entries(quiz.parMvt)
    .filter(([, s]) => s.justes < s.vues)
    .map(([id]) => id);
  const aRevoir = MOUVEMENTS.filter((m) => rates.includes(m.id));
  selection = aRevoir.length ? aRevoir : MOUVEMENTS.slice();
  index = 0;
  filtreSiecle.value = "tous";
  $("#compteur-filtre").textContent = aRevoir.length
    ? `${aRevoir.length} mouvement(s) à revoir`
    : `${selection.length} mouvements`;
  rendreApprentissage();
  $$(".mode-btn").find((b) => b.dataset.mode === "apprentissage").click();
});

function afficherStatsResume() {
  const ids = Object.keys(STATS);
  if (!ids.length) {
    $("#stats-resume").innerHTML = "<em>Aucun contrôle enregistré pour l'instant.</em>";
    return;
  }
  const totalVues = ids.reduce((n, id) => n + STATS[id].vues, 0);
  const totalJustes = ids.reduce((n, id) => n + STATS[id].justes, 0);
  const faibles = ids
    .map((id) => ({ id, ...STATS[id] }))
    .filter((s) => s.vues >= 2 && s.justes / s.vues < 0.6)
    .sort((a, b) => a.justes / a.vues - b.justes / b.vues)
    .slice(0, 3)
    .map((s) => (MOUVEMENTS.find((m) => m.id === s.id) || {}).nom)
    .filter(Boolean);

  $("#stats-resume").innerHTML =
    `<strong>Historique :</strong> ${totalJustes}/${totalVues} bonnes réponses (${Math.round((totalJustes / totalVues) * 100)}%).` +
    (faibles.length ? `<br><strong>À travailler en priorité :</strong> ${faibles.join(", ")}.` : "") +
    ` <button id="raz-stats" class="btn btn-ghost" style="padding:.2rem .6rem;font-size:.85rem">Réinitialiser</button>`;

  $("#raz-stats").addEventListener("click", () => {
    if (confirm("Effacer l'historique de vos résultats ?")) {
      localStorage.removeItem("fl-stats");
      STATS = {};
      afficherStatsResume();
    }
  });
}

/* ====================== Démarrage ====================== */
appliquerFiltre();
afficherStatsResume();
