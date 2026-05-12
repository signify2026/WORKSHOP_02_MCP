import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainNavigationHeader } from './MainNavigationHeader';

// Mock UUI components
jest.mock('@epam/uui', () => ({
  Avatar: ({ alt, size }: { alt: string; size: string }) => (
    <div data-testid="avatar" aria-label={alt} data-size={size} />
  ),
  IconButton: ({ rawProps }: { rawProps?: any }) => (
    <button data-testid="icon-button" aria-label={rawProps?.['aria-label']} />
  ),
}));

// Mock SVG icons
jest.mock('../../icons/epam-logo.svg', () => ({
  ReactComponent: () => <div data-testid="epam-logo" />
}));

jest.mock('../../icons/settings-icon.svg', () => ({
  ReactComponent: () => <div data-testid="settings-icon" />
}));

jest.mock('../../icons/pin-icon.svg', () => ({
  ReactComponent: () => <div data-testid="pin-icon" />
}));

jest.mock('../../icons/help-icon.svg', () => ({
  ReactComponent: () => <div data-testid="help-icon" />
}));

jest.mock('../../icons/chevron-down.svg', () => ({
  ReactComponent: () => <div data-testid="chevron-down" />
}));

jest.mock('../../icons/global-menu.svg', () => ({
  ReactComponent: () => <div data-testid="global-menu" />
}));

describe('MainNavigationHeader', () => {
  it('should render header with EPAM Campus Leaderboard title', () => {
    render(<MainNavigationHeader />);
    
    expect(screen.getByText('EPAM Campus leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Digital Platform')).toBeInTheDocument();
  });

  it('should render all required icons and avatar', () => {
    render(<MainNavigationHeader userName="Test User" />);
    
    expect(screen.getByTestId('epam-logo')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-button')).toHaveLength(4); // Settings, Pin, Help, Global Menu
  });

  it('should render with proper accessibility attributes', () => {
    render(<MainNavigationHeader userName="Test User" />);
    
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Pin')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
    expect(screen.getByLabelText('Global menu')).toBeInTheDocument();
  });

  it('should use semantic header element', () => {
    render(<MainNavigationHeader />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header element creates banner role
  });
});
