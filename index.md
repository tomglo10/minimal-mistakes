---
layout: home
entries_layout: grid
classes: wide
author_profile: true
pagination:
  enabled: true  
---

# Aging Health Research Library
Welcome to the clinical database. Use the grid below to browse our latest investigations into longevity and geriatric health literacy.

---

{%- assign locale = page.locale | default: layout.locale | default: site.locale %}

<h3 class="archive__subtitle">{{ site.data.ui-text[locale].recent_posts | default: "Recent Posts" }}</h3>

{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

<div class="entries-grid">
  {% for post in posts %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>

{% include paginator.html locale=locale %}
