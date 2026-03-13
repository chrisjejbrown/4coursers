/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-discovery. Base: hero.
 * Source: https://www.coursera.org/explore/new-on-coursera
 * Instance selector: div.cds-211 > div.css-198siyw
 * Structure: image (row 1) + heading + description + CTA (row 2)
 * xwalk model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract hero background image
  const heroImg = element.querySelector('.css-91w7mq img, .css-0 img');

  // Extract heading
  const heading = element.querySelector('h1, h2, [class*="ylpfmv"]');

  // Extract description
  const description = element.querySelector('[class*="13uzvl2"], .css-5263l > div:nth-child(2)');

  // Extract CTA button text and create a link
  const ctaButton = element.querySelector('button.cds-button-secondary, button[class*="cds-button"]');
  let ctaLink = null;
  if (ctaButton) {
    const labelSpan = ctaButton.querySelector('.cds-button-label');
    const labelText = labelSpan ? labelSpan.textContent.trim() : ctaButton.textContent.trim();
    ctaLink = document.createElement('a');
    ctaLink.href = 'https://www.coursera.org/courseraplus';
    ctaLink.textContent = labelText;
  }

  const cells = [];

  // Row 1: Background image with field hint
  if (heroImg) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(heroImg);
    cells.push([imgFrag]);
  } else {
    cells.push(['']);
  }

  // Row 2: Text content (heading + description + CTA) with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    textFrag.appendChild(p);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    p.appendChild(ctaLink);
    textFrag.appendChild(p);
  }
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-discovery', cells });
  element.replaceWith(block);
}
