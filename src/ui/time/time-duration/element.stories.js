import '../../../media/define.js';
import '../../../media/test-utils/define.js';
import './define.js';

import { html } from 'lit';

import { ifNonEmpty } from '../../../shared/directives/if-non-empty.js';
import {
	VDS_TIME_DURATION_ELEMENT_STORYBOOK_ARG_TYPES,
	VDS_TIME_DURATION_ELEMENT_TAG_NAME
} from './TimeDurationElement.js';

export default {
	title: 'UI/Foundation/Time/Time Duration',
	component: VDS_TIME_DURATION_ELEMENT_TAG_NAME,
	argTypes: VDS_TIME_DURATION_ELEMENT_STORYBOOK_ARG_TYPES
};

/**
 * @param {import('./types').TimeDurationElementStorybookArgs} args
 */
function Template({
	// Properties
	alwaysShowHours,
	label,
	padHours,
	// Media Properties
	mediaDuration
}) {
	return html`
		<vds-media-controller>
			<vds-media-container>
				<vds-fake-media-provider
					.canPlayContext=${true}
					.durationContext=${mediaDuration}
					slot="media"
				></vds-fake-media-provider>

				<vds-time-duration
					label=${ifNonEmpty(label)}
					?always-show-hours=${alwaysShowHours}
					?pad-hours=${padHours}
				></vds-time-duration>
			</vds-media-container>
		</vds-media-controller>
	`;
}

export const TimeDuration = Template.bind({});