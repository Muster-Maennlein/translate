import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import VBadge from './v-badge.vue';
import { h } from 'vue';

const global = {
	components: {
		'v-icon': (props: any) => h('span', { class: 'icon' }, props.name),
	},
};

test('Mount component', () => {
	expect(VBadge).toBeTruthy();

	const wrapper = mount(VBadge, {
		slots: {
			default: 'Slot Content',
		},
		global,
	});

	expect(wrapper.html()).toMatchSnapshot();
});

test('dot and bordered prop', () => {
	const wrapper = mount(VBadge, {
		props: {
			dot: true,
			bordered: true,
		},
		global,
	});

	expect(wrapper.classes()).toContain('dot');
	expect(wrapper.classes()).toContain('bordered');
	expect(wrapper.get('span').classes()).toContain('bordered');
	expect(wrapper.get('span').classes()).toContain('dot');
});

test('icon prop', () => {
	const wrapper = mount(VBadge, {
		props: {
			icon: 'close',
		},
		global,
	});

	expect(wrapper.getComponent({ name: 'v-icon' }).text()).toBe('close');
});

test('value prop', () => {
	const wrapper = mount(VBadge, {
		props: {
			value: 'My Badge',
		},
		global,
	});

	expect(wrapper.find('span.badge span').exists()).toBeTruthy();
	expect(wrapper.find('span.badge span').text()).toBe('My Badge');
});
