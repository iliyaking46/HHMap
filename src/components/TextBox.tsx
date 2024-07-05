import React from 'react';

type Props = {
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string
}

const TextBox: React.FC<Props> = ({ onChange, onKeyDown, value = '' }) => (
  <input
    className="form-control"
    placeholder="Название вакансии или ключевое слово"
    type="text"
    value={value}
    onKeyDown={onKeyDown}
    onChange={e => onChange(e.target.value)}
  />
);

export default TextBox;
