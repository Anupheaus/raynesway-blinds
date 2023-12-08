import { AnyObject } from '@anupheaus/common';
import { createComponent, createStyles, Flex } from '@anupheaus/react-ui';
import { ComponentProps, CSSProperties, ReactNode, useMemo } from 'react';
import { Media } from '../media';
import { theme } from '../theme';
import { Typography } from '../typography';

const useStyles = createStyles({
  gridCell: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    boxShadow: theme.shadows.medium,
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  type_mediaAndText: {
    minHeight: 300,
    maxHeight: 700,
  },
  type_title: {
    backgroundColor: 'rgb(255 255 255 / 50%)',
    padding: 16,
  },
  gridCellMediaAndText: {
    height: '100%',
  },
  mediaAndTextTitle: {
    position: 'absolute',
    top: 0,
    left: -20,
    right: -20,
    padding: '0 24px',
    backgroundColor: 'rgba(255 255 255 / 80%)',
    boxShadow: '0px 10px 20px rgba(255 255 255 / 100%)',
  },
  mediaAndTextParagraph: {
    backgroundColor: 'rgba(255 255 255 / 70%)',
    boxShadow: '0px -5px 10px rgba(0 0 0 / 30%)',
    padding: '4px 24px',
    margin: '0 -20px',
    zIndex: 2,
    display: 'flex',
  },
});

interface TitleProps {
  type: 'title';
  children: ReactNode;
}

interface MediaAndTextProps {
  type: 'mediaAndText';
  title: ReactNode;
  mediaSrc: string;
  mediaThumbnail?: string;
  span?: number;
  children: ReactNode;
}

type Props = (TitleProps | MediaAndTextProps) & ComponentProps<typeof Flex>;

export const GridCell = createComponent('GridCell', (props: Props) => {
  const { css, join } = useStyles();
  const { type: ignore1, span: ignore2, title: ignore3, span: ignore4, children: ignore5, ...rest } = props as AnyObject;

  const type = props.type;
  const span = props.type === 'mediaAndText' ? props.span : 1;
  const children = props.children;
  const title = props.type === 'mediaAndText' ? props.title : children;

  const style = useMemo<CSSProperties>(() => ({
    ...props.style,
  }), [span]);

  const content = useMemo(() => {
    switch (type) {
      case 'title':
        return <Typography type="title">{title}</Typography>;
      case 'mediaAndText':
        return (
          <Flex tagName="grid-cell-media-and-text" isVertical className={css.gridCellMediaAndText}>
            <Media src={props.mediaSrc} thumbnail={props.mediaThumbnail} />
            <Typography type="heading" className={css.mediaAndTextTitle}>{title}</Typography>
            <Typography type="paragraph" className={css.mediaAndTextParagraph}>{children}</Typography>
          </Flex>
        );
    }
  }, [type, children, title, props]);

  return (
    <Flex
      {...rest}
      tagName="grid-cell"
      className={join(css.gridCell, (css as AnyObject)[`type_${type}`], props.className)}
      style={style}
      isVertical
      disableGrow
    >
      {content}
    </Flex>
  );
});
