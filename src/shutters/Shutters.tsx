import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { Grid, GridCell } from '../grid';
import { theme } from '../theme';
import { Typography } from '../typography';

const useStyles = createStyles({
  shutters: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...theme.scrollbars.styling,
  },
});

interface Props {
  className?: string;
}

export const Shutters = createComponent('Shutters', ({
  className,
}: Props) => {
  const { css, join } = useStyles();
  return (
    <Flex tagName="shutters" className={join(css.shutters, className)}>
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