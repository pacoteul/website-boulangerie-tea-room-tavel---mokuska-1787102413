export type ThemeName = 'food' | 'architecture' | 'tech' | 'nature' | 'abstract' | 'dentist' | 'agriculture' | 'construction' | 'garage';

export interface ThemeConfig {
  cards: {
    title: string;
    description: string;
    icon: string;
    image: string;
  }[];
  cta: {
    title: string;
    subtitle: string;
  };
}

export const themes: Record<ThemeName, ThemeConfig> = {
  food: {
    cards: [
      {
        title: "Artisanat d'Exception",
        description: "Des ingrédients bruts sélectionnés avec la plus grande exigence et un savoir-faire ancestral pour des créations qui éveillent les sens.",
        icon: "🌾",
        image: "/images/premium.jpg" // Renamed earlier during generation
      },
      {
        title: "Pâtisserie Créative",
        description: "L'audace de revisiter les grands classiques avec des visuels époustouflants et des textures inédites.",
        icon: "✨",
        image: "/images/innovation.jpg"
      },
      {
        title: "L'Amour du Geste",
        description: "Chaque matin, nos artisans façonnent vos pains et viennoiseries à la main, avec passion et patience.",
        icon: "👐",
        image: "/images/surmesure.jpg"
      }
    ],
    cta: {
      title: "Envie de sublimer votre vitrine digitale ?",
      subtitle: "Faites vivre à vos clients l'expérience de votre boulangerie avant même qu'ils n'y entrent."
    }
  },
  architecture: {
    cards: [
      {
        title: "Vision Intemporelle",
        description: "Des lignes épurées et des volumes magistraux pensés pour s'intégrer parfaitement à leur environnement tout en le sublimant.",
        icon: "🏛️",
        image: "/images/architecture_premium_1786625374387.jpg"
      },
      {
        title: "Ingénierie de Demain",
        description: "L'utilisation de matériaux durables et de modélisations paramétriques pour repousser les limites de la construction moderne.",
        icon: "📐",
        image: "/images/architecture_innovation_1786625386086.jpg"
      },
      {
        title: "Espaces à Vivre",
        description: "Chaque projet est une traduction minutieuse de votre mode de vie, sculptant la lumière pour créer des intérieurs uniques.",
        icon: "✨",
        image: "/images/architecture_surmesure_1786625397117.jpg"
      }
    ],
    cta: {
      title: "Prêt à bâtir votre prochain chef-d'œuvre ?",
      subtitle: "Offrez à vos futurs acquéreurs une projection 3D hyper-réaliste de leurs futurs espaces."
    }
  },
  tech: {
    cards: [
      {
        title: "Performance Absolue",
        description: "Une architecture cloud scalable et des algorithmes optimisés pour garantir une vitesse d'exécution sans compromis.",
        icon: "⚡",
        image: "/images/tech_premium_1786625426730.jpg"
      },
      {
        title: "Code de Pointe",
        description: "Repousser les limites du possible avec des stacks technologiques de dernière génération et une sécurité infaillible.",
        icon: "💻",
        image: "/images/tech_innovation_1786625437046.jpg"
      },
      {
        title: "Solutions Sur-Mesure",
        description: "Parce que chaque entreprise a des défis uniques, nous concevons des outils qui s'adaptent parfaitement à vos processus complexes.",
        icon: "⚙️",
        image: "/images/tech_surmesure_1786625447269.jpg"
      }
    ],
    cta: {
      title: "Accélérez votre transformation digitale",
      subtitle: "Passez à la vitesse supérieure avec une plateforme conçue pour l'excellence technique et l'expérience utilisateur."
    }
  },
  nature: {
    cards: [
      {
        title: "L'Essence du Végétal",
        description: "Une reconnexion profonde avec la nature grâce à des compositions organiques et des matériaux respectueux de l'écosystème.",
        icon: "🌿",
        image: "/images/nature_premium_1786625482791.jpg"
      },
      {
        title: "Éco-Innovation",
        description: "L'intégration de systèmes bioluminescents et de solutions durables pour une empreinte carbone minimisée au maximum.",
        icon: "💧",
        image: "/images/nature_innovation_1786625493498.jpg"
      },
      {
        title: "Culture Raisonnée",
        description: "Un profond respect pour les cycles naturels, où chaque graine est plantée à la main dans un sol nourri avec bienveillance.",
        icon: "🌱",
        image: "/images/nature_surmesure_1786625504072.jpg"
      }
    ],
    cta: {
      title: "Revenez à l'essentiel, naturellement",
      subtitle: "Transmettez vos valeurs éco-responsables à travers une expérience digitale pure et apaisante."
    }
  },
  abstract: {
    cards: [
      {
        title: "Élégance Minimale",
        description: "Une esthétique épurée où chaque élément géométrique est soigneusement placé pour créer une harmonie visuelle parfaite.",
        icon: "💎",
        image: "/images/abstract_premium_1786625550213.jpg"
      },
      {
        title: "Formes et Fluides",
        description: "L'exploration de nouvelles dimensions abstraites et de textures métalliques pour un rendu résolument avant-gardiste.",
        icon: "🌀",
        image: "/images/abstract_premium_1786625550213.jpg" // Fallback to premium due to quota
      },
      {
        title: "Contrastes Absolus",
        description: "Un jeu subtil entre ombre et lumière, entre verre dépoli et or pur, conçu pour marquer les esprits de manière indélébile.",
        icon: "✨",
        image: "/images/abstract_premium_1786625550213.jpg" // Fallback to premium due to quota
      }
    ],
    cta: {
      title: "Démarquez-vous par l'abstraction",
      subtitle: "Offrez à votre marque une identité visuelle luxueuse, mystérieuse et profondément unique."
    }
  },
  dentist: {
    cards: [
      {
        title: "L'Excellence Dentaire",
        description: "Un cabinet pensé comme un écrin de sérénité, combinant une hygiène clinique irréprochable et un confort luxueux.",
        icon: "💎",
        image: "/images/dentist_premium_1786642250324.jpg"
      },
      {
        title: "Technologie de Pointe",
        description: "L'utilisation de scanners 3D et d'équipements de dernière génération pour des diagnostics ultra-précis et des soins sans douleur.",
        icon: "🔬",
        image: "/images/dentist_innovation_1786642259288.jpg"
      },
      {
        title: "Le Sourire Parfait",
        description: "Chaque sourire est une œuvre d'art. Nous sculptons votre esthétique dentaire sur mesure pour révéler votre pleine confiance.",
        icon: "✨",
        image: "/images/dentist_surmesure_1786642270878.jpg"
      }
    ],
    cta: {
      title: "Sublimez votre cabinet dentaire",
      subtitle: "Offrez à vos patients une première impression digitale aussi rassurante et premium que vos soins."
    }
  },
  agriculture: {
    cards: [
      {
        title: "L'Essence du Terroir",
        description: "Une production authentique, respectueuse des saisons et de la terre, pour offrir des produits d'une qualité exceptionnelle.",
        icon: "🌾",
        image: "/images/agriculture_premium_1786674536027.jpg"
      },
      {
        title: "Agriculture Connectée",
        description: "L'alliance de notre savoir-faire traditionnel avec les dernières technologies d'irrigation et de suivi des récoltes.",
        icon: "🚜",
        image: "/images/agriculture_innovation_1786674545561.jpg"
      },
      {
        title: "Du Champ à l'Assiette",
        description: "Chaque légume est cultivé avec passion et cueilli à la main pour garantir une fraîcheur et un goût inégalables.",
        icon: "👐",
        image: "/images/agriculture_surmesure_1786674554258.jpg"
      }
    ],
    cta: {
      title: "Valorisez vos récoltes en ligne",
      subtitle: "Montrez à vos clients l'authenticité de votre domaine avec une vitrine digitale moderne."
    }
  },
  construction: {
    cards: [
      {
        title: "Bâtir l'Avenir",
        description: "Une expertise pointue dans la construction de structures solides, alliant design moderne et respect des normes les plus strictes.",
        icon: "🏗️",
        image: "/images/construction_premium_1786674578398.jpg"
      },
      {
        title: "Innovation Chantiers",
        description: "Utilisation de modélisation 3D, réalité augmentée et matériaux intelligents pour des constructions plus rapides et durables.",
        icon: "👷",
        image: "/images/construction_innovation_1786674587741.jpg"
      },
      {
        title: "L'Amour du Métier",
        description: "Nos artisans mettent tout leur cœur et leur savoir-faire manuel pour des finitions sur-mesure d'une précision millimétrique.",
        icon: "🔨",
        image: "/images/construction_surmesure_1786674598411.jpg"
      }
    ],
    cta: {
      title: "Construisez votre visibilité",
      subtitle: "Prouvez l'excellence de vos chantiers avec un site web à la hauteur de votre savoir-faire."
    }
  },
  garage: {
    cards: [
      {
        title: "Performance Mécanique",
        description: "Un service premium dédié aux véhicules de prestige et de collection, pour une conduite toujours fluide et sécurisée.",
        icon: "🏎️",
        image: "/images/garage_premium_1786674627155.jpg"
      },
      {
        title: "Diagnostic Haute Tech",
        description: "Des équipements de pointe capables de lire, analyser et optimiser les moteurs électriques et thermiques les plus complexes.",
        icon: "🔋",
        image: "/images/garage_innovation_1786674637394.jpg"
      },
      {
        title: "L'Expertise Manuelle",
        description: "Nos mécaniciens passionnés démontent, nettoient et réajustent chaque pièce avec une précision chirurgicale.",
        icon: "🔧",
        image: "/images/garage_surmesure_1786674645837.jpg"
      }
    ],
    cta: {
      title: "Accélérez vos prises de rendez-vous",
      subtitle: "Donnez confiance à vos futurs clients avec un site vitrine professionnel et rassurant."
    }
  }
};

