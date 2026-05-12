import { RawStudentData, createClassMetadata, createTabsFromStudentData, createLeaderboardData, updateTabActiveState, getTabCount } from '../utils/dataUtils';

// Raw student data that will be processed - Using Class A, B, C as per Figma design
export const mockStudentData: RawStudentData[] = [
  // Class A students (25 students as per Figma)
  { id: 'student-1', name: 'Sarah Chen', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', score: 96, title: 'Senior Software Engineer' },
  { id: 'student-2', name: 'Marcus Johnson', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus', score: 94, title: 'Full Stack Developer' },
  { id: 'student-3', name: 'Jamie Wilson', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jamie', score: 88, title: 'Frontend Developer' },
  { id: 'student-4', name: 'Emily Rodriguez', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily', score: 98, title: 'Lead Software Architect' },
  { id: 'student-5', name: 'David Kim', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', score: 92, title: 'Backend Developer' },
  { id: 'student-6', name: 'Lisa Chang', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa-chang', score: 87, title: 'Software Engineer' },
  { id: 'student-7', name: 'Aisha Patel', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha', score: 97, title: 'Principal Engineer' },
  { id: 'student-8', name: 'John Mitchell', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john', score: 89, title: 'DevOps Engineer' },
  { id: 'student-9', name: 'Lisa Wang', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa', score: 95, title: 'Tech Lead' },
  { id: 'student-10', name: 'Alex Thompson', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', score: 91, title: 'Mobile Developer' },
  { id: 'student-11', name: 'Maya Singh', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya', score: 86, title: 'Junior Developer' },
  { id: 'student-12', name: 'Chris Anderson', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chris', score: 93, title: 'Software Engineer' },
  { id: 'student-13', name: 'Anna Brown', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna', score: 85, title: 'UI/UX Designer' },
  { id: 'student-14', name: 'Michael Lee', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael', score: 90, title: 'QA Engineer' },
  { id: 'student-15', name: 'Sophie Taylor', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophie', score: 84, title: 'Product Manager' },
  { id: 'student-16', name: 'Ryan Davis', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryan', score: 88, title: 'Data Scientist' },
  { id: 'student-17', name: 'Emma Wilson', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', score: 87, title: 'Business Analyst' },
  { id: 'student-18', name: 'Jake Miller', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jake', score: 86, title: 'Security Engineer' },
  { id: 'student-19', name: 'Olivia Martinez', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olivia', score: 89, title: 'Cloud Engineer' },
  { id: 'student-20', name: 'Noah Garcia', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=noah', score: 85, title: 'System Admin' },
  { id: 'student-21', name: 'Ava Rodriguez', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ava', score: 90, title: 'DevOps Specialist' },
  { id: 'student-22', name: 'William Jones', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=william', score: 83, title: 'Database Admin' },
  { id: 'student-23', name: 'Isabella White', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabella', score: 91, title: 'AI Engineer' },
  { id: 'student-24', name: 'James Lopez', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james', score: 87, title: 'Machine Learning Engineer' },
  { id: 'student-25', name: 'Mia Clark', className: 'Class A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mia', score: 89, title: 'Software Architect' },
  
  // Class B students (25 students as per Figma)
  { id: 'student-26', name: 'Benjamin Scott', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=benjamin', score: 92, title: 'Senior Developer' },
  { id: 'student-27', name: 'Charlotte Hall', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlotte', score: 88, title: 'Frontend Specialist' },
  { id: 'student-28', name: 'Henry Allen', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry', score: 85, title: 'Backend Engineer' },
  { id: 'student-29', name: 'Amelia Young', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amelia', score: 90, title: 'Full Stack Developer' },
  { id: 'student-30', name: 'Alexander King', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexander', score: 87, title: 'Software Developer' },
  { id: 'student-31', name: 'Harper Wright', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harper', score: 84, title: 'Web Developer' },
  { id: 'student-32', name: 'Sebastian Green', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sebastian', score: 89, title: 'Mobile Engineer' },
  { id: 'student-33', name: 'Evelyn Adams', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=evelyn', score: 86, title: 'QA Specialist' },
  { id: 'student-34', name: 'Jack Baker', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jack', score: 83, title: 'DevOps Engineer' },
  { id: 'student-35', name: 'Avery Nelson', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=avery', score: 91, title: 'Data Engineer' },
  { id: 'student-36', name: 'Owen Carter', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=owen', score: 88, title: 'System Engineer' },
  { id: 'student-37', name: 'Ella Mitchell', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ella', score: 85, title: 'Security Analyst' },
  { id: 'student-38', name: 'Luke Perez', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luke', score: 87, title: 'Cloud Specialist' },
  { id: 'student-39', name: 'Scarlett Roberts', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=scarlett', score: 90, title: 'Platform Engineer' },
  { id: 'student-40', name: 'Gabriel Turner', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel', score: 82, title: 'Infrastructure Engineer' },
  { id: 'student-41', name: 'Victoria Phillips', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=victoria', score: 89, title: 'Site Reliability Engineer' },
  { id: 'student-42', name: 'Julian Campbell', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=julian', score: 86, title: 'Performance Engineer' },
  { id: 'student-43', name: 'Grace Parker', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace', score: 84, title: 'Release Engineer' },
  { id: 'student-44', name: 'Mateo Evans', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mateo', score: 88, title: 'Build Engineer' },
  { id: 'student-45', name: 'Chloe Edwards', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chloe', score: 85, title: 'Test Engineer' },
  { id: 'student-46', name: 'Anthony Collins', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anthony', score: 87, title: 'Automation Engineer' },
  { id: 'student-47', name: 'Zoe Stewart', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zoe', score: 89, title: 'Integration Engineer' },
  { id: 'student-48', name: 'Daniel Sanchez', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniel', score: 83, title: 'Deployment Engineer' },
  { id: 'student-49', name: 'Nora Morris', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nora', score: 90, title: 'Monitoring Engineer' },
  { id: 'student-50', name: 'Samuel Rogers', className: 'Class B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samuel', score: 86, title: 'Operations Engineer' },
  
  // Class C students (20 students as per Figma)
  { id: 'student-51', name: 'Logan Reed', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=logan', score: 91, title: 'Junior Developer' },
  { id: 'student-52', name: 'Layla Cook', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=layla', score: 88, title: 'Associate Engineer' },
  { id: 'student-53', name: 'Carter Bailey', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carter', score: 85, title: 'Graduate Developer' },
  { id: 'student-54', name: 'Penelope Rivera', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=penelope', score: 87, title: 'Entry Level Engineer' },
  { id: 'student-55', name: 'Wyatt Cooper', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wyatt', score: 83, title: 'Trainee Developer' },
  { id: 'student-56', name: 'Riley Richardson', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riley', score: 89, title: 'Intern Developer' },
  { id: 'student-57', name: 'Connor Cox', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=connor', score: 86, title: 'Junior Software Engineer' },
  { id: 'student-58', name: 'Zoey Howard', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zoey', score: 84, title: 'Associate Developer' },
  { id: 'student-59', name: 'Jeremiah Ward', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jeremiah', score: 90, title: 'Graduate Engineer' },
  { id: 'student-60', name: 'Eleanor Torres', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eleanor', score: 82, title: 'Junior Analyst' },
  { id: 'student-61', name: 'Easton Peterson', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=easton', score: 88, title: 'Associate Analyst' },
  { id: 'student-62', name: 'Savannah Gray', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=savannah', score: 85, title: 'Trainee Analyst' },
  { id: 'student-63', name: 'Levi Ramirez', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=levi', score: 87, title: 'Junior Designer' },
  { id: 'student-64', name: 'Hazel James', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hazel', score: 89, title: 'Associate Designer' },
  { id: 'student-65', name: 'Hudson Watson', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hudson', score: 81, title: 'Graduate Designer' },
  { id: 'student-66', name: 'Violet Brooks', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=violet', score: 86, title: 'Entry Level Designer' },
  { id: 'student-67', name: 'Asher Kelly', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=asher', score: 84, title: 'Junior Tester' },
  { id: 'student-68', name: 'Nova Sanders', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nova', score: 88, title: 'Associate Tester' },
  { id: 'student-69', name: 'Leo Price', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo', score: 83, title: 'Trainee Tester' },
  { id: 'student-70', name: 'Aurora Bennett', className: 'Class C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aurora', score: 87, title: 'Graduate Tester' }
];

// Data manipulation utilities
export const DataUtils = {
  createClassMetadata,
  createTabsFromStudentData,
  createLeaderboardData,
  updateTabActiveState,
  getTabCount,
  processStudentData: (data: RawStudentData[]) => createClassMetadata(data)
};

// Process raw data into class metadata
export const mockClassData = createClassMetadata(mockStudentData);

// Create tabs for filtering
export const mockTabsData = createTabsFromStudentData(mockStudentData);

// Create initial leaderboard data (showing all students)
export const mockLeaderboardData = createLeaderboardData(mockStudentData);
