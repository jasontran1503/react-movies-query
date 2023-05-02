import { SelectSortBy } from '@common/models';
import { ChangeEvent, useState } from 'react';

const SortBy = ({ changeSortBy }: { changeSortBy: (value: SelectSortBy) => void }) => {
  const [selectValue, setSelectValue] = useState<SelectSortBy>('popularity');

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SelectSortBy;
    setSelectValue(value);
    changeSortBy(value);
  };

  return (
    <div className="form-group w-50">
      <select className="form-control" value={selectValue} onChange={(e) => onChange(e)}>
        <option value="popularity">Popularity</option>
        <option value="vote_average">Vote Average</option>
        <option value="original_title">Original Title</option>
        <option value="release_date">Release Date</option>
      </select>
    </div>
  );
};

export default SortBy;
