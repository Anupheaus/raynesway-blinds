import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { Grid, GridCell } from '../grid';
import { theme } from '../theme';
import { Typography } from '../typography';
import { Helmet } from 'react-helmet';

const useStyles = createStyles({
  shutters: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...theme.scrollbars.styling,
  },
});

interface Props {
  isActive: boolean;
}

export const Shutters = createComponent('Shutters', ({
  isActive,
}: Props) => {
  const { css } = useStyles();
  return (
    <Flex tagName="shutters" className={css.shutters}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - Shutters</title>
        <meta property="og:title" content="Raynesway Blinds - Shutters" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rayneswayblinds.com/images/window-shutters-1.jpg" />
        <meta property="og:url" content="https://rayneswayblinds.com/shutters" />
        <meta property="og:description" content="Enhance your living spaces with Raynesway Blinds' exquisite Shutters collection, meticulously crafted for durability and style." />
        <meta name="description" content="Enhance your living spaces with Raynesway Blinds' exquisite Shutters collection, meticulously crafted for durability and style." />
      </Helmet>}
      <Grid cellHeight={300} gap={32}>
        <GridCell type="title"><Typography type="title">Window Shutters</Typography></GridCell>

        <GridCell type="mediaAndText" title="Timeless Appeal" mediaSrc="/images/window-shutters-1.jpg">
          Window shutters add a classic, timeless elegance to any room. Their versatile design effortlessly
          complements various architectural styles, making them a perfect choice for those who appreciate enduring beauty.
        </GridCell>
        <GridCell type="mediaAndText" title="Low Maintenance" mediaSrc="/images/window-shutters-2.jpg">
          Say goodbye to high-maintenance window treatments. Window shutters are easy to clean and require minimal upkeep,
          providing you with a hassle-free solution for a busy lifestyle.
        </GridCell>
        <GridCell type="mediaAndText" title="Temperature and Light Regulation" mediaSrc="/images/window-shutters-3.jpg">
          Keep your home comfortable year-round. The adjustable louvers enable you to manage the flow of natural light
          and ventilation, contributing to energy efficiency and maintaining a pleasant atmosphere.
        </GridCell>

      </Grid>
    </Flex>
  );
});