import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';

import cn from 'clsx';
import { Text } from 'components/Typography';
import { PromotionType } from 'types/api';
import { currencies, currenciesIconsMap, TCurrencies } from 'appConstants';
import { CheckboxButton } from 'components/CheckboxButton';
import { Button } from 'components/Button';
import { ExtendedPromotionOption } from 'types';
import styles from './styles.module.scss';

interface IPromoteCard {
  promotionType: PromotionType;
  promotionOption: ExtendedPromotionOption;
  isSelected: boolean;
  setIsSelected: (option: ExtendedPromotionOption) => void;
}

export const PromoteCard: VFC<IPromoteCard> = ({
  promotionOption,
  isSelected,
  promotionType,
  setIsSelected,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const onCurrencyClickHandler = useCallback(
    (currency: TCurrencies) => () => setSelectedCurrency(currency),
    [],
  );

  const timestampString = useMemo(() => {
    switch (promotionType) {
      case PromotionType.Premium: {
        return `${promotionOption.days} days`;
      }
      case PromotionType.Featured: {
        return `${promotionOption.clicks} clicks`;
      }
      default: {
        return '';
      }
    }
  }, [promotionOption.clicks, promotionOption.days, promotionType]);

  return (
    <div
      onClick={() => setIsSelected(promotionOption)}
      className={cn(styles.wrapper, { [styles.selected]: isSelected })}
    >
      <div className={styles.pricing}>
        <Text>$ {promotionOption.usdPrice}</Text>
        <Text>/</Text>
        <Text> {timestampString} </Text>
      </div>
      <hr />
      <div className={styles.currency}>
        {currencies.map((currency) => (
          <div className={styles.currencyItemWrapper}>
            <CheckboxButton
              content={(
                <div className={styles.currencyItemBody}>
                  <img
                    className={styles.currencyItemIcon}
                    src={currenciesIconsMap[currency.name]}
                    alt={currency.name}
                  />
                  {currency.name}
                </div>
              )}
              isChecked={currency.name === selectedCurrency.name}
              onChange={onCurrencyClickHandler(currency)}
              className={styles.listingCurrencyItem}
            />
          </div>
        ))}
      </div>
      <div>
        <Button className={styles.payBtn} variant={isSelected ? 'filled' : 'outlined'}>
          Pay
        </Button>
      </div>
    </div>
  );
};
