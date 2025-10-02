import { useState } from "react";
import { StudyMap } from "@/components/StudyMap";
import { SubjectMenu } from "@/components/SubjectMenu";

const Index = () => {
  const [selectedChapter, setSelectedChapter] = useState<{
    subject: string;
    chapter: string;
  } | null>(null);

  const handleSelectChapter = (subject: string, chapter: string) => {
    setSelectedChapter({ subject, chapter });
  };

  const handleBackToMenu = () => {
    setSelectedChapter(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {!selectedChapter ? (
        <SubjectMenu onSelectChapter={handleSelectChapter} />
      ) : (
        <StudyMap
          subject={selectedChapter.subject}
          chapter={selectedChapter.chapter}
          onBack={handleBackToMenu}
        />
      )}
    </div>
  );
};

export default Index;
