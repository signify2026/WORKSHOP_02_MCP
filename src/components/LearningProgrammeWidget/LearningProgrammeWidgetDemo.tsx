import React from 'react';
import { FlexCell } from '@epam/uui';
import { LearningProgrammeWidget } from './LearningProgrammeWidget';
import { useLearningProgramme } from './useLearningProgramme';

/**
 * Demo component showing how to use the LearningProgrammeWidget
 * with the custom hook for data management
 */
export const LearningProgrammeWidgetDemo: React.FC = () => {
  const { programmes, totalTime, isLoading, error, refreshData } = useLearningProgramme();

  if (isLoading) {
    return (
      <FlexCell width={320}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading learning progress...
        </div>
      </FlexCell>
    );
  }

  if (error) {
    return (
      <FlexCell width={320}>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          Error: {error}
          <button onClick={refreshData} style={{ marginLeft: '10px' }}>
            Retry
          </button>
        </div>
      </FlexCell>
    );
  }

  return (
    <FlexCell>
      <LearningProgrammeWidget
        totalTime={totalTime}
        programmes={programmes}
      />
    </FlexCell>
  );
};

export default LearningProgrammeWidgetDemo;
