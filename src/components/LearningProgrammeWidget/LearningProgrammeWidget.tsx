import React from 'react';
import { Panel, FlexRow, FlexCell, Text, FlexSpacer } from '@epam/uui';
import styles from './LearningProgrammeWidget.module.scss';

export interface ProgrammeData {
  id: string;
  name: string;
  progress: number;
  timeSpent: string;
  color: 'success' | 'info' | 'neutral';
}

export interface LearningProgrammeWidgetProps {
  totalTime: string;
  programmes: ProgrammeData[];
  className?: string;
}

export const LearningProgrammeWidget: React.FC<LearningProgrammeWidgetProps> = ({
  totalTime,
  programmes,
  className
}) => {
  return (
    <Panel 
      cx={[styles.widgetContainer, className]}
      background="surface-main"
      shadow
      rawProps={{ 'data-testid': 'learning-programme-widget' }}
    >
      {/* Header Section */}
      <FlexRow alignItems="center" spacing="12" cx={styles.header}>
        <Text fontSize="18" lineHeight="24" fontWeight="600" color="primary">
          Learning Programme
        </Text>
        <FlexSpacer />
        <Panel 
          cx={styles.timeBadge}
          rawProps={{ 'data-testid': 'total-time-badge' }}
        >
          <Text fontSize="14" color="primary">
            {totalTime}
          </Text>
        </Panel>
      </FlexRow>

      {/* Overall Progress Bar */}
      <FlexCell cx={styles.overallProgressContainer}>
        <div className={styles.multiColorProgressBar}>
          {programmes.map((programme, index) => (
            <div
              key={programme.id}
              className={`${styles.progressSegment} ${styles[`segment-${programme.color}`]}`}
              style={{ width: `${programme.progress}%` }}
              data-testid={`progress-segment-${programme.id}`}
            />
          ))}
        </div>
      </FlexCell>

      {/* Programme List */}
      <FlexCell cx={styles.programmeList}>
        {programmes.map((programme) => (
          <FlexRow 
            key={programme.id}
            alignItems="center"
            spacing="12"
            cx={styles.programmeRow}
            rawProps={{ 'data-testid': `programme-row-${programme.id}` }}
          >
            <div 
              className={`${styles.colorIndicator} ${styles[`color-${programme.color}`]}`}
              data-testid={`color-indicator-${programme.id}`}
            />
            <Text 
              fontSize="14" 
              lineHeight="18" 
              color="primary"
              cx={styles.programmeName}
            >
              {programme.name}
            </Text>
            <FlexSpacer />
            <Text 
              fontSize="14" 
              color="primary"
              cx={styles.progressPercentage}
            >
              {programme.progress}%
            </Text>
            <Text 
              fontSize="14" 
              color="secondary"
              cx={styles.timeSpent}
            >
              {programme.timeSpent}
            </Text>
          </FlexRow>
        ))}
      </FlexCell>
    </Panel>
  );
};

export default LearningProgrammeWidget;
