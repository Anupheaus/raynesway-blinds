import { Flex, createComponent, createStyles } from '@anupheaus/react-ui';
import { useSubMenu } from '../sub-menu-provider';
import { referralsSubMenuOptions } from './ReferralsSubMenuOptions';
import { Helmet } from 'react-helmet';
import { Grid, GridCell } from '../grid';
import { theme } from '../theme';
import { Typography } from '../typography';

const useStyles = createStyles({
  recommendations: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...theme.scrollbars.styling,
  },
});

interface Props {
  isActive: boolean;
}

export const Recommendations = createComponent('Recommendations', ({
  isActive,
}: Props) => {
  useSubMenu(referralsSubMenuOptions, isActive);
  const { css } = useStyles();
  return (
    <Flex tagName="recommendations" className={css.recommendations}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - Recommendations</title>
        <meta name="description" content={'The terms and conditions for the recommendations scheme.'} />
      </Helmet>}
      <Grid cellHeight={300} gap={32}>
        <GridCell type="mediaAndText" title="Recommendations Scheme Terms and Conditions" mediaSrc="/images/recommendation.png" variant="horizontal" mediaMaxWidth={500}>
          <Typography type="paragraph">
            Simply recommend a friend to us and tell them to make sure they mention you when contacting us.  If they go on to place an order with us, we will give you an Amazon gift
            card up to a certain value as a thank you.<br />
            <ul>
              <li>If your friend&apos;s order value is over £600, you will receive a £25 Amazon  gift card.</li>
              <li>If your friend&apos;s order value is over £1,200, you will receive a £50 Amazon gift card.</li>
              <li>The maximum reward for any single friend is a £50 Amazon gift card, you cannot claim for more than one order per friend referred.</li>
              <li>There are no limits to the number of friends you can recommend.</li>
              <li>You will receive your reward around one month after the order has been paid for in full and the final value used is after any discounts or refunds have been applied.</li>
              <li>You must be over 18 and have provided us with your email address to receive the reward.</li>
              <li>You cannot recommend yourself.</li>
              <li>You cannot recommend anyone that lives at the same address as you.</li>
              <li>We reserve the right to withdraw this offer at any time.</li>
              <li>We reserve the right to refuse to provide a reward if we believe that the recommendation was not genuine or is being abused in any way.</li>
              <li>We reserve the right to modify or amend these terms and conditions at any time.&nbsp; Any amendments will be available here on the website.</li>
            </ul>
          </Typography>
        </GridCell>
      </Grid>
    </Flex>
  );
});
