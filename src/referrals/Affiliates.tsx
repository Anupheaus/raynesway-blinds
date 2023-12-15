import { Flex, createComponent, createStyles } from '@anupheaus/react-ui';
import { theme } from '../theme';
import { useSubMenu } from '../sub-menu-provider';
import { referralsSubMenuOptions } from './ReferralsSubMenuOptions';
import { Helmet } from 'react-helmet';
import { Grid, GridCell } from '../grid';

const useStyles = createStyles({
  affiliates: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...theme.scrollbars.styling,
  },
});

interface Props {
  isActive: boolean;
}

export const Affiliates = createComponent('Affiliates', ({
  isActive,
}: Props) => {
  useSubMenu(referralsSubMenuOptions, isActive);
  const { css } = useStyles();

  return (
    <Flex tagName="affiliates" className={css.affiliates}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - Affiliates</title>
        <meta name="description" content={'The terms and conditions for the commercial affiliate scheme.'} />
      </Helmet>}
      <Grid cellHeight={300} gap={32}>
        <GridCell type="mediaAndText" title="Commercial Affiliate Scheme Terms and Conditions" mediaSrc="/images/affiliates.png" variant="horizontal" mediaMaxWidth={500}>
          You simply hand out our postcard to your customer.&nbsp; If they go on to place an order with us and quote your unique reference number, we will give
          you 5% of the order value as a thank you.&nbsp; The postcards are sent to you free of charge and the number of them will be based on the number of potential
          customers you will be handing them to per month.&nbsp; You will be contacted regularly to ensure you always have enough postcards.<br />
          <ul>
            <li>You will receive your reward at the end of the month following the month that the order was paid for in full, after any discounts or refunds have been applied.</li>
            <li>You must be over 18, have a registered UK business and have a UK bank account to receive your reward.</li>
            <li>You cannot recommend yourself - nice try though!</li>
            <li>You cannot recommend anyone that lives at the same address as you.</li>
            <li>There is no limit to the number of customers you can recommend.</li>
            <li>You agree that your business may appear on our website or social media page(s) to advertise our affiliation while you are a member of the scheme.</li>
            <li>We reserve the right to withdraw this offer at any time.</li>
            <li>We reserve the right to refuse to pay a reward if we believe that the recommendation was not genuine or is in some way abusing our scheme.</li>
            <li>We reserve the right to modify or amend these terms and conditions at any time.&nbsp; Any amendments will be available here on the website.</li>
          </ul>
        </GridCell>
      </Grid>
    </Flex>
  );
});