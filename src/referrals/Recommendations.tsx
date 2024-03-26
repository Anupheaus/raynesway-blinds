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
            Simply put, you recommend a friend to us and tell them to make sure they mention you when contacting us.&nbsp; If they go on to place an order with us, we will give
            you 5% of the order value as a thank you.<br />
            <ul>
              <li>You will receive your reward around one month after the order has been paid for in full, after any discounts or refunds have been applied.</li>
              <li>You must have been a customer of ours yourself.</li>
              <li>You must be over 18 and have a UK bank account to receive your reward.</li>
              <li>You cannot recommend yourself - nice try though!</li>
              <li>You cannot recommend anyone that lives at the same address as you.</li>
              <li>There are no limits to the number of friends you can recommend.</li>
              <li>We reserve the right to withdraw this offer at any time.</li>
              <li>We reserve the right to refuse to pay a reward if we believe that the recommendation was not genuine.</li>
              <li>We reserve the right to modify or amend these terms and conditions at any time.&nbsp; Any amendments will be available here on the website.</li>
            </ul>
          </Typography>
        </GridCell>
      </Grid>
    </Flex>
  );
});
