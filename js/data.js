/* Données issues de la fiche « Les principaux mouvements littéraires ». */

const MOUVEMENTS = [
  {
    id: "pleiade",
    nom: "La Pléiade",
    siecle: "XVIe siècle",
    dates: "1549-1560",
    debut: 1549,
    definition:
      "Courant poétique formé par un groupe de sept poètes. Nom emprunté à une constellation de sept étoiles.",
    principes: [
      "Création d'une grande poésie en langue française qui puisse rivaliser avec la poésie grecque et latine",
      "Admiration pour l'Antiquité et pour l'Italie (en particulier Pétrarque)",
      "Le poète est serviteur de la Beauté"
    ],
    themes: [
      "Le lyrisme",
      "La fuite du temps",
      "Le sentiment amoureux",
      "La mythologie"
    ],
    genres: ["Poésie"],
    formes: [
      "Sonnet, ode, élégie",
      "Allégorie, métaphore, comparaison",
      "Travail sur le rythme et la musicalité"
    ],
    auteurs: ["Du Bellay (1522-1560)", "Ronsard (1524-1585)"]
  },
  {
    id: "baroque",
    nom: "Le Baroque",
    siecle: "XVIIe siècle",
    dates: "1610-1660",
    debut: 1610,
    definition:
      "Conception artistique née dès la fin du XVIe siècle. Le mot vient du portugais barroco, « perle irrégulière ».",
    principes: [
      "Le monde n'est pas figé : goût pour ce qui change, est éphémère, n'a pas de règles",
      "Importance de l'illusion et de la métamorphose",
      "Le monde est parfois présenté comme en désordre : importance du chaos",
      "Goût pour le bizarre"
    ],
    themes: [
      "L'instabilité",
      "L'apparence",
      "L'illusion",
      "Les motifs de l'eau, la fumée, le miroir, les bulles",
      "Le mouvement"
    ],
    genres: ["Poésie", "Roman", "Théâtre"],
    formes: [
      "Le théâtre dans le théâtre",
      "Nombreuses figures de style : métaphores, allégories, comparaisons, antithèses",
      "Recherche de l'effet et de la complexité"
    ],
    auteurs: [
      "Saint-Amant (1594-1661)",
      "Théophile de Viau (1590-1626)",
      "Corneille (les comédies)",
      "Cyrano de Bergerac"
    ]
  },
  {
    id: "classicisme",
    nom: "Le Classicisme",
    siecle: "XVIIe siècle",
    dates: "1660-1680",
    debut: 1660,
    definition:
      "Idéal esthétique et humain représenté par les écrivains de la seconde moitié du XVIIe siècle : les « Classiques ».",
    principes: [
      "Imitation des Anciens, sans renoncer à faire œuvre personnelle",
      "Goût de l'analyse : l'écrivain se fait moraliste",
      "Dépassement de l'individu pour atteindre un Homme éternel, un Beau idéal, une vérité universelle",
      "Désir de plaire"
    ],
    themes: [
      "La séparation des genres",
      "Le respect des règles : les trois unités, la vraisemblance, les bienséances",
      "Équilibre, mesure, ordre",
      "Simplicité et naturel dans le style"
    ],
    genres: ["Théâtre", "Poésie", "Roman"],
    formes: [
      "Tragédies classiques",
      "Comédie exploitant tous les niveaux de comique",
      "Roman psychologique, fable, éloquence religieuse"
    ],
    auteurs: [
      "Molière (1622-1673)",
      "Racine (1639-1699)",
      "La Fontaine (1621-1695)",
      "Bossuet (1627-1704)"
    ]
  },
  {
    id: "lumieres",
    nom: "Les Lumières",
    siecle: "XVIIIe siècle",
    dates: "1751-1772",
    debut: 1751,
    definition:
      "Ce mouvement d'idées s'exprime depuis la fin du XVIIe siècle mais prend toute son ampleur avec l'entreprise de l'Encyclopédie.",
    principes: [
      "Développement des connaissances et émancipation de la pensée (vulgarisation)",
      "Foi dans le progrès",
      "Primauté de la pensée rationnelle (observation, expérience, esprit d'examen) appliquée aux sciences mais aussi aux autres domaines"
    ],
    themes: [
      "La critique des préjugés",
      "La lutte contre le fanatisme, les superstitions, le surnaturel",
      "Le refus de la métaphysique et des dogmes religieux",
      "La tolérance et la liberté",
      "La recherche du bonheur"
    ],
    genres: ["Roman", "Essai (surtout)"],
    formes: [
      "Essais, contes philosophiques, romans",
      "Articles de dictionnaire, discours, pamphlets",
      "Tonalité ironique, souvent"
    ],
    auteurs: [
      "Voltaire (1694-1778)",
      "Montesquieu (1689-1755)",
      "Rousseau (1712-1778)",
      "Diderot (1713-1784)"
    ]
  },
  {
    id: "romantisme",
    nom: "Le Romantisme",
    siecle: "XIXe siècle",
    dates: "1820-1850",
    debut: 1820,
    definition:
      "Mouvement littéraire et artistique en rupture avec les règles, le goût et le Beau classiques.",
    principes: [
      "Importance de la sensibilité",
      "Aspiration vers l'infini, sentiment religieux",
      "Désir d'évasion (goût du passé, de l'exotisme)",
      "Mélancolie, mal de vivre, passions",
      "Le Moi et la valorisation de l'individu"
    ],
    themes: [
      "Le sentiment amoureux",
      "Le moi souffrant",
      "La nature",
      "Le mal de vivre",
      "Tonalités lyrique et pathétique",
      "La première personne"
    ],
    genres: ["Poésie", "Roman", "Théâtre"],
    formes: [
      "Poésie ou prose lyrique (méditation, exaltation)",
      "Tonalité épique, élégie, métaphores allégoriques",
      "Mélange des genres : au théâtre, le drame romantique"
    ],
    auteurs: [
      "Chateaubriand (1768-1848)",
      "Lamartine (1790-1869)",
      "Musset (1810-1857)",
      "Hugo (1802-1885)"
    ]
  },
  {
    id: "parnasse",
    nom: "Le Parnasse",
    siecle: "XIXe siècle",
    dates: "1850-1860",
    debut: 1850,
    definition:
      "Courant en réaction contre le romantisme et qui s'attache à « l'art pour l'art ».",
    principes: [
      "Refus des épanchements romantiques considérés comme excessifs",
      "Goût pour la poésie descriptive, aux lignes pures, à la plastique impeccable, parfaite",
      "La seule raison d'être des œuvres est la beauté (« l'art pour l'art »)"
    ],
    themes: [
      "La nature est traitée comme une peinture",
      "Recherche des harmonies de couleurs et des effets de chatoiement (bijoux, etc.)",
      "Inspiration puisée dans l'Antiquité, l'archéologie"
    ],
    genres: ["Poésie"],
    formes: [
      "Sonnets, ballades, rondeaux…",
      "Recherche du mot ou de l'expression juste (vers la perfection)",
      "Poésie aux lignes pures"
    ],
    auteurs: [
      "Leconte de Lisle (1818-1894)",
      "Théophile Gautier (1811-1872)",
      "Hérédia (1842-1905)"
    ]
  },
  {
    id: "realisme",
    nom: "Le Réalisme",
    siecle: "XIXe siècle",
    dates: "1830-1870",
    debut: 1830,
    definition:
      "Courant artistique en réaction contre l'idéalisme et le lyrisme du romantisme.",
    principes: [
      "Reproduction la plus fidèle possible de la réalité",
      "Le romancier, comparable au savant, applique les méthodes des sciences de l'observation et de la philosophie positiviste"
    ],
    themes: [
      "Les mœurs d'une époque, d'un milieu",
      "Les liens avec le contexte historique, politique, social",
      "L'influence du milieu sur l'individu",
      "La ville, la province, les misères sociales et l'ascension sociale"
    ],
    genres: ["Roman"],
    formes: [
      "Souci d'objectivité, 3e personne",
      "Intrigues tirées de faits divers, descriptions",
      "Tonalité réaliste, documentation, recherche du fait « vrai »"
    ],
    auteurs: [
      "Stendhal (1783-1842)",
      "Balzac (1799-1850)",
      "Flaubert (1821-1880)"
    ]
  },
  {
    id: "naturalisme",
    nom: "Le Naturalisme",
    siecle: "XIXe siècle",
    dates: "1870-1890",
    debut: 1870,
    definition:
      "Mouvement né de l'influence des sciences, de la médecine expérimentale et des débuts de la psychiatrie.",
    principes: [
      "Renforce certains caractères du réalisme",
      "Le romancier vérifie expérimentalement dans ses romans le rôle des déterminismes sociaux et biologiques sur l'individu et le groupe"
    ],
    themes: [
      "Le rôle du physiologique",
      "L'étude des tares psychiques et physiques",
      "L'hérédité et le milieu",
      "Le monde du travail",
      "Les paysages urbains, la machine, la Révolution industrielle"
    ],
    genres: ["Roman (surtout)"],
    formes: [
      "Cycle romanesque sur plusieurs générations",
      "Description du milieu, vocabulaire technique ou spécifique",
      "Langage parlé ou populaire, métaphores grossissantes épiques"
    ],
    auteurs: ["Zola (1840-1902)", "Maupassant (1850-1893)", "Les Goncourt"]
  },
  {
    id: "symbolisme",
    nom: "Le Symbolisme",
    siecle: "XIXe siècle",
    dates: "1869-1896",
    debut: 1869,
    definition:
      "École poétique née dans le prolongement de la poésie de Baudelaire, en réaction contre le naturalisme.",
    principes: [
      "Subjectivité de la connaissance",
      "Suggérer plutôt que nommer, décrire ou raconter",
      "Importance accordée aux sensations, aux correspondances"
    ],
    themes: [
      "Mythologie, légendes médiévales, textes bibliques",
      "Correspondances entre le monde sensible et ce qu'il cache",
      "La poésie comme moyen d'accès à ce monde caché"
    ],
    genres: ["Poésie (surtout)"],
    formes: [
      "Poèmes en prose",
      "Vers libre",
      "Symboles",
      "Vers impair et recherche de la musicalité"
    ],
    auteurs: [
      "Verlaine (1844-1896)",
      "Rimbaud (1854-1891)",
      "Mallarmé (1842-1898)"
    ]
  },
  {
    id: "surrealisme",
    nom: "Le Surréalisme",
    siecle: "XXe siècle",
    dates: "1924-1969",
    debut: 1924,
    definition:
      "Mouvement artistique né au lendemain de la 1re guerre mondiale, dans le prolongement d'Apollinaire et de Dada.",
    principes: [
      "Exploration de l'inconscient : rôle du hasard, des associations fortuites dans la création artistique",
      "Refus des catégories esthétiques traditionnelles",
      "L'art comme instrument de libération et de révolution (dimension politique)",
      "Rejet du rationalisme"
    ],
    themes: [
      "L'amour fou et la femme",
      "La révolte",
      "La magie des villes et les rencontres insolites",
      "L'inconscient, le rêve, l'imagination"
    ],
    genres: ["Tous"],
    formes: [
      "Poèmes, écriture automatique, jeux surréalistes",
      "Collages, calligrammes",
      "Associations d'idées et d'images, métaphores-choc"
    ],
    auteurs: [
      "Breton (1896-1966)",
      "Eluard (1895-1952)",
      "Aragon (1897-1982)",
      "Desnos (1900-1945)",
      "Péret (1899-1959)"
    ]
  },
  {
    id: "absurde",
    nom: "L'Absurde",
    siecle: "XXe siècle",
    dates: "1938-1960",
    debut: 1938,
    definition:
      "Au départ, notion philosophique issue de l'existentialisme ; elle s'illustre ensuite dans diverses œuvres.",
    principes: [
      "Expression de l'absurdité de la condition humaine, de l'« étrangeté » de l'homme",
      "Pour le théâtre : rupture avec le théâtre traditionnel",
      "Refus du théâtre réaliste et psychologique, mise en question de l'intrigue",
      "Distanciation"
    ],
    themes: [
      "La solitude de l'homme",
      "Le silence du monde",
      "L'attente",
      "Les plongées dans l'inconscient",
      "L'insignifiance ou la prolifération du langage"
    ],
    genres: ["Roman", "Théâtre"],
    formes: [
      "Refus des structures traditionnelles (actes, scènes)",
      "Monologues, non-sens, répétitions, incohérences",
      "Importantes didascalies, invasion des objets"
    ],
    auteurs: [
      "Sartre (1905-1980)",
      "Camus (1913-1960)",
      "Ionesco (1912-1994)",
      "Beckett (1906-1989)"
    ]
  },
  {
    id: "nouveau-roman",
    nom: "Le Nouveau Roman",
    siecle: "XXe siècle",
    dates: "1950-1980",
    debut: 1950,
    definition:
      "Nom d'un ensemble d'œuvres romanesques marquées par la déconstruction du roman traditionnel (elles paraissent aux Éditions de Minuit).",
    principes: [
      "Refus du roman psychologique",
      "Remise en question et abandon du personnage",
      "Refus du déroulement chronologique"
    ],
    themes: [
      "Le sujet des romans : l'« aventure d'une écriture »",
      "De nombreux procédés de narration et de construction",
      "Absence d'intrigue",
      "Discontinuité du récit"
    ],
    genres: ["Roman"],
    formes: [
      "Importance des descriptions, précision minutieuse",
      "Monologue intérieur",
      "Rôle important des lieux et des objets"
    ],
    auteurs: [
      "Robbe-Grillet (1922-2008)",
      "Michel Butor (1926-2016)",
      "Nathalie Sarraute (1900-1999)",
      "Claude Simon (1913-2005)"
    ]
  }
];

const CHAMPS = [
  { cle: "definition", label: "Définition", icone: "📖" },
  { cle: "dates", label: "Dates", icone: "📅" },
  { cle: "principes", label: "Principes et caractéristiques", icone: "🎯" },
  { cle: "themes", label: "Thèmes", icone: "💭" },
  { cle: "genres", label: "Genres concernés", icone: "📚" },
  { cle: "formes", label: "Formes et procédés", icone: "✒️" },
  { cle: "auteurs", label: "Auteurs représentatifs", icone: "👤" }
];
