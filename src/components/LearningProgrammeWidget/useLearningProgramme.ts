import { useState, useEffect } from 'react';
import { ProgrammeData } from './LearningProgrammeWidget';

// Mock data matching the Figma design
const mockProgrammeData: ProgrammeData[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    progress: 25,
    timeSpent: '1h 31m',
    color: 'success'
  },
  {
    id: 'java',
    name: 'Java',
    progress: 25,
    timeSpent: '1h 30m',
    color: 'info'
  },
  {
    id: 'microsoft', 
    name: 'Microsoft',
    progress: 50,
    timeSpent: '3h',
    color: 'neutral'
  }
];

export interface UseLearningProgrammeReturn {
  programmes: ProgrammeData[];
  totalTime: string;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useLearningProgramme = (): UseLearningProgrammeReturn => {
  const [programmes, setProgrammes] = useState<ProgrammeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total time from all programmes
  const calculateTotalTime = (programmes: ProgrammeData[]): string => {
    let totalMinutes = 0;
    
    programmes.forEach(programme => {
      const timeStr = programme.timeSpent;
      const hours = timeStr.match(/(\d+)h/);
      const minutes = timeStr.match(/(\d+)m/);
      
      if (hours) totalMinutes += parseInt(hours[1]) * 60;
      if (minutes) totalMinutes += parseInt(minutes[1]);
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    return mins > 0 ? `${hours}h ${mins.toString().padStart(2, '0')}m` : `${hours}h`;
  };

  const fetchProgrammeData = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call
      // const response = await fetch('/api/learning-programmes');
      // const data = await response.json();
      
      setProgrammes(mockProgrammeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load programme data');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async (): Promise<void> => {
    await fetchProgrammeData();
  };

  useEffect(() => {
    fetchProgrammeData();
  }, []);

  return {
    programmes,
    totalTime: calculateTotalTime(programmes),
    isLoading,
    error,
    refreshData
  };
};
