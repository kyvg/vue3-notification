<script setup lang="tsx">
import defaults from "@/defaults";
import { params } from "@/params";
import type { NotificationItem, NotificationsOptions } from "@/types";
import { emitter, Id, listToDirection, parse } from "@/utils";
import { createTimer, type NotificationItemWithTimer } from "@/utils/timer";
import {
	computed,
	type HTMLAttributes,
	onMounted,
	onUnmounted,
	type PropType,
	ref,
	TransitionGroup,
	type TransitionGroupProps,
} from "vue";
import "./Notifications.css";

const STATE = {
	IDLE: 0,
	DESTROYED: 2,
} as const;

type NotificationItemState = typeof STATE;

type NotificationItemExtended = NotificationItemWithTimer & {
	state: NotificationItemState[keyof NotificationItemState];
};

const props = defineProps({
		group: {
			type: String,
			default: "",
		},
		/**
		 * Width of notification holder, can be `%`, `px` string or number.
		 * @example '100%', '200px', 200
		 * */
		width: {
			type: [Number, String],
			default: 300,
		},

		reverse: {
			type: Boolean,
			default: false,
		},
		position: {
			type: [String, Array] as PropType<string | string[]>,
			default: () => {
				return defaults.position;
			},
		},
		classes: {
			type: [String, Array] as PropType<string | string[]>,
			default: "vue-notification",
		},

		animationType: {
			type: String as PropType<"css" | "velocity">,
			default: "css",
			validator(value) {
				return value === "css" || value === "velocity";
			},
		},

		animation: {
			type: Object as PropType<Record<"enter" | "leave", unknown>>,
			default() {
				return defaults.velocityAnimation;
			},
		},

		animationName: {
			type: String,
			default: defaults.cssAnimation,
		},
		speed: {
			type: Number,
			default: 300,
		},
		/** Time (in ms) to keep the notification on screen (if **negative** - notification will stay **forever** or until clicked) */
		duration: {
			type: Number,
			default: 3000,
		},

		delay: {
			type: Number,
			default: 0,
		},

		max: {
			type: Number,
			default: Infinity,
		},

		ignoreDuplicates: {
			type: Boolean,
			default: false,
		},

		closeOnClick: {
			type: Boolean,
			default: true,
		},

		pauseOnHover: {
			type: Boolean,
			default: false,
		},
		/** Use [v-html](https://vuejs.org/api/built-in-directives.html#v-html) to set `title` and `text` */
		dangerouslySetInnerHtml: {
			type: Boolean,
			default: false,
		},
	})

	const emit = defineEmits<{
		click: [item: NotificationItem],
		destroy: [item: NotificationItem],
		start: [item: NotificationItem]
	}>()

	const slots = defineSlots<{
		body?: (props: {
			class: HTMLAttributes["class"];
			item: NotificationItem;
			close: () => void;
		}) => void;
	}>()


		const list = ref<NotificationItemExtended[]>([]);
		const velocity = params.get("velocity");

		const isVA = computed(() => {
			return props.animationType === "velocity";
		});

		const active = computed<NotificationItemExtended[]>(() => {
			return list.value.filter((v) => v.state !== STATE.DESTROYED);
		});

		const actualWidth = computed(() => {
			return parse(props.width);
		});

		const styles = computed(() => {
			const { x, y } = listToDirection(props.position);
			const width = actualWidth.value.value;
			const suffix = actualWidth.value.type;

			const styles: Record<string, string> = {
				width: width + suffix,
			};

			if (y) {
				styles[y] = "0px";
			}

			if (x) {
				if (x === "center") {
					styles.left = `calc(50% - ${+width / 2}${suffix})`;
				} else {
					styles[x] = "0px";
				}
			}

			return styles;
		});

		const transitionGroupProps = computed<TransitionGroupProps>(() => {
			if (!isVA.value) {
				return {};
			}

			return {
				onEnter: handleEnter,
				onLeave: handleLeave,
				onAfterLeave: clean,
			};
		});

		const destroyIfNecessary = (item: NotificationItemExtended) => {
			emit("click", item);
			if (props.closeOnClick) {
				destroy(item);
			}
		};

		const pauseTimeout = (item: NotificationItemExtended): undefined => {
			if (props.pauseOnHover) {
				item.timer?.stop();
			}
		};
		const resumeTimeout = (item: NotificationItemExtended): undefined => {
			if (props.pauseOnHover) {
				item.timer?.start();
			}
		};
		const addItem = (event: NotificationsOptions = {}): void => {
			event.group ||= "";
			event.data ||= {};

			if (props.group !== event.group) {
				return;
			}

			if (event.clean || event.clear) {
				destroyAll();
				return;
			}

			const duration =
				typeof event.duration === "number" ? event.duration : props.duration;

			const speed = typeof event.speed === "number" ? event.speed : props.speed;

			const ignoreDuplicates =
				typeof event.ignoreDuplicates === "boolean"
					? event.ignoreDuplicates
					: props.ignoreDuplicates;

			const { title, text, type, data, id } = event;

			const item: NotificationItemExtended = {
				id: id || Id(),
				title,
				text,
				type,
				state: STATE.IDLE,
				speed,
				length: duration + 2 * speed,
				data,
				duplicates: 0,
			};

			if (duration >= 0) {
				item.timer = createTimer(() => destroy(item), item.length);
			}

			const botToTop = "bottom" in styles.value;
			const direction = props.reverse ? !botToTop : botToTop;

			let indexToDestroy = -1;

			const duplicate = active.value.find((i) => {
				return i.title === event.title && i.text === event.text;
			});

			if (ignoreDuplicates && duplicate) {
				duplicate.duplicates++;

				return;
			}

			if (direction) {
				list.value.push(item);
				emit("start", item);

				if (active.value.length > props.max) {
					indexToDestroy = 0;
				}
			} else {
				list.value.unshift(item);
				emit("start", item);

				if (active.value.length > props.max) {
					indexToDestroy = active.value.length - 1;
				}
			}

			if (indexToDestroy !== -1) {
				destroy(active.value[indexToDestroy]);
			}
		};

		const closeItem = (id: unknown) => {
			destroyById(id);
		};

		const notifyClass = (
			item: NotificationItemExtended,
		): HTMLAttributes["class"] => {
			return ["vue-notification-template", props.classes, item.type || ""];
		};

		const notifyWrapperStyle = (item: NotificationItemExtended) => {
			return isVA.value ? undefined : { transition: `all ${item.speed}ms` };
		};

		const destroy = (item: NotificationItemExtended): void => {
			item.timer?.stop();
			item.state = STATE.DESTROYED;

			clean();

			emit("destroy", item);
		};

		const destroyById = (id: unknown): void => {
			const item = list.value.find((i) => i.id === id);

			if (item) {
				destroy(item);
			}
		};

		const destroyAll = (): void => {
			active.value.forEach(destroy);
		};

		const getAnimation = (index: "enter" | "leave", el: Element) => {
			const animation = props.animation?.[index];

			return typeof animation === "function" ? animation(el) : animation;
		};

		const handleEnter = (el: Element, complete: () => void): void => {
			const animation = getAnimation("enter", el);

			velocity(el, animation, {
				duration: props.speed,
				complete,
			});
		};

		const handleLeave = (el: Element, complete: () => void) => {
			const animation = getAnimation("leave", el);

			velocity(el, animation, {
				duration: props.speed,
				complete,
			});
		};

		function clean() {
			list.value = list.value.filter((item) => item.state !== STATE.DESTROYED);
		}

		onMounted(() => {
			emitter.on("add", addItem);
			emitter.on("close", closeItem);
		});

		onUnmounted(() => {
			emitter.off("add", addItem);
			emitter.off("close", closeItem);
		});

		if (import.meta.env.TEST) {
			defineExpose({
				list,
				addItem,
			});
		}

