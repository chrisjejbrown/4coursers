/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-features. Base: columns.
 * Source: https://www.coursera.org/explore/new-on-coursera
 * Instance selector: div.css-2iox3
 * Structure: 1 row with 3 columns, each column = heading + paragraph
 * Columns blocks do not require field hints per xwalk hinting rules.
 */
export default function parse(element, { document }) {
  const features = element.querySelectorAll('.css-ixifsp, [class*="ixifsp"]');
  const row = [];

  features.forEach((feature) => {
    const frag = document.createDocumentFragment();

    const heading = feature.querySelector('h3');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      frag.appendChild(h3);
    }

    const paragraph = feature.querySelector('p');
    if (paragraph) {
      const p = document.createElement('p');
      p.textContent = paragraph.textContent.trim();
      frag.appendChild(p);
    }

    row.push(frag);
  });

  const cells = [row];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-features', cells });
  element.replaceWith(block);
}
