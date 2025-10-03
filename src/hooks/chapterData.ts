// Comprehensive CBSE Class 12 chapter data for all subjects

interface Node {
  id: string;
  x: number;
  y: number;
  title: string;
  status: "locked" | "current" | "completed";
  chapter: number;
  description?: string;
  connections?: string[];
}

interface Chapter {
  id: number;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface ChapterData {
  chapters: Chapter[];
  nodes: Node[];
}

type SubjectData = {
  [chapter: string]: ChapterData;
};

export const chapterData: { [subject: string]: SubjectData } = {
  Physics: {
    "Electric Charges and Fields": {
      chapters: [
        { id: 1, title: "Fundamentals", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Applications", x: 2000, y: 1400, width: 700, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Electric Charge", status: "completed", chapter: 1, description: "Properties and types of charges", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1300, title: "Coulomb's Law", status: "completed", chapter: 1, description: "Force between charges", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Electric Field", status: "current", chapter: 1, description: "Field due to point charges", connections: ["1-4", "2-1"] },
        { id: "1-4", x: 850, y: 1550, title: "Field Lines", status: "locked", chapter: 1, description: "Visualization of electric fields", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "Gauss's Law", status: "locked", chapter: 2, description: "Flux and applications", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "Dipole", status: "locked", chapter: 2, description: "Electric dipole in fields", connections: [] },
      ],
    },
    "Electrostatic Potential and Capacitance": {
      chapters: [
        { id: 1, title: "Potential Theory", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Capacitors", x: 2000, y: 1400, width: 800, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Potential", status: "completed", chapter: 1, description: "Electric potential concept", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Potential Energy", status: "current", chapter: 1, description: "Energy in electric fields", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Equipotential", status: "locked", chapter: 1, description: "Equipotential surfaces", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "Capacitor Basics", status: "locked", chapter: 2, description: "Charge storage", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "Combinations", status: "locked", chapter: 2, description: "Series and parallel", connections: ["2-3"] },
        { id: "2-3", x: 2100, y: 1400, title: "Dielectrics", status: "locked", chapter: 2, description: "Dielectric materials", connections: [] },
      ],
    },
    "Current Electricity": {
      chapters: [
        { id: 1, title: "Current & Resistance", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Circuits", x: 2200, y: 1400, width: 900, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Electric Current", status: "completed", chapter: 1, description: "Flow of charges", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Ohm's Law", status: "current", chapter: 1, description: "V = IR relationship", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Resistance", status: "locked", chapter: 1, description: "Resistivity and factors", connections: ["1-4", "2-1"] },
        { id: "1-4", x: 1000, y: 1550, title: "Temperature Effect", status: "locked", chapter: 1, description: "Resistance variation", connections: ["2-1"] },
        { id: "2-1", x: 1900, y: 1350, title: "Series-Parallel", status: "locked", chapter: 2, description: "Circuit combinations", connections: ["2-2"] },
        { id: "2-2", x: 2100, y: 1400, title: "Kirchhoff's Laws", status: "locked", chapter: 2, description: "Current and voltage laws", connections: ["2-3"] },
        { id: "2-3", x: 2300, y: 1500, title: "Wheatstone Bridge", status: "locked", chapter: 2, description: "Resistance measurement", connections: [] },
      ],
    },
  },
  Chemistry: {
    "The Solid State": {
      chapters: [
        { id: 1, title: "Structure", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Properties", x: 2000, y: 1400, width: 700, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Crystal Lattice", status: "completed", chapter: 1, description: "Unit cells and structures", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Packing", status: "current", chapter: 1, description: "Close packing in solids", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Voids", status: "locked", chapter: 1, description: "Tetrahedral and octahedral", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "Imperfections", status: "locked", chapter: 2, description: "Point defects", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "Properties", status: "locked", chapter: 2, description: "Electrical and magnetic", connections: [] },
      ],
    },
    "Solutions": {
      chapters: [
        { id: 1, title: "Concentration", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Colligative", x: 2000, y: 1400, width: 800, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Types", status: "completed", chapter: 1, description: "Solution classification", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Concentration", status: "current", chapter: 1, description: "Molarity, molality", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Raoult's Law", status: "locked", chapter: 1, description: "Vapor pressure", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "BP Elevation", status: "locked", chapter: 2, description: "Boiling point rise", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "FP Depression", status: "locked", chapter: 2, description: "Freezing point decrease", connections: ["2-3"] },
        { id: "2-3", x: 2100, y: 1400, title: "Osmotic Pressure", status: "locked", chapter: 2, description: "Pressure phenomena", connections: [] },
      ],
    },
    "Electrochemistry": {
      chapters: [
        { id: 1, title: "Cells", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Conductance", x: 2200, y: 1400, width: 800, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Redox", status: "completed", chapter: 1, description: "Oxidation-reduction", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Galvanic Cell", status: "current", chapter: 1, description: "Spontaneous reactions", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "EMF", status: "locked", chapter: 1, description: "Cell potential", connections: ["1-4", "2-1"] },
        { id: "1-4", x: 1000, y: 1550, title: "Nernst Equation", status: "locked", chapter: 1, description: "Potential calculation", connections: ["2-1"] },
        { id: "2-1", x: 1900, y: 1350, title: "Conductivity", status: "locked", chapter: 2, description: "Ionic conductance", connections: ["2-2"] },
        { id: "2-2", x: 2100, y: 1400, title: "Electrolysis", status: "locked", chapter: 2, description: "Electrolytic cells", connections: ["2-3"] },
        { id: "2-3", x: 2300, y: 1500, title: "Batteries", status: "locked", chapter: 2, description: "Primary and secondary", connections: [] },
      ],
    },
  },
  Mathematics: {
    "Relations and Functions": {
      chapters: [
        { id: 1, title: "Basics", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Types", x: 2000, y: 1400, width: 700, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Relations", status: "completed", chapter: 1, description: "Domain and range", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Functions", status: "current", chapter: 1, description: "One-one, onto", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Composition", status: "locked", chapter: 1, description: "Function composition", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "Inverse", status: "locked", chapter: 2, description: "Invertible functions", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "Binary Operations", status: "locked", chapter: 2, description: "Operations on sets", connections: [] },
      ],
    },
    "Inverse Trigonometric Functions": {
      chapters: [
        { id: 1, title: "Definitions", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Properties", x: 2000, y: 1400, width: 800, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Inverse Sine", status: "completed", chapter: 1, description: "sin⁻¹ function", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Inverse Cosine", status: "current", chapter: 1, description: "cos⁻¹ function", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Inverse Tangent", status: "locked", chapter: 1, description: "tan⁻¹ function", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "Properties", status: "locked", chapter: 2, description: "Addition formulas", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "Graphs", status: "locked", chapter: 2, description: "Domain and range", connections: [] },
      ],
    },
    "Matrices": {
      chapters: [
        { id: 1, title: "Operations", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Determinants", x: 2200, y: 1400, width: 800, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Matrix Types", status: "completed", chapter: 1, description: "Row, column, square", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Addition", status: "current", chapter: 1, description: "Matrix addition", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Multiplication", status: "locked", chapter: 1, description: "Matrix product", connections: ["1-4", "2-1"] },
        { id: "1-4", x: 1000, y: 1550, title: "Transpose", status: "locked", chapter: 1, description: "Matrix transpose", connections: ["2-1"] },
        { id: "2-1", x: 1900, y: 1350, title: "Determinants", status: "locked", chapter: 2, description: "2×2 and 3×3", connections: ["2-2"] },
        { id: "2-2", x: 2100, y: 1400, title: "Adjoint", status: "locked", chapter: 2, description: "Adjoint matrix", connections: ["2-3"] },
        { id: "2-3", x: 2300, y: 1500, title: "Inverse", status: "locked", chapter: 2, description: "Matrix inverse", connections: [] },
      ],
    },
  },
  Biology: {
    "Reproduction in Organisms": {
      chapters: [
        { id: 1, title: "Types", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Processes", x: 2000, y: 1400, width: 700, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Asexual", status: "completed", chapter: 1, description: "Binary fission, budding", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Sexual", status: "current", chapter: 1, description: "Gamete formation", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Life Cycles", status: "locked", chapter: 1, description: "Haploid and diploid", connections: ["2-1"] },
        { id: "2-1", x: 1700, y: 1350, title: "Fertilization", status: "locked", chapter: 2, description: "Fusion of gametes", connections: ["2-2"] },
        { id: "2-2", x: 1900, y: 1450, title: "Development", status: "locked", chapter: 2, description: "Embryo formation", connections: [] },
      ],
    },
    "Sexual Reproduction in Flowering Plants": {
      chapters: [
        { id: 1, title: "Flower Structure", x: 800, y: 1500, width: 800, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Pollination", x: 2200, y: 1400, width: 900, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Stamen", status: "completed", chapter: 1, description: "Male reproductive part", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Carpel", status: "current", chapter: 1, description: "Female reproductive part", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Microsporogenesis", status: "locked", chapter: 1, description: "Pollen formation", connections: ["2-1"] },
        { id: "1-4", x: 1000, y: 1550, title: "Megasporogenesis", status: "locked", chapter: 1, description: "Ovule formation", connections: ["2-1"] },
        { id: "2-1", x: 1900, y: 1350, title: "Pollination", status: "locked", chapter: 2, description: "Pollen transfer", connections: ["2-2"] },
        { id: "2-2", x: 2100, y: 1400, title: "Fertilization", status: "locked", chapter: 2, description: "Double fertilization", connections: ["2-3"] },
        { id: "2-3", x: 2300, y: 1500, title: "Seed Formation", status: "locked", chapter: 2, description: "Embryo and endosperm", connections: [] },
      ],
    },
    "Human Reproduction": {
      chapters: [
        { id: 1, title: "Anatomy", x: 800, y: 1500, width: 900, height: 600, color: "hsl(var(--mission-1))" },
        { id: 2, title: "Development", x: 2200, y: 1400, width: 900, height: 600, color: "hsl(var(--mission-2))" },
      ],
      nodes: [
        { id: "1-1", x: 600, y: 1400, title: "Male System", status: "completed", chapter: 1, description: "Testes and ducts", connections: ["1-2"] },
        { id: "1-2", x: 750, y: 1500, title: "Female System", status: "current", chapter: 1, description: "Ovaries and uterus", connections: ["1-3"] },
        { id: "1-3", x: 900, y: 1400, title: "Gametogenesis", status: "locked", chapter: 1, description: "Sperm and egg formation", connections: ["1-4", "2-1"] },
        { id: "1-4", x: 1050, y: 1550, title: "Menstrual Cycle", status: "locked", chapter: 1, description: "Hormonal regulation", connections: ["2-1"] },
        { id: "2-1", x: 1900, y: 1350, title: "Fertilization", status: "locked", chapter: 2, description: "Zygote formation", connections: ["2-2"] },
        { id: "2-2", x: 2100, y: 1400, title: "Implantation", status: "locked", chapter: 2, description: "Embryo attachment", connections: ["2-3"] },
        { id: "2-3", x: 2300, y: 1500, title: "Pregnancy", status: "locked", chapter: 2, description: "Fetal development", connections: ["2-4"] },
        { id: "2-4", x: 2450, y: 1450, title: "Parturition", status: "locked", chapter: 2, description: "Birth process", connections: [] },
      ],
    },
  },
};
