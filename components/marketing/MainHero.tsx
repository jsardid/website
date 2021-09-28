import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Grid,
  Text,
  styled,
  keyframes,
  Container,
  Flex,
  Heading,
  Paragraph,
  Section,
} from '@modulz/design-system';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { MarketingButton } from './MarketingButton';

const pulse = keyframes({
  '0%': { backgroundColor: '$slateA2' },
  '100%': { backgroundColor: '$slateA4' },
});

const IFrameSkeleton = styled('div', {
  borderRadius: '$3',
  mb: '$2',

  variants: {
    active: {
      true: {
        animationName: `${pulse}`,
        animationDuration: '500ms',
        animationDirection: 'alternate',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      },
    },
  },
});

const IFrame = styled('iframe', {
  border: 0,
  width: 400,
  height: 400,
  overflow: 'hidden',
  borderRadius: '$3',

  variants: {
    visible: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

// TODO test safari
// TODO test focus visible
// TODO check with screen reader
// TODO review section spacing
export const MainHero = () => {
  // We synchronise when the first few iframes are visible as they load
  const [iFramesReady, setIFramesReady] = React.useState(false);
  const iFrameStates = React.useRef({
    dialog: 'loading',
    'dropdown-menu': 'loading',
    popover: 'loading',
    slider: 'loading',
  });

  React.useEffect(() => {
    const iFrameListener = (event: MessageEvent) => {
      if (event.data.name in iFrameStates.current) {
        iFrameStates.current[event.data.name] = 'ready';
        if (Object.values(iFrameStates.current).every((state) => state === 'ready')) {
          setIFramesReady(true);
        }
      }
    };
    addEventListener('message', iFrameListener);
    return () => removeEventListener('message', iFrameListener);
  }, []);

  return (
    <Section>
      <Container size="3">
        <Box css={{ mb: '$6' }}>
          <Heading size="4" css={{ mb: '$5', lineHeight: '1.05 !important' }}>
            Unstyled, accessible UI components with&nbsp;incredible developer experience
          </Heading>
          <Box css={{ maxWidth: 660, mb: '$4' }}>
            <Paragraph size="2" as="p">
              Radix Primitives is an open-source UI component library for building high-quality,
              accessible design systems and web apps in React.
            </Paragraph>
          </Box>
          <Flex justify={{ '@initial': 'start' }} gap="5">
            <NextLink href="/primitives/overview/getting-started" passHref>
              <MarketingButton as="a" gap="1">
                Install Primitives
                <ArrowRightIcon />
              </MarketingButton>
            </NextLink>
          </Flex>
        </Box>
        <Grid gap="5" css={{ gridAutoFlow: 'column' }}>
          <Box>
            <IFrameSkeleton active={!iFramesReady}>
              <IFrame
                visible={iFramesReady}
                tabIndex={-1}
                src="/primitives/iframe/dialog"
                css={{ background: 'linear-gradient(to bottom right, $indigo4, $violet5)' }}
              />
            </IFrameSkeleton>
            <Text size="4" css={{ fontWeight: 500, lineHeight: '20px', mb: '$1' }}>
              Dialog
            </Text>
            <Text size="3" variant="gray" css={{ lineHeight: '23px' }}>
              With modal and non-modal modes, fine-grained focus&nbsp;control, accessible to screen
              readers.
            </Text>
          </Box>

          <Box>
            <IFrameSkeleton active={!iFramesReady}>
              <IFrame
                visible={iFramesReady}
                tabIndex={-1}
                src="/primitives/iframe/dropdown-menu"
                css={{ background: 'linear-gradient(to bottom right,  $crimson4, $blue5)' }}
              />
            </IFrameSkeleton>
            <Text size="4" css={{ fontWeight: 500, lineHeight: '20px', mb: '$1' }}>
              Dropdown Menu
            </Text>
            <Text size="3" variant="gray" css={{ lineHeight: '23px' }}>
              With submenus, checkable items, collision handling, full keyboard navigation, and
              typeahead support.
            </Text>
          </Box>

          <Box>
            <IFrameSkeleton active={!iFramesReady}>
              <IFrame
                visible={iFramesReady}
                tabIndex={-1}
                src="/primitives/iframe/popover"
                css={{ background: 'linear-gradient(to bottom right, $lime3, $cyan5)' }}
              />
            </IFrameSkeleton>
            <Text size="4" css={{ fontWeight: 500, lineHeight: '20px', mb: '$1' }}>
              Popover
            </Text>
            <Text size="3" variant="gray" css={{ lineHeight: '23px' }}>
              With fine-grained focus control, collision handling, origin-aware and collision-aware
              animations.
            </Text>
          </Box>

          <Box>
            <IFrameSkeleton active={!iFramesReady}>
              <IFrame
                visible={iFramesReady}
                tabIndex={-1}
                src="/primitives/iframe/slider"
                css={{ background: 'linear-gradient(120deg, $gray3, $sky4)' }}
              />
            </IFrameSkeleton>
            <Text size="4" css={{ fontWeight: 500, lineHeight: '20px', mb: '$1' }}>
              Slider
            </Text>
            <Text size="3" variant="gray" css={{ lineHeight: '23px' }}>
              Supports keyboard and touch input, step interval, multiple thumbs for value ranges,
              and RTL direction.
            </Text>
          </Box>

          <Box>
            <IFrameSkeleton active={!iFramesReady}>
              <IFrame
                visible={iFramesReady}
                tabIndex={-1}
                src="/primitives/iframe/dialog"
                css={{ background: 'linear-gradient(to bottom right, $indigo4, $violet5)' }}
              />
            </IFrameSkeleton>
            <Text size="4" css={{ fontWeight: 500, lineHeight: '20px', mb: '$1' }}>
              Tooltip
            </Text>
            <Text size="3" variant="gray" css={{ lineHeight: '23px' }}>
              Opens when the trigger is focused or hovered, supports custom timings and positioning,
              handles collisions.
            </Text>
          </Box>
        </Grid>
      </Container>
    </Section>
  );
};