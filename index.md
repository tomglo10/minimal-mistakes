---
layout: home
title: "Aging Health Research Library"
entries_layout: grid
classes: wide
author_profile: true
paginate: 12
---

Welcome to the Aging Health clinical library. Use the grid below to browse recent 
investigations, or click into a category for targeted research.

---

### Research Categories
[Brain & Mind](/categories/#brain) | [Metabolism](/categories/#metabolism) | [Heart Health](/categories/#heart) | [Longevity Protocol](/categories/#longevity)

---
### Recent Research & Clinical Insights
{% assign posts = site.posts %}
<div class="entries-grid">
  {% for post in posts limit:6 %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>
