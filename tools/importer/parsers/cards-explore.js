/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-explore. Base: cards.
 * Source: https://www.coursera.org/explore/new-on-coursera
 * Instance selector: div.css-1ubt0nh ~ section.css-1p9byib
 * Structure: container block, each card = empty image | text (title + description + CTA)
 * xwalk model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('ul > li');
  const cells = [];

  items.forEach((item) => {
    // Col 1: No images in explore cards - empty with field hint
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));

    // Col 2: Text content (title + description + CTA link)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    const heading = item.querySelector('h3');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      textFrag.appendChild(h3);
    }

    const description = item.querySelector('[class*="4iw9bi"], [class*="ig1zcw"] > div:nth-child(2)');
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      textFrag.appendChild(p);
    }

    // Extract link from the wrapping <a> tag
    const link = item.querySelector('a[href]');
    const ctaButton = item.querySelector('button .cds-button-label');
    if (link && ctaButton) {
      const a = document.createElement('a');
      a.href = link.href;
      const labelText = ctaButton.childNodes[0]
        ? ctaButton.childNodes[0].textContent.trim()
        : ctaButton.textContent.trim();
      a.textContent = labelText;
      const p = document.createElement('p');
      p.appendChild(a);
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-explore', cells });
  element.replaceWith(block);
}
