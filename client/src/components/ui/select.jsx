import { Children } from 'react';
import { cn } from '@/lib/utils';

export const Select = ({ value, onValueChange, children, className }) => {
  let options = [];
  let placeholder = '';

  Children.forEach(children, (child) => {
    if (child?.type?.displayName === 'SelectTrigger') {
      Children.forEach(child.props.children, (triggerChild) => {
        if (triggerChild?.type?.displayName === 'SelectValue' && triggerChild.props.placeholder) {
          placeholder = triggerChild.props.placeholder;
        }
      });
    }

    if (child?.type?.displayName === 'SelectContent') {
      Children.forEach(child.props.children, (item) => {
        if (item?.type?.displayName === 'SelectItem') {
          options.push({
            value: item.props.value,
            label: item.props.children,
          });
        }
      });
    }
  });

  const handleChange = (event) => {
    onValueChange?.(event.target.value);
  };

  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      value={value}
      onChange={handleChange}
    >
      {placeholder && (
        <option value="" disabled={Boolean(value)}>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const SelectTrigger = ({ children }) => children;
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder }) => placeholder;
SelectValue.displayName = 'SelectValue';

export const SelectContent = ({ children }) => children;
SelectContent.displayName = 'SelectContent';

export const SelectItem = ({ children }) => children;
SelectItem.displayName = 'SelectItem';

