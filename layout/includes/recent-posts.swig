
{% if page.posts.length > 0 %}
  <div id="recent-posts">
    <h1 class="ink-title">墨迹记录</h1>
    <div class="post-scroll">
      {% for postItem in page.posts.toArray() %}
        <article class="recent-post-item">
          <div class="post-content">
            <h2 class="post-title">
              <a href="{{ url_for(postItem.path) }}">{{ postItem.title }}</a>
            </h2>
            <div class="post-meta">
              <time datetime="{{ postItem.date.toJSON() }}" class="post-date">
                {{ date(postItem.date, 'YYYY年MM月DD日') }}
              </time>
              {% if postItem.categories and postItem.categories.length > 0 %}
                <span class="post-category">
                  {{ postItem.categories.data[0].name }}
                </span>
              {% endif %}
            </div>
            {% if postItem.excerpt %}
              <div class="post-excerpt">
                {{ strip_html(postItem.excerpt) }}
              </div>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
{% endif %}
