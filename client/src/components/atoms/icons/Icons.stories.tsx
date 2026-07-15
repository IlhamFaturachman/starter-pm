import type { Meta } from '@storybook/react';
import * as Icons from './index';

const meta: Meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
};

export default meta;

export const AllIcons = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 text-slate-800 dark:text-white">
      <div className="flex flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-700">
        <Icons.Mail className="h-8 w-8" />
        <span className="text-xs">Mail</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-700">
        <Icons.Lock className="h-8 w-8" />
        <span className="text-xs">Lock</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-700">
        <Icons.User className="h-8 w-8" />
        <span className="text-xs">User</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-700">
        <Icons.Key className="h-8 w-8" />
        <span className="text-xs">Key</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-700">
        <Icons.Check className="h-8 w-8" />
        <span className="text-xs">Check</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-700">
        <Icons.Shield className="h-8 w-8" />
        <span className="text-xs">Shield</span>
      </div>
    </div>
  );
};
