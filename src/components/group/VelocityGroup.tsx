import { SetupContext, TransitionGroup, defineComponent } from 'vue';

type Emit = {
  enter: [element: Element, done: () => void],
  leave: [element: Element, done: () => void],
  afterLeave: [],
}

export default defineComponent(
  {
    name: 'velocity-group',
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: '',
      },
    },
    emits: {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      enter: (item: Element, done: () => void) => true,
      leave: (item: Element, done: () => void) => true,
      afterLeave: () => true,
      /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    setup: (props, { slots, emit }: SetupContext<Emit>) => {


      const handleEnter = (element: Element, done: () => void) => {
        emit('enter', element, done);
      };
      
      const handleLeave = (element: Element, done: () => void) => {
        emit('leave', element, done);
      };
      
      const handleAfterLeave = () => {
        emit('afterLeave');
      };

      return () => (
        <TransitionGroup 
          tag='div' 
          css={false} 
          name={props.name} 
          onEnter={handleEnter}
          onLeave={handleLeave}
          onAfterLeave={handleAfterLeave}>{
            slots.default?.()
          }</TransitionGroup>
      );
    },
  },
);
