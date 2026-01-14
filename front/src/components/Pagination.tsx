import { Button } from './ui';
import { PaginationProps } from '../types/component.types';

export function Pagination({
  currentPage,
  totalPages,
  
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className='mt-6 flex items-center justify-center gap-3'>
      <Button
        type='button'
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        קודם
      </Button>
      <span className='text-sm text-muted-foreground'>
        עמוד {currentPage} מתוך {totalPages}
      </span>
      <Button
        type='button'
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        הבא
      </Button>
    </div>
  );
}
