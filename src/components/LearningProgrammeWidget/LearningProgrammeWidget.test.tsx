import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LearningProgrammeWidget, ProgrammeData } from './LearningProgrammeWidget';

const mockProgrammes: ProgrammeData[] = [
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

describe('LearningProgrammeWidget', () => {
  const defaultProps = {
    totalTime: '6h 01m',
    programmes: mockProgrammes
  };

  it('renders the widget with all required elements', () => {
    render(<LearningProgrammeWidget {...defaultProps} />);
    
    // Check title
    expect(screen.getByText('Learning Programme')).toBeInTheDocument();
    
    // Check total time badge
    expect(screen.getByText('6h 01m')).toBeInTheDocument();
    
    // Check all programmes are rendered
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
  });

  it('displays correct progress percentages', () => {
    render(<LearningProgrammeWidget {...defaultProps} />);
    
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays correct time spent for each programme', () => {
    render(<LearningProgrammeWidget {...defaultProps} />);
    
    expect(screen.getByText('1h 31m')).toBeInTheDocument();
    expect(screen.getByText('1h 30m')).toBeInTheDocument();
    expect(screen.getByText('3h')).toBeInTheDocument();
  });

  it('renders color indicators for each programme', () => {
    render(<LearningProgrammeWidget {...defaultProps} />);
    
    expect(screen.getByTestId('color-indicator-javascript')).toBeInTheDocument();
    expect(screen.getByTestId('color-indicator-java')).toBeInTheDocument();
    expect(screen.getByTestId('color-indicator-microsoft')).toBeInTheDocument();
  });

  it('renders progress segments for the overall progress bar', () => {
    render(<LearningProgrammeWidget {...defaultProps} />);
    
    expect(screen.getByTestId('progress-segment-javascript')).toBeInTheDocument();
    expect(screen.getByTestId('progress-segment-java')).toBeInTheDocument();
    expect(screen.getByTestId('progress-segment-microsoft')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<LearningProgrammeWidget {...defaultProps} className="custom-class" />);
    
    const widget = screen.getByTestId('learning-programme-widget');
    expect(widget).toHaveClass('custom-class');
  });

  it('handles empty programmes array gracefully', () => {
    render(<LearningProgrammeWidget totalTime="0h" programmes={[]} />);
    
    expect(screen.getByText('Learning Programme')).toBeInTheDocument();
    expect(screen.getByText('0h')).toBeInTheDocument();
  });
});
