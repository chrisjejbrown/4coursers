/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-industry. Base: tabs.
 * Source: https://www.coursera.org/explore/new-on-coursera
 * Instance selector: div.css-1idvyae (chip container, content in sibling)
 * Structure: container block, each tab = title | content (heading + image + richtext)
 * xwalk model fields per tab: title, content_heading, content_headingType (collapsed),
 *   content_image, content_richtext — fields with content_ prefix share same cell
 */
export default function parse(element, { document }) {
  // Get tab labels from chip buttons
  const chips = element.querySelectorAll('button .cds-Chip-labelText');

  // Get tab content from sibling element (card collection below chips)
  const contentContainer = element.parentElement
    ? element.parentElement.querySelector('.css-ux9vc3, .rc-CollectionsContainer')
    : null;

  const cards = contentContainer
    ? contentContainer.querySelectorAll('li .cds-ProductCard-base')
    : [];

  const cells = [];

  chips.forEach((chip, index) => {
    const tabTitle = chip.textContent.trim();

    // Col 1: Tab title
    const titleFrag = document.createDocumentFragment();
    titleFrag.appendChild(document.createComment(' field:title '));
    const titleP = document.createElement('p');
    titleP.textContent = tabTitle;
    titleFrag.appendChild(titleP);

    // Col 2: Tab content (only first tab has visible content)
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content '));

    if (index === 0 && cards.length > 0) {
      // Build content from visible tab's cards
      cards.forEach((card) => {
        const titleEl = card.querySelector('.cds-CommonCard-title');
        const titleLink = card.querySelector('.cds-CommonCard-titleLink');
        const previewImg = card.querySelector('.cds-CommonCard-previewImage img');
        const partnerName = card.querySelector('.cds-ProductCard-partnerNames');
        const metadata = card.querySelector('.cds-CommonCard-metadata p');

        if (titleEl) {
          const h3 = document.createElement('h3');
          if (titleLink) {
            const a = document.createElement('a');
            a.href = titleLink.href;
            a.textContent = titleEl.textContent.trim();
            h3.appendChild(a);
          } else {
            h3.textContent = titleEl.textContent.trim();
          }
          contentFrag.appendChild(h3);
        }
        if (partnerName) {
          const p = document.createElement('p');
          p.textContent = partnerName.textContent.trim();
          contentFrag.appendChild(p);
        }
        if (metadata) {
          const p = document.createElement('p');
          p.textContent = metadata.textContent.trim();
          contentFrag.appendChild(p);
        }
      });
    }

    cells.push([titleFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-industry', cells });
  element.replaceWith(block);
}
