import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, Sparkles } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: string;
  chapters: string[];
}

interface SubjectMenuProps {
  onSelectChapter: (subject: string, chapter: string) => void;
}

const CBSE_SUBJECTS: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    chapters: [
      "Electric Charges and Fields",
      "Electrostatic Potential",
      "Current Electricity",
      "Magnetic Effects of Current",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics",
      "Wave Optics",
      "Dual Nature of Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics"
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    chapters: [
      "The Solid State",
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "Surface Chemistry",
      "General Principles and Processes",
      "p-Block Elements",
      "d and f Block Elements",
      "Coordination Compounds",
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones",
      "Amines",
      "Biomolecules"
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    chapters: [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Applications of Derivatives",
      "Integrals",
      "Applications of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability"
    ]
  },
  {
    id: "biology",
    name: "Biology",
    icon: "🧬",
    chapters: [
      "Reproduction in Organisms",
      "Sexual Reproduction in Flowering Plants",
      "Human Reproduction",
      "Reproductive Health",
      "Principles of Inheritance",
      "Molecular Basis of Inheritance",
      "Evolution",
      "Human Health and Disease",
      "Strategies for Food Production",
      "Microbes in Human Welfare",
      "Biotechnology Principles",
      "Biotechnology Applications",
      "Organisms and Populations",
      "Ecosystem",
      "Biodiversity and Conservation"
    ]
  }
];

export const SubjectMenu = ({ onSelectChapter }: SubjectMenuProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(selectedSubject === subjectId ? null : subjectId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-background/95 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-7xl font-display font-black text-glow tracking-tight">
                CBSE CLASS 12
              </h1>
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </motion.div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CBSE_SUBJECTS.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    selectedSubject === subject.id ? "scale-105" : ""
                  }`}
                  onClick={() => handleSubjectClick(subject.id)}
                >
                  {/* Subject Card */}
                  <div className="relative glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl drop-shadow-lg">{subject.icon}</div>
                      <div>
                        <h2 className="text-3xl font-display font-black text-primary tracking-tight">
                          {subject.name}
                        </h2>
                        <p className="text-sm text-muted-foreground font-body font-light">
                          {subject.chapters.length} Chapters
                        </p>
                      </div>
                      <ChevronRight
                        className={`ml-auto w-6 h-6 transition-transform duration-300 ${
                          selectedSubject === subject.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {/* Chapters List */}
                    <AnimatePresence>
                      {selectedSubject === subject.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-2 pt-4 border-t border-primary/20">
                            {subject.chapters.map((chapter, chapterIndex) => (
                              <motion.button
                                key={chapterIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: chapterIndex * 0.05 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectChapter(subject.name, chapter);
                                }}
                                className="group/chapter flex items-center gap-3 px-4 py-3 glass-card hover:bg-primary/10 rounded-lg transition-all duration-200 text-left hover:border-primary/50"
                              >
                                <BookOpen className="w-4 h-4 text-primary/50 group-hover/chapter:text-primary transition-colors" />
                                <span className="text-sm font-body text-foreground/90 group-hover/chapter:text-primary transition-colors">
                                  {chapter}
                                </span>
                                <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover/chapter:opacity-100 transition-opacity" />
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
