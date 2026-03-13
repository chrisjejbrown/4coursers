/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroDiscoveryParser from './parsers/hero-discovery.js';
import cardsCourseParser from './parsers/cards-course.js';
import heroPromoParser from './parsers/hero-promo.js';
import tabsIndustryParser from './parsers/tabs-industry.js';
import cardsExploreParser from './parsers/cards-explore.js';
import columnsFeaturesParser from './parsers/columns-features.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/coursera-cleanup.js';
import sectionsTransformer from './transformers/coursera-sections.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'explore-page',
  description: 'Coursera explore/discovery page showcasing new courses, specializations, and programs available on the platform',
  urls: [
    'https://www.coursera.org/explore/new-on-coursera',
  ],
  blocks: [
    {
      name: 'hero-discovery',
      instances: ['div.cds-211 > div.css-198siyw'],
    },
    {
      name: 'cards-course',
      instances: ['div.css-set5t7 section.rc-ProductCardCollection'],
    },
    {
      name: 'hero-promo',
      instances: ['div.css-1pntud3 section.css-1p9byib'],
    },
    {
      name: 'tabs-industry',
      instances: ['div.css-1idvyae'],
    },
    {
      name: 'cards-explore',
      instances: ['div.css-1ubt0nh ~ section.css-1p9byib'],
    },
    {
      name: 'columns-features',
      instances: ['div.css-2iox3'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'div.css-ae75n0',
      style: null,
      blocks: ['hero-discovery'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Trending New Courses',
      selector: 'div.css-set5t7',
      style: null,
      blocks: ['cards-course'],
      defaultContent: ['h2.css-nr62m0'],
    },
    {
      id: 'section-3',
      name: 'Coursera Plus CTA Banner',
      selector: ['div.css-set5t7 > div > div > div > div > div > section.css-1p9byib', 'div.css-6gwjum section.css-1p9byib', "a[href*='courseraplus'] section.css-1p9byib"],
      style: null,
      blocks: ['hero-promo'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'New Courses by Industry',
      selector: ['h2.css-nr62m0:nth-of-type(2)', 'div.css-6gwjum:nth-of-type(2)'],
      style: null,
      blocks: ['tabs-industry'],
      defaultContent: ['h2.css-nr62m0'],
    },
    {
      id: 'section-5',
      name: 'Explore More on Coursera',
      selector: 'div.css-1ubt0nh',
      style: null,
      blocks: ['cards-explore'],
      defaultContent: ['h2.css-1ttkfaa'],
    },
    {
      id: 'section-6',
      name: 'World-Class Learning CTA',
      selector: 'div.css-19t42ot',
      style: null,
      blocks: ['columns-features'],
      defaultContent: ['h2.css-h5y06f'],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero-discovery': heroDiscoveryParser,
  'cards-course': cardsCourseParser,
  'hero-promo': heroPromoParser,
  'tabs-industry': tabsIndustryParser,
  'cards-explore': cardsExploreParser,
  'columns-features': columnsFeaturesParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
