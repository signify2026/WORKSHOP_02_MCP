import React, { useState, useEffect } from 'react';
import { FlexRow, FlexCell } from '@epam/uui';
import { 
    MainNavigationHeader, 
    NavigationDrawer, 
    ClassOverviewCards, 
    ClassFilterTabs, 
    LeaderboardTable,
    LearningProgrammeWidget,
    SupportTeamWidget 
} from '../components';
import { mockClassData, mockStudentData, mockSupportTeamData } from '../data/mockData';
import { 
    createTabsFromStudentData, 
    createLeaderboardData, 
    updateTabActiveState, 
    TabData,
    LeaderboardEntry 
} from '../utils/dataUtils';
import { useLearningProgramme } from '../components/LearningProgrammeWidget/useLearningProgramme';
import css from './MainPage.module.scss';

export const MainPage = () => {
    const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
    const [tabs, setTabs] = useState<TabData[]>([]);
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    
    // Learning Programme Widget data
    const { programmes, totalTime, isLoading, error } = useLearningProgramme();

    // Initialize tabs and leaderboard data
    useEffect(() => {
        const initialTabs = createTabsFromStudentData(mockStudentData);
        setTabs(initialTabs);
        
        // Set initial leaderboard data to "All" tab
        const activeTab = initialTabs.find(tab => tab.isActive);
        if (activeTab) {
            const initialLeaderboard = createLeaderboardData(mockStudentData, activeTab.id);
            setLeaderboardData(initialLeaderboard);
        }
    }, []);

    const handleTabChange = (tabId: string) => {
        // Update tab active state
        const updatedTabs = updateTabActiveState(tabs, tabId);
        setTabs(updatedTabs);
        
        // Update leaderboard data based on selected tab
        const filteredLeaderboard = createLeaderboardData(mockStudentData, tabId);
        setLeaderboardData(filteredLeaderboard);
        
        // Store active tab in session storage for persistence
        sessionStorage.setItem('activeLeaderboardTab', tabId);
    };

    const handleSettingsClick = () => {
        console.log('Settings clicked');
    };

    const handlePinClick = () => {
        console.log('Pin clicked');
    };

    const handleHelpClick = () => {
        console.log('Help clicked');
    };

    const handleProfileClick = () => {
        console.log('Profile clicked');
    };

    const handleGlobalMenuClick = () => {
        console.log('Global menu clicked');
    };

    const handleDrawerToggle = () => {
        setIsDrawerCollapsed(!isDrawerCollapsed);
    };

    const handleShowAllStudents = (classId: string, className: string) => {
        // Switch to the specific class tab
        handleTabChange(classId);
        
        // Optional: Scroll to leaderboard section
        const leaderboardElement = document.querySelector(`.${css.leaderboardSection}`);
        if (leaderboardElement) {
            leaderboardElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };

    return (
        <main className={css.mainContainer}>
            <MainNavigationHeader 
                userAvatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=campus-user"
                userName="Campus User"
                onSettingsClick={handleSettingsClick}
                onPinClick={handlePinClick}
                onHelpClick={handleHelpClick}
                onProfileClick={handleProfileClick}
                onGlobalMenuClick={handleGlobalMenuClick}
            />
            
            <FlexRow>
                <NavigationDrawer 
                    className={css.navigationDrawer}
                    isCollapsed={isDrawerCollapsed}
                    onToggle={handleDrawerToggle}
                />
                
                <FlexCell grow={1} rawProps={{ 
                    className: `${css.mainContentArea} ${isDrawerCollapsed ? css.expandedContent : ''}` 
                }}>
                    <FlexRow spacing="18">
                        {/* Main Content Area */}
                        <FlexCell grow={1}>
                            <FlexRow margin='24' vPadding='24'>
                                <FlexCell width="100%">
                                    {/* Class Overview Cards Section */}
                                    <FlexRow rawProps={{ 
                                        className: css.classOverviewSection 
                                        }}>
                                        <FlexCell width="100%">
                                            <ClassOverviewCards 
                                                classData={mockClassData} 
                                                onShowAllStudents={handleShowAllStudents}
                                            />
                                        </FlexCell>
                                    </FlexRow>
                                    
                                    {/* Leaderboard Section with Class Filter Tabs using UUI FlexRow */}
                                    <FlexRow padding='24' rawProps={{ 
                                        className: css.leaderboardSection 
                                        }}>
                                        <FlexCell width="100%">
                                            <FlexRow vPadding="36">
                                                <FlexCell width="100%">
                                                    <ClassFilterTabs 
                                                        tabs={tabs}
                                                        activeTabId={tabs.find(tab => tab.isActive)?.id || 'all'}
                                                        onTabChange={handleTabChange}
                                                    />
                                                </FlexCell>
                                            </FlexRow>
                                            <FlexRow>
                                                <FlexCell width="100%">
                                                    <LeaderboardTable 
                                                        data={leaderboardData}
                                                        activeTabLabel={tabs.find(tab => tab.isActive)?.label}
                                                    />
                                                </FlexCell>
                                            </FlexRow>
                                        </FlexCell>
                                    </FlexRow>
                                </FlexCell>
                            </FlexRow>
                        </FlexCell>
                        
                        {/* Right Sidebar with Learning Programme Widget */}
                        <FlexCell width={340} rawProps={{ 
                            className: css.rightSidebar 
                        }}>
                            <div className={css.sidebarContent}>
                                {!isLoading && !error && (
                                    <LearningProgrammeWidget
                                        totalTime={totalTime}
                                        programmes={programmes}
                                    />
                                )}
                                <SupportTeamWidget
                                    className={css.supportTeamWidget}
                                    groups={mockSupportTeamData}
                                />
                                {isLoading && (
                                    <div className={css.widgetPlaceholder}>
                                        Loading learning progress...
                                    </div>
                                )}
                                {error && (
                                    <div className={css.widgetError}>
                                        Error loading learning data
                                    </div>
                                )}
                            </div>
                        </FlexCell>
                    </FlexRow>
                </FlexCell>
            </FlexRow>
        </main>
    );
};
