import { Flex, createComponent, createStyles, useBound } from '@anupheaus/react-ui';
import { Helmet } from 'react-helmet';
import { useSubMenu } from '../sub-menu-provider';
import { referralsSubMenuOptions } from './ReferralsSubMenuOptions';
import { useMemo } from 'react';
import { PageConfig } from '../pages';
import { useLazyLoadPages } from '../hooks';
import { Grid, GridCell } from '../grid';
import { theme } from '../theme';
import { Typography } from '../typography';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles({
  referrals: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...theme.scrollbars.styling,
  },
  buttonArea: {
    paddingBottom: '20%',
  },
});

interface Props {
  isActive: boolean;
}

export const Referrals = createComponent('Referrals', ({
  isActive,
}: Props) => {
  const { css } = useStyles();
  const navigateTo = useNavigate();
  useSubMenu(referralsSubMenuOptions, isActive);

  const viewRecommendationsScheme = useBound(() => navigateTo('/referrals/recommendations'));
  const viewAffiliateScheme = useBound(() => navigateTo('/referrals/affiliates'));

  const allPages = useMemo<PageConfig[]>(() => [
    {
      label: '', path: '/referrals', component: ({ isActive: innerIsActive }) => (
        <Flex tagName="referrals" className={css.referrals}>
          {innerIsActive && <Helmet>
            <title>Raynesway Blinds - Referrals</title>
            <meta name="description" content={'We are offering a substantial reward for anyone that recommends us - how does 5% of their order value sound?  Generous?  Sure it does!'} />
          </Helmet>}
          <Grid cellHeight={300} gap={32}>
            <GridCell type="mediaAndText" title="Recommendations Scheme" mediaSrc="/images/recommendation.png" variant="horizontal">
              <Typography type="paragraph">We are offering up to a whopping £50 Amazon gift card for you for any friends that you recommend to us.</Typography>
              <Flex align="center" valign="bottom" className={css.buttonArea}>
                <Button onSelect={viewRecommendationsScheme}>View the full details</Button>
              </Flex>
            </GridCell>
            <GridCell type="mediaAndText" title="Commercial Affiliate Scheme" mediaSrc="/images/affiliates.png" variant="horizontal">
              <Typography type="paragraph">Simply hand out our free postcards to your customers and earn 5% of the order value from any orders that they place with us.</Typography>
              <Flex align="center" valign="bottom" className={css.buttonArea}>
                <Button onSelect={viewAffiliateScheme}>View the full details</Button>
              </Flex>
            </GridCell>
          </Grid>
        </Flex>
      )
    },
    ...referralsSubMenuOptions,
  ], []);

  return (
    <>
      {useLazyLoadPages({
        pages: allPages,
      })}
    </>
  );
});