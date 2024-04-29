import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { Grid, GridCell } from '../grid';
import { theme } from '../theme';
import { Typography } from '../typography';
import { Helmet } from 'react-helmet';
// import { useSubMenu } from '../sub-menu-provider';
// import { PageConfig } from '../pages';
// import { VenetianBlinds } from './VenetianBlinds';

const useStyles = createStyles({
  blinds: {
    padding: 32,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...theme.scrollbars.styling,
  },
});

// const blindsSubMenuOptions: PageConfig[] = [
//   { label: 'Venetian', path: '/blinds/venetian', component: VenetianBlinds },
//   { label: 'Roller', path: '/blinds/roller', component: VenetianBlinds },
//   { label: 'Vertical', path: '/blinds/vertical', component: VenetianBlinds },
//   { label: 'Night and Day', path: '/blinds/night-and-day', component: VenetianBlinds },
// ];

interface Props {
  isActive: boolean;
}

export const Blinds = createComponent('Blinds', ({
  isActive,
}: Props) => {
  const { css } = useStyles();
  // useSubMenu(blindsSubMenuOptions, isActive);

  return (
    <Flex tagName="blinds" className={css.blinds}>
      {isActive && <Helmet>
        <title>Raynesway Blinds - Blinds</title>
        <meta property="og:title" content="Raynesway Blinds - Blinds" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rayneswayblinds.com/images/venetians-1.jpg" />
        <meta property="og:url" content="https://rayneswayblinds.com/blinds" />
        <meta property="og:description" content="Discover the perfect window solutions with Raynesway Blinds! Explore our exquisite collection of blinds, meticulously crafted to elevate your space." />
        <meta name="description" content="Discover the perfect window solutions with Raynesway Blinds! Explore our exquisite collection of blinds, meticulously crafted to elevate your space." />
      </Helmet>}
      <Grid cellHeight={300} gap={32}>
        <GridCell type="title"><h1>Venetian Blinds</h1></GridCell>

        <GridCell type="mediaAndText" title="Step into Elegance..." mediaSrc="/images/venetians-1.jpg">
          Are you ready to transform your living space into a stylish haven? Look no further than our exquisite collection of
          Venetian blinds! Discover the perfect blend of functionality and sophistication, bringing a touch of timeless
          elegance to your home or office.
        </GridCell>
        <GridCell type="mediaAndText" title="Why Choose Venetian Blinds?" mediaSrc="/images/venetians-2.jpg">
          Venetian blinds effortlessly complement any decor, from modern chic to classic charm. With a wide range of colors
          and finishes, you can personalize your space with ease.<br />
          <br />
          Enjoy your personal space without compromising on natural light. Venetian blinds offer an unparalleled level of
          privacy, making them an ideal choice for bedrooms, bathrooms, and offices.
        </GridCell>
        <GridCell type="mediaAndText" title="Fully Bespoke" mediaSrc="/videos/venetians-1.mp4" mediaThumbnail="/videos/venetians-1-thumbnail.mp4">
          Tailor your blinds to your exact specifications. Choose from various slat sizes, materials, and control options to create a window treatment that reflects your unique style.
        </GridCell>
        <GridCell type="mediaAndText" title="Light and Energy Control" mediaSrc="/images/venetians-3.jpg">
          Take control of the ambiance in your room. Adjust the slats to let in the perfect amount of sunlight, creating an
          inviting atmosphere that suits your mood.<br />
          <br />
          Venetian blinds also help regulate indoor temperatures by allowing you to control the amount of sunlight entering your
          space, contributing to energy savings.
        </GridCell>

        <GridCell type="title"><Typography type="title">Roller Blinds</Typography></GridCell>

        <GridCell type="mediaAndText" title="Sleek and Modern Design" mediaSrc="/images/rollers-1.jpg">
          Roller blinds offer a clean and contemporary look that effortlessly complements any interior style. Whether
          you prefer minimalistic or bold aesthetics, our diverse range of fabrics and designs ensures you find the perfect
          match for your space.
        </GridCell>
        <GridCell type="mediaAndText" title="Durability and Easy Maintenance" mediaSrc="/videos/rollers-1.mp4" mediaThumbnail="/videos/rollers-1-thumbnail.mp4">
          Crafted from high-quality materials, our roller blinds are built to withstand the test of time. Enjoy hassle-free
          maintenance with fabrics that are easy to clean, ensuring your blinds look as stunning as the day they were installed.
        </GridCell>
        <GridCell type="mediaAndText" title="Space Saving" mediaSrc="/images/rollers-2.jpg">
          Maximize your space with the sleek and compact design of roller blinds. Say goodbye to bulky window treatments and
          welcome a clean, uncluttered look that opens up your room and allows for more creative design possibilities.
        </GridCell>
        <GridCell type="mediaAndText" title="Beautifully Bespoke" mediaSrc="/images/rollers-3.jpg">
          Express your unique style with our customizable roller blinds. Choose from a wide array of fabrics, patterns, and
          colors to tailor your window coverings to match your personality and interior decor perfectly.
        </GridCell>

        <GridCell type="title"><Typography type="title">Roman Blinds</Typography></GridCell>

        <GridCell type="mediaAndText" title="Style Meets Comfort" mediaSrc="/images/roman-1.jpg">
          Are you ready to add a touch of sophistication and warmth to your living space? Our exquisite collection of Roman Blinds
          is designed to seamlessly blend style with functionality, creating an atmosphere of timeless beauty.
        </GridCell>
        <GridCell type="mediaAndText" title="Classic Charm, Modern Appeal" mediaSrc="/images/roman-2.jpg">
          Roman blinds effortlessly combine classic aesthetics with a modern twist. The luxurious folds create an elegant look that
          adds a touch of refinement to any room, making them a perfect choice for those who appreciate timeless design.
        </GridCell>
        <GridCell type="mediaAndText" title="Versatile Light Control" mediaSrc="/images/roman-3.jpg">
          Achieve the perfect balance of natural light and privacy. Our Roman Blinds feature customizable opacities, allowing you to
          control the amount of sunlight entering your space with precision.
        </GridCell>
        <GridCell type="mediaAndText" title="Tailored to Fit" mediaSrc="/images/roman-4.jpg">
          Every window is unique, and so are our Roman Blinds. Customise the dimensions to fit your windows perfectly, creating a
          tailored and seamless look that enhances the overall aesthetic of your home or office.
        </GridCell>

        <GridCell type="title"><Typography type="title">Vertical Blinds</Typography></GridCell>

        <GridCell type="mediaAndText" title="Space-Saving and Versatile" mediaSrc="/images/vertical-2.jpg">
          Perfect for large windows and sliding doors, Vertical Blinds offer a space-saving solution. The vertical orientation of the
          slats allows for easy operation in tight spaces, making them an ideal choice for both residential and commercial settings.
        </GridCell>
        <GridCell type="mediaAndText" title="Durable and Low Maintenance" mediaSrc="/images/vertical-4.jpg">
          Crafted from high-quality materials, our Vertical Blinds are built to last. Enjoy the benefits of durability and easy
          maintenance, ensuring your blinds remain a stylish and functional addition to your space for years to come.
        </GridCell>
        <GridCell type="mediaAndText" title="Sleek and Modern Aesthetics" mediaSrc="/images/vertical-5.jpg">
          Vertical Blinds bring a contemporary edge to any room. The clean lines and vertical slats create a sleek, modern look that
          complements a variety of interior styles, from minimalist to bold and vibrant.
        </GridCell>
        <GridCell type="mediaAndText" title="Privacy Control" mediaSrc="/images/vertical-6.jpg">
          Enhance your privacy without compromising on style. Vertical Blinds provide excellent privacy control, making them an
          excellent choice for bedrooms, offices, and living spaces.
        </GridCell>

        <GridCell type="title"><Typography type="title">Night and Day Blinds</Typography></GridCell>

        <GridCell type="mediaAndText" title="Dual Functionality" mediaSrc="/images/night-and-day-1.jpg">
          Experience the best of both worlds! Night and Day Blinds feature alternating opaque and sheer stripes that allow you to
          effortlessly switch between privacy and natural light. Enjoy a cozy, private atmosphere or bask in the warmth of sunlight, all with a single adjustment.
        </GridCell>
        <GridCell type="mediaAndText" title="Highly Customisable" mediaSrc="/videos/night-and-day-1.mp4" mediaThumbnail="/videos/night-and-day-1-thumbail.mp4">
          Express your individual style with a range of colors and patterns to choose from. Our Night and Day Blinds can be customised
          to complement your interior decor, creating a harmonious and cohesive look throughout your space.
        </GridCell>
        <GridCell type="mediaAndText" title="Contemporary Design" mediaSrc="/images/night-and-day-2.jpg">
          Elevate your interior aesthetics with the modern and stylish look of Night and Day Blinds. The unique striped pattern adds a touch
          of sophistication to any room, making them a perfect choice for those who appreciate contemporary design.
        </GridCell>
      </Grid>
    </Flex>
  );
});