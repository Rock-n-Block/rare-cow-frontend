/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
import { FC } from 'react';
import logo from 'assets/img/logo.png';

import { Button, Text } from 'components';

import { useWindowState } from 'hooks';
import styles from './styles.module.scss';

const Banner: FC = () => {
  const { width } = useWindowState();
  return (
    <div className={styles.banner}>
      <div className={styles.bannerBody}>
        {width < 767 ? (
          <>
            <div className={styles.titleTop}>
              <Text variant="heading-2">RareCow</Text>{' '}
              <Text variant="heading-2" color="accent">
                NFT
              </Text>
            </div>
            <div className={styles.titleBottom}>
              <Text variant="heading-2" color="accent">
                Marketplace
              </Text>
            </div>
            <Text size="xs" align="center" className={styles.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <img src={logo} alt="logo" className={styles.logo} />
            <div className={styles.bannerBtns}>
              <Button className={styles.btn} href="/">
                Explore
              </Button>
              <Button variant="outlined" className={styles.btn} href="/">
                Create
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.bannerBodyLeft}>
              <div className={styles.titleTop}>
                <Text variant="display-1">RareCow</Text>{' '}
                <Text variant="display-1" color="accent">
                  NFT
                </Text>
              </div>
              <div className={styles.titleBottom}>
                <Text variant="display-1" color="accent">
                  Marketplace
                </Text>
              </div>
              <Text variant="body-1" className={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
              <div className={styles.bannerBtns}>
                <Button className={styles.btn} href="/">
                  Explore
                </Button>
                <Button variant="outlined" className={styles.btn} href="/">
                  Create
                </Button>
              </div>
            </div>
            <div className={styles.bannerBodyRight}>
              <img src={logo} alt="logo" className={styles.logo} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Banner;