import { render } from '@testing-library/react';
import { QueryBuilder } from './QueryBuilder';
import type { Field } from 'react-querybuilder';

const fields: Field[] = [{ name: 'name', label: 'Name' }];

describe('QueryBuilder', () => {
  it('mounts without crashing', () => {
    const { container } = render(<QueryBuilder fields={fields} />);
    expect(container.querySelector('.queryBuilder') ?? container.firstChild).toBeTruthy();
  });
});
