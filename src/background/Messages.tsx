import { Flex, createComponent, createStyles } from '@anupheaus/react-ui';
import { ComponentProps, ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Message } from './Message';

const useStyles = createStyles({
  messages: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  isVisible: {
    opacity: 1,
  },
});

interface GroupMessagesProps extends Pick<ComponentProps<typeof Flex>, 'align'> {

}

interface Props {
  index: number;
  intervalMS: number;
}

export const Messages = createComponent('Messages', ({
  index,
  intervalMS,
}: Props) => {
  const { css, join } = useStyles();
  const [isVisible, setVisibility] = useState(false);
  const uniqueKey = useMemo(() => Math.uniqueId(), [index]);

  const groupMessages = (children: ReactNode, props: GroupMessagesProps = {}) => {
    return (
      <Flex key={uniqueKey} tagName="messages" className={join(css.messages, isVisible && css.isVisible)} isVertical gap={28} disableGrow align='center' {...props}>
        {children}
      </Flex>
    );
  };

  useLayoutEffect(() => {
    const timeout1 = setTimeout(() => {
      setVisibility(true);
    }, 500);
    const timeout2 = setTimeout(() => {
      setVisibility(false);
    }, intervalMS - 1000);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [index]);

  useEffect(() => {
    setVisibility(true);
  }, []);

  return useMemo(() => {
    switch (index) {
      case 0: return groupMessages(<>
        <Message fontType="message-elegant" slide="down">Fine Blinds for</Message>
        <Message fontType="message-anton" fontSize={84} slide="down" delayMS={1500}>A STUNNING HOME</Message>
      </>, { align: 'right' });
      case 1: return groupMessages(<>
        <Message fontType="message-simple" paddingRight={120} fontWeight="bold" slide='left'>With professional and</Message>
        <Message fontType="message-simple" fontWeight="bold" slide="left" delayMS={800}>experienced staff...</Message>
        <Message fontType="message-elegant" paddingLeft={200} slide="right" delayMS={1600}>...you&apos;re in good hands</Message>
      </>);
      case 2: return groupMessages(<>
        <Message fontType="message-luxury" paddingLeft={80} slide="down">Luxury Blinds</Message>
        <Message fontType="message-luxury" slide="right" delayMS={800}>&</Message>
        <Message fontType="message-elegant" paddingRight={80} slide="up" delayMS={1600}>Elegant Shutters</Message>
      </>);
      case 3: return groupMessages(<>
        <Message fontType="message-simple" color="white" fontWeight="bold" slide="down">PROFESSIONAL</Message>
        <Message fontType="message-luxury" color="white" paddingLeft={200} slide="right" delayMS={1000}>Home Office</Message>
      </>);
      case 4: return groupMessages(<>
        <Message fontType="message-elegant" fontSize={62} slide="down">Economical and Efficient</Message>
        <Message fontType="message-anton" slide='left' delayMS={1000}>BLIND REPAIRS</Message>
      </>, { align: 'left' });
      case 5: return groupMessages(<>
        <Message fontType="message-elegant" color="white" fontSize={62} slide="down">Elegant and Affordable</Message>
        <Message fontType="message-anton" color="white" slide="right" delayMS={1000}>CANOPIES AND AWNINGS</Message>
      </>, { align: 'right' });
      default: return null;
    }
  }, [index, isVisible]);
});