---
layout: archive
title: "Aging Health Research Library"
entries_layout: grid
classes: wide       # <--- This activates the fix at the bottom of your SCSS
author_profile: true # Keeps your bio on the left
paginate: 12         # Sets your 10-12 post limit
---

### Recent Clinical Investigations

Welcome to the Aging Health clinical library. Below you will find our latest 
investigations into geriatric health literacy and longevity.

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
