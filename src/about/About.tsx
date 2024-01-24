import { createComponent, createStyles, Flex, Tooltip, useBound } from '@anupheaus/react-ui';
import { theme } from '../theme';
import { Typography } from '../typography';
import Color from 'color';
import { Icon } from '../icon';
import { Helmet } from 'react-helmet';
import { Media } from '../media';

export const useAboutStyles = createStyles({
  about: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 'min-content',
    ...theme.scrollbars.styling,
  },
  section: {
    maxWidth: '40%',
    minWidth: 300,
    width: '100%',
  },
  box: {
    borderRadius: 4,
    border: `1px solid ${theme.text.secondary}`,
    backgroundColor: Color(theme.background.primary).alpha(0.5).hexa().toString(),
    padding: 16,
    boxShadow: theme.shadows.medium,
  },
  titleBox: {
    backgroundColor: 'rgb(255 255 255 / 50%)',
  },
  productBubble: {
    border: `1px solid ${theme.text.secondary}`,
    borderRadius: 8,
    padding: '2px 8px',
    backgroundColor: Color(theme.background.primary).alpha(0.5).hexa().toString(),
    justifyContent: 'center',
    boxShadow: theme.shadows.light,
  },
  link: {
    cursor: 'pointer',
  },
});

interface Props {
  isActive: boolean;
}

export const About = createComponent('About', ({
  isActive,
}: Props) => {
  const { css, join } = useAboutStyles();

  const sendMail = useBound(() => {
    window.open('mailto:sales@rayneswayblinds.com', '_blank');
  });

  const callUs = useBound(() => {
    window.open('tel:01332280585', '_blank');
  });

  const openCheckATrade = useBound(() => {
    window.open('https://www.checkatrade.com/RayneswayBlinds/', '_blank');
  });

  return (
    <Flex tagName="about" className={css.about} align="center" isVertical gap={32}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - About</title>
        <meta name="description" content={'Raynesway Blinds manufacture blinds, shutters and awnings using only the finest materials.  ' +
          'We are also open 5 days a week and can visit to measure and quote on saturday by appointment for your convenience.'} />
      </Helmet>}
      <Flex tagName="about-main" isVertical gap={16} className={css.section}>
        <Flex tagName="about-content-title" isVertical align="center" className={join(css.box, css.titleBox)}>
          <Typography type="heading">Our History</Typography>
        </Flex>
        <Flex tagName="about-content-body" isVertical gap={16} className={css.box}>
          <Typography type="paragraph">
            Formerly known as Raynesway Interiors, which supplied and fitted blinds, shutters and awnings for over 30 years in the Derby area, the company
            is now under new ownership and has been rebranded as Raynesway Blinds.
          </Typography>
          <Typography type="paragraph">
            We have, and continue to pride ourselves on our excellent customer service and high quality products.&nbsp; We offer a free measuring and fitting service and all of our products are made to measure.
          </Typography>
        </Flex>
      </Flex>
      <Flex tagName="about-main" isVertical gap={16} className={css.section}>
        <Flex tagName="about-content-title" isVertical align="center" className={join(css.box, css.titleBox)}>
          <Typography type="heading">Our Accreditations</Typography>
        </Flex>
        <Flex tagName="about-content-body" isVertical gap={16} className={css.box}>
          <Tooltip content="Click here to view our Checkatrade profile">
            <Media src="/images/cat-approved-member.png" disableGrow width={'fit-content'} onClick={openCheckATrade} />
          </Tooltip>
        </Flex>
      </Flex>
      <Flex tagName="about-main" isVertical gap={16} className={css.section}>
        <Flex tagName="about-content-title" isVertical align="center" className={join(css.box, css.titleBox)}>
          <Typography type="heading">Our Products</Typography>
        </Flex>
        <Flex tagName="about-content-body" isVertical gap={16} className={css.box}>
          <Typography type="paragraph">
            We have a wide range of products available, including:
          </Typography>
          <Flex tagName="about-content-products" gap={8} enableWrap valign="top">
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Roller Blinds</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Vertical Blinds</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Venetian Blinds</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Pleated Blinds</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Perfect Fit Blinds</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Conservatory Blinds</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Shutters</Typography></Flex>
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Awnings</Typography></Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex tagName="about-main" isVertical gap={16} className={css.section}>
        <Flex tagName="about-content-title" isVertical align="center" className={join(css.box, css.titleBox)}>
          <Typography type="heading">Our Contact Information</Typography>
        </Flex>
        <Flex tagName="about-content-body" isVertical gap={16} className={css.box}>
          <Flex gap={6}><Icon name="address" /><Typography type="paragraph">Unit 5, 227 Derby Road, Chaddesden, Derby, DE21 6SY</Typography></Flex>
          <Flex gap={6}>
            <Icon name="email" />
            <Tooltip content="Click here to send us an email">
              <Typography type="paragraph" onClick={sendMail} className={css.link}>sales@rayneswayblinds.com</Typography>
            </Tooltip>
          </Flex>
          <Flex gap={6}>
            <Icon name="telephone" />
            <Tooltip content="Click here to call us">
              <Typography type="paragraph" onClick={callUs} className={css.link}>01332 280585</Typography>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
});