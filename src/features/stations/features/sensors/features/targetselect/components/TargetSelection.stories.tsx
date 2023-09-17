import { StoryObj } from '@storybook/react';
import { TargetSelection } from './TargetSelection';
import { RelationshipType } from 'src/types/RelationshipType';

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
      draw: 'chevron',
      rel: RelationshipType.Neutral,
      description: 'klingon cruiser',
    }],
  },
};

export const Multiple: Story = {
  args: {
    targets: [{
      id: 1,
      draw: 'chevron',
      rel: RelationshipType.Neutral,
      description: 'klingon cruiser',
    },
    {
      id: 2,
      draw: 'chevron',
      rel: RelationshipType.Hostile,
      description: 'romulan warbird',
    },
    {
      id: 3,
      draw: 'chevron',
      rel: RelationshipType.Friendly,
      description: 'federation scout',
    },
    {
      id: 4,
      draw: 'chevron',
      rel: RelationshipType.Unknown,
      description: 'ferengi maurauder',
    },
    {
      id: 5,
      draw: 'circle',
      rel: RelationshipType.None,
      description: 'Class M planet',
    }],
    viewTarget: 3,
  },
};
