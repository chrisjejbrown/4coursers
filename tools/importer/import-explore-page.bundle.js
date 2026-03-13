var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-explore-page.js
  var import_explore_page_exports = {};
  __export(import_explore_page_exports, {
    default: () => import_explore_page_default
  });

  // tools/importer/parsers/hero-discovery.js
  function parse(element, { document }) {
    const heroImg = element.querySelector(".css-91w7mq img, .css-0 img");
    const heading = element.querySelector('h1, h2, [class*="ylpfmv"]');
    const description = element.querySelector('[class*="13uzvl2"], .css-5263l > div:nth-child(2)');
    const ctaButton = element.querySelector('button.cds-button-secondary, button[class*="cds-button"]');
    let ctaLink = null;
    if (ctaButton) {
      const labelSpan = ctaButton.querySelector(".cds-button-label");
      const labelText = labelSpan ? labelSpan.textContent.trim() : ctaButton.textContent.trim();
      ctaLink = document.createElement("a");
      ctaLink.href = "https://www.coursera.org/courseraplus";
      ctaLink.textContent = labelText;
    }
    const cells = [];
    if (heroImg) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(heroImg);
      cells.push([imgFrag]);
    } else {
      cells.push([""]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      textFrag.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      p.appendChild(ctaLink);
      textFrag.appendChild(p);
    }
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-discovery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-course.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll("li .cds-ProductCard-base");
    const cells = [];
    cards.forEach((card) => {
      const previewImg = card.querySelector(".cds-CommonCard-previewImage img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (previewImg) {
        imgFrag.appendChild(previewImg);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const partnerName = card.querySelector(".cds-ProductCard-partnerNames");
      if (partnerName) {
        const p = document.createElement("p");
        p.textContent = partnerName.textContent.trim();
        textFrag.appendChild(p);
      }
      const titleLink = card.querySelector(".cds-CommonCard-titleLink");
      const titleEl = card.querySelector(".cds-CommonCard-title");
      if (titleEl) {
        const h3 = document.createElement("h3");
        if (titleLink) {
          const a = document.createElement("a");
          a.href = titleLink.href;
          a.textContent = titleEl.textContent.trim();
          h3.appendChild(a);
        } else {
          h3.textContent = titleEl.textContent.trim();
        }
        textFrag.appendChild(h3);
      }
      const metadata = card.querySelector(".cds-CommonCard-metadata p");
      if (metadata) {
        const p = document.createElement("p");
        p.textContent = metadata.textContent.trim();
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-course", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-promo.js
  function parse3(element, { document }) {
    const decorativeImg = element.querySelector(".css-1psltl0 img, .css-1ht76x9 img, picture img");
    const logoImg = element.querySelector(".css-1xgnkn7 img");
    const heading = element.querySelector("h3, h2");
    const ctaButton = element.querySelector("button .cds-button-label");
    let ctaLink = null;
    if (ctaButton) {
      const labelText = ctaButton.childNodes[0] ? ctaButton.childNodes[0].textContent.trim() : ctaButton.textContent.trim();
      const parentLink = element.querySelector('a[href*="courseraplus"]');
      ctaLink = document.createElement("a");
      ctaLink.href = parentLink ? parentLink.href : "https://www.coursera.org/courseraplus";
      ctaLink.textContent = labelText;
    }
    const cells = [];
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(" field:image "));
    if (decorativeImg) {
      imgFrag.appendChild(decorativeImg);
    }
    cells.push([imgFrag]);
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (logoImg) {
      const p = document.createElement("p");
      p.appendChild(logoImg);
      textFrag.appendChild(p);
    }
    if (heading) {
      const h3 = document.createElement("h3");
      h3.textContent = heading.textContent.trim();
      textFrag.appendChild(h3);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      p.appendChild(ctaLink);
      textFrag.appendChild(p);
    }
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-industry.js
  function parse4(element, { document }) {
    const chips = element.querySelectorAll("button .cds-Chip-labelText");
    const contentContainer = element.parentElement ? element.parentElement.querySelector(".css-ux9vc3, .rc-CollectionsContainer") : null;
    const cards = contentContainer ? contentContainer.querySelectorAll("li .cds-ProductCard-base") : [];
    const cells = [];
    chips.forEach((chip, index) => {
      const tabTitle = chip.textContent.trim();
      const titleFrag = document.createDocumentFragment();
      titleFrag.appendChild(document.createComment(" field:title "));
      const titleP = document.createElement("p");
      titleP.textContent = tabTitle;
      titleFrag.appendChild(titleP);
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content "));
      if (index === 0 && cards.length > 0) {
        cards.forEach((card) => {
          const titleEl = card.querySelector(".cds-CommonCard-title");
          const titleLink = card.querySelector(".cds-CommonCard-titleLink");
          const previewImg = card.querySelector(".cds-CommonCard-previewImage img");
          const partnerName = card.querySelector(".cds-ProductCard-partnerNames");
          const metadata = card.querySelector(".cds-CommonCard-metadata p");
          if (titleEl) {
            const h3 = document.createElement("h3");
            if (titleLink) {
              const a = document.createElement("a");
              a.href = titleLink.href;
              a.textContent = titleEl.textContent.trim();
              h3.appendChild(a);
            } else {
              h3.textContent = titleEl.textContent.trim();
            }
            contentFrag.appendChild(h3);
          }
          if (partnerName) {
            const p = document.createElement("p");
            p.textContent = partnerName.textContent.trim();
            contentFrag.appendChild(p);
          }
          if (metadata) {
            const p = document.createElement("p");
            p.textContent = metadata.textContent.trim();
            contentFrag.appendChild(p);
          }
        });
      }
      cells.push([titleFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-industry", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-explore.js
  function parse5(element, { document }) {
    const items = element.querySelectorAll("ul > li");
    const cells = [];
    items.forEach((item) => {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const heading = item.querySelector("h3");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        textFrag.appendChild(h3);
      }
      const description = item.querySelector('[class*="4iw9bi"], [class*="ig1zcw"] > div:nth-child(2)');
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        textFrag.appendChild(p);
      }
      const link = item.querySelector("a[href]");
      const ctaButton = item.querySelector("button .cds-button-label");
      if (link && ctaButton) {
        const a = document.createElement("a");
        a.href = link.href;
        const labelText = ctaButton.childNodes[0] ? ctaButton.childNodes[0].textContent.trim() : ctaButton.textContent.trim();
        a.textContent = labelText;
        const p = document.createElement("p");
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-explore", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-features.js
  function parse6(element, { document }) {
    const features = element.querySelectorAll('.css-ixifsp, [class*="ixifsp"]');
    const row = [];
    features.forEach((feature) => {
      const frag = document.createDocumentFragment();
      const heading = feature.querySelector("h3");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        frag.appendChild(h3);
      }
      const paragraph = feature.querySelector("p");
      if (paragraph) {
        const p = document.createElement("p");
        p.textContent = paragraph.textContent.trim();
        frag.appendChild(p);
      }
      row.push(frag);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-features", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/coursera-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        '[class*="CookieConsent"]',
        ".rc-GlobalPageHeaderContainer .rc-HeaderNotification"
      ]);
      const topBanners = element.querySelectorAll('.rc-HeaderNotification, [class*="NotificationBanner"]');
      topBanners.forEach((el) => el.remove());
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        ".rc-GlobalPageHeaderContainer",
        ".rc-GlobalFooter",
        ".page-footer-container",
        "nav",
        ".rc-SearchBarContentWrapper",
        ".rc-ExploreMegaMenuGridItem",
        "iframe",
        "link",
        "noscript",
        "script",
        ".rc-CannedCollectionsSchemaMarkup"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("data-click-key");
        el.removeAttribute("data-click-value");
        el.removeAttribute("onclick");
      });
    }
  }

  // tools/importer/transformers/coursera-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(element.ownerDocument, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = element.ownerDocument.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-explore-page.js
  var PAGE_TEMPLATE = {
    name: "explore-page",
    description: "Coursera explore/discovery page showcasing new courses, specializations, and programs available on the platform",
    urls: [
      "https://www.coursera.org/explore/new-on-coursera"
    ],
    blocks: [
      {
        name: "hero-discovery",
        instances: ["div.cds-211 > div.css-198siyw"]
      },
      {
        name: "cards-course",
        instances: ["div.css-set5t7 section.rc-ProductCardCollection"]
      },
      {
        name: "hero-promo",
        instances: ["div.css-1pntud3 section.css-1p9byib"]
      },
      {
        name: "tabs-industry",
        instances: ["div.css-1idvyae"]
      },
      {
        name: "cards-explore",
        instances: ["div.css-1ubt0nh ~ section.css-1p9byib"]
      },
      {
        name: "columns-features",
        instances: ["div.css-2iox3"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "div.css-ae75n0",
        style: null,
        blocks: ["hero-discovery"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Trending New Courses",
        selector: "div.css-set5t7",
        style: null,
        blocks: ["cards-course"],
        defaultContent: ["h2.css-nr62m0"]
      },
      {
        id: "section-3",
        name: "Coursera Plus CTA Banner",
        selector: ["div.css-set5t7 > div > div > div > div > div > section.css-1p9byib", "div.css-6gwjum section.css-1p9byib", "a[href*='courseraplus'] section.css-1p9byib"],
        style: null,
        blocks: ["hero-promo"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "New Courses by Industry",
        selector: ["h2.css-nr62m0:nth-of-type(2)", "div.css-6gwjum:nth-of-type(2)"],
        style: null,
        blocks: ["tabs-industry"],
        defaultContent: ["h2.css-nr62m0"]
      },
      {
        id: "section-5",
        name: "Explore More on Coursera",
        selector: "div.css-1ubt0nh",
        style: null,
        blocks: ["cards-explore"],
        defaultContent: ["h2.css-1ttkfaa"]
      },
      {
        id: "section-6",
        name: "World-Class Learning CTA",
        selector: "div.css-19t42ot",
        style: null,
        blocks: ["columns-features"],
        defaultContent: ["h2.css-h5y06f"]
      }
    ]
  };
  var parsers = {
    "hero-discovery": parse,
    "cards-course": parse2,
    "hero-promo": parse3,
    "tabs-industry": parse4,
    "cards-explore": parse5,
    "columns-features": parse6
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_explore_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_explore_page_exports);
})();
