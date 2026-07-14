import type { Meta, StoryObj } from '@storybook/react';
import { QueryBuilder } from './QueryBuilder';
import type { Field } from 'react-querybuilder';

const fields: Field[] = [
  { name: 'name', label: 'Name' },
  { name: 'status', label: 'Status' },
  { name: 'priority', label: 'Priority' },
];

const meta: Meta<typeof QueryBuilder> = {
  title: 'Molecules/QueryBuilder',
  component: QueryBuilder,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof QueryBuilder>;

export const Default: Story = { args: { fields } };
