import React from 'react';
import { Panel, FlexRow, FlexCell, Text, Avatar } from '@epam/uui';
import { SupportTeamGroupData } from '../../data/mockData';

export interface SupportTeamWidgetProps {
  groups: SupportTeamGroupData[];
  className?: string;
}

export const SupportTeamWidget: React.FC<SupportTeamWidgetProps> = ({ groups, className }) => {
  return (
    <Panel cx={className} background="surface-main" shadow>
      <FlexCell>
        <Text fontSize="18" lineHeight="24" fontWeight="600" color="primary">
          Support Team
        </Text>
      </FlexCell>
      {groups.map((group) => (
        <FlexCell key={group.role}>
          <Text fontSize="14" fontWeight="600" color="secondary">
            {group.role}
          </Text>
          {group.members.map((member) => (
            <FlexRow key={member.id} alignItems="center" spacing="12">
              <Avatar size="36" img={member.avatarUrl} alt={member.name} />
              <FlexCell>
                <Text fontSize="14" color="primary">{member.name}</Text>
                <Text fontSize="12" color="secondary">{member.title}</Text>
              </FlexCell>
            </FlexRow>
          ))}
        </FlexCell>
      ))}
    </Panel>
  );
};
