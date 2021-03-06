/* eslint-disable max-len */
import React, {
  MouseEventHandler,
  MouseEvent,
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  ReactElement,
} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'clsx';

import { Text } from 'components';

import './styles.scss';
import { TDropdownValue } from 'types';
import { Input } from 'components/Input';
import { ArrowHeadDownIcon, SearchIcon, TriangleDownIcon } from 'assets/icons/icons';
import { Loader } from 'components/Loader';

export interface DropdownProps {
  value?: TDropdownValue;
  setValue: (str: TDropdownValue) => void;
  options: TDropdownValue[];
  emptyOptionsMsg?: string | ReactElement;
  name: string;
  variant?: 'outlined' | 'transparent';
  dropPosition?: 'relative' | 'absolute';
  dropVariant?: 'body' | 'head';
  underlined?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  classNameHead?: string;
  classNameBody?: string;
  label?: string | ReactElement;
  error?: string | ReactElement;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: MouseEvent) => void;
  withSearch?: boolean;
  searchValue?: string;
  setSearchValue?: (val: string) => void;
  isSearching?: boolean;
  isOutsideClickClose?: boolean;
}

const iconMap = {
  outlined: <TriangleDownIcon className="dropdown-head-icon-triangle" />,
  transparent: <ArrowHeadDownIcon className="dropdown-head-icon-arrow" />,
};

/**
 * @param {TDropdownValue} value - the dropdown current value
 * @param {(str: TDropdownValue) => void} setValue - function which set current state of the dropdown
 * @param {TDropdownValue[]} options - list of options
 * @param {string} name - id of the dropdown
 * @param {('outlined' | 'transparent')} [variant = transparent] - color theme of the dropdown
 * * outlined
 * * transparent
 * @param {('relative' | 'absolute')} [dropPosition = relative] - position of the dropdown
 * * relative
 * * absolute
 * @param {('body' | 'head')} [dropPosition = body] - body type of the dropdown
 * * body
 * * head
 * @param {boolean} [underlined = true] - add underline on the `'outlined'` dropdown option
 * @param {boolean} [closeOnSelect = false] - flag which change selection action
 * @param {string} [className] - the wrapper class name
 * @param {string} [classNameHead] - the head class name
 * @param {string} [classNameBody] - the body class name
 * @param {(string | ReactElement)} [label] - label of the dropdown
 * @param {(string | ReactElement)} [error] - error of the dropdown
 * @param {string} [placeholder] - value, which will be set if the current value isn't chosen
 * @param {boolean} [disabled] - disable the dropdown
 * @param {(e: MouseEvent) => void} [onBlur] - onBlur event handler
 * @param {boolean} [withSearch] - add search input to the dropdown
 * @param {string} [searchValue] - search input value
 * @param {(val: string) => void} [setSearchValue] - set the search input value
 * @param {boolean} [isSearching] - disable the search input and add loader
 * @param {boolean} [isOutsideClickClose = true] - enable closing dropdown after outside click
 */
export const Dropdown: VFC<DropdownProps> = ({
  value,
  setValue,
  options,
  emptyOptionsMsg = 'There is no options',
  variant = 'transparent',
  dropPosition = 'relative',
  dropVariant = 'body',
  className,
  classNameHead,
  classNameBody,
  closeOnSelect = false,
  underlined = false,
  name,
  label,
  placeholder,
  error,
  disabled = false,
  withSearch = false,
  searchValue = '',
  setSearchValue = (val: string) => {
    console.log(val);
  },
  isSearching = false,
  onBlur,
  isOutsideClickClose = true,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(
    (val: TDropdownValue) => {
      setValue(val);
      if (closeOnSelect) {
        setSearchValue('');
        setVisible(false);
      }
    },
    [closeOnSelect, setSearchValue, setValue],
  );

  const onHeadClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        const prev = visible;
        setVisible(!prev);
        if (prev) {
          onBlur?.(e);
        }
      }
    },
    [disabled, onBlur, visible],
  );

  const onOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (visible) {
        setVisible(false);
        onBlur?.(e);
      }
    },
    [onBlur, visible],
  );

  const setSearchingValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.currentTarget.value);
    },
    [setSearchValue],
  );

  return (
    <OutsideClickHandler onOutsideClick={isOutsideClickClose ? (e) => onOutsideClick(e) : () => {}}>
      {label && (
        <Text variant="body-2" color="metal700" weight="medium" className={cn('dropdown-label')}>
          {label}
        </Text>
      )}
      <div
        className={cn(
          'dropdown-content',
          dropVariant,
          {
            active: visible && !disabled,
            invalid: error,
          },
          className,
        )}
        id={name}
      >
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cn(classNameHead, 'dropdown-content-head', variant, { disabled })}
          id={name}
          onClick={onHeadClick}
        >
          <div className={cn('dropdown-head-selection', { placeholder: placeholder && !value })}>
            <Text variant="body-2" color="metal700">
              {value ? value.content : placeholder}
            </Text>
          </div>
          <span className={cn('dropdown-head-icon', { 'dropdown-head-icon-active': visible })}>
            {iconMap[variant]}
          </span>
        </div>
        {error && (
          <Text size="s" color="error" className="error">
            {error}
          </Text>
        )}
        <div
          className={cn('dropdown-content-body', classNameBody, variant, dropPosition, {
            underlined,
          })}
        >
          {withSearch && (
            <Input
              value={searchValue}
              name={name}
              startAdornment={<SearchIcon />}
              placeholder="Search..."
              size={variant === 'transparent' ? 'sm' : 'md'}
              onChange={setSearchingValue}
              endAdornment={isSearching ? <Loader size="extra-sm" variant="gray50" /> : <svg />}
              className="dropdown-search-input"
            />
          )}
          {options.length
            ? options.map((option) => (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn('dropdown-content-body-option', {
                  selected: value ? option.id === value.id : false,
                })}
                onClick={() => handleClick(option)}
                key={`dropdown_option_${option.id}`}
              >
                {option.content}
              </div>
            ))
            : <Text size="s" color="metal700">{emptyOptionsMsg}</Text>}
        </div>
      </div>
    </OutsideClickHandler>
  );
};
