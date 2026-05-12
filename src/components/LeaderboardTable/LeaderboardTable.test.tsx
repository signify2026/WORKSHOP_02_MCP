import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeaderboardTable } from './LeaderboardTable';
import { LeaderboardEntry } from '../../utils/dataUtils';

const mockData: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'John Doe',
    className: 'Class A',
    avatar: 'https://example.com/avatar1.jpg',
    score: 95,
    title: 'Software Engineer',
    rank: 1,
    scoreDisplay: '95%'
  },
  {
    id: '2',
    name: 'Jane Smith',
    className: 'Class B',
    avatar: 'https://example.com/avatar2.jpg',
    score: 90,
    title: 'Frontend Developer',
    rank: 2,
    scoreDisplay: '90%'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    className: 'Class A',
    avatar: 'https://example.com/avatar3.jpg',
    score: 88,
    title: 'Backend Developer',
    rank: 3,
    scoreDisplay: '88%'
  },
];

describe('LeaderboardTable', () => {
  it('renders leaderboard table with student data', () => {
    render(<LeaderboardTable data={mockData} />);
    
    // Check if table headers are present
    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Student Name')).toBeInTheDocument();
    expect(screen.getByText('Class')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
    
    // Check if student data is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('displays pagination information correctly', () => {
    render(<LeaderboardTable data={mockData} />);
    
    // Check pagination info
    expect(screen.getByText('1-3 of 3')).toBeInTheDocument();
  });

  it('renders empty state when no data provided', () => {
    render(<LeaderboardTable data={[]} />);
    
    expect(screen.getByText('No students found for the selected filter.')).toBeInTheDocument();
  });

  it('allows changing page size', () => {
    // Create more data to test pagination
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Student ${i + 1}`,
      className: 'Class A',
      avatar: `https://example.com/avatar${i + 1}.jpg`,
      score: 90 - i,
      title: 'Developer',
      rank: i + 1,
      scoreDisplay: `${90 - i}%`
    }));

    render(<LeaderboardTable data={largeData} />);
    
    // Check initial pagination (10 items per page by default)
    expect(screen.getByText('1-10 of 25')).toBeInTheDocument();
    
    // Change page size to 25
    const pageSizeSelect = screen.getByDisplayValue('10');
    fireEvent.change(pageSizeSelect, { target: { value: '25' } });
    
    // Check updated pagination
    expect(screen.getByText('1-25 of 25')).toBeInTheDocument();
  });

  it('shows percentage column with score display', () => {
    render(<LeaderboardTable data={mockData} />);
    
    // Check if percentage values are displayed
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('88%')).toBeInTheDocument();
  });
});
