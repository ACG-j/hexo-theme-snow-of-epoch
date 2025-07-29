{% extends 'includes/layout.swig' %}

{% block body %}
 
  {% if theme.banner.enable %}
  {% include 'includes/banner.swig' %}
  {% endif %}


  <div class="main-content">
    {% include 'includes/recent-posts.swig' %}
    <div id="paginator">
      {{ paginator() }}
    </div>
  </div>
{% endblock %}
