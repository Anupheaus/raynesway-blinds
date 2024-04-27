import { createComponent, createStyles, Flex, useOnResize } from '@anupheaus/react-ui';
import { Children, cloneElement, ComponentProps, isValidElement, ReactElement, useMemo } from 'react';
import { GridCell } from './GridCell';

const useStyles = createStyles({
  grid: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  gridContents: {
    height: 'min-content',
    paddingBottom: 32,
  },
});

const isGridCell = (element: unknown): element is ReactElement<ComponentProps<typeof GridCell>> => isValidElement(element) &&
  typeof (element.type) !== 'string' && element.type.name.startsWith('GridCell');

interface CellSize {
  width: string | number;
  height: string | number;
}

interface Props extends ComponentProps<typeof Flex> {
  cellHeight?: string | number;
  minCellWidth?: number;
  gap: number;
}

export const Grid = createComponent('Grid', ({
  cellHeight = 300,
  minCellWidth = 300,
  children,
  gap = 8,
  ...props
}: Props) => {
  const { css, toPx } = useStyles();
  const { target, hasDimensions, width } = useOnResize({ observeWidthOnly: true });

  const content = useMemo(() => {
    if (width == null) return;
    const updateWidthCallbacks = new Set<(newWidth: number) => void>();
    const elements = new Map<ReactElement<ComponentProps<typeof GridCell>>, CellSize>();
    let lastCalculatedWidth = 0;
    let currentWidth = 0;
    let columns = 0;

    const allElements = Children.toArray(children).map(e => isGridCell(e) ? e : null).removeNull();

    for (const element of allElements) {
      const isTitle = element.props.type === 'title';
      const span = ('span' in element.props ? element.props.span : undefined) ?? 1;
      const cellWidth = minCellWidth * span;
      elements.set(element, { height: cellHeight, width: cellWidth });
      if (isTitle || (cellWidth + currentWidth + (gap * (columns - 1)) > width)) {
        const newColumnWidth = Math.floor((width - (gap * (columns - 1))) / columns);
        lastCalculatedWidth = newColumnWidth;
        updateWidthCallbacks.forEach(callback => callback(newColumnWidth));
        columns = 0;
        currentWidth = 0;
        updateWidthCallbacks.clear();
      }
      if (isTitle) {
        elements.set(element, { height: 74, width });
      } else {
        columns += span;
        currentWidth += cellWidth;
        updateWidthCallbacks.add(newColumnWidth => elements.set(element, { height: cellHeight, width: (newColumnWidth * span) + ((span - 1) * gap) }));
      }
    }
    if (columns > 0) {
      const newColumnWidth = Math.floor((width - (gap * (columns - 1))) / columns);
      if (lastCalculatedWidth === 0) lastCalculatedWidth = newColumnWidth;
      updateWidthCallbacks.forEach(callback => callback(newColumnWidth < width / 2 ? newColumnWidth : lastCalculatedWidth));
    }
    return Array.from(elements.entries()).map(([element, { width: cellWidth }]) => cloneElement(element, { width: toPx(cellWidth) }));
  }, [children, hasDimensions, width, cellHeight, minCellWidth]);

  return (
    <Flex
      {...props}
      ref={target}
      tagName="grid"
      className={css.grid}
    >
      <Flex
        {...props}
        tagName="grid-contents"
        gap={gap}
        className={css.gridContents}
        valign="top"
        enableWrap
      >
        {content}
      </Flex>
    </Flex>
  );
});