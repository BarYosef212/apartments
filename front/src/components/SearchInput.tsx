import { Input } from './ui';
import { SearchInputProps } from '../types/component.types';

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='חיפוש לפי רחוב, עיר או תיאור'
    />
  );
}
