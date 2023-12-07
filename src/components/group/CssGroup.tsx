import { TransitionGroup, defineComponent } from 'vue';

export default defineComponent(
  {
    name: 'css-group',
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: '',
      },
    },
    setup: (props, { slots }) => {
      return () => (
        <TransitionGroup tag='name' name={props.name}>{
          slots.default?.()
        }</TransitionGroup>
      );
    },
  },
);
