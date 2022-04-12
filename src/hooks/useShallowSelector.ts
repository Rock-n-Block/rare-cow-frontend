/* eslint-disable max-len */
import { Selector, shallowEqual, useSelector } from 'react-redux';

const useShallowSelector = <State, Type = State>(selector: Selector<State, Type>): Type => useSelector<State, Type>(selector, shallowEqual);

export default useShallowSelector;
