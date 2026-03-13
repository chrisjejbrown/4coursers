/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: coursera sections.
 * Adds section breaks (<hr>) between page sections.
 * Uses section selectors from page-templates.json.
 * No section-metadata blocks needed (all sections currently have style: null).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const template = payload && payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const sections = template.sections;

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(element.ownerDocument, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Add <hr> before each non-first section (only if there is content before it)
      if (i > 0) {
        const hr = element.ownerDocument.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
