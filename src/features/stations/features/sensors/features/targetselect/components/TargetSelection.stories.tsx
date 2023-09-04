import { StoryObj } from '@storybook/react';
import { TargetSelection } from './TargetSelection';
import { RelationshipType } from '../../../types/SensorTarget';

export default {
  title: 'Sensors/Target Selection/List',
  component: TargetSelection,
};

type Story = StoryObj<typeof TargetSelection>;

export const Empty: Story = {
  args: {
    targets: [],
  },
};

export const Single: Story = {
  args: {
    targets: [{
      id: 1,
      appearance: 'ship',
      relationship: RelationshipType.Neutral,
      description: 'klingon cruiser',
    }],
  },
};

export const Multiple: Story = {
  args: {
    targets: [{
      id: 1,
      appearance: 'ship',
      relationship: RelationshipType.Neutral,
      description: 'klingon cruiser',
    },
    {
      id: 2,
      appearance: 'ship',
      relationship: RelationshipType.Hostile,
      description: 'romulan warbird',
    },
    {
      id: 3,
      appearance: 'neutral',
      relationship: RelationshipType.Friendly,
      description: 'federation scout',
    }],
    viewTarget: 3,
  },
};
