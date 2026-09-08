import { useEffect } from 'react';

const BASE_URL = 'https://sagarkumar446.github.io';

const SITE_META = {
  title: 'Sagar Kumar | QA Automation Engineer & Full-Stack Developer',
  description:
    'QA Automation Engineer at Webkul specializing in Playwright E2E automation, REST API testing, CI/CD, and full-stack development with Java, Spring Boot and React.'
};

const ensureMetaTag = (attr, value) => {
  let tag = document.head.querySelector(`meta[${attr}="${value}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }

  return tag;
};

const setOrCreateMeta = (attr, value, content) => {
  ensureMetaTag(attr, value).setAttribute('content', content);
};

const setOrCreateProperty = (property, content) => {
  ensureMetaTag('property', property).setAttribute('content', content);
};

const setCanonical = (path) => {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', `${BASE_URL}${path}`);
};

const removeJsonLd = () => {
  document
    .querySelectorAll('script[data-page-meta="true"]')
    .forEach((node) => node.remove());
};

const usePageMeta = ({ title, description, path = '/', jsonLd = null, robots = 'index, follow' }) => {
  useEffect(() => {
    const resolvedTitle = title || SITE_META.title;
    const resolvedDescription = description || SITE_META.description;

    document.title = resolvedTitle;

    setOrCreateMeta('name', 'description', resolvedDescription);
    setOrCreateMeta('name', 'robots', robots);
    setOrCreateProperty('og:title', resolvedTitle);
    setOrCreateProperty('og:description', resolvedDescription);
    setOrCreateProperty('og:url', `${BASE_URL}${path}`);
    setOrCreateProperty('og:type', 'website');

    document
      .querySelectorAll('meta[name="twitter:title"]')
      .forEach((node) => node.setAttribute('content', resolvedTitle));
    document
      .querySelectorAll('meta[name="twitter:description"]')
      .forEach((node) => node.setAttribute('content', resolvedDescription));

    setCanonical(path);

    removeJsonLd();

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.pageMeta = 'true';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonLd, robots]);
};

export default usePageMeta;
