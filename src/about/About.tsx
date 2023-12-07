import { createComponent, createStyles, Flex, Tooltip, useBound } from '@anupheaus/react-ui';
import { theme } from '../theme';
import { Typography } from '../typography';
import Color from 'color';
import { Icon } from '../icon';

const useStyles = createStyles({
  about: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
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
  className?: string;
}

export const About = createComponent('About', ({
  className,
}: Props) => {
  const { css, join } = useStyles();

  const sendMail = useBound(() => {
    window.open('mailto:sales@rayneswayblinds.com', '_blank');
  });

  const callUs = useBound(() => {
    window.open('tel:03330470585', '_blank');
  });

  return (
    <Flex tagName="about" className={join(css.about, className)} align="center" isVertical gap={32}>
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
            <Flex tagName="about-content-products-bubble" className={css.productBubble}><Typography type="paragraph">Roman Blinds</Typography></Flex>
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
              <Typography type="paragraph" onClick={callUs} className={css.link}>0333 047 0585</Typography>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
});