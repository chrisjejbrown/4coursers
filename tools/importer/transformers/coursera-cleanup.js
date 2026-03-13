/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: coursera cleanup.
 * Removes non-authorable content from Coursera pages.
 * Selectors from captured DOM of https://www.coursera.org/explore/new-on-coursera
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie/consent banners and overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '[class*="CookieConsent"]',
      '.rc-GlobalPageHeaderContainer .rc-HeaderNotification',
    ]);

    // Remove promotional top banner (dismissible notification banner)
    const topBanners = element.querySelectorAll('.rc-HeaderNotification, [class*="NotificationBanner"]');
    topBanners.forEach((el) => el.remove());
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content: header, footer, nav, search
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      '.rc-GlobalPageHeaderContainer',
      '.rc-GlobalFooter',
      '.page-footer-container',
      'nav',
      '.rc-SearchBarContentWrapper',
      '.rc-ExploreMegaMenuGridItem',
      'iframe',
      'link',
      'noscript',
      'script',
      '.rc-CannedCollectionsSchemaMarkup',
    ]);

    // Clean data attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('data-click-key');
      el.removeAttribute('data-click-value');
      el.removeAttribute('onclick');
    });
  }
}
