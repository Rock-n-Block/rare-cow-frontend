import { useCallback } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { TDropdownValue } from 'types/components/dropdown';

import { Dropdown } from './Dropdown';
import { dropdownPropsMocked } from './Dropdown.mock';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const { options } = dropdownPropsMocked;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [value, setValue] = useState(options[0]);
  const [searchValue, setSearchValue] = useState('');

  const setDropdownValue = useCallback((val: TDropdownValue) => {
    setValue(val);
  }, []);

  return (
    <>
      <div style={{ width: 300, margin: 12 }}>
        <Dropdown
          {...args}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          value={value}
          setValue={setDropdownValue}
          options={options}
          variant="outlined"
          dropPosition="absolute"
          label="Default label"
        />
      </div>
      <div style={{ width: 160, margin: 12 }}>
        <Dropdown
          {...args}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          value={value}
          setValue={setDropdownValue}
          options={options}
          variant="outlined"
          underlined={false}
          dropPosition="absolute"
          label="Explore"
          withSearch={false}
        />
      </div>
      <div style={{ width: 168, margin: 12 }}>
        <Dropdown
          {...args}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          value={value}
          setValue={setDropdownValue}
          options={options}
          label="Default label"
        />
      </div>
    </>
  );
};
export const Default = Template.bind({});

Default.args = dropdownPropsMocked;
