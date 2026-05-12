import React, { useState, useRef, useEffect } from 'react';
import { FlexRow, FlexCell, Avatar, CountIndicator, IconButton, Tooltip, Button } from '@epam/uui';
import { ReactComponent as HelpIcon } from '../../icons/help-icon.svg';
// import { ReactComponent as TrophyIcon } from '../../icons/trophy-icon.svg';
import css from './ClassOverviewCards.module.scss';

export interface UserPerformance {
  id: string;
  className: string;
  name: string;
  title: string;
  avatar?: string;
  score: number;
}

export interface ClassCardData {
  id: string;
  className: string;
  studentCount: number;
  topPerformers: UserPerformance[];
}

export interface ClassOverviewCardsProps {
  classData: ClassCardData[];
  onShowAllStudents?: (classId: string, className: string) => void;
}

const ClassCard: React.FC<{ 
  data: ClassCardData; 
  onShowAllStudents?: (classId: string, className: string) => void;
}> = ({ data, onShowAllStudents }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle click outside to collapse the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'success';
    if (score >= 90) return 'info';
    return 'warning';
  };

  const getPerformanceRank = (index: number) => {
    return index === 0 ? '🥇' : '🥈';
  };

  return (
    <div ref={cardRef} className={`${css.classCard} ${isExpanded ? css.expanded : ''}`}>
      {/* Card Header */}
      <div className={css.cardHeader} onClick={toggleExpanded} role="button" tabIndex={0}>
        <FlexRow alignItems="center" justifyContent="between">
          <FlexCell grow={1}>
            <FlexRow spacing="6" alignItems="center">
              <FlexCell width="auto">
                <div className={css.classIcon}>📚</div>
              </FlexCell>
              <FlexCell grow={1}>
                <div className={css.classInfo}>
                  <h3 className={css.classTitle}>{data.className}</h3>
                  <div className={css.classSubtitle}>
                    {data.studentCount} students enrolled
                  </div>
                </div>
              </FlexCell>
              <FlexCell width="auto">
                <CountIndicator
                  caption={data.studentCount}
                  size="24"
                  color="neutral"
                />
              </FlexCell>
            </FlexRow>
          </FlexCell>
          <FlexCell width="auto">
            <Tooltip content={`Get help with ${data.className}`}>
              <IconButton
                icon={HelpIcon}
                color="neutral"
                size="18"
                rawProps={{ 'aria-label': `Help for ${data.className}` }}
              />
            </Tooltip>
          </FlexCell>
        </FlexRow>
      </div>

      {/* Card Content */}
      <div className={`${css.cardContent} ${isExpanded ? css.contentExpanded : ''}`}>
        
        <div className={css.performersList}>
          {data.topPerformers.map((performer, index) => (
            <div key={performer.id} className={css.performerRow}>
              <FlexRow spacing="12" alignItems="center">
                <FlexCell width="auto">
                  <div className={css.rankBadge}>
                    {getPerformanceRank(index)}
                  </div>
                </FlexCell>
                <FlexCell width="auto">
                  <Avatar
                    size="30"
                    img={performer.avatar || null}
                    alt={performer.name}
                  />
                </FlexCell>
                <FlexCell grow={1}>
                  <div className={css.userInfo}>
                    <div className={css.userName}>{performer.name}</div>
                    <div className={css.userTitle}>{performer.title}</div>
                  </div>
                </FlexCell>
                <FlexCell width="auto">
                  <div className={`${css.score} ${css[getPerformanceColor(performer.score)]}`}>
                    {performer.score}%
                  </div>
                </FlexCell>
              </FlexRow>
            </div>
          ))}
        </div>
        
        {isExpanded && (
          <div className={css.cardActions}>
            <Button
              caption="View All Students"
              color="primary"
              fill="solid"
              size="30"
              onClick={() => onShowAllStudents?.(data.id, data.className)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const ClassOverviewCards: React.FC<ClassOverviewCardsProps> = ({ classData, onShowAllStudents }) => {
  return (
    <div className={css.container}>
      <div className={css.sectionHeader}>
        <h2 className={css.sectionTitle}>Class Overview</h2>
        <p className={css.sectionSubtitle}>Track performance across all your classes</p>
      </div>
      
      <div className={css.cardsGrid}>
        {classData.map((classItem) => (
          <div key={classItem.id} className={css.cardWrapper}>
            <ClassCard data={classItem} onShowAllStudents={onShowAllStudents} />
          </div>
        ))}
      </div>
    </div>
  );
};
