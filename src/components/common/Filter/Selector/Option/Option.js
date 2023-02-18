import styled from 'styled-components';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Button = styled.button`
  font-size: 15px !important;
  border: 1px solid ${({ selected }) => (selected ? '#62ccab' : '#dbdbdb')} !important;
  color: ${({ selected }) => (selected ? '#62ccab' : '#878888')} !important;
  padding: 5px 10px;
  margin: 5px !important;
`;

function Option({ value, handleParameter, close }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(
      searchParams.get('firstPlace') === value ||
        searchParams.get('secondPlace') === value,
    );
  }, [selected, searchParams, value]);

  return (
    <div>
      <Button
        type="button"
        onClick={e => {
          handleParameter(e);
          close();
        }}
        selected={selected}
        value={value}
      >
        {value}
      </Button>
    </div>
  );
}

export default Option;
