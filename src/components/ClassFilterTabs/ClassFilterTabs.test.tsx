import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClassFilterTabs } from './ClassFilterTabs';
import { TabData } from '../../utils/dataUtils';

const mockTabs: TabData[] = [
  { id: 'all', label: 'All', count: 70, isActive: true },
  { id: 'class-a', label: 'Class A', count: 25, isActive: false },
  { id: 'class-b', label: 'Class B', count: 25, isActive: false },
  { id: 'class-c', label: 'Class C', count: 20, isActive: false }
];

describe('ClassFilterTabs', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders all tabs with correct labels and counts', () => {
    render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange} 
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
    expect(screen.getByText('Class A')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Class B')).toBeInTheDocument();
    expect(screen.getByText('Class C')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('marks the active tab correctly', () => {
    render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange} 
      />
    );

    const allTab = screen.getByRole('tab', { name: /all/i });
    expect(allTab).toHaveAttribute('aria-selected', 'true');
    
    const classATab = screen.getByRole('tab', { name: /class a/i });
    expect(classATab).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onTabChange when a tab is clicked', () => {
    render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange} 
      />
    );

    const classATab = screen.getByRole('tab', { name: /class a/i });
    fireEvent.click(classATab);

    expect(mockOnTabChange).toHaveBeenCalledWith('class-a');
  });

  it('does not call onTabChange when the active tab is clicked', () => {
    render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange} 
      />
    );

    const allTab = screen.getByRole('tab', { name: /all/i });
    fireEvent.click(allTab);

    expect(mockOnTabChange).not.toHaveBeenCalled();
  });

  it('supports keyboard navigation', () => {
    render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange} 
      />
    );

    const classATab = screen.getByRole('tab', { name: /class a/i });
    
    // Test Enter key
    fireEvent.keyDown(classATab, { key: 'Enter' });
    expect(mockOnTabChange).toHaveBeenCalledWith('class-a');

    mockOnTabChange.mockClear();

    // Test Space key
    fireEvent.keyDown(classATab, { key: ' ' });
    expect(mockOnTabChange).toHaveBeenCalledWith('class-a');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(
      <ClassFilterTabs 
        tabs={mockTabs} 
        activeTabId="all" 
        onTabChange={mockOnTabChange} 
      />
    );

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab, index) => {
      expect(tab).toHaveAttribute('aria-controls', `panel-${mockTabs[index].id}`);
      expect(tab).toHaveAttribute('tabindex', mockTabs[index].isActive ? '0' : '-1');
    });
  });
});
