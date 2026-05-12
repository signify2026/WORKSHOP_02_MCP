import React from 'react';
import css from './NavigationDrawer.module.scss';

export interface NavigationDrawerProps {
    className?: string;
    isCollapsed?: boolean;
    onToggle?: () => void;
}

interface MenuItem {
    id: string;
    caption: string;
    icon: string;
    group: 'main' | 'more';
}

const menuItems: MenuItem[] = [
    {
        id: 'home',
        caption: 'Home',
        icon: '🏠', // Dashboard icon
        group: 'main',
    },
    {
        id: 'awards', 
        caption: 'Awards',
        icon: '🏆', // Source environment icon
        group: 'main',
    },
    {
        id: 'leaderboard',
        caption: 'Leaderboard',
        icon: '📊', // Source environment icon
        group: 'main',
    },
    {
        id: 'blogs',
        caption: 'Blogs',
        icon: '📝', // Source environment icon
        group: 'main',
    },
    {
        id: 'resources',
        caption: 'Resources',
        icon: '📚', // Timeline icon
        group: 'more',
    },
    {
        id: 'faqs',
        caption: 'FAQs',
        icon: '❓', // Start icon
        group: 'more',
    },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ 
    className, 
    isCollapsed = false, 
    onToggle 
}) => {
    const [activeItem, setActiveItem] = React.useState('home');

    const handleMenuItemClick = (itemId: string) => {
        setActiveItem(itemId);
        // Here you would typically handle navigation
        console.log('Navigate to:', itemId);
    };

    const mainMenuItems = menuItems.filter(item => item.group === 'main');
    const moreMenuItems = menuItems.filter(item => item.group === 'more');

    return (
        <aside className={`${css.navigationDrawer} ${isCollapsed ? css.collapsed : ''} ${className || ''}`}>
            <nav className={css.menuContainer}>
                {/* Main Menu Group */}
                <div className={css.menuGroup}>
                    <ul className={css.menuList}>
                        {mainMenuItems.map((item) => (
                            <li key={item.id} className={css.menuListItem}>
                                <button
                                    className={`${css.menuItem} ${activeItem === item.id ? css.activeItem : ''}`}
                                    onClick={() => handleMenuItemClick(item.id)}
                                    type="button"
                                    title={item.caption}
                                    aria-label={item.caption}
                                >
                                    <span className={css.menuIcon}>{item.icon}</span>
                                    {!isCollapsed && <span className={css.menuCaption}>{item.caption}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* More Menu Group - Only show when not collapsed */}
                {!isCollapsed && (
                    <div className={css.menuGroup}>
                        <div className={css.menuGroupTitle}>
                            <div className={css.divider}></div>
                            <div className={css.labelWrapper}>
                                <span className={css.moreLabel}>More</span>
                            </div>
                        </div>
                        <ul className={css.menuList}>
                            {moreMenuItems.map((item) => (
                                <li key={item.id} className={css.menuListItem}>
                                    <button
                                        className={`${css.menuItem} ${activeItem === item.id ? css.activeItem : ''}`}
                                        onClick={() => handleMenuItemClick(item.id)}
                                        type="button"
                                        title={item.caption}
                                        aria-label={item.caption}
                                    >
                                        <span className={css.menuIcon}>{item.icon}</span>
                                        <span className={css.menuCaption}>{item.caption}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Toggle Button */}
            <div className={css.toggleButton}>
                <button 
                    className={css.chevronButton} 
                    type="button"
                    onClick={onToggle}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <span className={`${css.chevronIcon} ${isCollapsed ? css.expandIcon : ''}`}>‹</span>
                </button>
            </div>
        </aside>
    );
};
