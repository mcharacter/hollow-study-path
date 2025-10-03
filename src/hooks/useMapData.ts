import { chapterData } from "./chapterData";

interface UseMapDataProps {
  subject: string;
  chapter: string;
}

export const useMapData = ({ subject, chapter }: UseMapDataProps) => {
  const data = chapterData[subject]?.[chapter];
  
  if (!data) {
    return { chapters: [], nodes: [] };
  }

  return data;
};
