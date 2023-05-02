import { SelectSortBy } from '@common/models';
import { ChangeEvent } from 'react';

const SortBy = ({
  selectValue,
  changeSortBy
}: {
  selectValue: SelectSortBy;
  changeSortBy: (value: SelectSortBy) => void;
}) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SelectSortBy;
    changeSortBy(value);
  };

  return (
    <div className="form-group w-50">
      <select className="form-control" value={selectValue} onChange={onChange}>
        <option value="popularity">Popularity</option>
        <option value="vote_average">Vote Average</option>
        <option value="original_title">Original Title</option>
        <option value="release_date">Release Date</option>
      </select>
    </div>
  );
};

export default SortBy;
