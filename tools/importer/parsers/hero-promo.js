/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-promo. Base: hero.
 * Source: https://www.coursera.org/explore/new-on-coursera
 * Instance selector: div.css-1pntud3 section.css-1p9byib
 * Structure: image (row 1) + logo + heading + CTA (row 2)
 * xwalk model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract decorative image (right side promotional image)
  const decorativeImg = element.querySelector('.css-1psltl0 img, .css-1ht76x9 img, picture img');

  // Extract Coursera Plus logo
  const logoImg = element.querySelector('.css-1xgnkn7 img');

  // Extract heading
  const heading = element.querySelector('h3, h2');

  // Extract CTA button
  const ctaButton = element.querySelector('button .cds-button-label');
  let ctaLink = null;
  if (ctaButton) {
    const labelText = ctaButton.childNodes[0]
      ? ctaButton.childNodes[0].textContent.trim()
      : ctaButton.textContent.trim();
    // The whole section is wrapped in an <a> to courseraplus
    const parentLink = element.querySelector('a[href*="courseraplus"]');
    ctaLink = document.createElement('a');
    ctaLink.href = parentLink ? parentLink.href : 'https://www.coursera.org/courseraplus';
    ctaLink.textContent = labelText;
  }

  const cells = [];

  // Row 1: Decorative image with field hint
  const imgFrag = document.createDocumentFragment();
  imgFrag.appendChild(document.createComment(' field:image '));
  if (decorativeImg) {
    imgFrag.appendChild(decorativeImg);
  }
  cells.push([imgFrag]);

  // Row 2: Text content (logo + heading + CTA) with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (logoImg) {
    const p = document.createElement('p');
    p.appendChild(logoImg);
    textFrag.appendChild(p);
  }
  if (heading) {
    const h3 = document.createElement('h3');
    h3.textContent = heading.textContent.trim();
    textFrag.appendChild(h3);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    p.appendChild(ctaLink);
    textFrag.appendChild(p);
  }
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
