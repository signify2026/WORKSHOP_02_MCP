import React from 'react';
import { Avatar, IconButton } from '@epam/uui';
import { ReactComponent as EpamLogo } from '../../icons/epam-logo.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings-icon.svg';
import { ReactComponent as PinIcon } from '../../icons/pin-icon.svg';
import { ReactComponent as HelpIcon } from '../../icons/help-icon.svg';
import { ReactComponent as ChevronDownIcon } from '../../icons/chevron-down.svg';
import { ReactComponent as GlobalMenuIcon } from '../../icons/global-menu.svg';
import css from './MainNavigationHeader.module.scss';

interface MainNavigationHeaderProps {
  userAvatarUrl?: string;
  userName?: string;
  onSettingsClick?: () => void;
  onPinClick?: () => void;
  onHelpClick?: () => void;
  onProfileClick?: () => void;
  onGlobalMenuClick?: () => void;
}

export const MainNavigationHeader: React.FC<MainNavigationHeaderProps> = ({ 
  userAvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  userName = "User",
  onSettingsClick,
  onPinClick,
  onHelpClick,
  onProfileClick,
  onGlobalMenuClick
}) => {
  return (
    <header className={css.headerContainer}>
      <div className={css.headerContent}>
        {/* Left Details - Logo Section */}
        <div className={css.leftDetails}>
          <div className={css.logoSection}>
            <EpamLogo className={css.epamLogo} />
            <div className={css.logoText}>
              <h1 className={css.projectName}>EPAM Campus leaderboard</h1>
              <p className={css.digitalPlatform}>Digital Platform</p>
            </div>
          </div>
        </div>

        {/* Right Details - Actions and Profile */}
        <div className={css.rightDetails}>
          {/* Action Buttons */}
          <div className={css.actions}>
            <IconButton 
              icon={SettingsIcon} 
              cx={css.actionButton}
              onClick={onSettingsClick}
              rawProps={{
                'aria-label': 'Settings',
                'title': 'Settings'
              }}
            />
            <IconButton 
              icon={PinIcon} 
              cx={css.actionButton}
              onClick={onPinClick}
              rawProps={{
                'aria-label': 'Pin',
                'title': 'Pin'
              }}
            />
            <IconButton 
              icon={HelpIcon} 
              cx={css.actionButton}
              onClick={onHelpClick}
              rawProps={{
                'aria-label': 'Help',
                'title': 'Help'
              }}
            />
          </div>

          {/* Profile Section */}
          <div className={css.profileSection} onClick={onProfileClick}>
            <Avatar 
              img={userAvatarUrl}
              alt={userName}
              size="36"
              cx={css.avatar}
            />
            <ChevronDownIcon className={css.chevronIcon} />
          </div>

          {/* Global Menu */}
          <div className={css.globalMenuSection}>
            <IconButton 
              icon={GlobalMenuIcon} 
              cx={css.globalMenuButton}
              onClick={onGlobalMenuClick}
              rawProps={{
                'aria-label': 'Global menu',
                'title': 'Global menu'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigationHeader;
