import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit-html';

import { getSlottedChildren } from '../../../../utils/dom';
import { ToggleElement } from '../ToggleElement';
import { VDS_TOGGLE_ELEMENT_TAG_NAME } from '../vds-toggle';

describe(VDS_TOGGLE_ELEMENT_TAG_NAME, () => {
  async function buildFixture(): Promise<ToggleElement> {
    return fixture<ToggleElement>(html`
      <vds-toggle>
        <div class="pressed" slot="pressed"></div>
        <div class="not-pressed" slot="not-pressed"></div>
      </vds-toggle>
    `);
  }

  it('should render dom correctly', async () => {
    const toggle = await buildFixture();
    expect(toggle).dom.to.equal(`
      <vds-toggle>
        <div
          class="pressed"
          hidden=""
          slot="pressed"
        ></div>
       <div
         class="not-pressed"
         slot="not-pressed"
       ></div>
      </vds-toggle>
    `);
  });

  it('should render shadow dom correctly', async () => {
    const toggle = await buildFixture();
    expect(toggle).shadowDom.to.equal(`
      <slot name="pressed"></slot>
      <slot name="not-pressed"></slot> 
    `);
  });

  it('it should update pressed attribute on host element when `pressed` state changes', async () => {
    const toggle = await buildFixture();
    expect(toggle).to.not.have.attribute('pressed');
    toggle.pressed = true;
    await elementUpdated(toggle);
    expect(toggle).to.have.attribute('pressed');
    toggle.pressed = false;
    await elementUpdated(toggle);
    expect(toggle).to.not.have.attribute('pressed');
  });

  it('it should update hidden attribute on slots when `pressed` state changes', async () => {
    const toggle = await buildFixture();

    // Not Pressed.
    expect(
      getSlottedChildren(toggle, 'pressed')[0].getAttribute('hidden'),
    ).to.equal('');

    expect(getSlottedChildren(toggle, 'not-pressed')[0].getAttribute('hidden'))
      .to.not.exist;

    toggle.pressed = true;
    await elementUpdated(toggle);

    // Pressed.
    expect(getSlottedChildren(toggle, 'pressed')[0].getAttribute('hidden')).to
      .not.exist;

    expect(
      getSlottedChildren(toggle, 'not-pressed')[0].getAttribute('hidden'),
    ).to.equal('');
  });
});