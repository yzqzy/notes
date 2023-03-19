import{_ as s,c as a,o as n,a as p}from"./app.510f8ebf.js";const l="/assets/design.078ff502.png",F=JSON.parse('{"title":"Docker","description":"","frontmatter":{},"headers":[{"level":2,"title":"Docker \u662F\u4EC0\u4E48","slug":"docker-\u662F\u4EC0\u4E48","link":"#docker-\u662F\u4EC0\u4E48","children":[]},{"level":2,"title":"Docker \u539F\u7406","slug":"docker-\u539F\u7406","link":"#docker-\u539F\u7406","children":[]},{"level":2,"title":"Docker \u955C\u50CF\u90E8\u7F72","slug":"docker-\u955C\u50CF\u90E8\u7F72","link":"#docker-\u955C\u50CF\u90E8\u7F72","children":[]},{"level":2,"title":"Docker Compose \u5DE5\u5177","slug":"docker-compose-\u5DE5\u5177","link":"#docker-compose-\u5DE5\u5177","children":[]}],"relativePath":"arch/docker/index.md"}'),o={name:"arch/docker/index.md"},e=p(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-hidden="true">#</a></h1><h2 id="docker-\u662F\u4EC0\u4E48" tabindex="-1">Docker \u662F\u4EC0\u4E48 <a class="header-anchor" href="#docker-\u662F\u4EC0\u4E48" aria-hidden="true">#</a></h2><p>Docker \u662F\u5BB9\u5668\uFF0C\u5185\u90E8\u53EF\u4EE5\u90E8\u7F72\u5E94\u7528\uFF08Application\uFF09\u3002</p><p>Docker \u662F\u4E00\u79CD\u7BA1\u7406\u5E94\u7528\u7684\u73B0\u4EE3\u624B\u6BB5\uFF0C\u8BA9\u5E94\u7528\u7BA1\u7406\u53D8\u5F97\u53EF\u9884\u6D4B\u548C\u9AD8\u6548\u3002</p><p><strong>\u5B89\u88C5 Mysql</strong></p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker pull mysql</span></span>
<span class="line"></span></code></pre></div><p>\u56FD\u5185\u5982\u679C\u62C9\u53D6\u955C\u50CF\u6BD4\u8F83\u6162\uFF0C\u53EF\u4EE5\u5B89\u88C5\u963F\u91CC\u4E91\u52A0\u901F\u5668\u3002\u5176\u5B9E\u5C31\u662F\u5728 docker \u7684\u914D\u7F6E\u6587\u4EF6\u4E2D\u589E\u52A0\u4E00\u884C\uFF1A</p><p><a href="https://developer.aliyun.com/article/29941" target="_blank" rel="noreferrer">https://developer.aliyun.com/article/29941</a></p><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">registry-mirrors</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;your accelerate address&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u6BCF\u4E2A\u963F\u91CC\u4E91\u7528\u6237\u90FD\u6709\u81EA\u5DF1\u7684\u52A0\u901F\u5668\u5730\u5740\u3002</p><p>\u62C9\u53D6\u5B8C\u955C\u50CF\uFF0C\u53EF\u4EE5\u5728\u672C\u5730\u770B\u5230\u955C\u50CF\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker images</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4E0B\u9762\u8FD9\u4E2A\u7F51\u5740\u67E5\u770B\u955C\u50CF\u6587\u6863\uFF1A<a href="https://hub.docker.com/_/mysql" target="_blank" rel="noreferrer">https://hub.docker.com/_/mysql</a>\u3002</p><p>\u955C\u50CF\u5236\u4F5C\u8005\u4F1A\u63D0\u4F9B\u955C\u50CF\u542F\u52A8\u65B9\u5F0F\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag</span></span>
<span class="line"></span></code></pre></div><p>\u955C\u50CF\u542F\u52A8\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u67E5\u770B\u5BB9\u5668\u72B6\u6001\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker ps </span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u8FD8\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u547D\u4EE4\u67E5\u770B\u5BB9\u5668\u57FA\u7840\u4FE1\u606F\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker inspect </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">container id</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u6570\u636E\u7BA1\u7406\u5DE5\u5177\u94FE\u63A5 mysql\u3002\u4F8B\u5982 DBeaver\u3002</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker pull dbeaver/cloudbeaver</span></span>
<span class="line"></span></code></pre></div><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker run --name cloudbeaver --rm -ti -d -p 8088:8978 -v   /var/cloudbeaver/workspace:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:latest</span></span>
<span class="line"></span></code></pre></div><p>\u542F\u52A8\u540E\u67E5\u770B mysql \u5BB9\u5668\u5360\u7528\u7684 IP \u548C\u7AEF\u53E3\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker inspect mysql</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 dbeaver \u8FDE\u63A5 mysql\uFF0C\u8FDB\u884C\u53EF\u89C6\u5316\u64CD\u4F5C\u3002</p><h2 id="docker-\u539F\u7406" tabindex="-1">Docker \u539F\u7406 <a class="header-anchor" href="#docker-\u539F\u7406" aria-hidden="true">#</a></h2><p>Docker \u4E0D\u9694\u79BB\u8BA1\u7B97\uFF0C\u53EA\u9694\u79BB\u73AF\u5883\u3002</p><p><strong>\u73AF\u5883\u548C\u8BA1\u7B97</strong></p><p>\u73AF\u5883\uFF0C\u5305\u62EC\u6587\u4EF6\u7CFB\u7EDF\u3001\u7F51\u7EDC\u7B49\u3002</p><p>\u6BD4\u5982 Docker \u5BB9\u5668\u4E2D\u7684\u8FDB\u7A0B\uFF0C\u53EA\u80FD\u770B\u5230 Docker \u5BB9\u5668 \u201C\u6846\u201D \u4F4F\u7684\u8D44\u6E90\u3002\u6BD4\u5982\u8FDB\u7A0B\u5728 Docker \u5BB9\u5668\u4E2D\u770B\u5230\u7684 <code>/</code> \u76EE\u5F55\uFF0C\u5B9E\u9645\u4E0A\u53EF\u80FD\u5BF9\u5E94\u7528\u6237\u672C\u673A\u7684 <code>/var/docker/ds/001</code> \u3002</p><p>\u8FDB\u7A0B\u770B\u5230\u7684\u7F51\u7EDC\uFF0C\u4E5F\u662F\u9694\u79BB\u7684\u7F51\u7EDC\u3002\u6267\u884C\u8FDB\u7A0B\u4E2D\u7684\u7528\u6237\u4E5F\u662F Docker \u5BB9\u5668\u5185\u90E8\u7684\u7528\u6237\uFF0C\u548C\u5916\u90E8\u5B8C\u5168\u9694\u79BB\u3002</p><p>\u4E0D\u8FC7\u548C\u865A\u62DF\u673A\u4E0D\u540C\uFF0CDocker \u4E0D\u9694\u79BB\u8BA1\u7B97\u3002Docker \u5BB9\u5668\u4E2D\u7684\u8FDB\u7A0B\uFF0C\u4E5F\u662F\u771F\u5B9E\u7684\u8FDB\u7A0B\uFF0C\u4E0D\u662F\u865A\u62DF\u7684\u8FDB\u7A0B\u3002</p><p>\u5F53\u4E00\u4E2A Docker \u5BB9\u5668\u4E2D\u7684\u8FDB\u7A0B\u5199\u5165\u6587\u4EF6\u7684\u65F6\u5019\uFF0C\u5E76\u4E0D\u662F\u5728\u4E00\u53F0\u865A\u62DF\u673A\u4E0A\u5199\uFF0C\u800C\u662F\u5728\u7528\u6237\u672C\u5730\u64CD\u4F5C\u7CFB\u7EDF\u7684\u6587\u4EF6\u7CFB\u7EDF\u4E2D\u5199\u5165\uFF0C\u53EA\u4E0D\u8FC7\u662F\u88AB\u9694\u79BB\u4E86\u3002</p><p><strong>Docker \u662F\u4E00\u79CD\u9694\u79BB\u6280\u672F\u800C\u975E\u865A\u62DF\u5316\u3002</strong></p><p>\u865A\u62DF\u5316\u6280\u672F\u6700\u660E\u663E\u7684\u7279\u5F81\u662F\u6267\u884C\u5C42\u9762\u7684\u865A\u62DF\u5316 -- \u865A\u62DF CPU \u6307\u4EE4\u3002\u6BD4\u5982\u4F60\u672C\u673A\u7684 Windows \u4E0D\u7BA1\u7406 vmware \u4E2D\u8FD0\u884C\u7684\u8FDB\u7A0B\uFF0C\u56E0\u4E3A vmware \u4E2D\u7684\u8FDB\u7A0B\u5DF2\u7ECF\u5B8C\u5168\u8FD0\u884C\u5728\u865A\u62DF\u5316\u6280\u672F\u4E0A\u3002</p><p>Docker \u5C06\u81EA\u5DF1\u76F4\u63A5\u5AC1\u63A5\u5728\u64CD\u4F5C\u7CFB\u7EDF\u4E0A\uFF0CDocker \u4E2D\u7684\u8FDB\u7A0B\u4E5F\u662F\u771F\u5B9E\u7684\u8FDB\u7A0B\uFF0CDocker \u4F7F\u7528\u7684\u6587\u4EF6\u7CFB\u7EDF\u4E5F\u662F\u771F\u5B9E\u7684\u6587\u4EF6\u7CFB\u7EDF\uFF08\u53EA\u4E0D\u8FC7\u505A\u4E86\u9694\u79BB\uFF09\u3002Docker \u4F7F\u7528\u7684\u7F51\u7EDC\u4E5F\u662F\u771F\u5B9E\u7684\u7F51\u7EDC\u3002</p><p><strong>Docker \u5982\u4F55\u505A\u5230\u7684\uFF1F</strong></p><p>\u4F7F\u7528 Linux\u7684 namespace \u6280\u672F\u3002\u4F60\u4E5F\u53EF\u4EE5\u7528\u8FD9\u4E2A\u6280\u672F\u9694\u79BB\u4F60\u7CFB\u7EDF\u4E2D\u7684\u5E94\u7528\u3002</p><p>Namespace \u6280\u672F\u662F\u591A\u79CD\u6280\u672F\u7684\u5408\u96C6\uFF0C\u5982\u679C\u611F\u5174\u8DA3\u53EF\u4EE5\u641C\u7D22\u8FD9\u4E9B\u5173\u952E\u5B57\uFF1A</p><ul><li>cggroup</li><li>mnt namespace</li><li>user namespace</li><li>pid namespace</li></ul><p><strong>docker \u67B6\u6784</strong></p><img src="`+l+`"><p><strong>Docker \u4E3A\u4EC0\u4E48\u53EF\u9884\u6D4B\uFF08predictable\uFF09</strong></p><p>\u56E0\u4E3A\u955C\u50CF\u4F7F\u7528\u5BB9\u5668\u90E8\u7F72\uFF0C\u73AF\u5883\u662F\u9694\u79BB\u7684\uFF0C\u7EA6\u675F\u884C\u4E3A\u3002</p><p>\u5BB9\u5668\u53EF\u80FD\u4F1A\u6302\uFF0C\u53EF\u80FD\u4F1A\u65E0\u54CD\u5E94\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u4E3B\u673A\uFF0C\u62D6\u57AE\u4E3B\u673A\u3002</p><p><strong>Docker \u4E3A\u4EC0\u4E48\u9AD8\u6548</strong></p><p>\u9AD8\u6548\u5728\u4E8E\u4E24\u4E2A\u5C42\u9762\uFF1A</p><ul><li>\u7814\u53D1\u6548\u7387\uFF1A\u6709\u81EA\u5DF1\u7684\u4E00\u5957\u5B8C\u6574\u4F53\u7CFB\uFF0C\u65B9\u4FBF\u4F7F\u7528\uFF1B</li><li>\u6267\u884C\u9AD8\u6548\uFF1A\u5BB9\u5668\u672C\u8EAB\u4F5C\u4E3A\u4E00\u4E2A\u8FDB\u7A0B\u6267\u884C\uFF0C\u4E0D\u91C7\u7528\u865A\u62DF\u5316\u6280\u672F\uFF0C\u6CA1\u6709\u6027\u80FD\u635F\u8017\u3002</li></ul><h2 id="docker-\u955C\u50CF\u90E8\u7F72" tabindex="-1">Docker \u955C\u50CF\u90E8\u7F72 <a class="header-anchor" href="#docker-\u955C\u50CF\u90E8\u7F72" aria-hidden="true">#</a></h2><p>\u65B0\u5EFA vue \u9879\u76EE</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ npm create vite</span></span>
<span class="line"></span></code></pre></div><p>\u6839\u636E\u76EE\u5F55\u4E0B\u521B\u5EFA Docker \u914D\u7F6E\u6587\u4EF6\uFF08Dockerfile\uFF09</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">FROM node:16</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">WORKDIR /usr/app</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">COPY . .</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm install cnpm -g --registry=https://registry.npmmirror.com</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN cnpm install</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm run build</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN cnpm install serve -g</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 3000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">CMD [&quot;serve&quot;, &quot;dist&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u521B\u5EFA\u5FFD\u7565\u6587\u4EF6\uFF08.dockerignore\uFF09</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">node_moduels</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u8FD0\u884C\u6784\u5EFA\u811A\u672C</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker build -t docker/hello </span><span style="color:#82AAFF;">.</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><p>\u542F\u52A8\u9879\u76EE</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker run -t -p 3000:3000 --name docker-hello -d docker/hello</span></span>
<span class="line"></span></code></pre></div><p>\u73B0\u5728\u6211\u4EEC\u5C31\u53EF\u4EE5\u6B63\u5E38\u8BBF\u95EE\u9879\u76EE\u4E86\u3002</p><h2 id="docker-compose-\u5DE5\u5177" tabindex="-1">Docker Compose \u5DE5\u5177 <a class="header-anchor" href="#docker-compose-\u5DE5\u5177" aria-hidden="true">#</a></h2><p>\u4E0B\u8F7D\uFF1A<a href="https://github.com/docker/compose/releases" target="_blank" rel="noreferrer">https://github.com/docker/compose/releases</a></p><blockquote><p>Docker for Mac \u81EA\u5E26 docker-compose</p></blockquote><p>\u521B\u5EFA Docker Compose \u6587\u4EF6\uFF0C<code>docker-compose.yml</code>\u3002</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">version</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2.13</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">services</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mysql</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">restart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">always</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mariadb:10.3</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">container_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mariadb</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">3306:3006</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./store/:/var/lib/mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">men_limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">512m</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">networks</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysqlnetwork</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">environment</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MYSQL_ROOT_PASSWORD=root</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MYSQL_DATABASE=local</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MYSQL_USER=root</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MYSQL_PASSWORD=root</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PMA_ARBIYTRARY=1</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PMA_HOST=mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PMA_PORT=3306</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PMA_USER=root</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PMA_PASSWORD=root</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">redis-server</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">restart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">always</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis:4.0</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">container_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis-server</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">command</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/bash -c &#39;redis-server --appendonly yes&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">sysctls</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">net.core.somaxconn=65535</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">6379:6379</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./redis:/data</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">men_limit</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">96m</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">networks</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysqlnetwork</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># ....</span></span>
<span class="line"></span></code></pre></div><p>\u542F\u52A8\u9879\u76EE\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">$ docker-compose up</span></span>
<span class="line"></span></code></pre></div>`,67),c=[e];function r(t,D,y,i,C,A){return n(),a("div",null,c)}const u=s(o,[["render",r]]);export{F as __pageData,u as default};