</script>

<template>
	
	<div class="vue-notification-group" style="styles">
				<TransitionGroup
					v-bind="transitionGroupProps"
					tag="div"
					:css="!isVA"
					:name="props.animationName"
				>
					
							<div
								v-for="item in active"
								:key="item.id"
								class="vue-notification-wrapper"
								:style="notifyWrapperStyle(item)"
								:data-id="item.id"
								@mouseenter="pauseTimeout(item)"
								@mouseleave="resumeTimeout(item)"
							>
								<slot name="body" :item="item" :class="[classes, item.type]" :close="() => destroy(item)">
									<div
										:class="notifyClass(item)"
										@click="destroyIfNecessary(item)"
									>
										<template v-if="dangerouslySetInnerHtml">
												<div v-if="item.title" class="notification-title" v-html="item.title" />
												<div class="notification-content" v-html="item.text" />
										</template>
										<template v-else>
												<div v-if="item.title" class="notification-title">{{item.title}}</div>
												<div class="notification-content">{{item.text}}</div>
										</template>
				
									</div>
								</slot>
							</div>

				</TransitionGroup>
			</div>
</template>

<style>
.vue-notification-group {
	display: block;
	position: fixed;
	z-index: 5000;
}

.vue-notification-wrapper {
	display: block;
	overflow: hidden;
	width: 100%;
	margin: 0;
	padding: 0;
}

.notification-title {
	font-weight: 600;
}

.vue-notification-template {
	display: block;
	box-sizing: border-box;
	background: white;
	text-align: left;
}

.vue-notification {
	display: block;
	box-sizing: border-box;
	text-align: left;
	font-size: 12px;
	padding: 10px;
	margin: 0 5px 5px;

	color: white;
	background: #44a4fc;
	border-left: 5px solid #187fe7;
}

.vue-notification.warn {
	background: #ffb648;
	border-left-color: #f48a06;
}

.vue-notification.error {
	background: #e54d42;
	border-left-color: #b82e24;
}

.vue-notification.success {
	background: #68cd86;
	border-left-color: #42a85f;
}

.vn-fade-enter-active,
.vn-fade-leave-active,
.vn-fade-move {
	transition: all 0.5s;
}

.vn-fade-enter-from,
.vn-fade-leave-to {
	opacity: 0;
}
</style>