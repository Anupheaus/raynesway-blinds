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
        <meta name="description" content={'Raynesway Blinds manufacture blinds, shutters and awnings using only the finest materials.  ' +
          'We are also open 5 days a week and can visit to measure and quote on saturday by appointment for your convenience.'} />
        <script type="application/ld+json">{JSON.stringify(richResults)}</script>
      </Helmet>}
      <Messages
        index={transitionIndex}
        intervalMS={intervalMS}
      />
    </Flex>
  );
});