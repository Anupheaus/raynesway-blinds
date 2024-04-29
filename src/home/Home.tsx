import { Flex, createComponent } from '@anupheaus/react-ui';
import { useContext } from 'react';
import { TransitionContext } from '../background';
import { Messages } from './Messages';
import { Helmet } from 'react-helmet';
import richResults from '../rich-results/default.json';

interface Props {
  isActive: boolean;
}

export const Home = createComponent('Home', ({
  isActive,
}: Props) => {
  const { transitionIndex, intervalMS } = useContext(TransitionContext);

  return (
    <Flex tagName="home" alignCentrally>
      {isActive && <Helmet>
        <title>Raynesway Blinds</title>
        <meta property="og:title" content="Raynesway Blinds" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rayneswayblinds.com/images/banner.png" />
        <meta property="og:url" content="https://rayneswayblinds.com" />
        <meta property="og:description" content={'Raynesway Blinds manufacture and fit blinds, shutters and awnings using only the finest, but affordable, materials.'} />
        <meta name="description" content={'Raynesway Blinds manufacture and fit blinds, shutters and awnings using only the finest, but affordable, materials.'} />
        <script type="application/ld+json">{JSON.stringify(richResults)}</script>
      </Helmet>}
      <Messages
        index={transitionIndex}
        intervalMS={intervalMS}
      />
    </Flex>
  );
});