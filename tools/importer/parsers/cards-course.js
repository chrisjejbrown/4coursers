/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-course. Base: cards.
 * Source: https://www.coursera.org/explore/new-on-coursera
 * Instance selector: div.css-set5t7 section.rc-ProductCardCollection
 * Structure: container block, each card = image | text (partner + title + type)
 * xwalk model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('li .cds-ProductCard-base');
  const cells = [];

  cards.forEach((card) => {
    // Col 1: Course preview image
    const previewImg = card.querySelector('.cds-CommonCard-previewImage img');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (previewImg) {
      imgFrag.appendChild(previewImg);
    }

    // Col 2: Text content (partner name + course title + type)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    const partnerName = card.querySelector('.cds-ProductCard-partnerNames');
    if (partnerName) {
      const p = document.createElement('p');
      p.textContent = partnerName.textContent.trim();
      textFrag.appendChild(p);
    }

    const titleLink = card.querySelector('.cds-CommonCard-titleLink');
    const titleEl = card.querySelector('.cds-CommonCard-title');
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
      textFrag.appendChild(h3);
    }

    const metadata = card.querySelector('.cds-CommonCard-metadata p');
    if (metadata) {
      const p = document.createElement('p');
      p.textContent = metadata.textContent.trim();
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-course', cells });
  element.replaceWith(block);
}
