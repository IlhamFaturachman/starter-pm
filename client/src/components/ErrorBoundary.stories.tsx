import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Ini adalah pesan error simulasi dari komponen anak!');
};

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  args: {
    children: <ThrowError />,
  },
};

export const CustomFallback: Story = {
  args: {
    fallback: (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <h2 className="font-bold">Error Terdeteksi!</h2>
        <p className="text-sm text-red-600">Terjadi kesalahan saat memuat komponen ini.</p>
      </div>
    ),
    children: <ThrowError />,
  },
};
