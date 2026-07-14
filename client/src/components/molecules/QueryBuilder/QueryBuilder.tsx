import { QueryBuilder as RQB, type Field, type RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

export interface QueryBuilderProps {
  fields: Field[];
  defaultQuery?: RuleGroupType;
  onQueryChange?: (query: RuleGroupType) => void;
  showCombinatorsBetweenRules?: boolean;
}

export function QueryBuilder({
  fields,
  defaultQuery,
  onQueryChange,
  showCombinatorsBetweenRules = true,
}: QueryBuilderProps) {
  return (
    <div className="rounded-md border border-surface-200 bg-white p-3">
      <RQB
        fields={fields}
        defaultQuery={defaultQuery}
        onQueryChange={onQueryChange}
        showCombinatorsBetweenRules={showCombinatorsBetweenRules}
        controlClassnames={{
          queryBuilder: 'rqb-container',
        }}
      />
    </div>
  );
}
