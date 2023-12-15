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
    backgroundColor: 'rgb(231 182 111 / 70%)',
    padding: 16,
  },
  gridCellMediaAndText: {
    height: '100%',
  },
  mediaAndTextTitle: {
    padding: 4,
    margin: 0,
    backgroundColor: 'rgba(231 182 111 / 60%)',
    boxShadow: '0px 5px 10px rgba(0 0 0 / 30%)',
    zIndex: 1,
  },
  mediaAndTextContent: {
    backgroundColor: 'rgba(231 182 111 / 50%)',
    boxShadow: '0px -5px 10px rgba(0 0 0 / 30%)',
    padding: 4,
    margin: 0,
    zIndex: 2,
    display: 'flex',
  },

  horizontalGridCellMediaAndText: {
    backgroundColor: 'rgba(231 182 111 / 70%)',

    [theme.mediaMaxWidth]: {
      flexDirection: 'column',
    },
  },
  horizontalGridCellMediaAndTextText: {
    padding: 8,
  },
  horizontalMediaAndTextTitle: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 30,
      right: 30,
      height: 1,
      bottom: -8,
      backgroundColor: 'rgba(0 0 0 / 30%)',
    },
  },
  horizontalMediaAndTextContent: {
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
  variant?: 'horizontal' | 'vertical';
  mediaMaxWidth?: number | string;
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
        if (props.variant === 'horizontal') {
          return (
            <Flex tagName="grid-cell-media-and-text" className={css.horizontalGridCellMediaAndText}>
              <Media src={props.mediaSrc} thumbnail={props.mediaThumbnail} width="100%" maxWidth={props.mediaMaxWidth} />
              <Flex tagName="grid-cell-media-and-text-content" isVertical gap={16} className={css.horizontalGridCellMediaAndTextText}>
                <Typography type="heading" className={css.horizontalMediaAndTextTitle}>{title}</Typography>
                <Flex tagName="grid-cell-media-and-text-content" isVertical gap={8} className={css.horizontalMediaAndTextContent}>
                  {typeof (children) === 'string' ? (
                    <Typography type="paragraph">{children}</Typography>
                  ) : children}
                </Flex>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex tagName="grid-cell-media-and-text" isVertical className={css.gridCellMediaAndText}>
              <Typography type="heading" className={css.mediaAndTextTitle}>{title}</Typography>
              <Media src={props.mediaSrc} thumbnail={props.mediaThumbnail} maxWidth={props.mediaMaxWidth} />
              <Flex tagName="grid-cell-media-and-text-content" isVertical gap={8} className={css.mediaAndTextContent}>
                {typeof (children) === 'string' ? (
                  <Typography type="paragraph">{children}</Typography>
                ) : children}
              </Flex>
            </Flex>
          );
        }
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
