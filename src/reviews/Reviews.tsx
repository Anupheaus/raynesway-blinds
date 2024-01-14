import { Flex, createComponent, createStyles } from '@anupheaus/react-ui';
import { Typography } from '../typography';
import { Helmet } from 'react-helmet';
import { useAboutStyles } from '../about';

const useStyles = createStyles({
  reviewButtons: {
    flexWrap: 'wrap',
  },
  googleButton: {
    margin: -2,
  },
  buttonShadow: {
    filter: 'drop-shadow(0 1px 2px rgba(0 0 0 / 15%)) drop-shadow(0 3px 6px rgba(0 0 0 / 12%))',
  },
});

interface Props {
  isActive: boolean;
}

export const Reviews = createComponent('Reviews', ({
  isActive,
}: Props) => {
  const { css, join } = useStyles();
  const { css: aboutCSS } = useAboutStyles();

  return (
    <Flex tagName="reviews" align="center" isVertical className={aboutCSS.about}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - Reviews</title>
        <meta name="description" content="Raynesway Blinds reviews page - to help guide you to all the places you can review us." />
      </Helmet>}
      <Flex tagName="about-main" isVertical gap={16} className={aboutCSS.section}>
        <Flex tagName="about-content-title" isVertical align="center" className={join(aboutCSS.box, aboutCSS.titleBox)}>
          <Typography type="heading">Your Review</Typography>
        </Flex>
        <Typography type="paragraph">
          Thank you very much for choosing Raynesway Blinds.  We hope you are happy with your new blinds, shutters or awnings, or the repair
          work we did for you.<br />
          <br />
          We would really appreciate it if you could leave us a review on one or more of the following sites please:<br />
          <br />
          <Flex tagName="review-buttons" gap={8} className={css.reviewButtons} valign="center">
            <a href="https://g.page/r/CQxF8yQuTtHhEBM/review" rel="noreferrer" target="_blank">
              <img src="/images/review-us-on-google-button.png" width={244} className={join(css.googleButton, css.buttonShadow)} />
            </a>
            <a href="https://uk.trustpilot.com/evaluate/rayneswayblinds.com" rel="noreferrer" target="_blank">
              <img src="/images/trustpilot-review-button.png" width={240} className={css.buttonShadow} />
            </a>
            <a href="https://www.checkatrade.com/give-feedback/trades/rayneswayblinds" rel="noreferrer" target="_blank">
              <img src="/images/checkatrade-review-button.png" width={240} className={css.buttonShadow} />
            </a>
            {/* <a href="https://www.facebook.com/rayneswayblinds/reviews" rel="noreferrer" target="_blank">
              <img src="/images/facebook-review-button.png" width={240} />
            </a> */}
          </Flex>
        </Typography>
      </Flex>
    </Flex>
  );
});