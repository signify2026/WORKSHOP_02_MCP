import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClassOverviewCards, ClassCardData } from './ClassOverviewCards';
import { createClassMetadata } from '../../utils/dataUtils';

// Mock UUI components
jest.mock('@epam/uui', () => ({
  FlexRow: ({ children, ...props }: any) => <div data-testid="flex-row" {...props}>{children}</div>,
  FlexCell: ({ children, ...props }: any) => <div data-testid="flex-cell" {...props}>{children}</div>,
  Avatar: ({ alt, size, img }: any) => <img data-testid="avatar" alt={alt} src={img} data-size={size} />,
  CountIndicator: ({ caption, color, size }: any) => <span data-testid="count-indicator" data-color={color} data-size={size}>{caption}</span>,
  IconButton: ({ icon: Icon, ...props }: any) => <button data-testid="icon-button" {...props}><Icon /></button>,
  Tooltip: ({ children, content }: any) => <div data-testid="tooltip" title={content}>{children}</div>,
  Button: ({ caption, onClick, ...props }: any) => <button data-testid="uui-button" onClick={onClick} {...props}>{caption}</button>
}));

// Mock SVG icons
jest.mock('../../icons/help-icon.svg', () => ({
  ReactComponent: () => <svg data-testid="help-icon" />
}));

const mockClassData: ClassCardData[] = [
  {
    id: 'cs-101',
    className: 'Computer Science 101',
    studentCount: 28,
    topPerformers: [
      {
        id: 'student-1',
        className: 'Computer Science 101',
        name: 'Sarah Chen',
        title: 'Senior Software Engineer',
        avatar: 'https://example.com/avatar1.jpg',
        score: 96
      },
      {
        id: 'student-2',
        className: 'Computer Science 101',
        name: 'Marcus Johnson',
        title: 'Full Stack Developer',
        avatar: 'https://example.com/avatar2.jpg',
        score: 94
      }
    ]
  }
];

describe('ClassOverviewCards', () => {
  it('renders section header correctly', () => {
    render(<ClassOverviewCards classData={mockClassData} />);
    
    expect(screen.getByText('Class Overview')).toBeInTheDocument();
    expect(screen.getByText('Track performance across all your classes')).toBeInTheDocument();
  });

  it('renders class cards with correct data', () => {
    render(<ClassOverviewCards classData={mockClassData} />);
    
    expect(screen.getByText('Computer Science 101')).toBeInTheDocument();
    expect(screen.getByText('28 students enrolled')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Marcus Johnson')).toBeInTheDocument();
  });

  it('displays performance scores with correct styling', () => {
    render(<ClassOverviewCards classData={mockClassData} />);
    
    expect(screen.getByText('96%')).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
  });

  it('shows rank badges for top performers', () => {
    render(<ClassOverviewCards classData={mockClassData} />);
    
    const cards = screen.getAllByText(/🥇|🥈/);
    expect(cards).toHaveLength(2);
  });

  it('expands card content when header is clicked', () => {
    render(<ClassOverviewCards classData={mockClassData} />);
    
    const cardHeader = screen.getByRole('button', { name: /computer science 101/i });
    fireEvent.click(cardHeader);
    
    expect(screen.getByText('View All Students')).toBeInTheDocument();
  });

  it('handles view all students button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<ClassOverviewCards classData={mockClassData} />);
    
    const cardHeader = screen.getByRole('button', { name: /computer science 101/i });
    fireEvent.click(cardHeader);
    
    const viewAllButton = screen.getByText('View All Students');
    fireEvent.click(viewAllButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('View all students for Computer Science 101');
    consoleSpy.mockRestore();
  });

  it('renders help icon with tooltip', () => {
    render(<ClassOverviewCards classData={mockClassData} />);
    
    expect(screen.getByTestId('help-icon')).toBeInTheDocument();
    expect(screen.getByTitle('Get help with Computer Science 101')).toBeInTheDocument();
  });

  it('handles empty class data gracefully', () => {
    render(<ClassOverviewCards classData={[]} />);
    
    expect(screen.getByText('Class Overview')).toBeInTheDocument();
    expect(screen.queryByText('Computer Science 101')).not.toBeInTheDocument();
  });
});

describe('Data Manipulation Integration', () => {
  it('creates class metadata correctly from raw data', () => {
    const rawData = [
      { id: '1', name: 'Student A', className: 'Math', score: 95, avatar: 'avatar1.jpg', title: 'Senior Software Engineer' },
      { id: '2', name: 'Student B', className: 'Math', score: 90, avatar: 'avatar2.jpg', title: 'Full Stack Developer' },
      { id: '3', name: 'Student C', className: 'Science', score: 88, avatar: 'avatar3.jpg', title: 'Backend Developer' }
    ];

    const classMetadata = createClassMetadata(rawData);
    
    expect(classMetadata).toHaveLength(2);
    expect(classMetadata[0].className).toBe('Math');
    expect(classMetadata[0].studentCount).toBe(2);
    expect(classMetadata[0].topPerformers).toHaveLength(2);
    expect(classMetadata[0].topPerformers[0].score).toBe(95);
    expect(classMetadata[0].topPerformers[0].title).toBe('Senior Software Engineer');
  });

  it('handles single student per class', () => {
    const rawData = [
      { id: '1', name: 'Student A', className: 'Math', score: 95, avatar: 'avatar1.jpg', title: 'Tech Lead' }
    ];

    const classMetadata = createClassMetadata(rawData);
    
    expect(classMetadata[0].topPerformers).toHaveLength(1);
    expect(classMetadata[0].topPerformers[0].title).toBe('Tech Lead');
  });

  it('sorts students by score correctly', () => {
    const rawData = [
      { id: '1', name: 'Student Low', className: 'Math', score: 80, avatar: 'avatar1.jpg', title: 'Junior Developer' },
      { id: '2', name: 'Student High', className: 'Math', score: 95, avatar: 'avatar2.jpg', title: 'Principal Engineer' },
      { id: '3', name: 'Student Mid', className: 'Math', score: 87, avatar: 'avatar3.jpg', title: 'Software Engineer' }
    ];

    const classMetadata = createClassMetadata(rawData);
    
    expect(classMetadata[0].topPerformers[0].name).toBe('Student High');
    expect(classMetadata[0].topPerformers[1].name).toBe('Student Mid');
    expect(classMetadata[0].topPerformers[0].title).toBe('Principal Engineer');
    expect(classMetadata[0].topPerformers[1].title).toBe('Software Engineer');
  });

  it('preserves original titles from raw data', () => {
    const rawData = [
      { id: '1', name: 'Alice', className: 'React Course', score: 96, avatar: 'avatar1.jpg', title: 'Lead Software Architect' },
      { id: '2', name: 'Bob', className: 'React Course', score: 92, avatar: 'avatar2.jpg', title: 'DevOps Engineer' }
    ];

    const classMetadata = createClassMetadata(rawData);
    
    expect(classMetadata[0].topPerformers[0].title).toBe('Lead Software Architect');
    expect(classMetadata[0].topPerformers[1].title).toBe('DevOps Engineer');
  });
});
