import React, { VFC, ChangeEvent, FocusEvent, createElement, ReactElement } from 'react';
import cn from 'clsx';
import { Text } from 'components';
import styles from './styles.module.scss';

export interface InputProps {
  id?: string;
  component?: 'input' | 'textarea';
  type?: 'text' | 'number' | 'password';
  label?: string | ReactElement;
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  classNameInputWrap?: string;
  classNameLabel?: string;
  error?: boolean | string;
  success?: boolean | string;
  endAdornment?: ReactElement | string;
  disabled?: boolean;
  isCorrect?: boolean | '';
  autoComplete?: 'off' | 'on';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const Input: VFC<InputProps> = ({
  id,
  type = 'text',
  component = 'input',
  label,
  name,
  value,
  className,
  classNameInput,
  classNameInputWrap,
  classNameLabel,
  placeholder,
  error,
  success,
  endAdornment,
  disabled = false,
  isCorrect = false,
  autoComplete = 'off',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  required,
}) => (
  <>
    <label htmlFor={id || name} className={cn(styles.label, className)}>
      {label && (
        <Text size="m" weight="medium" className={cn(styles.labelText, classNameLabel)}>
          {label}
        </Text>
      )}
      <div
        className={cn(
          styles.inputWrap,
          { [styles.textareaWrapper]: component === 'textarea' },
          { [styles.required]: required },
          classNameInputWrap,
        )}
      >
        {createElement(component, {
          id: id || name,
          type,
          name,
          value,
          placeholder: component === 'input' ? ' ' : placeholder,
          autoComplete,
          disabled,
          className: cn(
            styles[component],
            { [styles.error]: error },
            { [styles.success]: success },
            { [styles.bigRightPadding]: error || isCorrect },
            classNameInput,
          ),
          onChange,
          onFocus,
          onBlur,
        })}
        {endAdornment && component !== 'textarea' && (
          <span className={styles.endAdornment}>{endAdornment}</span>
        )}
      </div>
    </label>
    {error && typeof error === 'string' && <span className={styles.textError}>{error}</span>}
    {success && typeof success === 'string' && <span className={styles.textSuccess}>{success}</span>}
  </>
);
