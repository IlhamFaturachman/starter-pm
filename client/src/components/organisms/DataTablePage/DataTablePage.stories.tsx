import type { Meta, StoryObj } from '@storybook/react';
import { DataTablePage } from './DataTablePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta: Meta<typeof DataTablePage> = {
  title: 'Organisms/DataTablePage',
  component: DataTablePage,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const qc = new QueryClient();
      return (
        <QueryClientProvider client={qc}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof DataTablePage>;
export const Default: Story = {};
