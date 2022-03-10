import { ComponentStory } from '@storybook/react';
import { Dice as DiceComponent } from './Dice';

export default {
    title: 'Weapons/Dice',
    component: DiceComponent,
};

const Template: ComponentStory<typeof DiceComponent> = (args) => (
    <div style={{display: 'flex', margin: '0.5em', gap: '0.5em'}}>
        <DiceComponent {...args} />
        <DiceComponent {...args} value={1} />
        <DiceComponent {...args} value={2} />
        <DiceComponent {...args} value={3} />
        <DiceComponent {...args} value={4} />
        <DiceComponent {...args} value={5} />
        <DiceComponent {...args} value={6} />
    </div>
);

export const Normal = Template.bind({});
Normal.args = {
    frozen: false,
};

export const Frozen = Template.bind({});
Normal.args = {
    frozen: true,
};
