import { ClassCardData, UserPerformance } from '../components/ClassOverviewCards';

export interface RawStudentData {
  id: string;
  name: string;
  className: string;
  avatar?: string;
  score: number;
  title: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  className: string;
  avatar?: string;
  score: number;
  title: string;
  rank: number;
  scoreDisplay: string;
}

export interface TabData {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
}

export const createClassMetadata = (rawStudentData: RawStudentData[]): ClassCardData[] => {
  // Group students by class
  const classGroups = rawStudentData.reduce((acc, student) => {
    if (!acc[student.className]) {
      acc[student.className] = [];
    }
    acc[student.className].push(student);
    return acc;
  }, {} as Record<string, RawStudentData[]>);

  // Process each class group
  return Object.entries(classGroups).map(([className, students]) => {
    // Sort students by score (descending) and take top 2
    const sortedStudents = students.sort((a, b) => b.score - a.score);
    const topPerformers: UserPerformance[] = sortedStudents.slice(0, 2).map((student) => ({
      id: student.id,
      className: student.className,
      name: student.name,
      title: student.title,
      avatar: student.avatar,
      score: student.score
    }));

    return {
      id: className.toLowerCase().replace(/\s+/g, '-'),
      className,
      studentCount: students.length,
      topPerformers
    };
  });
};

/**
 * Creates tab data for class filtering based on student data
 */
export const createTabsFromStudentData = (rawStudentData: RawStudentData[]): TabData[] => {
  // Count students by class
  const classCounts = rawStudentData.reduce((acc, student) => {
    acc[student.className] = (acc[student.className] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create tabs array with "All" tab first, then class tabs
  const tabs: TabData[] = [
    {
      id: 'all',
      label: 'All',
      count: rawStudentData.length,
      isActive: true // Default active tab
    }
  ];

  // Add class-specific tabs in alphabetical order
  const classNames = Object.keys(classCounts).sort();
  classNames.forEach(className => {
    tabs.push({
      id: className.toLowerCase().replace(/\s+/g, '-'),
      label: className,
      count: classCounts[className],
      isActive: false
    });
  });

  return tabs;
};

/**
 * Filters and sorts student data for leaderboard display
 */
export const createLeaderboardData = (
  rawStudentData: RawStudentData[], 
  activeTabId: string = 'all'
): LeaderboardEntry[] => {
  // Filter data based on active tab
  let filteredData = rawStudentData;
  if (activeTabId !== 'all') {
    const targetClassName = activeTabId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    filteredData = rawStudentData.filter(student => student.className === targetClassName);
  }

  // Sort by score (descending) and add ranking
  const sortedData = filteredData.sort((a, b) => b.score - a.score);
  
  return sortedData.map((student, index) => ({
    id: student.id,
    name: student.name,
    className: student.className,
    avatar: student.avatar,
    score: student.score,
    title: student.title,
    rank: index + 1,
    scoreDisplay: `${student.score}%`
  }));
};

/**
 * Updates tab active state
 */
export const updateTabActiveState = (tabs: TabData[], activeTabId: string): TabData[] => {
  return tabs.map(tab => ({
    ...tab,
    isActive: tab.id === activeTabId
  }));
};

/**
 * Gets the count for a specific tab/filter
 */
export const getTabCount = (rawStudentData: RawStudentData[], tabId: string): number => {
  if (tabId === 'all') {
    return rawStudentData.length;
  }
  
  const targetClassName = tabId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return rawStudentData.filter(student => student.className === targetClassName).length;
};
