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

export const Awnings = createComponent('Awnings', ({
  className,
}: Props) => {
  const { css, join } = useStyles();
  return (
    <Flex tagName="awnings" className={join(css.shutters, className)}>
      <Grid cellHeight={300} gap={32}>
        <GridCell type="title"><Typography type="title">Awnings</Typography></GridCell>

        <GridCell type="mediaAndText" title="Cool Comfort in Style" mediaSrc="/images/awnings-2.jpg">
          Beat the heat in style! Our awnings provide a cool and comfortable outdoor retreat, allowing
          you or your customers to enjoy your patio, deck, backyard or front of shop without the harsh glare
          of the sun. Experience the perfect blend of relaxation and style.
        </GridCell>
        <GridCell type="mediaAndText" title="UV Protection for Your Family" mediaSrc="/images/awnings-3.jpg">
          Safeguard your family, friends or customers from harmful UV rays. Our awnings act as a shield, providing a
          protective barrier that lets you or your customers enjoy the outdoors without compromising their well-being.
        </GridCell>
        <GridCell type="mediaAndText" title="Durable and Weather Resistant" mediaSrc="/images/awnings-1.jpg">
          Crafted from high-quality materials, our awnings are built to withstand the elements. Rain or shine, our
          awnings provide reliable protection, ensuring your outdoor space remains inviting year-round.
        </GridCell>

      </Grid>
    </Flex>
  );
});