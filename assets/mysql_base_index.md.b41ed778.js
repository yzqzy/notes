import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.9bc09dc8.js";const p="/assets/type.7da76259.png",l="/assets/type02.7a662d7a.png",o="/assets/type03.1e016f4e.png",c="/assets/table02.4a53e957.png",t="/assets/table03.13f6828b.png",i="/assets/table10.cc69f1be.png",r="/assets/table13.90726171.png",y="/assets/importthead.a9acd552.png",d="/assets/importdetails.6c1b8cdf.png",m="/assets/table16.05a0d7e2.png",g="/assets/table17.111e1ccd.png",E="/assets/table18.ae446ac7.png",h="/assets/table19.4090d758.png",k=JSON.parse('{"title":"MySQL 必知必会","description":"","frontmatter":{},"headers":[],"relativePath":"mysql/base/index.md","filePath":"mysql/base/index.md"}'),u={name:"mysql/base/index.md"},b=e(`<h1 id="mysql-必知必会" tabindex="-1">MySQL 必知必会 <a class="header-anchor" href="#mysql-必知必会" aria-label="Permalink to &quot;MySQL 必知必会&quot;">​</a></h1><h2 id="一-数据存储过程" tabindex="-1">一. 数据存储过程 <a class="header-anchor" href="#一-数据存储过程" aria-label="Permalink to &quot;一. 数据存储过程&quot;">​</a></h2><p>MySQL 中，一个完整数据存储过程分为四步：创建数据库 - 确认字段 - 创建数据表 - 插入数据。</p><p>从系统架构层次来看，MySQL 数据库系统从大到小依次是数据库服务器、数据库、数据表、数据表的行与列。</p><p>数据库是 MySQL 最大的存储单元，没有数据库，数据表就没有载体，也就无法存储数据。</p><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p>安装数据库</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3306</span><span style="color:#9ECBFF;">:3306</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\d</span></span>
<span class="line"><span style="color:#E1E4E8;">    --net</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">host</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MYSQL_ROOT_PASSWORD=password</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/main-mysql:/var/lib/mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/localtime:/etc/localtime</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--name=main-mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">mysql:8.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3306</span><span style="color:#032F62;">:3306</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\d</span></span>
<span class="line"><span style="color:#24292E;">    --net</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">host</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MYSQL_ROOT_PASSWORD=password</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/main-mysql:/var/lib/mysql</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/localtime:/etc/localtime</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--name=main-mysql</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">mysql:8.0</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3306</span><span style="color:#9ECBFF;">:3306</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--net=host</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MYSQL_ROOT_PASSWORD=password</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/main-mysql:/var/lib/mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/localtime:/etc/localtime</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name=main-mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mysql:8.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3306</span><span style="color:#032F62;">:3306</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--net=host</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MYSQL_ROOT_PASSWORD=password</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/main-mysql:/var/lib/mysql</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/localtime:/etc/localtime</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name=main-mysql</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mysql:8.0</span></span></code></pre></div><p>连接数据库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql –u用户名 [–h主机名或者IP地址,-P端口号] –p密码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql –u用户名 [–h主机名或者IP地址,-P端口号] –p密码</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-it</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main-mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-uroot</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ppassword</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-it</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main-mysql</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mysql</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-uroot</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ppassword</span></span></code></pre></div><h3 id="创建数据库" tabindex="-1">创建数据库 <a class="header-anchor" href="#创建数据库" aria-label="Permalink to &quot;创建数据库&quot;">​</a></h3><p>数据存储的第一步，就是创建数据库。</p><h4 id="创建数据库-1" tabindex="-1">创建数据库 <a class="header-anchor" href="#创建数据库-1" aria-label="Permalink to &quot;创建数据库&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE DATABASE demo;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE DATABASE demo;</span></span></code></pre></div><p>创建数据库无权限处理方法如下：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">grants</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">privileges</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;root&#39;@&#39;%&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">identified</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">by</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;your passsword&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">option</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">flush</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">privileges</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">show</span><span style="color:#24292E;"> </span><span style="color:#032F62;">grants</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">grant</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;"> </span><span style="color:#032F62;">privileges</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;root&#39;@&#39;%&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">identified</span><span style="color:#24292E;"> </span><span style="color:#032F62;">by</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;your passsword&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">grant</span><span style="color:#24292E;"> </span><span style="color:#032F62;">option</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">flush</span><span style="color:#24292E;"> </span><span style="color:#032F62;">privileges</span><span style="color:#24292E;">;</span></span></code></pre></div><h4 id="查看数据库" tabindex="-1">查看数据库 <a class="header-anchor" href="#查看数据库" aria-label="Permalink to &quot;查看数据库&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SHOW DATABASES;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SHOW DATABASES;</span></span></code></pre></div><ul><li>&quot;demo&quot;：我们通过 SQL 语句创建的数据库，用来存储用户数据。</li><li>”information_schema“ ：系统自带数据库，主要保存 MySQL 数据库服务器的系统信息。 <ul><li>比如如数据库名称、数据表名称、字段名称、存取权限、数据文件所在的文件夹和系统使用的文件夹，等等。</li></ul></li><li>”performance_schema“ ：系统自带数据库，可以用来监控 MySQL 的各项性能指标。</li><li>”sys“ 数据库是 MySQL 系统自带的数据库，主要作用是以一种更容易被理解的方式展示 MySQL 数据库服务器的各类性能指标，帮助系统管理员和开发人员监控 MySQL 的技术性能。</li><li>”mysql“ ：系统自带数据库，用来保存 MySQL 数据库服务器运行时需要的系统信息。 <ul><li>比如数据文件夹、当前使用的字符集、约束检查信息，等等。</li></ul></li></ul><p>如果你是 DBA 或者 MySQL 数据库程序员，想深入了解 MySQL 数据库，可以查看<a href="https://dev.mysql.com/doc/refman/8.0/en/system-schema.html" target="_blank" rel="noreferrer">官方文档</a>。</p><h3 id="确认字段" tabindex="-1">确认字段 <a class="header-anchor" href="#确认字段" aria-label="Permalink to &quot;确认字段&quot;">​</a></h3><p>数据存储流程的第二步是确认表的字段。</p><p>MySQL 数据表由行与列组成，一行就是一条数据记录，每一条数据记录都被分成许多列，一列就叫一个字段。</p><p>每个字段都需要定义数据类型，这个数据类型叫做字段类型。</p><h3 id="创建数据表" tabindex="-1">创建数据表 <a class="header-anchor" href="#创建数据表" aria-label="Permalink to &quot;创建数据表&quot;">​</a></h3><p>数据存储流程的第三步，是创建数据表。</p><h4 id="创建数据表-1" tabindex="-1">创建数据表 <a class="header-anchor" href="#创建数据表-1" aria-label="Permalink to &quot;创建数据表&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.test (</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode text,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname text,</span></span>
<span class="line"><span style="color:#e1e4e8;">        price int</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.test (</span></span>
<span class="line"><span style="color:#24292e;">        barcode text,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname text,</span></span>
<span class="line"><span style="color:#24292e;">        price int</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><ul><li>创建数据表，最好指明数据库。</li><li>最后一个字段后面不需要加逗号 ”,“</li></ul><h4 id="查看表结构" tabindex="-1">查看表结构 <a class="header-anchor" href="#查看表结构" aria-label="Permalink to &quot;查看表结构&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DESCRIBE demo.test;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DESCRIBE demo.test;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.test;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field     | Type | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode   | text | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname | text | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| price     | int  | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.test;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Field     | Type | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode   | text | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| goodsname | text | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| price     | int  | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><ul><li>Field：表示字段名称</li><li>Type：表示字段类型</li><li>Null：表示字段是否允许空值（NULL） <ul><li>在 MySQL 中，空值不等于空字符串。一个空字符串的长度为 0，一个空值的长度是空。</li><li>在 MySQL 中，空值也占用空间。</li></ul></li><li>Key：表示键</li><li>Default：表示默认值 <ul><li>我们创建的数据表字段都允许为空，默认值都是 NULL</li></ul></li><li>Extra：表示附加信息</li></ul><h4 id="查看表" tabindex="-1">查看表 <a class="header-anchor" href="#查看表" aria-label="Permalink to &quot;查看表&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">USE demo;</span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW TABLES;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">USE demo;</span></span>
<span class="line"><span style="color:#24292e;">SHOW TABLES;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; show tables;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Tables_in_demo |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| test           |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; show tables;</span></span>
<span class="line"><span style="color:#24292e;">+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| Tables_in_demo |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| test           |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><h4 id="设置主键" tabindex="-1">设置主键 <a class="header-anchor" href="#设置主键" aria-label="Permalink to &quot;设置主键&quot;">​</a></h4><p>一个 MySQL 数据表只能有一个主键，主键可以确保数据唯一性。</p><p>虽然 MySQL 允许创建没有主键的表，但是建议一定要给表定义主键，并且养成习惯。因为主键可以帮助你减少错误数据，并且可以提高查询速度。</p><p>MySQL 中的主键，是表中的一个字段或者几个字段的组合。它有 3 个特征：</p><ul><li>必须唯一，不能重复；</li><li>不能为空；</li><li>必须可以唯一标识数据表中的记录。</li></ul><p>我们的表中有三个字段 barcode、goodsname、price，那么哪个字段可以作为主键呢？</p><p>首先商品名称（goodsname）是不行的，原因是重名的商品会有很多。例如 ”笔“，大家都可以生产一种叫 ”笔“ 的商品，各种各样的，不同规格的，不同材料的。商品名称和数据记录之间并不能形成一一对应的关系，所以商品名称不能作为主键。同样，价格（price）重复的可能性也很大，也不能做主键。</p><p>商品条码（barcode）也不能是主键。可能你会说，商品的条码都是由中国物品编码中心统一编制的，一种商品对应一个条码，一个条码对应一种商品。这不就是一一对应的关系？在实际操作中，存在例外的情况。比较典型的就是用户的门店里面有很多自己生产或者加工的商品。例如，馒头、面条等自产产品，散装的糕点、糖果等称重商品，等等。为了管理方便，门店往往会自己给它们设置条码。这样，很容易产生重复、重用的现象。</p><p>这时，就需要我们自己添加一个不会重复的字段来做主键。</p><p>我们可以添加一个字段，字段类型是整数，可以取名为商品编码（itemnumber）。当我们每次增加一条新数据库的时候，可以让这个字段值自增，这样就永远都不会重复了。</p><p>我们可以通过一条 SQL 语句，修改表结构，增加一个主键字段：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.test</span></span>
<span class="line"><span style="color:#e1e4e8;">ADD</span></span>
<span class="line"><span style="color:#e1e4e8;">    COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE demo.test</span></span>
<span class="line"><span style="color:#24292e;">ADD</span></span>
<span class="line"><span style="color:#24292e;">    COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; ALTER TABLE demo.test</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; ADD</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;</span></span>
<span class="line"><span style="color:#e1e4e8;">Query OK, 0 rows affected (0.11 sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">Records: 0  Duplicates: 0  Warnings: 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; ALTER TABLE demo.test</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; ADD</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;</span></span>
<span class="line"><span style="color:#24292e;">Query OK, 0 rows affected (0.11 sec)</span></span>
<span class="line"><span style="color:#24292e;">Records: 0  Duplicates: 0  Warnings: 0</span></span></code></pre></div><ul><li>alter table：表示修改表；</li><li>add column：表示增加一列；</li><li>primary key：表示这一列是主键；</li><li>auto_increment：表示增加一条记录，这个值会自动增加。</li></ul><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.test;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field      | Type | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode    | text | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname  | text | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| price      | int  | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber | int  | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.test;</span></span>
<span class="line"><span style="color:#24292e;">+------------+------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| Field      | Type | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode    | text | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| goodsname  | text | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| price      | int  | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber | int  | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><h3 id="插入数据" tabindex="-1">插入数据 <a class="header-anchor" href="#插入数据" aria-label="Permalink to &quot;插入数据&quot;">​</a></h3><p>数据存储流程的第四步，也是最后一步，是把数据插入到表当中去。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.test (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;001&#39;, &#39;本&#39;, 3);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.test (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;001&#39;, &#39;本&#39;, 3);</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     demo.test (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; VALUES (&#39;001&#39;, &#39;&#39;, 3);</span></span>
<span class="line"><span style="color:#e1e4e8;">Query OK, 1 row affected (0.01 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     demo.test (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; VALUES (&#39;001&#39;, &#39;&#39;, 3);</span></span>
<span class="line"><span style="color:#24292e;">Query OK, 1 row affected (0.01 sec)</span></span></code></pre></div><p>insert into 表示向 <code>demo.test</code> 中插入数据，后面是要插入数据的字段名，values 表示对应的值。</p><p>注意点：</p><ul><li>插入数据的字段名可以不写，建议每次都写。这样做的好处是可读性好，不易出错且容易修改。</li><li>由于字段 itemnumber 定义了 auto_increment，所以我们插入一条记录的时候，不给它赋值，系统也会自动赋值，每次赋值自增 1。也可以在插入数据的时候给 itemnumber 赋值，但是必须保证与已有记录的 itemnumber 值不同，否则就会提示错误。</li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>我们在进行具体操作时，会用到 8 种 SQL 语句：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 创建数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE DATABASE demo;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 删除数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP DATABASE demo;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 创建数据表</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.test (</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode text,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname text,</span></span>
<span class="line"><span style="color:#e1e4e8;">        price int</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查看表结构</span></span>
<span class="line"><span style="color:#e1e4e8;">DESCRIBE demo.test;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查看所有表</span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW TABLES;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 添加主键</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.test</span></span>
<span class="line"><span style="color:#e1e4e8;">ADD</span></span>
<span class="line"><span style="color:#e1e4e8;">    COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 向表中添加数据</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.test (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;001&#39;, &#39;本&#39;, 3);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 创建数据库</span></span>
<span class="line"><span style="color:#24292e;">CREATE DATABASE demo;</span></span>
<span class="line"><span style="color:#24292e;">-- 删除数据库</span></span>
<span class="line"><span style="color:#24292e;">DROP DATABASE demo;</span></span>
<span class="line"><span style="color:#24292e;">-- 创建数据表</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.test (</span></span>
<span class="line"><span style="color:#24292e;">        barcode text,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname text,</span></span>
<span class="line"><span style="color:#24292e;">        price int</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span>
<span class="line"><span style="color:#24292e;">-- 查看表结构</span></span>
<span class="line"><span style="color:#24292e;">DESCRIBE demo.test;</span></span>
<span class="line"><span style="color:#24292e;">-- 查看所有表</span></span>
<span class="line"><span style="color:#24292e;">SHOW TABLES;</span></span>
<span class="line"><span style="color:#24292e;">-- 添加主键</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.test</span></span>
<span class="line"><span style="color:#24292e;">ADD</span></span>
<span class="line"><span style="color:#24292e;">    COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;</span></span>
<span class="line"><span style="color:#24292e;">-- 向表中添加数据</span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.test (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;001&#39;, &#39;本&#39;, 3);</span></span></code></pre></div><p>最后，我们再来了解一下 MySQL 种 SQL 语句的书写规范。</p><p>MySQL 以分号来识别一条 SQL 语句结束，所以，你写的每一条 SQL 语句的最后，都必须有一个分号，否则，MySQL 会认为这条语句没有完成，提示语法错误。</p><p>所以，建议在写 SQL 语句时遵循统一的样式，以增加可读性，减少错误。可以点击这个<a href="https://www.sqlstyle.guide/zh/" target="_blank" rel="noreferrer">链接</a>深入学习相关规范。</p><h2 id="二-字段类型" tabindex="-1">二. 字段类型 <a class="header-anchor" href="#二-字段类型" aria-label="Permalink to &quot;二. 字段类型&quot;">​</a></h2><p>MySQL 种有很多字段类型，比如整数、文本、浮点数，等等。如果类型定义合理，就能节省存储空间，提升数据查询和处理的速度。相反，如果类型定义不合理，就有可能导致数据超出取值范围，引发系统错误，甚至可能出现计算错误的情况，进而影响整个系统。</p><h3 id="整数类型" tabindex="-1">整数类型 <a class="header-anchor" href="#整数类型" aria-label="Permalink to &quot;整数类型&quot;">​</a></h3><p>整数类型一共有 5 种，包括 TINYINT、SMALLINT、MEDIUMINT、INT（INTEGER）和 BIGINT，它们的区别如下：</p><img src="`+p+'"><p>在评估使用哪种整数类型的时候，需要考虑存储空间和可靠性的平衡问题：</p><ul><li>用占字节数少的整数类型可以节省存储空间；</li><li>为了节省存储空间，使用的整数类型取值范围太小，一旦遇到超出取值范围的情况，就可能引发系统错误，影响可靠性。</li></ul><p>举个例子，在我们的项目中商品编号使用的数据类型是 INT。</p><p>之所以不采用占用字节更少的 SMALLINT 类型整数，是因为在客户门店中流通的商品种类较多，而且，每天都会有旧商品下架，新商品上架。经过不断迭代，日积月累，如果使用 SMALLINT 类型，虽然占用字节数比 INT 类型的整数少，但是却不能保证数据不会超出范围 65535。当我们使用 INT，就能确保有足够大的取值范围，不用担心数据超出范围影响可靠性的问题。</p><p>在实际工作中，系统故障产生的成本远远超过增加几个字段存储空间所产生的成本。因此，建议首先确保数据不会超出取值范围，在这个前提下，再去考虑如何节省存储空间。</p><h3 id="浮点数类型和定点数类型" tabindex="-1">浮点数类型和定点数类型 <a class="header-anchor" href="#浮点数类型和定点数类型" aria-label="Permalink to &quot;浮点数类型和定点数类型&quot;">​</a></h3><p>浮点数和定点数类型的特点是可以处理小数，浮点数和定点数的使用场景，比整数大很多。</p><p>MySQL 支持的浮点类型：FLOAT、DOUBLE、REAL。</p><ul><li>FLOAT：表示单精度浮点数；</li><li>DOUBLE：表示双精度浮点数；</li><li>REAL 默认是 DOUBLE。如果把 SQL 模式设定为启用 “REAL_AS_FLOAT”，那么，MYSQL 就认为 REAL 是 FLOAT。启用 “REAL_AS_FLOAT”，可以用以下 SQL 语句实现。</li></ul><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SET sql_mode = &quot;REAL_AS_FLOAT&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SET sql_mode = &quot;REAL_AS_FLOAT&quot;;</span></span></code></pre></div><p>FLOAT 占用字节数少，取值范围小；DOUBLE 占用字节数多，取值范围大。</p><img src="'+l+`"><p>MySQL 按照 ”符号（S）、尾数（M）、阶码（E）“ 的格式存储浮点数。因此，无论有没有符号，MySQL 的浮点数都会存储符号的部分。所谓的无符号取值范围，其实就是有符号数值范围大于等于零的部分。</p><p>浮点数类型有个缺陷，就是不够精确。因此，在一些精确度要求比较高的项目中，千万不要使用浮点数，不然会导致结果错误，甚至造成不可挽回的损失。</p><p>我们可以借助一个实际的例子演示下。我们先创建一个表，如下所示：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode text,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname text,</span></span>
<span class="line"><span style="color:#e1e4e8;">        price double,</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber int PRIMARY KEY AUTO_INCREMENT</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#24292e;">        barcode text,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname text,</span></span>
<span class="line"><span style="color:#24292e;">        price double,</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber int PRIMARY KEY AUTO_INCREMENT</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>可以看到我们创建的表字段 ”price“ 是浮点数类型。然后我们再用下面的 SQL 语句给这个表插入几条数据：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0001&#39;, &#39;书&#39;, 0.47);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0002&#39;, &#39;笔&#39;, 0.44);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0002&#39;, &#39;胶水&#39;, 0.19);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0001&#39;, &#39;书&#39;, 0.47);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0002&#39;, &#39;笔&#39;, 0.44);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0002&#39;, &#39;胶水&#39;, 0.19);</span></span></code></pre></div><p>接着，运行查询语句查看表中的情况：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * FROM demo.goodsmaster;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * FROM demo.goodsmaster;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT *</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0001    | 书        |  0.47 |          1 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0002    | 笔        |  0.44 |          2 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0002    | 胶水      |  0.19 |          3 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT *</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| 0001    | 书        |  0.47 |          1 |</span></span>
<span class="line"><span style="color:#24292e;">| 0002    | 笔        |  0.44 |          2 |</span></span>
<span class="line"><span style="color:#24292e;">| 0002    | 胶水      |  0.19 |          3 |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>然后我们使用下面的 SQL 语句，将这三个价格加在一起：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT SUM(price) FROM demo.goodsmaster;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT SUM(price) FROM demo.goodsmaster;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT SUM(price)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| SUM(price)         |</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 1.0999999999999999 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------+</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT SUM(price)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+--------------------+</span></span>
<span class="line"><span style="color:#24292e;">| SUM(price)         |</span></span>
<span class="line"><span style="color:#24292e;">+--------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 1.0999999999999999 |</span></span>
<span class="line"><span style="color:#24292e;">+--------------------+</span></span></code></pre></div><p>查询结果是 1.0999999999999999。虽然误差很小，但确实有误差。 如果你把数据类型改成 FLOAT 再进行求和运算，你会发现误差更大，结果是 1.0999999940395355。</p><p>虽然 1.10 和 1.0999999999999999 差不多，但是当我们需要以数值比对为条件进行查询，一旦出现误差，就查不到想要的结果。</p><p>那么为什么会存在这样的误差？问题还是出在 MySQL 对浮点类型数据的存储方式上。</p><p>MySQL 使用 4 个字节存储 FLOAT 类型数据，用 8 个字节存储 DOUBLE 类型数据。无论哪种，都是采用二进制的方式来进行存储。比如 9.625，用二进制表示就是 1001.101，或者 1.001101 * 2^3。如果尾数不是 0 或 5，我们就无法使用一个二进制来精确表达，所以相加时只能再取值允许的范围内进行近似（四舍五入）。</p><p>现在你应该也可以明白，为什么数据类型是 DOUBLE 的时候，我们得到的结果误差更小一些，当数据类型是 FLOAT 的时候，误差会更大一些。原因就是，DOUBLE 有 8 位字节，精度更高。</p><p>那么，MySQL 有没有准确的数据类型呢？当然有，那就是定点数类型：DECIMAL。DECIMAL 的存储方式决定它一定是准确的。</p><p>浮点数类型是把十进制转换成二进制数存储，DECIMAL 则不同，它是把十进制数的整数部分和小数部分拆开，分别转换成十六进制数，进行存储。这样，所有的数值都可以精准表达，不会存在因无法表达而损失精度的问题。</p><p>MySQL 用 DECIMAL（M,D）的方式表示高精度小数。其中，M 表示整数部分加小数部分，一共有多少位，M&lt;=65。D 表示小数部分位数，D&lt;M。</p><p>我们可以用刚才的表 <code>demo.goodsmaster</code> 验证一下。</p><p>首先我们运行下面的语句，将字段 “price” 的数据类型修改为 DECIMAL(5, 2)。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster MODIFY COLUMN price DECIMAL(5,2);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster MODIFY COLUMN price DECIMAL(5,2);</span></span></code></pre></div><p>然后，我们再一次运行求和语句：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT SUM(price) from demo.goodsmater;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT SUM(price) from demo.goodsmater;</span></span></code></pre></div><p>这次，我们就可以得到完美结果：1.10。</p><p>由于 DECIMAL 数据类型的准确性，在我们的项目中，除极少数（例如商品编号）用到整数类型外，其他数值都可以使用 DECIMAL。原因就是项目所处的零售行业，要求精准，一分钱也不能差。</p><p>当然，在一些精度要求不高的场景下，比起占用同样的字节长度的定点数，浮点数表达的数值范围可以更大一些。</p><p>简单小结下浮点数和定点数的特点：</p><ul><li>浮点类型取值范围大，但是不精确，适用于需要取值范围大，又可以容忍微小误差的科学计算场景（比如计算化学、分子建模、流体动力学等）；</li><li>定点数类型取值范围相对小，但是精确，没有误差，适用于对精度要求极高的场景（比如涉及金额计算的场景）。</li></ul><h3 id="文本类型" tabindex="-1">文本类型 <a class="header-anchor" href="#文本类型" aria-label="Permalink to &quot;文本类型&quot;">​</a></h3><p>在实际的项目中，我们还经常会遇到一种数据，那就是字符串数据。比如，表 <code>demo.goodsmaster 中</code>，有两个字段 “barcode”、“goodsname&quot; 。这两个字段的数据类型，我们都选择了 TEXT 类型。</p><p>TEXT 类型是 MySQL 支持的文本类型的一种。此外，MySQL 还支持 CHAR、VARCHAR、ENUM 和 SET 等文本类型。</p><ul><li>CHAR(M)：固定长度字符串。CHAR(M) 类型必须预先定义字符串长度。如果太短，数据可能会超出范围；如果太长，会浪费存储空间。</li><li>VARCHAR(M)：可变长度字符串。VARCHAR(M) 也需要预先定义字符串长度。与 CHAR(M) 不同的是，VARCHAR(M) 存储字符串只要不超过这个最大长度，是按照实际字符串长度存储的。</li><li>TEXT：字符串。系统自动按照实际长度存储，不需要预先定义长度。</li><li>ENUM：枚举类型。取值必须是预先设定的一组字符串值范围之内的一个，必须知道字符串所有可能的取值。</li><li>SET：字符串对象。取值必须是在预先设定的字符串值范围之内的 0 个或多个，也必须知道字符所有可能的取值。</li></ul><p>对于 ENUM 类型和 SET 类型来说，你必须知道所有可能的取值，所以只能用在某些特定场合，比如某个参数设定的取值范围只有几个固定值的场景。</p><p>因为不需要预先知道字符串长度，系统会按照实际数据长度进行存储，所以 TEXT 类型最为灵活方便，下面我们重点学习一下它。</p><p>TEXT 类型也有 4 种，它们的区别就是最大长度不同（假设字符是 ASCII 码，一个字符占用一个字节）。</p><ul><li>TINYTEXT：255 字符；</li><li>TEXT: 65535 字符；</li><li>MEDIUMTEXT：16777215 字符；</li><li>LONGTEXT：4294967295 字符（相当于 4 GB）。</li></ul><p>不过，需要注意的是，TEXT 也有一个问题：由于实际存储长度不确定，MYSQL 不允许 TEXT 类型的字段做主键。遇到这种情况，只能采用 CHAR(M)，或者 VARCHAR(M)。</p><p>所以，建议在你的项目中，只要不是主键字段，就可以按照数据可能的最大长度，选择这几种 TEXT 类型中的一种，作为存储字符串的数据类型。</p><h3 id="日期与时间类型" tabindex="-1">日期与时间类型 <a class="header-anchor" href="#日期与时间类型" aria-label="Permalink to &quot;日期与时间类型&quot;">​</a></h3><p>日期与时间是重要的信息，在我们的系统中，几乎所有的数据表都用得到。原因是客户需要知道数据的时间标签，从而进行数据查询、统计和处理。</p><p>使用最多的日期时间类型，就是 DATETIME。虽然 MySQL 支持 YEAR（年）、TIME（时间）、DATE（日期） 以及 TIMESTAMP 类型。但在实际项目中，更推荐使用 DATETIME 类型。因为这个数据类型包括完整的日期和时间信息，使用起来比较方便。</p><p>下面列出了 MySQL 支持的其他日期类型的一些参数：</p><img src="`+o+`"><p>可以看到，不同数据类型表示的时间内容不同、取值范围不同，而且占用的字节数也不一样，我们要根据实际需要灵活选取。</p><p>为了确保数据的完整性和系统稳定性，优先考虑使用 DATETIME 类型。虽然 DATETIME 类型占用的存储空间最多，但是它表达的时间最为完整，取值范围也最大。</p><p>另外，你可以会有疑问，为什么时间类型的取值范围不是 -23.59.59~23.59.59？原因是 MySQL 设计的 TIME 类型，不仅可以表示一天之内的时间，而且还可以表示一个时间间隔，这个时间间隔可以超过 24 小时。</p><h3 id="总结-1" tabindex="-1">总结 <a class="header-anchor" href="#总结-1" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天我们学习了几种常用的字段数据类型，包括整数类型、浮点数类型、定点数类型、文本类型以及日期时间类型。</p><p>另外，我们还学习了几个新的 SQL 语句。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 修改字段类型语句</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster MODIFY COLUMN price DECIMAL(5,2);</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 计算字段合计语句</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT SUM(price) FROM demo.goodsmaster;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 修改字段类型语句</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster MODIFY COLUMN price DECIMAL(5,2);</span></span>
<span class="line"><span style="color:#24292e;">-- 计算字段合计语句</span></span>
<span class="line"><span style="color:#24292e;">SELECT SUM(price) FROM demo.goodsmaster;</span></span></code></pre></div><p>最后，再分享一个小技巧。在定义数据类型时：</p><ul><li>如果确定是整数，用 INT；</li><li>如果是小数，用定点数类型 DECIMAL；</li><li>如果是字符串且非主键，就用 TEXT；</li><li>如果是日期与时间，就用 DATETIME。</li></ul><p>这样做的好处是，可以确保你的系统不会因为数据类型定义出错。不过凡事都有两面性，可靠性好，并不意味高效。</p><p>比如，TEXT 虽然使用方便，但是效率不如 CHAR(M) 和 VARCHAR(M)。如果你有进一步优化需求，可以查看这个<a href="https://dev.mysql.com/doc/refman/8.0/en/data-types.html" target="_blank" rel="noreferrer">文档</a>。</p><h2 id="三-创建、修改数据表" tabindex="-1">三. 创建、修改数据表 <a class="header-anchor" href="#三-创建、修改数据表" aria-label="Permalink to &quot;三. 创建、修改数据表&quot;">​</a></h2><p>创建和修改数据表，是数据存储过程中的重要一环。我们不仅需要把表创建出来，还需要正确地限定条件，这样才能确保数据的一致性和完整性。同时，表中的数据会随着业务需求的变化而变化，添加和修改相应的字段也是常见的操作。</p><p>假设在我们的超市项目中，客户经常需要进货，这就需要在 MySQL 数据库里创建一个表，用来管理进货相关的数据。</p><p>假设这个表叫做进货单头表（importhead），如下图所示：</p><img src="`+c+`"><p>这里的 1、2、3 表示门店的 3 种进货方式，分别是配送中心配送、门店采买和供货直供。其中 1 是标准进货方式。因为超市是连锁经营，为了确保商品质量和品类一致，超过 9 成的门店都是通过配送中心进行配送的。因此，我们希望这个字段的默认值为 1。</p><p>现在，客户需要一个类似的表来存储进货数据，进货方式有 3 个可能的取值范围，需要设置默认值。那么，应该如何创建这个表？另外，创建好表之后，应该如何修改？</p><h3 id="创建数据表-2" tabindex="-1">创建数据表 <a class="header-anchor" href="#创建数据表-2" aria-label="Permalink to &quot;创建数据表&quot;">​</a></h3><p>首先，我们需要知道 MySQL 创建表的语法结构：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE &lt;表名&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">	字段名1 数据类型 [字段级别约束] [默认值],</span></span>
<span class="line"><span style="color:#e1e4e8;">  字段名2 数据类型 [字段级别约束] [默认值],</span></span>
<span class="line"><span style="color:#e1e4e8;">  ...</span></span>
<span class="line"><span style="color:#e1e4e8;">  [表级别约束]</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE &lt;表名&gt;</span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">	字段名1 数据类型 [字段级别约束] [默认值],</span></span>
<span class="line"><span style="color:#24292e;">  字段名2 数据类型 [字段级别约束] [默认值],</span></span>
<span class="line"><span style="color:#24292e;">  ...</span></span>
<span class="line"><span style="color:#24292e;">  [表级别约束]</span></span>
<span class="line"><span style="color:#24292e;">);</span></span></code></pre></div><p>在 MySQL 创建表的语法结构层面，有一个词叫做 “约束”。“约束” 用于限定表中数据应该满足的条件。MySQL 会根据这些限定条件，对表的操作进行监控，阻止破坏约束条件的操作执行，并提示错误，从而保证表中数据的唯一性、合法性和完整性。</p><p>下面我们来创建刚刚提到的进货单表。创建代码如下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importhead (</span></span>
<span class="line"><span style="color:#e1e4e8;">        listnumber INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        supplierid INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        stocknumber INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 设置默认值 1</span></span>
<span class="line"><span style="color:#e1e4e8;">        importtype INT DEFAULT 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        quantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#e1e4e8;">        importvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#e1e4e8;">        recorder INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        recordingdate DATETIME</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.importhead (</span></span>
<span class="line"><span style="color:#24292e;">        listnumber INT,</span></span>
<span class="line"><span style="color:#24292e;">        supplierid INT,</span></span>
<span class="line"><span style="color:#24292e;">        stocknumber INT,</span></span>
<span class="line"><span style="color:#24292e;">        -- 设置默认值 1</span></span>
<span class="line"><span style="color:#24292e;">        importtype INT DEFAULT 1,</span></span>
<span class="line"><span style="color:#24292e;">        quantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#24292e;">        importvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#24292e;">        recorder INT,</span></span>
<span class="line"><span style="color:#24292e;">        recordingdate DATETIME</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>运行上述 SQL 语句，表 demo.importhead 就按照我们的要求被创建出来了。</p><p>现在我们尝试往刚刚创建的表中插入一条记录，验证字段 “importtype” 定义的默认值约束是否起了作用。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importhead (</span></span>
<span class="line"><span style="color:#e1e4e8;">        listnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        supplierid,</span></span>
<span class="line"><span style="color:#e1e4e8;">        stocknumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 没有插入字段 importtype</span></span>
<span class="line"><span style="color:#e1e4e8;">        quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">        importvalue,</span></span>
<span class="line"><span style="color:#e1e4e8;">        recorder,</span></span>
<span class="line"><span style="color:#e1e4e8;">        recordingdate</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (</span></span>
<span class="line"><span style="color:#e1e4e8;">        1234,</span></span>
<span class="line"><span style="color:#e1e4e8;">        1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        10,</span></span>
<span class="line"><span style="color:#e1e4e8;">3-10-09&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.importhead (</span></span>
<span class="line"><span style="color:#24292e;">        listnumber,</span></span>
<span class="line"><span style="color:#24292e;">        supplierid,</span></span>
<span class="line"><span style="color:#24292e;">        stocknumber,</span></span>
<span class="line"><span style="color:#24292e;">        -- 没有插入字段 importtype</span></span>
<span class="line"><span style="color:#24292e;">        quantity,</span></span>
<span class="line"><span style="color:#24292e;">        importvalue,</span></span>
<span class="line"><span style="color:#24292e;">        recorder,</span></span>
<span class="line"><span style="color:#24292e;">        recordingdate</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (</span></span>
<span class="line"><span style="color:#24292e;">        1234,</span></span>
<span class="line"><span style="color:#24292e;">        1,</span></span>
<span class="line"><span style="color:#24292e;">        1,</span></span>
<span class="line"><span style="color:#24292e;">        10,</span></span>
<span class="line"><span style="color:#24292e;">3-10-09&#39;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>插入完成后，我们可以运行以下 SQL 查询表内容：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * from demo.importhead;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * from demo.importhead;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; select * from demo.importhead;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+-------------+------------+----------+-------------+----------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| listnumber | supplierid | stocknumber | importtype | quantity | importvalue | recorder | recordingdate       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+-------------+------------+----------+-------------+----------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|       1234 |          1 |           1 |          1 |   10.000 |     100.00 |        1 | 2023-10-09 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+-------------+------------+----------+-------------+----------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; select * from demo.importhead;</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+-------------+------------+----------+-------------+----------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| listnumber | supplierid | stocknumber | importtype | quantity | importvalue | recorder | recordingdate       |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+-------------+------------+----------+-------------+----------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">|       1234 |          1 |           1 |          1 |   10.000 |     100.00 |        1 | 2023-10-09 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+-------------+------------+----------+-------------+----------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>你会发现，字段 importtype 的值已经是 1 了。</p><h3 id="约束分类" tabindex="-1">约束分类 <a class="header-anchor" href="#约束分类" aria-label="Permalink to &quot;约束分类&quot;">​</a></h3><p>刚才我们给字段设置默认值的做法是默认约束。设置默认约束后，插入数据的时候，如果不明确给字段赋值，那么系统会把设置的默认值自动赋值给字段。</p><p>除了<strong>默认约束</strong>，还有<strong>主键约束</strong>、<strong>外键约束</strong>、<strong>非空约束</strong>、<strong>唯一性约束</strong>和<strong>自增约束</strong>。</p><p>我们之前使用的主键，其实就是主键约束。其中外键约束涉及表与表之间的关联，以及确保表的数据一致性的问题，内容比较多，后面再具体解释。</p><p>下面，我们重点介绍一下非空约束、唯一性约束和自增约束。</p><h4 id="非空约束" tabindex="-1">非空约束 <a class="header-anchor" href="#非空约束" aria-label="Permalink to &quot;非空约束&quot;">​</a></h4><p>非空约束表示字符值不能为空，如果创建表时，指明某个字段为空，那么添加数据的时候，这个字段必须有值，否则系统就会提示错误。</p><h4 id="唯一性约束" tabindex="-1">唯一性约束 <a class="header-anchor" href="#唯一性约束" aria-label="Permalink to &quot;唯一性约束&quot;">​</a></h4><p>唯一性约束表示这个字段的值不能重复，否则系统会提示错误。跟主键约束相比，唯一性约束要更加弱一些。</p><p>在一个表中，我们可以指定多个字段满足唯一性约束，但是主键约束只能有一个，这是 MySQL 系统决定的。另外，满足主键约束的字段，自动满足非空约束，但是满足唯一性约束的字段，可以是空值。</p><p>例如，我们有一个商品信息表 goodsmaster。</p><img src="`+t+`"><p>为了防止条码重复，我们可以定义字段 “barcode” 满足唯一性约束。这样一来，条码就不能重复，但是允许为空。</p><p>同样道理，为了防止名称重复，我们也可以定义字段 “goodsname” 满足唯一性约束。</p><h4 id="自增约束" tabindex="-1">自增约束 <a class="header-anchor" href="#自增约束" aria-label="Permalink to &quot;自增约束&quot;">​</a></h4><p>自增约束可以让 MySQL 自动给字段赋值，且保证不会重复，非常有用，但是不容易用好。</p><p>在商品信息表中，由于 barcode、goodsname 和 price 都不能确保唯一性，因此我们只能自己添加一个字段 itemnumber 作为主键，并且每次添加一条数据的时候，要给值增加 1。这时，我们就可以通过定义自增约束的方式，让系统自动帮我们赋值，从而满足唯一性，这样就可以做主键了。</p><p>这里有 2 个问题需要注意：</p><ul><li>在数据表中，只有整型类型的字段（包括 TINYINT、SMALLINT、MEDIUMINT、INT 和 BIGINT），才可以定义自增约束。自增约束，没增加一条数据，值自动增加 1。</li><li>可以给自增约束的字段赋值，这个时候，MySQL 会重置自增约束字段的自增基数，下次添加数据的时候，自动以自增约束字段的最大值加 1 为新的字段值。</li></ul><p>约束要根据业务需要定义在相应的字段上，这样才能保证数据是准确的，我们需要注意它的使用方法。</p><h3 id="修改数据表" tabindex="-1">修改数据表 <a class="header-anchor" href="#修改数据表" aria-label="Permalink to &quot;修改数据表&quot;">​</a></h3><p>创建完表后，我们经常还需要修改表。</p><p>当我们创建新表的时候，会出现这样的情况：例如我们前面创建进货单表，是用来存储进货数据的。</p><p>但是，我们还要创建一个进货单历史表（importheadlist），用来存储验收过的进货数据。这个表的结构跟进货单表类似，只是多了两个字段，分别是验收人（confirmer）和验收时间（confirmdate）。针对这种情况，我们很容易就可以想到通过复制表结构，然后在这个基础上通过修改表结构，来创建新表。</p><p>首先，我们可以把原来的表结构复制一下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE demo.importheadhist LIKE demo.importhead;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE demo.importheadhist LIKE demo.importhead;</span></span></code></pre></div><p>运行这个语句之后，就创建出一个和 demo.importhead 具有相同表结构的空表。</p><p>这个新创建的表，还不是我们需要的表，我们需要对这个表进行修改，通过添加字段和修改字段，来得到我们最终需要的表。</p><h4 id="添加字段" tabindex="-1">添加字段 <a class="header-anchor" href="#添加字段" aria-label="Permalink to &quot;添加字段&quot;">​</a></h4><p>现在我们给这个新的表增加 2 个字段：confirmer 和 confirmdate。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 添加字段 confirmer，类型为 INT</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.importheadhist ADD confirmer INT;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 添加字段 confirmdate，类型为 DATETIME</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.importheadhist ADD confirmdate DATETIME;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 添加字段 confirmer，类型为 INT</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.importheadhist ADD confirmer INT;</span></span>
<span class="line"><span style="color:#24292e;">-- 添加字段 confirmdate，类型为 DATETIME</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.importheadhist ADD confirmdate DATETIME;</span></span></code></pre></div><p>我们可以查看一下表结构：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DESCRIBE demo.importheadhist;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DESCRIBE demo.importheadhist;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.importheadhist;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field          | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| listnumber     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| supplierid     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| stocknumber    | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importtype     | int           | YES  |     | 1       |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| quantity       | decimal(10,3) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| recorder       | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| recordingdate  | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| confirmer      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| confirmdate    | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">10 rows in set (0.02 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.importheadhist;</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Field          | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| listnumber     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| supplierid     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| stocknumber    | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| importtype     | int           | YES  |     | 1       |       |</span></span>
<span class="line"><span style="color:#24292e;">| quantity       | decimal(10,3) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| importvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| recorder       | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| recordingdate  | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| confirmer      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| confirmdate    | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">10 rows in set (0.02 sec)</span></span></code></pre></div><p>通过增加 2 个字段，我们就得到了进货单历史表。</p><h4 id="修改字段" tabindex="-1">修改字段 <a class="header-anchor" href="#修改字段" aria-label="Permalink to &quot;修改字段&quot;">​</a></h4><p>除了添加字段，我们可能还要修改字段，比如，把字段名称 ”quantity“ 改成 ”importquantity“，并且将字段类型改为 DOUBLE。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importheadhist CHANGE quantity importquantity DOUBLE;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.importheadhist CHANGE quantity importquantity DOUBLE;</span></span></code></pre></div><p>运行 SQL 语句后，重新查看表结构，可以得到下面的结果：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.importheadhist;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field          | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| listnumber     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| supplierid     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| stocknumber    | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importtype     | int           | YES  |     | 1       |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importquantity | double        | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| recorder       | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| recordingdate  | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| confirmer      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| confirmdate    | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">10 rows in set (0.02 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.importheadhist;</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Field          | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| listnumber     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| supplierid     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| stocknumber    | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| importtype     | int           | YES  |     | 1       |       |</span></span>
<span class="line"><span style="color:#24292e;">| importquantity | double        | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| importvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| recorder       | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| recordingdate  | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| confirmer      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| confirmdate    | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">10 rows in set (0.02 sec)</span></span></code></pre></div><p>可以看到，字段名称和字段类型全部都改过来了。</p><p>如果你不想改变字段名称，只想改变字段类型。例如，将字段 ”importquantity“ 类型改为 DECIMAL(10, 3)，可以这样写：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.importheadhist MODIFY importquantity DECIMAL(10,3);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE demo.importheadhist MODIFY importquantity DECIMAL(10,3);</span></span></code></pre></div><p>我们还可以通过 SQL 语句向表中添加一个字段，甚至可以指定添加字段在表中的位置。</p><p>比如在字段 supplierid 之后，添加一个字段 suppliername，数据类型是 TEXT。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importheadhist</span></span>
<span class="line"><span style="color:#e1e4e8;">ADD</span></span>
<span class="line"><span style="color:#e1e4e8;">    suppliername TEXT AFTER supplierid;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.importheadhist</span></span>
<span class="line"><span style="color:#24292e;">ADD</span></span>
<span class="line"><span style="color:#24292e;">    suppliername TEXT AFTER supplierid;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.importheadhist;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field          | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| listnumber     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| supplierid     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| suppliername   | text          | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| stocknumber    | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importtype     | int           | YES  |     | 1       |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importquantity | decimal(10,3) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| importvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| recorder       | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| recordingdate  | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| confirmer      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| confirmdate    | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">11 rows in set (0.02 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.importheadhist;</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Field          | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| listnumber     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| supplierid     | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| suppliername   | text          | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| stocknumber    | int           | NO   |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| importtype     | int           | YES  |     | 1       |       |</span></span>
<span class="line"><span style="color:#24292e;">| importquantity | decimal(10,3) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| importvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| recorder       | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| recordingdate  | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| confirmer      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| confirmdate    | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">+----------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">11 rows in set (0.02 sec)</span></span></code></pre></div><p>到这里，我们就完成了修改字段在表中位置的操作。</p><h3 id="总结-2" tabindex="-1">总结 <a class="header-anchor" href="#总结-2" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本篇文章，我们学习了创建和修改数据表的具体方法。</p><p>创建表时，我们还提到了一个重要概念，就是约束，包括默认约束、非空约束、唯一性约束和自增约束等。</p><ul><li>默认值约束：给字段设置一个默认值。</li><li>非空约束：声明字段不能为空值。</li><li>唯一性约束：声明字段不能重复。</li><li>自增约束：声明字段值能够自动加 1，且不会重复。</li></ul><p>修改表时，我们可以通过已经存在的表创建新表，也可以通过添加字段、修改字段的方式来修改数据表。</p><p>最后，汇总一下常用的创建表的 SQL 语句。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 创建表</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE </span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">	字段名 字段类型 PRIMARY KEY</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE </span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">	字段名 字段类型 NOT NULL</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE </span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">	字段名 字段类型 UNIQUE</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE </span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">	字段名 字段类型 DEFAULT 值</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 自增条件，字段类型必须时是整型</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE </span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">	字段名 字段类型 AUTO_INCREMENT</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 已经存在表基础上，创建新表，复制表结构</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE demo.importheadhist LIKE demo.importhead;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 修改表相关</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE 表名 CHANGE 旧字段名 新字段名 数据类型;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE 表名 ADD COLUMN 字段名 字段类型 FIRST|AFTER 字段名;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE 表名 MODIFY 字段名 字段类型 FIRST|AFTER 字段名;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 创建表</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE </span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">	字段名 字段类型 PRIMARY KEY</span></span>
<span class="line"><span style="color:#24292e;">);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE </span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">	字段名 字段类型 NOT NULL</span></span>
<span class="line"><span style="color:#24292e;">);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE </span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">	字段名 字段类型 UNIQUE</span></span>
<span class="line"><span style="color:#24292e;">);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE </span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">	字段名 字段类型 DEFAULT 值</span></span>
<span class="line"><span style="color:#24292e;">);</span></span>
<span class="line"><span style="color:#24292e;">-- 自增条件，字段类型必须时是整型</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE </span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">	字段名 字段类型 AUTO_INCREMENT</span></span>
<span class="line"><span style="color:#24292e;">);</span></span>
<span class="line"><span style="color:#24292e;">-- 已经存在表基础上，创建新表，复制表结构</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE demo.importheadhist LIKE demo.importhead;</span></span>
<span class="line"><span style="color:#24292e;">-- 修改表相关</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE 表名 CHANGE 旧字段名 新字段名 数据类型;</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE 表名 ADD COLUMN 字段名 字段类型 FIRST|AFTER 字段名;</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE 表名 MODIFY 字段名 字段类型 FIRST|AFTER 字段名;</span></span></code></pre></div><p>对于初学者来说，掌握今天的内容就已经足够了。不过，MySQL 支持的数据表操作不只这些。</p><p>比如，你可以在表级别指定表的存储引擎：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE 表名 ENGINE=INNDB;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE 表名 ENGINE=INNDB;</span></span></code></pre></div><p>还可以通过指定关键字 AUTO_EXTENDSIZE，指定存储文件自增空间的大小，从而提高存储空间的利用率。</p><p>在 MySQL 8.0.12 之后的版本中，甚至还可以通过 INVISIBLE 关键字，使字段不可见，但可以正常使用。</p><p>如果想了解更多有关数据表的操作，可以看这两份资料：<a href="https://dev.mysql.com/doc/refman/8.0/en/create-table.html" target="_blank" rel="noreferrer">MySQL 创建表文档</a> 和 <a href="https://dev.mysql.com/doc/refman/8.0/en/alter-table.html" target="_blank" rel="noreferrer">MySQL 修改表文档</a>。</p><h2 id="四-增删改查" tabindex="-1">四. 增删改查 <a class="header-anchor" href="#四-增删改查" aria-label="Permalink to &quot;四. 增删改查&quot;">​</a></h2><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DESCRIBE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster MODIFY barcode TEXT NOT NULL;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster MODIFY goodsname TEXT NOT NULL;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster MODIFY price DECIMAL(10,2) NOT NULL;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster ADD COLUMN sepcification TEXT;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.goodsmaster ADD unit TEXT;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DESCRIBE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster MODIFY barcode TEXT NOT NULL;</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster MODIFY goodsname TEXT NOT NULL;</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster MODIFY price DECIMAL(10,2) NOT NULL;</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster ADD COLUMN sepcification TEXT;</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE demo.goodsmaster ADD unit TEXT;</span></span></code></pre></div><p>今天，我们来学习如何操作数据表里的数据。</p><p>在我们的超市项目中，我们已经给用户设计好一个数据表 <code>demo.goodsmaster</code>，定义好里面的字段，以及各种约束。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field         | Type          | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode       | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname     | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| price         | decimal(10,2) | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber    | int           | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#e1e4e8;">| sepcification | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| unit          | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">6 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| Field         | Type          | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode       | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| goodsname     | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| price         | decimal(10,2) | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber    | int           | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#24292e;">| sepcification | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| unit          | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">6 rows in set (0.00 sec)</span></span></code></pre></div><p>接下来，我们需要使用这个表来存储数据，也就是常说的 “增删改查”。</p><h3 id="添加数据" tabindex="-1">添加数据 <a class="header-anchor" href="#添加数据" aria-label="Permalink to &quot;添加数据&quot;">​</a></h3><p>首先我们先来看添加数据的语法结构：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO 表名 [(字段名, [,字段名] ...)] VALUES (值的列表);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO 表名 [(字段名, [,字段名] ...)] VALUES (值的列表);</span></span></code></pre></div><blockquote><p>上面的方括号 &quot;[]&quot; 表示里面的内容可选。</p></blockquote><p>添加数据分为两种情况：插入数据记录和插入查询结果。</p><h4 id="插入数据-1" tabindex="-1">插入数据 <a class="header-anchor" href="#插入数据-1" aria-label="Permalink to &quot;插入数据&quot;">​</a></h4><p>MySQL 支持的数据插入操作十分灵活。你既可以通过给表里面所有的字段赋值，完整地插入一条数据记录，也可以在插入记录的时候，只给部分字段赋值。</p><p>当我们想插入一条数据记录，其中包含所有字段值，可以这样操作：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">        sepcification,</span></span>
<span class="line"><span style="color:#e1e4e8;">        unit,</span></span>
<span class="line"><span style="color:#e1e4e8;">        price</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (4, &#39;0003&#39;, &#39;尺子&#39;, &#39;三角型&#39;, &#39;把&#39;, 5);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">        barcode,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname,</span></span>
<span class="line"><span style="color:#24292e;">        sepcification,</span></span>
<span class="line"><span style="color:#24292e;">        unit,</span></span>
<span class="line"><span style="color:#24292e;">        price</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (4, &#39;0003&#39;, &#39;尺子&#39;, &#39;三角型&#39;, &#39;把&#39;, 5);</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0001    | 书       |  0.47 |          1 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0002    | 笔       |  0.44 |          2 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0002    | 胶水    |  0.19 |          3 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子    |  5.00 |          4 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| 0001    | 书       |  0.47 |          1 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0002    | 笔       |  0.44 |          2 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0002    | 胶水    |  0.19 |          3 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子    |  5.00 |          4 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>如果想插入一条记录，只给部分字段赋值，可以这样操作：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0004&#39;, &#39;测试&#39;, 10);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0004&#39;, &#39;测试&#39;, 10);</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0001    | 书       |  0.47 |          1 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0002    | 笔       |  0.44 |          2 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0002    | 胶水    |  0.19 |          3 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子    |  5.00 |          4 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0004    | 测试    | 10.00 |          5 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">5 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| 0001    | 书       |  0.47 |          1 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0002    | 笔       |  0.44 |          2 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0002    | 胶水    |  0.19 |          3 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子    |  5.00 |          4 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#24292e;">| 0004    | 测试    | 10.00 |          5 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">5 rows in set (0.00 sec)</span></span></code></pre></div><p>我们之所以可以在插入数据的时候，只给部分字段赋值，是因为我们对字段的定义方式。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field         | Type          | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode       | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname     | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| price         | decimal(10,2) | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber    | int           | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#e1e4e8;">| sepcification | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| unit          | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">6 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| Field         | Type          | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode       | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| goodsname     | text          | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| price         | decimal(10,2) | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber    | int           | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#24292e;">| sepcification | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| unit          | text          | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">6 rows in set (0.00 sec)</span></span></code></pre></div><p>可以看到，”specification“ 和 ”unit“ 都可以是空值，”itemnumber“ 定义了自增约束。</p><p>我们在插入一条数据记录的时候，必须要考虑字段约束的 3 种情况。</p><ul><li>第一种情况是，如果字段允许为空，但我们没有给它赋值，那么 MySQL 会自动给它们赋予空值。</li><li>第二种情况是，如果字段是主键，不能为空，这时，MySQL 会按照我们添加的约束进行处理。 <ul><li>比如字段 “itemnumber‘” 是主键，不能为空，但由于我们定义了自增约束，所以 MySQL 会自动在之前的最大值基础上加 1。</li></ul></li><li>第三种情况是，如果有一个字段定义不能为空，又不是主键，当你插入一条数据记录的时候，就需要给这个记录赋值。 <ul><li>如果我们的操作违反了字段约束限制，执行 SQL 时，就会提示系统错误。</li></ul></li></ul><p>部分字段插入数据是可以的，前提是，没有赋值的字段，MySQL 需要知道如何处理，比如可以为空、有默认值，或者是自增约束字段等。否则，MySQL 就会提示错误。</p><p>到这里，我们已经学会如何给 MySQL 数据表插入一条数据记录。但是，在实际工作中，一次只插入一条数据，并不能满足需求。</p><p>假设在我们的项目中有这样的场景：门店每天的销售流水有很多，日积月累，流水表会变得越来越大。如果一直让它这样增长，数据甚至达到数亿条，占据的存储空间也会达到几个 G。虽然 MySQL 可以处理这样比较大的数据表，但是每次操作的响应时间也会延长，这会导致系统的整体效率下降。</p><p>假设我们开发日结处理，需要当天算清所有账目。其中一个步骤就是，把当天流水表的数据全部转到历史流水表中。现在，我们就可以用上数据插入语句了：</p><ul><li>从流水表取出一条数据；</li><li>将这条数据插入到历史流水表中。</li></ul><p>然后不断重复这个步骤，直到把今天流水表中所有数据全部插入到历史流水表中。不过这种做法效率很低，其实还有更好的方法。就是将查询结果插入到数据表中。</p><h4 id="插入查询结果" tabindex="-1">插入查询结果 <a class="header-anchor" href="#插入查询结果" aria-label="Permalink to &quot;插入查询结果&quot;">​</a></h4><p>MySQL 支持将查询结果插入到数据表中，我们可以指定字段，甚至是数值，插入到数据表中。语法结构如下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO 表名 (字段名)</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 字段名或值</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 表名</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO 表名 (字段名)</span></span>
<span class="line"><span style="color:#24292e;">SELECT 字段名或值</span></span>
<span class="line"><span style="color:#24292e;">FROM 表名</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span></code></pre></div><p>在我们的超市信息系统的 MySQL 数据库中，历史流水表设计与流水表非常类似。不同的是，历史流水表增加了一些字段来标识历史流水的状态，比如日结时间字段，用来记录日结操作是什么时候进行的。用 INSERT 语句实现起来也很简单。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO 历史流水表 (日结时间字段, 其他字段)</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 获取当前时间函数, 其他字段</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 流水表</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO 历史流水表 (日结时间字段, 其他字段)</span></span>
<span class="line"><span style="color:#24292e;">SELECT 获取当前时间函数, 其他字段</span></span>
<span class="line"><span style="color:#24292e;">FROM 流水表</span></span></code></pre></div><h3 id="删除数据" tabindex="-1">删除数据 <a class="header-anchor" href="#删除数据" aria-label="Permalink to &quot;删除数据&quot;">​</a></h3><p>数据删除的语法很简单，如下所示：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DELETE FROM 表名</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DELETE FROM 表名</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span></code></pre></div><p>如果我们想删除表全部数据，可以通过下面的 SQL 语句实现：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DELETE FROM demo.goodsmaster;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DELETE FROM demo.goodsmaster;</span></span></code></pre></div><h3 id="修改数据" tabindex="-1">修改数据 <a class="header-anchor" href="#修改数据" aria-label="Permalink to &quot;修改数据&quot;">​</a></h3><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">        sepcification,</span></span>
<span class="line"><span style="color:#e1e4e8;">        unit,</span></span>
<span class="line"><span style="color:#e1e4e8;">        price</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (4, &#39;0003&#39;, &#39;尺子&#39;, &#39;三角型&#39;, &#39;把&#39;, 5);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">        barcode,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname,</span></span>
<span class="line"><span style="color:#24292e;">        sepcification,</span></span>
<span class="line"><span style="color:#24292e;">        unit,</span></span>
<span class="line"><span style="color:#24292e;">        price</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (4, &#39;0003&#39;, &#39;尺子&#39;, &#39;三角型&#39;, &#39;把&#39;, 5);</span></span></code></pre></div><p>先来看一下 MySQL 的数据修改语法：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">UPDATE 表名</span></span>
<span class="line"><span style="color:#e1e4e8;">SET 字段名=值</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">UPDATE 表名</span></span>
<span class="line"><span style="color:#24292e;">SET 字段名=值</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span></code></pre></div><p>语法也很简单，需要注意的是，不能修改主键字段的值。因为主键是数据记录的唯一标识，如果修改主键值，就有可能破坏数据的完整性。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster WHERE itemnumber = 4;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子    |  5.00 |          4 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster WHERE itemnumber = 4;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子    |  5.00 |          4 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>我们可以查询到商品编号为 4 的数据记录。如果我们修改了主键值，就可能会改变刚才的查询结果。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; UPDATE demo.goodsmaster SET itemnumber = 3 WHERE itemnumber = 4;</span></span>
<span class="line"><span style="color:#e1e4e8;">Query OK, 1 row affected (0.01 sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">Rows matched: 1  Changed: 1  Warnings: 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; UPDATE demo.goodsmaster SET itemnumber = 3 WHERE itemnumber = 4;</span></span>
<span class="line"><span style="color:#24292e;">Query OK, 1 row affected (0.01 sec)</span></span>
<span class="line"><span style="color:#24292e;">Rows matched: 1  Changed: 1  Warnings: 0</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster WHERE itemnumber = 4;</span></span>
<span class="line"><span style="color:#e1e4e8;">Empty set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster WHERE itemnumber = 4;</span></span>
<span class="line"><span style="color:#24292e;">Empty set (0.00 sec)</span></span></code></pre></div><p>可以看到，查询结果为空，因为商品编号是 4 的记录已经不存在了。</p><p>如果你必须修改主键的值，那极有可能就是主键设置的不合理。</p><h3 id="查询数据" tabindex="-1">查询数据 <a class="header-anchor" href="#查询数据" aria-label="Permalink to &quot;查询数据&quot;">​</a></h3><p>我们先来看下查询语句的语法结构：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT *|字段列表</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 数据源</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span>
<span class="line"><span style="color:#e1e4e8;">GROUP BY 字段</span></span>
<span class="line"><span style="color:#e1e4e8;">HAVING 条件</span></span>
<span class="line"><span style="color:#e1e4e8;">ORDER BY 字段</span></span>
<span class="line"><span style="color:#e1e4e8;">LIMIT 起始点,行数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT *|字段列表</span></span>
<span class="line"><span style="color:#24292e;">FROM 数据源</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span>
<span class="line"><span style="color:#24292e;">GROUP BY 字段</span></span>
<span class="line"><span style="color:#24292e;">HAVING 条件</span></span>
<span class="line"><span style="color:#24292e;">ORDER BY 字段</span></span>
<span class="line"><span style="color:#24292e;">LIMIT 起始点,行数</span></span></code></pre></div><p>在这些字段中，SELECT、WHERE、GROUP BY 和 HAVING 比较好理解，我们能只需要知道它们的含义就可以了。</p><ul><li>SELECT：查询关键字，表示我们要做一个查询。 <ul><li><code>*</code> 是一个通配符，表示我们要查询表中所有字段。也可以把要查询的字段罗列出来，这样，查询结果就只会显示想要查询的字段内容。</li></ul></li><li>WHERE：表示查询条件。 <ul><li>可以把要查询的数据所要满足的条件，放在 WHERE 关键字之后。</li></ul></li><li>GROUP BY：告诉 MySQL，查询结果要如何分组，通常搭配 MySQL 聚合函数使用。</li><li>HAVING：用于筛选查询结果，与 WHERE 类似。</li></ul><p>FROM、ORDER BY、LIMIT 相对来说比较复杂，需要注意的地方比较多，我们来具体解释一下。</p><h4 id="from" tabindex="-1">FROM <a class="header-anchor" href="#from" aria-label="Permalink to &quot;FROM&quot;">​</a></h4><p>FROM 关键字表示查询的数据源。我们只学习了单个数据表，可以把要查询的数据表名，直接写在 FROM 关键字之后。当我们学习关联表之后，你就会知道，在 FROM 关键字后面，还可以跟着更复杂的数据表联接。</p><p>需要注意的是，数据源不一定是表，也可以是一个查询结果。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT a.goodsname, a.price</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         SELECT *</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;             demo.goodsmaster</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     ) AS a;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname | price |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 尺子    |  5.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT a.goodsname, a.price</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         SELECT *</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;             demo.goodsmaster</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     ) AS a;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| goodsname | price |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| 尺子    |  5.00 |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+-------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>需要注意的是，框号中的部分叫做派生表（derived table），或者子查询（subquery），意思是我们可以把一个查询结果数据集当做一个虚拟的数据表来看待。</p><p>MySQL 规定，必须使用 AS 关键字给这个派生表起一个别名。在上面的语句中，派生表的名字就叫做 ”a“。</p><h4 id="order-by" tabindex="-1">ORDER BY <a class="header-anchor" href="#order-by" aria-label="Permalink to &quot;ORDER BY&quot;">​</a></h4><p>ORDER BY 的作用，是告诉 MySQL，查询结果如何排序。<strong>ASC</strong> 表示升序，<strong>DESC</strong> 表示降序。</p><p>首先我们向 <code>demo.goodsmaster</code> 中插入两条数据。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES(&#39;0003&#39;, &#39;尺子1&#39;, 15);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES(&#39;0004&#39;, &#39;测试1&#39;, 20);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES(&#39;0003&#39;, &#39;尺子1&#39;, 15);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (barcode, goodsname, price)</span></span>
<span class="line"><span style="color:#24292e;">VALUES(&#39;0004&#39;, &#39;测试1&#39;, 20);</span></span></code></pre></div><p>如果我们不控制查询结果顺序，就会得到这样的结果：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * FROM demo.goodsmater;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * FROM demo.goodsmater;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子    |  5.00 |          3 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0004    | 测试    | 10.00 |          6 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子1   | 15.00 |          7 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0004    | 测试1   | 20.00 |          8 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子    |  5.00 |          3 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#24292e;">| 0004    | 测试    | 10.00 |          6 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子1   | 15.00 |          7 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0004    | 测试1   | 20.00 |          8 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>如果我们使用 ORDER BY 对查询结果进行控制，结果就不同了：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * FROM demo.goodsmaster ORDER BY barcode ASC, price DESC;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * FROM demo.goodsmaster ORDER BY barcode ASC, price DESC;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster ORDER BY barcode ASC, price DESC;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子1   | 15.00 |          7 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子    |  5.00 |          3 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0004    | 测试1   | 20.00 |          8 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0004    | 测试    | 10.00 |          6 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster ORDER BY barcode ASC, price DESC;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子1   | 15.00 |          7 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子    |  5.00 |          3 | 三角型     | 把  |</span></span>
<span class="line"><span style="color:#24292e;">| 0004    | 测试1   | 20.00 |          8 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0004    | 测试    | 10.00 |          6 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span></code></pre></div><p>可以看到，查询结果会先按照字段 barcode 的升序排序，相同 barcode，再按照 price 的降序排序。</p><h4 id="limit" tabindex="-1">LIMIT <a class="header-anchor" href="#limit" aria-label="Permalink to &quot;LIMIT&quot;">​</a></h4><p>LIMIT 作用是告诉 MySQL 只显示部分查询结果。</p><p>比如，在我们的数据表 <code>demo.goodsmaster</code> 中有 4 条数据，我们只想显示第 2、3 条数据，就可以使用 LIMIT 关键字来实现。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * FROM demo.goodsmaster LIMIT 1,2;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * FROM demo.goodsmaster LIMIT 1,2;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster LIMIT 1,2;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0004    | 测试    | 10.00 |          6 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 0003    | 尺子1   | 15.00 |          7 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster LIMIT 1,2;</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| barcode | goodsname | price | itemnumber | sepcification | unit |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">| 0004    | 测试    | 10.00 |          6 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">| 0003    | 尺子1   | 15.00 |          7 | NULL          | NULL |</span></span>
<span class="line"><span style="color:#24292e;">+---------+-----------+-------+------------+---------------+------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><h3 id="总结-3" tabindex="-1">总结 <a class="header-anchor" href="#总结-3" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本篇文章，我们学习了添加、删除、修改和查询数据的方法，这些都是我们经常遇到的操作。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO 表名 [(字段名 [,字段名] ...)] VALUES (值的列表);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO 表名 (字段名)</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 字段名或值</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 表名</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DELETE FROM 表名</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 表名</span></span>
<span class="line"><span style="color:#e1e4e8;">SET 字段名=值</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT *|字段列表</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 数据源</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE 条件</span></span>
<span class="line"><span style="color:#e1e4e8;">GROUP BY 字段</span></span>
<span class="line"><span style="color:#e1e4e8;">HAVING 条件</span></span>
<span class="line"><span style="color:#e1e4e8;">ORDER BY 字段</span></span>
<span class="line"><span style="color:#e1e4e8;">LIMIT 起始点,行数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO 表名 [(字段名 [,字段名] ...)] VALUES (值的列表);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO 表名 (字段名)</span></span>
<span class="line"><span style="color:#24292e;">SELECT 字段名或值</span></span>
<span class="line"><span style="color:#24292e;">FROM 表名</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DELETE FROM 表名</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">UPDATE 表名</span></span>
<span class="line"><span style="color:#24292e;">SET 字段名=值</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT *|字段列表</span></span>
<span class="line"><span style="color:#24292e;">FROM 数据源</span></span>
<span class="line"><span style="color:#24292e;">WHERE 条件</span></span>
<span class="line"><span style="color:#24292e;">GROUP BY 字段</span></span>
<span class="line"><span style="color:#24292e;">HAVING 条件</span></span>
<span class="line"><span style="color:#24292e;">ORDER BY 字段</span></span>
<span class="line"><span style="color:#24292e;">LIMIT 起始点,行数</span></span></code></pre></div><p>如果你在工作中遇到更复杂的操作需求，可以查看这 3 份资料，分别是 <a href="https://dev.mysql.com/doc/refman/8.0/en/insert.html" target="_blank" rel="noreferrer">MySQL 数据插入</a>、<a href="https://dev.mysql.com/doc/refman/8.0/en/update.html" target="_blank" rel="noreferrer">MySQL 数据更新</a>、<a href="https://dev.mysql.com/doc/refman/8.0/en/select.html" target="_blank" rel="noreferrer">MySQL 数据查询</a>。</p><h3 id="技术拓展" tabindex="-1">技术拓展 <a class="header-anchor" href="#技术拓展" aria-label="Permalink to &quot;技术拓展&quot;">​</a></h3><p>如果我们将查询结果插入到表中，导致主键约束或者唯一性约束被破坏，就可以使用 “ON DUPLICATE” 关键字，把两个门店的商品信息数据整合到一起。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 删除数据表</span></span>
<span class="line"><span style="color:#e1e4e8;">DELETE FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建数据表 demo.goodsmaster</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber INT PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode TEXT NOT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname TEXT NOT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">        specifiction TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        unit TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        salesprice DECIMAL(10, 2)</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">        specifiction,</span></span>
<span class="line"><span style="color:#e1e4e8;">        unit,</span></span>
<span class="line"><span style="color:#e1e4e8;">        salesprice</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0001&#39;, &#39;书&#39;, &#39;16开&#39;, &#39;本&#39;, 89), (&#39;0002&#39;, &#39;笔&#39;, &#39;10支装&#39;, &#39;包&#39;, 5);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">        unit,</span></span>
<span class="line"><span style="color:#e1e4e8;">        salesprice</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0003&#39;, &#39;橡皮&#39;, &#39;个&#39;, 3);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建数据表 demo.goodsmaster1</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE demo.goodsmaster1 LIKE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster1 (barcode, goodsname, salesprice)</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (&#39;0001&#39;, &#39;教科书&#39;, 89);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster1 (</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        barcode,</span></span>
<span class="line"><span style="color:#e1e4e8;">        goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">        specifiction,</span></span>
<span class="line"><span style="color:#e1e4e8;">        unit,</span></span>
<span class="line"><span style="color:#e1e4e8;">        salesprice</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (4, &#39;0004&#39;, &#39;馒头&#39;, &#39;&#39;, &#39;&#39;, 1.5);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 删除数据表</span></span>
<span class="line"><span style="color:#24292e;">DELETE FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建数据表 demo.goodsmaster</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber INT PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span style="color:#24292e;">        barcode TEXT NOT NULL,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname TEXT NOT NULL,</span></span>
<span class="line"><span style="color:#24292e;">        specifiction TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        unit TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        salesprice DECIMAL(10, 2)</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#24292e;">        barcode,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname,</span></span>
<span class="line"><span style="color:#24292e;">        specifiction,</span></span>
<span class="line"><span style="color:#24292e;">        unit,</span></span>
<span class="line"><span style="color:#24292e;">        salesprice</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0001&#39;, &#39;书&#39;, &#39;16开&#39;, &#39;本&#39;, 89), (&#39;0002&#39;, &#39;笔&#39;, &#39;10支装&#39;, &#39;包&#39;, 5);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster (</span></span>
<span class="line"><span style="color:#24292e;">        barcode,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname,</span></span>
<span class="line"><span style="color:#24292e;">        unit,</span></span>
<span class="line"><span style="color:#24292e;">        salesprice</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0003&#39;, &#39;橡皮&#39;, &#39;个&#39;, 3);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建数据表 demo.goodsmaster1</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE demo.goodsmaster1 LIKE demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster1 (barcode, goodsname, salesprice)</span></span>
<span class="line"><span style="color:#24292e;">VALUES (&#39;0001&#39;, &#39;教科书&#39;, 89);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster1 (</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">        barcode,</span></span>
<span class="line"><span style="color:#24292e;">        goodsname,</span></span>
<span class="line"><span style="color:#24292e;">        specifiction,</span></span>
<span class="line"><span style="color:#24292e;">        unit,</span></span>
<span class="line"><span style="color:#24292e;">        salesprice</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (4, &#39;0004&#39;, &#39;馒头&#39;, &#39;&#39;, &#39;&#39;, 1.5);</span></span></code></pre></div><p>门店 A 的商品信息表是 <code>demo.goodsmaster</code>：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|          1 | 0001    | 书       | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          3 | 0003    | 橡皮    | NULL         | 个  |       3.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|          1 | 0001    | 书       | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          3 | 0003    | 橡皮    | NULL         | 个  |       3.00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>门店 B 的商品信息表是 <code>demo.goodsmater1</code>：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster1;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|          1 | 0001    | 教科书 | NULL         | NULL |      89.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          4 | 0004    | 馒头    |              |      |       1.50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster1;</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|          1 | 0001    | 教科书 | NULL         | NULL |      89.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          4 | 0004    | 馒头    |              |      |       1.50 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>假设我们要把门店 B 的商品数据插入到门店 A 的商品表中：</p><ul><li><p>如果有重复的商品编号，就用门店 B 的条码，替换门店 A 的条码，用门店 B 的商品名称，替换门店 A 的商品名称；</p></li><li><p>如果没有重复编号，就直接把门店 B 的商品数据插入到门店 A 的商品表中。</p></li></ul><p>这个操作，可以用下面的 SQL 语句实现：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO demo.goodsmaster</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT *</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.goodsmaster1 AS a ON DUPLICATE KEY</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE</span></span>
<span class="line"><span style="color:#e1e4e8;">    barcode = a.barcode,</span></span>
<span class="line"><span style="color:#e1e4e8;">    goodsname = a.goodsname;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO demo.goodsmaster</span></span>
<span class="line"><span style="color:#24292e;">SELECT *</span></span>
<span class="line"><span style="color:#24292e;">FROM</span></span>
<span class="line"><span style="color:#24292e;">    demo.goodsmaster1 AS a ON DUPLICATE KEY</span></span>
<span class="line"><span style="color:#24292e;">UPDATE</span></span>
<span class="line"><span style="color:#24292e;">    barcode = a.barcode,</span></span>
<span class="line"><span style="color:#24292e;">    goodsname = a.goodsname;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          3 | 0003    | 橡皮    | NULL         | 个  |       3.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          4 | 0004    | 馒头    |              |      |       1.50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          3 | 0003    | 橡皮    | NULL         | 个  |       3.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          4 | 0004    | 馒头    |              |      |       1.50 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><h2 id="五-设置主键" tabindex="-1">五. 设置主键 <a class="header-anchor" href="#五-设置主键" aria-label="Permalink to &quot;五. 设置主键&quot;">​</a></h2><p>主键可以唯一标识表中的某一条记录，对数据表来说非常重要。</p><p>当我们需要查询和引用表中的一条记录时，最好的办法就是通过主键。只有合理地设置主键，才能确保我们准确、快速地找到所需要的数据记录。</p><p>在我们的项目中，客户要进行会员营销，相应的，我们就需要处理会员信息。会员信息表（demo.membermaster）表结构如下：</p><img src="`+i+`"><p>为了能够唯一标识会员信息，我们需要为会员信息表设置一个主键。那么，应该如何设置主键，才可以达到我们理想的目标呢？</p><p>今天我们来学习三种设置主键的思路：业务字段做主键、自增字段做主键、手动赋值字段做主键。</p><h3 id="业务字段做主键" tabindex="-1">业务字段做主键 <a class="header-anchor" href="#业务字段做主键" aria-label="Permalink to &quot;业务字段做主键&quot;">​</a></h3><p>针对这个需求，最容易想到的，就是选择表中已有字段，也就是跟业务相关的字段做主键。</p><p>在这个表中，会员卡号（cardno）看起来比较合适，因为会员卡号不能为空且具有唯一性，可以用来标识一条会员记录。</p><p>我们可以用下面的代码，在创建表的时候，设置字段 cardno 作为主键：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.membermaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 会员卡号为主键</span></span>
<span class="line"><span style="color:#e1e4e8;">        cardno CHAR(8) PRIMARY KEY,</span></span>
<span class="line"><span style="color:#e1e4e8;">        membername TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberphone TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberpid TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberaddress TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        sex TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        birthday DATETIME</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.membermaster (</span></span>
<span class="line"><span style="color:#24292e;">        -- 会员卡号为主键</span></span>
<span class="line"><span style="color:#24292e;">        cardno CHAR(8) PRIMARY KEY,</span></span>
<span class="line"><span style="color:#24292e;">        membername TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        memberphone TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        memberpid TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        memberaddress TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        sex TEXT,</span></span>
<span class="line"><span style="color:#24292e;">        birthday DATETIME</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>然后我们来查询一下表结构，确认下主键是否创建成功了：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.membermaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+----------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field         | Type     | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+----------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| cardno        | char(8)  | NO   | PRI | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| membername    | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberphone   | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberpid     | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberaddress | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| sex           | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| birthday      | datetime | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+----------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">7 rows in set (0.01 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.membermaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+----------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Field         | Type     | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+----------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| cardno        | char(8)  | NO   | PRI | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| membername    | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| memberphone   | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| memberpid     | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| memberaddress | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| sex           | text     | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| birthday      | datetime | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+----------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">7 rows in set (0.01 sec)</span></span></code></pre></div><p>可以看到，字段 cardno 在表示键值的 Key 这一系列的值是 ”PRI“，意思是 PRIMARY KEY，这就表示它已经被设置成主键了。</p><p>会员卡号做主键会有什么问题嘛？我们插入 2 条数据来验证下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.membermaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        cardno,</span></span>
<span class="line"><span style="color:#e1e4e8;">        membername,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberphone,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberpid,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberaddress,</span></span>
<span class="line"><span style="color:#e1e4e8;">        sex,</span></span>
<span class="line"><span style="color:#e1e4e8;">        birthday</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;10000001&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;张三&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;15928792771&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;110123200001017890&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;济南&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;男&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;2000-01-01&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ), (</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;10000002&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;李四&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;13578271231&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;123123199001012356&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;北京&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;女&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;1990-01-01&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.membermaster (</span></span>
<span class="line"><span style="color:#24292e;">        cardno,</span></span>
<span class="line"><span style="color:#24292e;">        membername,</span></span>
<span class="line"><span style="color:#24292e;">        memberphone,</span></span>
<span class="line"><span style="color:#24292e;">        memberpid,</span></span>
<span class="line"><span style="color:#24292e;">        memberaddress,</span></span>
<span class="line"><span style="color:#24292e;">        sex,</span></span>
<span class="line"><span style="color:#24292e;">        birthday</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (</span></span>
<span class="line"><span style="color:#24292e;">        &#39;10000001&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;张三&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;15928792771&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;110123200001017890&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;济南&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;男&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;2000-01-01&#39;</span></span>
<span class="line"><span style="color:#24292e;">    ), (</span></span>
<span class="line"><span style="color:#24292e;">        &#39;10000002&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;李四&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;13578271231&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;123123199001012356&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;北京&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;女&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;1990-01-01&#39;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>插入成功后，我们再来看下表的内容：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * FROM demo.membermaster;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * FROM demo.membermaster;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.membermaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| cardno   | membername | memberphone | memberpid          | memberaddress | sex  | birthday            |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000001 | 张三     | 15928792771 | 110123200001017890 | 济南        | 男  | 2000-01-01 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000002 | 李四     | 13578271231 | 123123199001012356 | 北京        | 女  | 1990-01-01 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.membermaster;</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| cardno   | membername | memberphone | memberpid          | memberaddress | sex  | birthday            |</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 10000001 | 张三     | 15928792771 | 110123200001017890 | 济南        | 男  | 2000-01-01 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">| 10000002 | 李四     | 13578271231 | 123123199001012356 | 北京        | 女  | 1990-01-01 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>可以发现，不同的会员卡号对应不同的会员，字段 ”cardno“ 唯一地标识某一个会员。如果都是这样，会员卡号与会员一一对应，系统是可以正常运行的。</p><p>但是实际情况并没有这么简单，会员卡号存在重复使用的情况。比如，张三因为工作变动搬离原来的地址，不再到商家的门店消费（退还会员卡），于是张三就不再是这个商店门店的会员了。但是，商家不想让这个会员卡空着，就把卡号是 ”10000001“ 的会员卡发给王五。</p><p>从系统设计的角度来看，这个变化只是修改会员信息表中的卡号为 ”10000001“ 的会员信息，但不会影响到数据一致性。也就是说，修改会员卡号是 ”10000001“ 的会员信息，系统的各个模块都会获取到修改后的会员信息。因此，从信息系统层面上看是没有问题的。但是从使用系统的业务层面来看，就有很大的问题了，会对商家造成影响。</p><p>下面，我们就来看看这种修改，是如何影响到商家的。</p><p>比如，我们有一个销售流水表，记录了所有的销售流水明细。2020 年 12 月 01 日，张三在门店购买一本书，消费 89 元。那么，系统中就有了张三买书的记录，如下所示：</p><img src="`+r+`"><p>我们可以用下面的代码创建销售流水表。因为需要引用会员信息和商品信息，所以表中要包括商品编号字段和会员卡号字段。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.trans (</span></span>
<span class="line"><span style="color:#e1e4e8;">        transactionno INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 引用商品信息</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        quantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#e1e4e8;">        price DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#e1e4e8;">        salesvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 引用会员信息</span></span>
<span class="line"><span style="color:#e1e4e8;">        cardno CHAR(8),</span></span>
<span class="line"><span style="color:#e1e4e8;">        transdate DATETIME</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.trans (</span></span>
<span class="line"><span style="color:#24292e;">        transactionno INT,</span></span>
<span class="line"><span style="color:#24292e;">        -- 引用商品信息</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber INT,</span></span>
<span class="line"><span style="color:#24292e;">        quantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#24292e;">        price DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#24292e;">        salesvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#24292e;">        -- 引用会员信息</span></span>
<span class="line"><span style="color:#24292e;">        cardno CHAR(8),</span></span>
<span class="line"><span style="color:#24292e;">        transdate DATETIME</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>创建好表之后，我们就来插入一条销售流水：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.trans (</span></span>
<span class="line"><span style="color:#e1e4e8;">        transactionno,</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">        price,</span></span>
<span class="line"><span style="color:#e1e4e8;">        salesvalue,</span></span>
<span class="line"><span style="color:#e1e4e8;">        cardno,</span></span>
<span class="line"><span style="color:#e1e4e8;">        transdate</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (</span></span>
<span class="line"><span style="color:#e1e4e8;">        1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        89,</span></span>
<span class="line"><span style="color:#e1e4e8;">        89,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;10000001&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;2023-10-10&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.trans (</span></span>
<span class="line"><span style="color:#24292e;">        transactionno,</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">        quantity,</span></span>
<span class="line"><span style="color:#24292e;">        price,</span></span>
<span class="line"><span style="color:#24292e;">        salesvalue,</span></span>
<span class="line"><span style="color:#24292e;">        cardno,</span></span>
<span class="line"><span style="color:#24292e;">        transdate</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (</span></span>
<span class="line"><span style="color:#24292e;">        1,</span></span>
<span class="line"><span style="color:#24292e;">        1,</span></span>
<span class="line"><span style="color:#24292e;">        1,</span></span>
<span class="line"><span style="color:#24292e;">        89,</span></span>
<span class="line"><span style="color:#24292e;">        89,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;10000001&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;2023-10-10&#39;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>接着，我们再来查看一下 2023 年 10 月 10 日的会员销售记录。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    b.membername,</span></span>
<span class="line"><span style="color:#e1e4e8;">    c.goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    a.salesvalue,</span></span>
<span class="line"><span style="color:#e1e4e8;">    a.transdate</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">    JOIN demo.goodsmaster as c ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">        a.cardno = b.cardno AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT</span></span>
<span class="line"><span style="color:#24292e;">    b.membername,</span></span>
<span class="line"><span style="color:#24292e;">    c.goodsname,</span></span>
<span class="line"><span style="color:#24292e;">    a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    a.salesvalue,</span></span>
<span class="line"><span style="color:#24292e;">    a.transdate</span></span>
<span class="line"><span style="color:#24292e;">FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#24292e;">    JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#24292e;">    JOIN demo.goodsmaster as c ON (</span></span>
<span class="line"><span style="color:#24292e;">        a.cardno = b.cardno AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.membername,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.salesvalue,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster as c ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.cardno = b.cardno AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     );</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| membername | goodsname | quantity | salesvalue | transdate           |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 张三     | 教科书 |    1.000 |      89.00 | 2023-10-10 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.membername,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.goodsname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.salesvalue,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster as c ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.cardno = b.cardno AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     );</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| membername | goodsname | quantity | salesvalue | transdate           |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 张三     | 教科书 |    1.000 |      89.00 | 2023-10-10 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>我们可以得到查询结果：张三，在 2023 年 10 月 10 日买了一本书，花了 89 元。</p><p>这里我们用到了 JOIN，也就是表的关联，目的就是为了引用其他表的信息，包括会员信息表（<code>demo.membermaster</code>）和商品信息表（<code>demo.goodsmater</code>）。通过关联查询，我们就可以从会员信息表中获取会员信息，从商品信息表获取商品信息。</p><p>下面，我们假设会员卡 ”10000001“ 又发给王五，我们需要更改会员信息表。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">UPDATE demo.membermaster</span></span>
<span class="line"><span style="color:#e1e4e8;">SET</span></span>
<span class="line"><span style="color:#e1e4e8;">    membername = &#39;王五&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    memberphone = &#39;13798293042&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    memberpid = &#39;475145197001012356&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    memberaddress = &#39;天津&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    sex = &#39;女&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    birthday = &#39;1970-01-01&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE cardno = &#39;10000001&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">UPDATE demo.membermaster</span></span>
<span class="line"><span style="color:#24292e;">SET</span></span>
<span class="line"><span style="color:#24292e;">    membername = &#39;王五&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    memberphone = &#39;13798293042&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    memberpid = &#39;475145197001012356&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    memberaddress = &#39;天津&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    sex = &#39;女&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    birthday = &#39;1970-01-01&#39;</span></span>
<span class="line"><span style="color:#24292e;">WHERE cardno = &#39;10000001&#39;;</span></span></code></pre></div><p>会员记录修改后之后，我们再次运行之前的会员消费流水查询：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.membername,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.salesvalue,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster as c ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.cardno = b.cardno AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     );</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| membername | goodsname | quantity | salesvalue | transdate           |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 王五     | 教科书 |    1.000 |      89.00 | 2023-10-10 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.membername,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.goodsname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.salesvalue,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster as c ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.cardno = b.cardno AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     );</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| membername | goodsname | quantity | salesvalue | transdate           |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 王五     | 教科书 |    1.000 |      89.00 | 2023-10-10 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>这次得到的结果是：王五在 2023 年 10 月 10 日买了一本书，消费 89 元。</p><p>很明显，这个结果把张三的消费行为放到王五身上了，肯定是不对的。原因就是，我们将会员卡号是 “10000001” 对应的会员信息改了，而会员卡号是主键，会员消费查询通过会员卡号关联到会员信息，最终得到错误的结果。</p><p>现在你已经知道，为什么不能把会员卡号当作主键。另外，会员电话也不能做主键，在实际操作中，手机号也存在被运营商收回，重新发给别人用的情况。</p><p>同理身份证号也不行。虽然身份证号不会重复，与每个人存在一一对应的关系。但是，身份证号属于个人隐私，顾客不一定会提供。对门店来说，顾客就是上帝，要是强制会员必须登记身份证号，会流失很多客户。另外，客户电话也有同样的问题。</p><p>这样看来，任何一个现有字段都不适合做主键。所以，建议你尽量不要使用与业务有关的字段做主键。作为项目设计的技术人员，我们无法预测在项目的整个生命周期中，哪个业务字段会因为项目的业务需求存在重复或者重用之类的情况出现。</p><p>既然业务字段不可以，那我们再来试试自增字段。</p><h3 id="自增字段做主键" tabindex="-1">自增字段做主键 <a class="header-anchor" href="#自增字段做主键" aria-label="Permalink to &quot;自增字段做主键&quot;">​</a></h3><p>我们再给会员信息表添加一个字段，比如叫 id，然后我们给这个字段定义自增约束，这样，我们就具备唯一性的，而且不为空的字段来做主键了。</p><p>接下来，我们来修改会员信息表的结构，添加一个自增字段做主键。</p><p>第一步，修改会员信息表，删除表的主键约束（删除主键约束，并不会删除字段）。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.membermaster DROP PRIMARY KEY;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE demo.membermaster DROP PRIMARY KEY;</span></span></code></pre></div><p>第二步，修改会员信息表，添加字段 “id” 为主键，并且给它定义自增约束：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.membermaster ADD id INT PRIMARY KEY AUTO_INCREMENT;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE demo.membermaster ADD id INT PRIMARY KEY AUTO_INCREMENT;</span></span></code></pre></div><p>第三步，修改销售流水表，添加新的字段 memberid，对应会员信息表中的主键：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE demo.trans ADD memberid INT;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE demo.trans ADD memberid INT;</span></span></code></pre></div><p>第四步，更新一下销售流水表，给新添加的字段 &quot;memberid&quot; 赋值，让它指向对应的会员信息：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">UPDATE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.trans AS a,</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.membermaster AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">SET a.memberid = b.id</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE</span></span>
<span class="line"><span style="color:#e1e4e8;">    a.transactionno &gt; 0</span></span>
<span class="line"><span style="color:#e1e4e8;">    AND a.cardno = b.cardno;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">UPDATE</span></span>
<span class="line"><span style="color:#24292e;">    demo.trans AS a,</span></span>
<span class="line"><span style="color:#24292e;">    demo.membermaster AS b</span></span>
<span class="line"><span style="color:#24292e;">SET a.memberid = b.id</span></span>
<span class="line"><span style="color:#24292e;">WHERE</span></span>
<span class="line"><span style="color:#24292e;">    a.transactionno &gt; 0</span></span>
<span class="line"><span style="color:#24292e;">    AND a.cardno = b.cardno;</span></span></code></pre></div><p>这个更新语句包含 2 个关联的表，看起来比较复杂。其实，我们完全可以通过删除表 demo.trans、重建表，再插入一条数据的操作，来达到同样的目的。</p><p>在实际操作中，你不一定能删掉 <code>demo.trans</code> 这个表，因为这个表里面可能已经有了很多重要的数据。</p><p>到这里，我们就完成了数据表的重新设计，让我们看一下新的数据表 <code>demo.membermaster</code> 和 <code>demo.trans</code> 的结构：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.membermaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+----------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field         | Type     | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+----------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| cardno        | char(8)  | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| membername    | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberphone   | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberpid     | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberaddress | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| sex           | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| birthday      | datetime | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#e1e4e8;">| id            | int      | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+----------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">8 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.membermaster;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+----------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| Field         | Type     | Null | Key | Default | Extra          |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+----------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">| cardno        | char(8)  | NO   |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| membername    | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| memberphone   | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| memberpid     | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| memberaddress | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| sex           | text     | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| birthday      | datetime | YES  |     | NULL    |                |</span></span>
<span class="line"><span style="color:#24292e;">| id            | int      | NO   | PRI | NULL    | auto_increment |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+----------+------+-----+---------+----------------+</span></span>
<span class="line"><span style="color:#24292e;">8 rows in set (0.00 sec)</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DESCRIBE demo.trans;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Field         | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionno | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber    | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| quantity      | decimal(10,3) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| price         | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| salesvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| cardno        | char(8)       | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate     | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">| memberid      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">8 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DESCRIBE demo.trans;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Field         | Type          | Null | Key | Default | Extra |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionno | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber    | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| quantity      | decimal(10,3) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| price         | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| salesvalue    | decimal(10,2) | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| cardno        | char(8)       | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| transdate     | datetime      | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">| memberid      | int           | YES  |     | NULL    |       |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+---------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="color:#24292e;">8 rows in set (0.00 sec)</span></span></code></pre></div><p>然后我们修改会员卡 10000001 为张三的状态。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">UPDATE demo.membermaster</span></span>
<span class="line"><span style="color:#e1e4e8;">SET</span></span>
<span class="line"><span style="color:#e1e4e8;">    membername = &#39;张三&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    memberphone = &#39;15928792771&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    memberpid = &#39;110123200001017890&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    memberaddress = &#39;济南&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    sex = &#39;男&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    birthday = &#39;2000-01-01 00:00:00&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE cardno = &#39;10000001&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">UPDATE demo.membermaster</span></span>
<span class="line"><span style="color:#24292e;">SET</span></span>
<span class="line"><span style="color:#24292e;">    membername = &#39;张三&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    memberphone = &#39;15928792771&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    memberpid = &#39;110123200001017890&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    memberaddress = &#39;济南&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    sex = &#39;男&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    birthday = &#39;2000-01-01 00:00:00&#39;</span></span>
<span class="line"><span style="color:#24292e;">WHERE cardno = &#39;10000001&#39;;</span></span></code></pre></div><p>现在，如果我们再次面对卡号重用的情况，该如何应对呢？</p><p>如果张三的会员卡 “10000001” 不再使用，发给王五，我们可以在会员信息表中增加一条记录：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.membermaster (</span></span>
<span class="line"><span style="color:#e1e4e8;">        cardno,</span></span>
<span class="line"><span style="color:#e1e4e8;">        membername,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberphone,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberpid,</span></span>
<span class="line"><span style="color:#e1e4e8;">        memberaddress,</span></span>
<span class="line"><span style="color:#e1e4e8;">        sex,</span></span>
<span class="line"><span style="color:#e1e4e8;">        birthday</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;10000001&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;王五&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;13698765432&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;475145197001012356&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;天津&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;女&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;1970-01-01&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.membermaster (</span></span>
<span class="line"><span style="color:#24292e;">        cardno,</span></span>
<span class="line"><span style="color:#24292e;">        membername,</span></span>
<span class="line"><span style="color:#24292e;">        memberphone,</span></span>
<span class="line"><span style="color:#24292e;">        memberpid,</span></span>
<span class="line"><span style="color:#24292e;">        memberaddress,</span></span>
<span class="line"><span style="color:#24292e;">        sex,</span></span>
<span class="line"><span style="color:#24292e;">        birthday</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (</span></span>
<span class="line"><span style="color:#24292e;">        &#39;10000001&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;王五&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;13698765432&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;475145197001012356&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;天津&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;女&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        &#39;1970-01-01&#39;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>下面我们再来看现在的会员信息表：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.membermaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#e1e4e8;">| cardno   | membername | memberphone | memberpid          | memberaddress | sex  | birthday            | id |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000001 | 张三     | 15928792771 | 110123200001017890 | 济南        | 男  | 2000-01-01 00:00:00 |  1 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000002 | 李四     | 13578271231 | 123123199001012356 | 北京        | 女  | 1990-01-01 00:00:00 |  2 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000001 | 王五     | 13698765432 | 475145197001012356 | 天津        | 女  | 1970-01-01 00:00:00 |  3 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.membermaster;</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#24292e;">| cardno   | membername | memberphone | memberpid          | memberaddress | sex  | birthday            | id |</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#24292e;">| 10000001 | 张三     | 15928792771 | 110123200001017890 | 济南        | 男  | 2000-01-01 00:00:00 |  1 |</span></span>
<span class="line"><span style="color:#24292e;">| 10000002 | 李四     | 13578271231 | 123123199001012356 | 北京        | 女  | 1990-01-01 00:00:00 |  2 |</span></span>
<span class="line"><span style="color:#24292e;">| 10000001 | 王五     | 13698765432 | 475145197001012356 | 天津        | 女  | 1970-01-01 00:00:00 |  3 |</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>由于字段 “cardno” 不再是主键，允许重复。因此，我们可以在保留会员 “张三” 信息的同时，添加使用同一会员卡号的 “王五” 的信息。</p><p>现在我们再来查会员消费，就不会出现问题了。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.membername,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.salesvalue,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster AS c ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.memberid = b.id AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     );</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| membername | goodsname | quantity | salesvalue | transdate           |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 张三     | 教科书 |    1.000 |      89.00 | 2023-10-10 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.membername,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.goodsname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.salesvalue,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.membermaster AS b</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster AS c ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.memberid = b.id AND a.itemnumber = c.itemnumber</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     );</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| membername | goodsname | quantity | salesvalue | transdate           |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 张三     | 教科书 |    1.000 |      89.00 | 2023-10-10 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+----------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>可以看到，结果是 2023 年 10 月 10 日，张三买了一本书，消费 89 元，是正确的。</p><p>如果是一个小项目，只有一个 MySQL 数据库服务器，用添加自增字段作为主键的办法是可以的。不过，这并不意味，在任何情况下都可以这么做。</p><p>举个例子，用户要求把增加新会员的工作放到门店进行（发展新会员一般在门店进行，人们通常在购物的同时申请会员）。解决的办法是，门店的信息系统新增会员的功能，把新的会员信息先存放到本地 MySQL 数据库中，再上传到总部，进行汇总（分布式系统中的汇总重复问题）。</p><p>那么问题来了，如果会员信息表的主键是自增的，那么各个门店新加的会员就会出现“id”冲突的可能。那这种情况应该如何处理呢？</p><h3 id="手动赋值字段做主键" tabindex="-1">手动赋值字段做主键 <a class="header-anchor" href="#手动赋值字段做主键" aria-label="Permalink to &quot;手动赋值字段做主键&quot;">​</a></h3><p>要想解决这个问题，我们可以取消字段 “id&quot; 的自增属性，改成信息系统在添加会员的时候对 ”id“ 进行赋值。</p><p>具体可以这样操作：在总部 MySQL 数据库中，有一个管理信息表，里面的信息包括成本核算策略，支付方式等，还有总部的系统参数，我们可以在这个表中添加一个字段，专门用来记录当前会员编号的最大值。</p><p>店在添加会员的时候，先到总部 MySQL 数据库中获取这个最大值，在这个基础上加 1，然后用这个值作为新会员的“id”，同时，更新总部 MySQL 数据库管理信息表中的当前会员编号的最大值。</p><p>这样一来，各个门店添加会员的时候，都对同一个总部 MySQL 数据库中的数据表字段进行操作，就解决了各门店添加会员时会员编号冲突的问题，同时也避免了使用业务字段导致数据错误的问题。</p><h3 id="总结-4" tabindex="-1">总结 <a class="header-anchor" href="#总结-4" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天，我们学习了设置数据表主键的三种方式：数据表的业务字段做主键、添加自增字段做主键，以及添加手动赋值字段做主键。</p><ul><li>用业务字段做主键，看起来很简单，但是我们应该尽量避免这样做。因为我们无法预测未来会不会因为业务需要，而出现业务字段重复或者重用的情况。</li><li>自增字段做主键，对于单机系统来说是没问题的。但是，如果有多台服务器，各自都可以录入数据，那就不一定适用了。因为如果每台机器各自产生的数据需要合并，就可能会出现主键重复的问题。</li><li>我们可以采用手动赋值的办法，通过一定的逻辑，确保字段值在全系统的唯一性，这样就可以规避主键重复的问题了。</li></ul><p>刚开始使用 MySQL 时，很多人都很容易犯的错误是喜欢用业务字段做主键，想当然地认为了解业务需求，但实际情况往往出乎意料，而更改主键设置的成本非常高。所以，如果你的系统比较复杂，尽量给表加一个字段做主键，采用手动赋值的办法，虽然系统开发的时候麻烦一点，却可以避免后面出大问题。</p><h2 id="六-外键和连接" tabindex="-1">六. 外键和连接 <a class="header-anchor" href="#六-外键和连接" aria-label="Permalink to &quot;六. 外键和连接&quot;">​</a></h2><p>在实际的数据库应用开发过程中，我们经常需要把 2 个或 2 个以上的表进行关联，以获取需要的数据。这是因为，为了提取存取效率，我们会把不同业务模块的信息分别存放在不同的表里面。但是，从业务层面上看，我们需要完整全面的信息为经营决策提供数据支撑。</p><p>以我们的超市项目来说，数据库里面的销售流水表一般只保存销售必须的信息。但是，在给超市经营者的统计报表里面，只包括这些信息是不够的。因此，必须要从商品表提取出商品信息，从会员表中提取出会员的相关信息，这样才能形成一个完整的报表。<strong>这种把分散在多个不同的表里的数据查询出来的操作，就是多表查询。</strong></p><p>在我们项目的进货模块，有这样 2 个数据表，分别是进货单头表（importthead）和进货单明细表（importdetails）。</p><p>进货单头表记录的是整个进货单的总体信息：</p><img src="`+y+'"><p>进货单明细表记录了每次进货的商品明细信息。一条进货单头数据记录，对应多条进货商品的明细数据，是一对多的关系。</p><img src="'+d+`"><p>现在我们需要查询一次进货的所有数据，包括进货单的总体信息和进货商品的明细，那么，该怎么操作呢？</p><p>在 MySQL 中，为了把 2 个表关联起来，会用到两个重要的功能：外键（FOREIGN KEY）和连接（JOIN）。</p><p>外键需要在创建表的阶段就定义，连接可以通过相同意义的字段把 2 个表连接起来，用在查询字段。</p><h3 id="如何创建外键" tabindex="-1">如何创建外键 <a class="header-anchor" href="#如何创建外键" aria-label="Permalink to &quot;如何创建外键&quot;">​</a></h3><p>假设我们有 2 个表，分别是表 A 和表 B，它们通过一个公共字段 “id” 发生关联关系，我们把这个关联关系叫做 R。</p><p>如果 “id” 在表 A 中是主键，那么，表 A 就是这个关系 R 中的主表。相应的，表 B 就是这个关系中的从表，表 B 就是这个关系中的从表，表 B 中的 “id” ，就是表 B 用来引用表 A 中数据的，叫外键。<strong>所以，外键就是从表中用来引用主表中数据的那个公共字段。</strong></p><p>在 MySQL 中，外键是通过外键约束来定义的。外键约束就是约束的一种，它必须是从表中定义，包括指明哪个是外键字段，以及外键字段所引用的主表中的字段是什么。MySQL 系统会根据外键约束的定义，监控对主表中数据的删除操作。如果发现要删除的主表记录，正在被从表中某条记录的外键字段所引用，MySQL 就会提示错误，从而确保了关联数据不会缺失。</p><p>外键约束可以在创建表的时候定义，也可以通过修改表来定义。</p><p>首先我们来看外键约束定义的语法结果：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[CONSTRAINT &lt;外键约束名称&gt;] FOREIGN KEY 字段名 REFERENCES &lt;主表名&gt; 字段名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[CONSTRAINT &lt;外键约束名称&gt;] FOREIGN KEY 字段名 REFERENCES &lt;主表名&gt; 字段名</span></span></code></pre></div><p>你可以在创建表的时候定义外键约束：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE 从表名</span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">  字段名 类型,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ...</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 定义外键约束，指出外键字段和参照的主表字段</span></span>
<span class="line"><span style="color:#e1e4e8;">CONSTRAINT 外键约束名</span></span>
<span class="line"><span style="color:#e1e4e8;">FOREIGN KEY (字段名) REFERENCES 主表名 (字段名)</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE 从表名</span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">  字段名 类型,</span></span>
<span class="line"><span style="color:#24292e;">  ...</span></span>
<span class="line"><span style="color:#24292e;">-- 定义外键约束，指出外键字段和参照的主表字段</span></span>
<span class="line"><span style="color:#24292e;">CONSTRAINT 外键约束名</span></span>
<span class="line"><span style="color:#24292e;">FOREIGN KEY (字段名) REFERENCES 主表名 (字段名)</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><p>当然，你也可以通过修改表来定义外键约束：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE 从表名 ADD CONSTRAINT 约束名 FOREIGN KEY 字段名 REFERENCES 主表名 （字段名）;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE 从表名 ADD CONSTRAINT 约束名 FOREIGN KEY 字段名 REFERENCES 主表名 （字段名）;</span></span></code></pre></div><p>一般情况下，表与表的关联都是提前设计好的。因此，会在创建表的时候就把外键约束定义好。如果需要修改表设计（比如添加新的字段，增加新的关联关系），但没有预先定义外键约束，那么，就要用修改表的方式来补充定义。</p><p>下面，我们就来讲下如何创建外键约束。首先，我们先创建主表 <code>demo.importhead</code>：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importhead (</span></span>
<span class="line"><span style="color:#e1e4e8;">        listnumber INT PRIMARY KEY,</span></span>
<span class="line"><span style="color:#e1e4e8;">        suppilerid INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        stocknumber INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        importtype INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        importquantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#e1e4e8;">        importvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#e1e4e8;">        recorder INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        recordingdate DATETIME</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.importhead (</span></span>
<span class="line"><span style="color:#24292e;">        listnumber INT PRIMARY KEY,</span></span>
<span class="line"><span style="color:#24292e;">        suppilerid INT,</span></span>
<span class="line"><span style="color:#24292e;">        stocknumber INT,</span></span>
<span class="line"><span style="color:#24292e;">        importtype INT,</span></span>
<span class="line"><span style="color:#24292e;">        importquantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#24292e;">        importvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#24292e;">        recorder INT,</span></span>
<span class="line"><span style="color:#24292e;">        recordingdate DATETIME</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>然后创建从表 <code>demo.importdetails</code> ，并且给它定义外键约束：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importdetails (</span></span>
<span class="line"><span style="color:#e1e4e8;">        listnumber INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber INT,</span></span>
<span class="line"><span style="color:#e1e4e8;">        quantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#e1e4e8;">        importprice DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#e1e4e8;">        importvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 定义外键约束，指出外键字段和参照的主表字段 constraint, foreign, references</span></span>
<span class="line"><span style="color:#e1e4e8;">        CONSTRAINT fk_importdetails_importhead FOREIGN KEY (listnumber) REFERENCES importhead (listnumber)</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">    demo.importdetails (</span></span>
<span class="line"><span style="color:#24292e;">        listnumber INT,</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber INT,</span></span>
<span class="line"><span style="color:#24292e;">        quantity DECIMAL(10, 3),</span></span>
<span class="line"><span style="color:#24292e;">        importprice DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#24292e;">        importvalue DECIMAL(10, 2),</span></span>
<span class="line"><span style="color:#24292e;">        -- 定义外键约束，指出外键字段和参照的主表字段 constraint, foreign, references</span></span>
<span class="line"><span style="color:#24292e;">        CONSTRAINT fk_importdetails_importhead FOREIGN KEY (listnumber) REFERENCES importhead (listnumber)</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span></code></pre></div><p>运行这个 SQL 语句，我们就在创建表的同时定义了一个名字叫做 “fk_importdetails_importhead” 的外键约束。同时，我们声明。这个外键约束的字段 “listnumber” 引用的是表 importhead 里面的字段 “listnumber”。</p><p>我们可以通过 SQL 语句来查看，外键约束是否创建成功。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     constraint_name,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     table_name,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     column_name,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     referenced_table_name,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     referenced_column_name</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     information_schema.KEY_COLUMN_USAGE</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; WHERE</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     constraint_name = &#39;fk_importdetails_importhead&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------------------------+---------------+-------------+-----------------------+------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| CONSTRAINT_NAME             | TABLE_NAME    | COLUMN_NAME | REFERENCED_TABLE_NAME | REFERENCED_COLUMN_NAME |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------------------------+---------------+-------------+-----------------------+------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| fk_importdetails_importhead | importdetails | listnumber  | importhead            | listnumber             |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------------------------+---------------+-------------+-----------------------+------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.01 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     constraint_name,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     table_name,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     column_name,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     referenced_table_name,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- </span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     referenced_column_name</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     information_schema.KEY_COLUMN_USAGE</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; WHERE</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     constraint_name = &#39;fk_importdetails_importhead&#39;;</span></span>
<span class="line"><span style="color:#24292e;">+-----------------------------+---------------+-------------+-----------------------+------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| CONSTRAINT_NAME             | TABLE_NAME    | COLUMN_NAME | REFERENCED_TABLE_NAME | REFERENCED_COLUMN_NAME |</span></span>
<span class="line"><span style="color:#24292e;">+-----------------------------+---------------+-------------+-----------------------+------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| fk_importdetails_importhead | importdetails | listnumber  | importhead            | listnumber             |</span></span>
<span class="line"><span style="color:#24292e;">+-----------------------------+---------------+-------------+-----------------------+------------------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.01 sec)</span></span></code></pre></div><p>通过查询，我们可以看到，外键约束所在的表是“importdetails”，外键字段是“listnumber”，参照的主表是“importhead”，参照的主表字段是“listnumber”。这样，通过定义外键约束，我们已经建立起了 2 个表之间的关联关系。</p><p>关联关系建立起来之后，我们可以用连接查询查询想要的数据。</p><h3 id="连接" tabindex="-1">连接 <a class="header-anchor" href="#连接" aria-label="Permalink to &quot;连接&quot;">​</a></h3><p>在 MySQL 中，有 2 种类型的连接，分别是内连接（INNER JOIN）和外连接（OUTER JOIN）。</p><ul><li>内连接表示查询结果只返回符合连接条件的记录，这种连接方式比较常用；</li><li>外连接则不同，表示查询结果返回一个表中的所有记录，以及另一个表中满足连接条件的记录。</li></ul><h4 id="内连接" tabindex="-1">内连接 <a class="header-anchor" href="#内连接" aria-label="Permalink to &quot;内连接&quot;">​</a></h4><p>首先，我们先来看下内连接。</p><p>在 MySQL 里面，关键字 JOIN、INNER JOIN、CROSS JOIN 的含义是一样的，都表示内连接。我们可以通过 JOIN 把两个表关联起来，来查询两个表中的数据。</p><p>咱们的项目中有会员销售的需求，所以，我们的流水表中的数据记录，既包括非会员的普通销售，又包括会员销售。它们的区别是，会员销售的数据记录包括会员编号，而在非会员销售的数据记录中，会员编号为空。</p><p>来看一下项目中的销售表（<code>demo.trans</code>)。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.trans;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+----------+---------------------+----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionno | itemnumber | quantity | price | salesvalue | cardno   | transdate           | memberid |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+----------+---------------------+----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |    1.000 | 89.00 |      89.00 | 10000001 | 2023-10-10 00:00:00 |        1 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          2 |    1.000 | 12.00 |      12.00 | NULL     | 2023-10-16 00:00:00 |        1 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+----------+---------------------+----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.trans;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+----------+---------------------+----------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionno | itemnumber | quantity | price | salesvalue | cardno   | transdate           | memberid |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+----------+---------------------+----------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |    1.000 | 89.00 |      89.00 | 10000001 | 2023-10-10 00:00:00 |        1 |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          2 |    1.000 | 12.00 |      12.00 | NULL     | 2023-10-16 00:00:00 |        1 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+----------+---------------------+----------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>再看下会员信息表（<code>demo.membermaster</code>）。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.membermaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#e1e4e8;">| cardno   | membername | memberphone | memberpid          | memberaddress | sex  | birthday            | id |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000001 | 张三     | 15928792771 | 110123200001017890 | 济南        | 男  | 2000-01-01 00:00:00 |  1 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000002 | 李四     | 13578271231 | 123123199001012356 | 北京        | 女  | 1990-01-01 00:00:00 |  2 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 10000001 | 王五     | 13698765432 | 475145197001012356 | 天津        | 女  | 1970-01-01 00:00:00 |  3 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.membermaster;</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#24292e;">| cardno   | membername | memberphone | memberpid          | memberaddress | sex  | birthday            | id |</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#24292e;">| 10000001 | 张三     | 15928792771 | 110123200001017890 | 济南        | 男  | 2000-01-01 00:00:00 |  1 |</span></span>
<span class="line"><span style="color:#24292e;">| 10000002 | 李四     | 13578271231 | 123123199001012356 | 北京        | 女  | 1990-01-01 00:00:00 |  2 |</span></span>
<span class="line"><span style="color:#24292e;">| 10000001 | 王五     | 13698765432 | 475145197001012356 | 天津        | 女  | 1970-01-01 00:00:00 |  3 |</span></span>
<span class="line"><span style="color:#24292e;">+----------+------------+-------------+--------------------+---------------+------+---------------------+----+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>这两个表存在关联关系，<code>表 demo.trans</code> 的字符 “cardno” 是这个关联关系中的外键。</p><p>我们可以通过内连接，查询所有会员销售的流水记录。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transactionno,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.price,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.membername</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.membermaster as b ON (a.cardno = b.cardno)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; WHERE b.id = 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionno | itemnumber | quantity | price | transdate           | membername |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 张三     |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transactionno,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.price,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.membername</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.membermaster as b ON (a.cardno = b.cardno)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; WHERE b.id = 1;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionno | itemnumber | quantity | price | transdate           | membername |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 张三     |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>可以看到，通过公共字段 “cardno” 把两个表关联到了一起，查询出了会员消费的数据。</p><h4 id="外连接" tabindex="-1">外连接 <a class="header-anchor" href="#外连接" aria-label="Permalink to &quot;外连接&quot;">​</a></h4><p>知道了内连接，我们再来学习下外连接。</p><p>跟内连接只返回符合连接条件的记录不同的是，外连接还可以返回表中的所有记录，它包括两类，分别是左连接和右连接。</p><ul><li>左连接，一般简写成 LEFT JOIN，返回左边表中的所有记录，以及右表中符合连接条件的记录。</li><li>右连接，一般简写成 RIGHT JOIN，返回右边表中的所有记录，以及左表中符合连接条件的记录。</li></ul><p>当我们需要查询全部流水信息的时候，就会用到外连接，代码如下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transactionno,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.price,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.membername</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     LEFT JOIN demo.membermaster as b ON (a.cardno = b.cardno);</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionno | itemnumber | quantity | price | transdate           | membername |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 王五     |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 张三     |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          2 |    1.000 | 12.00 | 2023-10-16 00:00:00 | NULL       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transactionno,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.price,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.membername</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.trans AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     LEFT JOIN demo.membermaster as b ON (a.cardno = b.cardno);</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionno | itemnumber | quantity | price | transdate           | membername |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 王五     |</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 张三     |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          2 |    1.000 | 12.00 | 2023-10-16 00:00:00 | NULL       |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>可以看到，我用到了 LEFT JOIN，意思是以表 <code>demo.trans</code> 中的数据记录为主，这个表中的数据记录要全部出现在结果集中，同时给出符合连接条件（<code>a.cardno=b.cardno</code>) 的表 <code>demo.membermaster</code> 中的字段 &quot;membername&quot; 的值。</p><p>我们也可以使用 RIGHT JOIN 实现同样的效果，代码如下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transactionno,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.price,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.membername</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.membermaster AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     RIGHT JOIN demo.trans as a ON (a.cardno = b.cardno);</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionno | itemnumber | quantity | price | transdate           | membername |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 王五     |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 张三     |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          2 |    1.000 | 12.00 | 2023-10-16 00:00:00 | NULL       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transactionno,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.price,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.membername</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.membermaster AS b</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     RIGHT JOIN demo.trans as a ON (a.cardno = b.cardno);</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionno | itemnumber | quantity | price | transdate           | membername |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 王五     |</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |    1.000 | 89.00 | 2023-10-10 00:00:00 | 张三     |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          2 |    1.000 | 12.00 | 2023-10-16 00:00:00 | NULL       |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+---------------------+------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>其实，这里就是把顺序颠倒了一下，意思是一样的。运行之后，我们都能得到一样的结果。</p><p>通过关联查询，销售流水数据里就补齐了会员的名称，我们也就获取到了需要的数据。</p><h3 id="关联查询的误区" tabindex="-1">关联查询的误区 <a class="header-anchor" href="#关联查询的误区" aria-label="Permalink to &quot;关联查询的误区&quot;">​</a></h3><p>有了连接，我们就可以进行 2 个表的关联查询了。你可能会有疑问：关联查询必须在外键约束的基础上，才可以吗？</p><p>其实，在 MySQL 中，外键约束不是关联查询的必要条件。</p><p>很多人往往在设计表的时候，觉得只要连接查询就可以搞定一切了，外键约束太麻烦，没有必要。如果你这么想，就进入了一个误区。</p><p>下面我就以超市进货的例子，来实际说明一下，为什么这种思路不对。</p><p>假设一次进货数据是这样的：供货商编号是 1，进货仓库编号是 1。我们进货的商品编号是 1234，进货数量是 1，进货价格是 10，进货金额是 10。</p><p>先插入单头数据：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importhead (</span></span>
<span class="line"><span style="color:#e1e4e8;">        listnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        supplierid,</span></span>
<span class="line"><span style="color:#e1e4e8;">        stocknumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        importtype</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (1234, 1, 1, 1);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.importhead (</span></span>
<span class="line"><span style="color:#24292e;">        listnumber,</span></span>
<span class="line"><span style="color:#24292e;">        supplierid,</span></span>
<span class="line"><span style="color:#24292e;">        stocknumber,</span></span>
<span class="line"><span style="color:#24292e;">        importtype</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (1234, 1, 1, 1);</span></span></code></pre></div><p>运行成功后，查看一下表的内容：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.importhead;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+-------------+------------+----------------+-------------+----------+---------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| listnumber | supplierid | stocknumber | importtype | importquantity | importvalue | recorder | recordingdate |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+-------------+------------+----------------+-------------+----------+---------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|       1234 |          1 |           1 |          1 |           NULL |        NULL |     NULL | NULL          |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+-------------+------------+----------------+-------------+----------+---------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.01 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.importhead;</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+-------------+------------+----------------+-------------+----------+---------------+</span></span>
<span class="line"><span style="color:#24292e;">| listnumber | supplierid | stocknumber | importtype | importquantity | importvalue | recorder | recordingdate |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+-------------+------------+----------------+-------------+----------+---------------+</span></span>
<span class="line"><span style="color:#24292e;">|       1234 |          1 |           1 |          1 |           NULL |        NULL |     NULL | NULL          |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+-------------+------------+----------------+-------------+----------+---------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.01 sec)</span></span></code></pre></div><p>可以看到，我们有了一个进货单头，单号是 1234，供货商是 1 号供货商，进货仓库是 1 号仓库。</p><p>接着，我们向进货单明细表中插入进货明细数据：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INSERT INTO</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo.importdetails (</span></span>
<span class="line"><span style="color:#e1e4e8;">        listnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        itemnumber,</span></span>
<span class="line"><span style="color:#e1e4e8;">        quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">        importprice,</span></span>
<span class="line"><span style="color:#e1e4e8;">        importvalue</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">VALUES (1234, 1, 1, 10, 10);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INSERT INTO</span></span>
<span class="line"><span style="color:#24292e;">    demo.importdetails (</span></span>
<span class="line"><span style="color:#24292e;">        listnumber,</span></span>
<span class="line"><span style="color:#24292e;">        itemnumber,</span></span>
<span class="line"><span style="color:#24292e;">        quantity,</span></span>
<span class="line"><span style="color:#24292e;">        importprice,</span></span>
<span class="line"><span style="color:#24292e;">        importvalue</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">VALUES (1234, 1, 1, 10, 10);</span></span></code></pre></div><p>运行成功，查看一下表的内容：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.importdetails;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+----------+-------------+-------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| listnumber | itemnumber | quantity | importprice | importvalue |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+----------+-------------+-------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|       1234 |          1 |    1.000 |       10.00 |       10.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+------------+----------+-------------+-------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.importdetails;</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+----------+-------------+-------------+</span></span>
<span class="line"><span style="color:#24292e;">| listnumber | itemnumber | quantity | importprice | importvalue |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+----------+-------------+-------------+</span></span>
<span class="line"><span style="color:#24292e;">|       1234 |          1 |    1.000 |       10.00 |       10.00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+------------+----------+-------------+-------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>这样，我们就有了 1234 号进货单的明细数据：进货商品是 1 号商品，进货数量是 1 个，进货价格是 10 元，进货金额是 10 元。</p><p>这个时候，如果我删除进货单头表的数据，就会出现只有明细、没有单头的数据缺失情况。我们来看看会发生什么：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; DELETE FROM demo.importhead WHERE listnumber = 1234;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (\`demo\`.\`importdetails\`, CONSTRAINT \`fk_importdetails_importhead\` FOREIGN KEY (\`listnumber\`) REFERENCES \`importhead\` (\`listnumber\`))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; DELETE FROM demo.importhead WHERE listnumber = 1234;</span></span>
<span class="line"><span style="color:#24292e;">ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (\`demo\`.\`importdetails\`, CONSTRAINT \`fk_importdetails_importhead\` FOREIGN KEY (\`listnumber\`) REFERENCES \`importhead\` (\`listnumber\`))</span></span></code></pre></div><p>运行这条语句，MySQL 会提示错误，因为数据删除违反了外键约束。MySQL 阻止了数据不一致的情况出现。</p><p>不知道你有没有注意我插入数据的顺序：为什么我要先插入进货单头表的数据，再插入进货单明细表的数据呢？其实，这是因为，如果我先插入数据到从表，也就是进货单明细表，会导致 MySQL 找不到参照的主表信息，会提示错误，因为添加数据违反了外键约束。</p><p>你可能会不以为然，觉得按照信息系统的操作逻辑，生成一张进货单的时候，一定是先生成单头，再插入明细。同样，删除一张进货单的时候，一定是先删除明细，再删除单头。要是你这么想，可能就会“中招”了。原因很简单，既然我们把进货数据拆成了 2 个表，这就决定了无论是数据添加，还是数据删除，都不能通过一条 SQL 语句实现。实际工作中，什么突发情况都是有可能发生的。你认为一定会完成的操作，完全有可能只执行了一部分。</p><p>虽然你不用外键约束，也可以进行关联查询，但是有了它，MySQL 系统才会保护你的数据，避免出现误删的情况，从而提高系统整体的可靠性。</p><p>现在来回答另外一个问题，为什么在 MySQL 里，没有外键约束也可以进行关联查询呢？原因是外键约束是有成本的，需要消耗系统资源。对于大并发的 SQL 操作，有可能会不适合。比如大型网站的中央数据库，可能会因为外键约束的系统开销而变得非常慢。所以，MySQL 允许你不使用系统自带的外键约束，在应用层面完成检查数据一致性的逻辑。也就是说，即使你不用外键约束，也要想办法通过应用层面的附加逻辑，来实现外键约束的功能，确保数据的一致性。</p><h3 id="总结-5" tabindex="-1">总结 <a class="header-anchor" href="#总结-5" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这篇文章中，介绍了如何进行多表查询，我们重点学习了外键和连接。</p><p>外键约束，可以帮助我们确定从表中的外键字段与主表中的主键字段之间的引用关系，还可以确保从表中数据所引用的主表数据不会被删除，从而保证了 2 个表中数据的一致性。</p><p>连接可以帮助我们对 2 个相关的表进行连接查询，从 2 个表中获取需要的信息。左连接表示连接以左边的表为主，结果集中要包括左边表中的所有记录；右连接表示连接以右边的表为主，结果集中要包括右边表中的所有记录。</p><p>下面是汇总的常用的 SQL 语句，你一定要重点掌握。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 定义外键约束：</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE 从表名</span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">字段 字段类型</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">CONSTRAINT 外键约束名称</span></span>
<span class="line"><span style="color:#e1e4e8;">FOREIGN KEY (字段名) REFERENCES 主表名 (字段名称)</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE 从表名 ADD CONSTRAINT 约束名 FOREIGN KEY 字段名 REFERENCES 主表名 （字段名）;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 连接查询</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 字段名</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 表名 AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">JOIN 表名 AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">ON (a.字段名称=b.字段名称);</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 字段名</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 表名 AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">LEFT JOIN 表名 AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">ON (a.字段名称=b.字段名称);</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 字段名</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 表名 AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">RIGHT JOIN 表名 AS b</span></span>
<span class="line"><span style="color:#e1e4e8;">ON (a.字段名称=b.字段名称);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 定义外键约束：</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE 从表名</span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">字段 字段类型</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">CONSTRAINT 外键约束名称</span></span>
<span class="line"><span style="color:#24292e;">FOREIGN KEY (字段名) REFERENCES 主表名 (字段名称)</span></span>
<span class="line"><span style="color:#24292e;">);</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE 从表名 ADD CONSTRAINT 约束名 FOREIGN KEY 字段名 REFERENCES 主表名 （字段名）;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 连接查询</span></span>
<span class="line"><span style="color:#24292e;">SELECT 字段名</span></span>
<span class="line"><span style="color:#24292e;">FROM 表名 AS a</span></span>
<span class="line"><span style="color:#24292e;">JOIN 表名 AS b</span></span>
<span class="line"><span style="color:#24292e;">ON (a.字段名称=b.字段名称);</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">SELECT 字段名</span></span>
<span class="line"><span style="color:#24292e;">FROM 表名 AS a</span></span>
<span class="line"><span style="color:#24292e;">LEFT JOIN 表名 AS b</span></span>
<span class="line"><span style="color:#24292e;">ON (a.字段名称=b.字段名称);</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">SELECT 字段名</span></span>
<span class="line"><span style="color:#24292e;">FROM 表名 AS a</span></span>
<span class="line"><span style="color:#24292e;">RIGHT JOIN 表名 AS b</span></span>
<span class="line"><span style="color:#24292e;">ON (a.字段名称=b.字段名称);</span></span></code></pre></div><p>刚开始学习 MySQL 的同学，很容易忽略在关联表中定义外键约束的重要性，从而导致数据缺失，影响系统的可靠性。我建议你尽量养成在关联表中定义外键约束的习惯。不过，如果你的业务场景因为高并发等原因，无法承担外键约束的成本，也可以不定义外键约束，但是一定要在应用层面实现外键约束的逻辑功能，这样才能确保系统的正确可靠。</p><h2 id="七、条件语句-where-与-having" tabindex="-1">七、条件语句：WHERE 与 HAVING <a class="header-anchor" href="#七、条件语句-where-与-having" aria-label="Permalink to &quot;七、条件语句：WHERE 与 HAVING&quot;">​</a></h2><p>我们在进行查询的时候，经常需要按条件对查询结果进行筛选，这就要用到条件语句 WHERE 和 HAVING 了。</p><p>WHERE 是直接对表中的字段进行限定，来筛选结果；HAVING 则需要跟分组关键字 GROUP BY 一起使用，通过对分组字段或分组计算函数进行限定，来筛选结果。虽然它们都是对查询进行限定，却有着各自的特点和适用场景。很多时候，我们会遇到 2 个都可以用的情况。一旦用错，就很容易出现执行效率低下、查询结果错误，甚至是查询无法运行的情况。</p><p>下面我们就借助项目实施过程中的实际需求，给你讲讲 WHERE 和 HAVING 分别是如何对查询结果进行筛选的，以及它们各自的优缺点，来帮助你正确地使用它们，使你的查询不仅能够得到正确的结果，还能占用更少的资源，并且速度更快。</p><h3 id="实际的查询需求" tabindex="-1">实际的查询需求 <a class="header-anchor" href="#实际的查询需求" aria-label="Permalink to &quot;实际的查询需求&quot;">​</a></h3><p>超市的经营者提出，要查单笔销售金额超过 50 元的商品。我们来分析一下这个需求：需要查询出一个商品记录集，限定条件是单笔销售金额超过 50 元。这个时候，我们就需要用到 WHERE 和 HAVING 了。</p><p>这个问题的条件很明确，查询的结果也只有“商品”一个字段，好像很容易实现。</p><p>假设我们有一个这样的商品信息表（<code>demo.goodsmaster</code>），里面有 2 种商品：书和笔。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.goodsmaster;</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#24292e;">|          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>同时，我们还有一个商品销售明细表（<code>demo.transactiondetails</code>），里面有 4 条销售记录：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.transactiondetails;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionid | itemnumber | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          2 |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          1 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             3 |          2 |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.transactiondetails;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionid | itemnumber | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          2 |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          1 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#24292e;">|             3 |          2 |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>接下来，我们分别用 WHERE 和 HAVING 进行查询，看看它们各自是如何查询的，是否能够得到正确的结果。</p><p>第一步，用 WHERE 关键字进行查询：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT DISTINCT b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT DISTINCT b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| goodsname |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>第二步，用 HAVING 关键字进行查询：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster as b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; HAVING max(a.salesvalue) &gt; 50;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster as b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; HAVING max(a.salesvalue) &gt; 50;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| goodsname |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>可以发现，两次查询的结果是一样的。那么，这两种查询到底有什么区别，哪个更好呢？要弄明白这个问题，我们要先学习下 WHERE 和 HAVING 的执行过程。</p><h3 id="where" tabindex="-1">WHERE <a class="header-anchor" href="#where" aria-label="Permalink to &quot;WHERE&quot;">​</a></h3><p>我们先来分析一下刚才使用 WHERE 条件的查询语句，来看看 MySQL 是如何执行这个查询的。</p><p>首先，MySQL 从数据表 <code>demo.transactiondetails</code> 中抽取满足条件 <code>a.salesvalue &gt; 50</code> 的记录：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.transactiondetails AS a WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionid | itemnumber | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          1 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.transactiondetails AS a WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionid | itemnumber | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          1 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>为了获取到销售信息所对应的商品名称，我们需要通过公共字段 &quot;itemnumber&quot; 与数据表 <code>demo.goodsmaster</code> 进行关联，从 <code>demo.goodsmaster</code> 中获取商品民称。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT a.*, b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactiondetails a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster b ON (a.itemnumber = b.itemnumber);</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionid | itemnumber | quantity | price | salesvalue | goodsname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |        1 |    89 |         89 | 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          2 |        2 |     5 |         10 | 笔       |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          1 |        2 |    89 |        178 | 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             3 |          2 |       10 |     5 |         50 | 笔       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT a.*, b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactiondetails a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster b ON (a.itemnumber = b.itemnumber);</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionid | itemnumber | quantity | price | salesvalue | goodsname |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+-----------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |        1 |    89 |         89 | 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          2 |        2 |     5 |         10 | 笔       |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          1 |        2 |    89 |        178 | 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">|             3 |          2 |       10 |     5 |         50 | 笔       |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+-----------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>这个时候，如何查询商品名称，就会出现两个重复的记录：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| goodsname |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">| 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>需要注意的是，为了消除重复的语句，这里我们需要用到一个关键字：DISTINCT，它的作用是返回唯一不同的值。比如，DISTINCT 字段 1，就表示返回字段 1 的不同的值。</p><p>下面我们尝试一下加上 DISTINCT 关键字的查询：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT DISTINCT(b.goodsname)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.01 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT DISTINCT(b.goodsname)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; WHERE a.salesvalue &gt; 50;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| goodsname |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.01 sec)</span></span></code></pre></div><p>这样，我们就得到了需要的结果：单笔销售金额超过 50 元的商品的就是 “书”。</p><p>总之，WHERE 关键字的特点是，直接用表的字段对数据集进行筛选。如果需要通过关联查询从其他的表获取需要的信息，那么执行的时候，也是先通过 WHERE 条件进行筛选，用筛选后的比较小的数据集进行连接。这样一来，连接过程中占用的资源比较少，执行效率也比较高。</p><h3 id="having" tabindex="-1">HAVING <a class="header-anchor" href="#having" aria-label="Permalink to &quot;HAVING&quot;">​</a></h3><p>讲完 WHERE，我们再说说 HAVING 是如何执行的。不过，在这之前，我要先给你介绍一下 GROUP BY，因为 HAVING 不能单独使用，必须要跟 GROUP BY 一起使用。</p><p>我们可以把 GROUP BY 理解成对数据进行分组，方便我们对组内的数据进行统计计算。</p><p>下面举个小例子，具体讲一讲 GROUP BY 如何使用，以及如何在分组里面进行统计计算。</p><p>假设现在有一组销售数据，我们需要从里面查询每天、每个收银员的销售数量和销售金额。我们通过下面的代码，来查看一下数据的内容：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.transactionhead;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionid | transactionno    | operatorid | transdate           |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 | 0120201201000001 |          1 | 2023-10-15 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 | 0120201202000001 |          2 | 2023-10-16 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             3 | 0120201202000003 |          2 | 2023-10-17 00:00:00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------------+------------+---------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.transactionhead;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionid | transactionno    | operatorid | transdate           |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 | 0120201201000001 |          1 | 2023-10-15 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">|             2 | 0120201202000001 |          2 | 2023-10-16 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">|             3 | 0120201202000003 |          2 | 2023-10-17 00:00:00 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------------+------------+---------------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.transactiondetails;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionid | itemnumber | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          2 |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          1 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             3 |          2 |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.transactiondetails;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionid | itemnumber | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          2 |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          1 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#24292e;">|             3 |          2 |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT * FROM demo.operator;</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+--------+--------------+-------------+---------+--------------------+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| operatorid | brandchid | workno | operatorname | phone       | address | pid                | duty      |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+--------+--------------+-------------+---------+--------------------+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|          1 |         1 | 001    | 张静       | 18612345678 | 北京  | 110392197501012332 | 店长    |</span></span>
<span class="line"><span style="color:#e1e4e8;">|          2 |         1 | 002    | 李强       | 13312345678 | 北京  | 110222199501012332 | 收银员 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+------------+-----------+--------+--------------+-------------+---------+--------------------+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT * FROM demo.operator;</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+--------+--------------+-------------+---------+--------------------+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| operatorid | brandchid | workno | operatorname | phone       | address | pid                | duty      |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+--------+--------------+-------------+---------+--------------------+-----------+</span></span>
<span class="line"><span style="color:#24292e;">|          1 |         1 | 001    | 张静       | 18612345678 | 北京  | 110392197501012332 | 店长    |</span></span>
<span class="line"><span style="color:#24292e;">|          2 |         1 | 002    | 李强       | 13312345678 | 北京  | 110222199501012332 | 收银员 |</span></span>
<span class="line"><span style="color:#24292e;">+------------+-----------+--------+--------------+-------------+---------+--------------------+-----------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- 交易时间</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- 操作员</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- 商品名称</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     d.goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- 销售数量</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- 价格</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.price,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     -- 销售金额</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.salesvalue</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster AS d ON (b.itemnumber = d.itemnumber);</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | operatorname | goodsname | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 | 张静       | 教科书 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 | 张静       | 笔       |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-16 00:00:00 | 李强       | 教科书 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-17 00:00:00 | 李强       | 笔       |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- 交易时间</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- 操作员</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- 商品名称</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     d.goodsname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- 销售数量</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- 价格</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.price,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     -- 销售金额</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.salesvalue</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster AS d ON (b.itemnumber = d.itemnumber);</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | operatorname | goodsname | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 | 张静       | 教科书 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 | 张静       | 笔       |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-16 00:00:00 | 李强       | 教科书 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-17 00:00:00 | 李强       | 笔       |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>如果我想看看每天的销售数量和销售金额，可以按照一个字段 “transdate” 对数据进行分组和统计：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY a.transdate;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 |               3 |                99 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-16 00:00:00 |               2 |               178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-17 00:00:00 |              10 |                50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY a.transdate;</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 |               3 |                99 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-16 00:00:00 |               2 |               178 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-17 00:00:00 |              10 |                50 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.00 sec)</span></span></code></pre></div><p>如果我想看每天、每个收银员的销售数量和销售金额，就可以按 2 个字段进行分组和统计，分别是 “transdate” 和 “operatorname”：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     --</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     --</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid) --</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | operatorname | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 | 张静       |               3 |                99 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-16 00:00:00 | 李强       |               2 |               178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-17 00:00:00 | 李强       |              10 |                50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">3 rows in set (0.01 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     --</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     --</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid) --</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname;</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | operatorname | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 | 张静       |               3 |                99 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-16 00:00:00 | 李强       |               2 |               178 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-17 00:00:00 | 李强       |              10 |                50 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">3 rows in set (0.01 sec)</span></span></code></pre></div><p>可以看到，通过对销售数据按照交易日期和收银员进行分组，再对组内数据进行求和统计，就实现了对每天、每个收银员的销售数量和销售金额的查询。</p><p>知道了 GROUP BY 的使用方法，我们就来学习下 HAVING。</p><p>回到开头的超市经营者的需求：查询单笔销售金额超过 50 元的商品。现在我们来使用 HAVING 来实现，代码如下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY b.goodsname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; HAVING max(a.salesvalue) &gt; 50;</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| goodsname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 教科书 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mysql&gt; SELECT b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     demo.transactiondetails AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY b.goodsname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; HAVING max(a.salesvalue) &gt; 50;</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| goodsname |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">| 教科书 |</span></span>
<span class="line"><span style="color:#24292e;">+-----------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>这种查询方式在 MySQL 里面是分四步实现的。</p><p>第一步，把流水明细表和商品信息表通过公共字段 “itemnumber” 连接起来，从 2 个表中获取数据：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT a.*, b.*</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactiondetails a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster b ON (a.itemnumber = b.itemnumber);</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transactionid | itemnumber | quantity | price | salesvalue | itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          1 |        1 |    89 |         89 |          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             1 |          2 |        2 |     5 |         10 |          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             2 |          1 |        2 |    89 |        178 |          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">|             3 |          2 |       10 |     5 |         50 |          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+------------+----------+-------+------------+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT a.*, b.*</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactiondetails a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster b ON (a.itemnumber = b.itemnumber);</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transactionid | itemnumber | quantity | price | salesvalue | itemnumber | barcode | goodsname | specifiction | unit | salesprice |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          1 |        1 |    89 |         89 |          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#24292e;">|             1 |          2 |        2 |     5 |         10 |          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#24292e;">|             2 |          1 |        2 |    89 |        178 |          1 | 0001    | 教科书 | 16开        | 本  |      89.00 |</span></span>
<span class="line"><span style="color:#24292e;">|             3 |          2 |       10 |     5 |         50 |          2 | 0002    | 笔       | 10支装     | 包  |       5.00 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+------------+----------+-------+------------+------------+---------+-----------+--------------+------+------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>查询的结果有点复杂，为了方便你理解，我对结果进行了分类，并加了注释，如下图所示：</p><img src="`+m+'"><p>第二步，把结果集按照商品名称分组，分组的示意图如下所示：</p><p>组 1：</p><img src="'+g+'"><p>组 2：</p><img src="'+E+'"><p>第三步，对分组后的数据集进行筛选，把组中字段“salesvalue”的最大值 &gt;50 的组筛选出来。筛选后的结果集如下所示：</p><img src="'+h+`"><p>第四步，返回商品名称。这时，我们就得到了需要的结果：单笔销售金额超过 50 元的商品就是“书”。</p><p>现在我们来简单小结下使用 HAVING 的查询过程。首先，我们要把所有的信息都准备好，包括从关联表中获取需要的信息，对数据集进行分组，形成一个包含所有需要的信息的数据集合。接着，再通过 HAVING 条件的筛选，得到需要的数据。</p><h3 id="正确的使用-where-和-having" tabindex="-1">正确的使用 WHERE 和 HAVING <a class="header-anchor" href="#正确的使用-where-和-having" aria-label="Permalink to &quot;正确的使用 WHERE 和 HAVING&quot;">​</a></h3><p>首先，你要知道它们的 2 个典型区别。</p><p>第一个区别是，如果需要通过连接从关联表中获取需要的数据，WHERE 是先筛选后连接，而 HAVING 是先连接后筛选。</p><p>这一点，就决定了在关联查询中，WHERE 比 HAVING 更高效。因为 WHERE 可以先筛选，用一个筛选后的较小数据集和关联表进行连接，这样占用的资源比较少，执行效率也就比较高。HAVING 则需要先把结果集准备好，也就是用未被筛选的数据集进行关联，然后对这个大的数据集进行筛选，这样占用的资源就比较多，执行效率也较低。</p><p>第二个区别是，WHERE 可以直接使用表中的字段作为筛选条件，但不能使用分组中的计算函数作为筛选条件；HAVING 必须要与 GROUP BY 配合使用，可以把分组计算的函数和分组字段作为筛选条件。</p><p>这决定了，在需要对数据进行分组统计的时候，HAVING 可以完成 WHERE 不能完成的任务。这是因为，在查询语法结构中，WHERE 在 GROUP BY 之前，所以无法对分组结果进行筛选。HAVING 在 GROUP BY 之后，可以使用分组字段和分组中的计算函数，对分组的结果集进行筛选，这个功能是 WHERE 无法完成的。</p><p>这么说你可能不太好理解，我来举个小例子。假如超市经营者提出，要查询一下是哪个收银员、在哪天卖了 2 单商品。这种必须先分组才能筛选的查询，用 WHERE 语句实现就比较难，我们可能要分好几步，通过把中间结果存储起来，才能搞定。但是用 HAVING，则很轻松，代码如下：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; HAVING COUNT(*) = 2;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | operatorname |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 | 张静       |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; HAVING COUNT(*) = 2;</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | operatorname |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 | 张静       |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>下面汇总了 WHERE 和 HAVING 各自的优缺点，如下图所示：</p><table><thead><tr><th></th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>WHERE</td><td>先筛选数据再关联，执行效率高</td><td>不能使用分组中的计算函数进行筛选</td></tr><tr><td>HAVING</td><td>可以使用分组中的计算函数</td><td>在最后的结果集中进行筛选，执行效率较低</td></tr></tbody></table><p>不过，需要注意的是，WHERE 和 HAVING 也不是互相排斥的，我们可以在一个查询里面同时使用 WHERE 和 HAVING。</p><p>假设现在我们有一组销售数据，包括交易时间、收银员、商品名称、销售数量、价格和销售金额等信息，超市的经营者要查询“2023-10-15”和“2023-10-16”这两天收银金额超过 100 元的销售日期、收银员名称、销售数量和销售金额。</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     d.goodsname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.quantity,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.price,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     b.salesvalue</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.goodsmaster as d ON (b.itemnumber = d.itemnumber);</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | operatorname | goodsname | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 | 张静       | 教科书 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-15 00:00:00 | 张静       | 笔       |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-16 00:00:00 | 李强       | 教科书 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-17 00:00:00 | 李强       | 笔       |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">4 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     d.goodsname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.quantity,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.price,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     b.salesvalue</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.goodsmaster as d ON (b.itemnumber = d.itemnumber);</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | operatorname | goodsname | quantity | price | salesvalue |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 | 张静       | 教科书 |        1 |    89 |         89 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-15 00:00:00 | 张静       | 笔       |        2 |     5 |         10 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-16 00:00:00 | 李强       | 教科书 |        2 |    89 |        178 |</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-17 00:00:00 | 李强       | 笔       |       10 |     5 |         50 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------+----------+-------+------------+</span></span>
<span class="line"><span style="color:#24292e;">4 rows in set (0.00 sec)</span></span></code></pre></div><p>我们来分析一下这个需求：由于是要按照销售日期和收银员进行统计，所以，必须按照销售日期和收银员进行分组，因此，我们可以通过使用 GROUP BY 和 HAVING 进行查询：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     operatorname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; HAVING</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate IN (&#39;2023-10-15&#39;, &#39;2023-10-16&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     AND SUM(b.salesvalue) &gt; 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | operatorname | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-16 00:00:00 | 李强       |               2 |               178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     operatorname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; HAVING</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate IN (&#39;2023-10-15&#39;, &#39;2023-10-16&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     AND SUM(b.salesvalue) &gt; 100;</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | operatorname | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-16 00:00:00 | 李强       |               2 |               178 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>如果你仔细看 HAVING 后面的筛选条件，就会发现，条件 <code>a.transdate IN (&#39;2020-12-10&#39; , &#39;2020-12-11&#39;)</code>，其实可以用 WHERE 来限定。我们把查询改一下试试：</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     )</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; WHERE</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate IN (&#39;2023-10-15&#39;, &#39;2023-10-16&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt;     operatorname</span></span>
<span class="line"><span style="color:#e1e4e8;">    -&gt; HAVING SUM(b.salesvalue) &gt; 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| transdate           | operatorname | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 2023-10-16 00:00:00 | 李强       |               2 |               178 |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">1 row in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; SELECT</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     c.operatorname,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.quantity),</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     SUM(b.salesvalue)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; FROM demo.transactionhead AS a</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.transactiondetails AS b ON (</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;         a.transactionid = b.transactionid</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     )</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     JOIN demo.operator AS c ON (a.operatorid = c.operatorid)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; WHERE</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate IN (&#39;2023-10-15&#39;, &#39;2023-10-16&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; GROUP BY</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     a.transdate,</span></span>
<span class="line"><span style="color:#24292e;">    -&gt;     operatorname</span></span>
<span class="line"><span style="color:#24292e;">    -&gt; HAVING SUM(b.salesvalue) &gt; 100;</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| transdate           | operatorname | SUM(b.quantity) | SUM(b.salesvalue) |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 2023-10-16 00:00:00 | 李强       |               2 |               178 |</span></span>
<span class="line"><span style="color:#24292e;">+---------------------+--------------+-----------------+-------------------+</span></span>
<span class="line"><span style="color:#24292e;">1 row in set (0.00 sec)</span></span></code></pre></div><p>很显然，我们同样得到了需要的结果。这是因为我们把条件拆分开，包含分组统计函数的条件用 HAVING，普通条件用 WHERE。这样，我们就既利用了 WHERE 条件的高效快速，又发挥了 HAVING 可以使用包含分组统计函数的查询条件的优点。当数据量特别大的时候，运行效率会有很大的差别。</p><h3 id="总结-6" tabindex="-1">总结 <a class="header-anchor" href="#总结-6" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天，我们介绍了条件语句 WHERE 和 HAVING 在 MySQL 中的执行原理。WHERE 可以先按照条件对数据进行筛选，然后进行数据连接，所以效率更高。HAVING 可以在分组之后，通过使用分组中的计算函数，实现 WHERE 难以完成的数据筛选。</p><p>了解了 WHERE 和 HAVING 各自的特点，我们就可以在查询中，充分利用它们的优势，更高效地实现我们的查询目标。</p><p>最后，我想提醒你的是，很多人刚开始学习 MySQL 的时候，不太喜欢用 HAVING，一提到条件语句，就想当然地用 WHERE。其实，HAVING 是非常有用的，特别是在做一些复杂的统计查询的时候，经常要用到分组，这个时候 HAVING 就派上用场了。</p><p>当然，你也可以不用 HAVING，而是把查询分成几步，把中间结果存起来，再用 WHERE 筛选，或者干脆把这部分筛选功能放在应用层面，用代码来实现。但是，这样做的效率很低，而且会增加工作量，加大维护成本。所以，学会使用 HAVING，对你完成复杂的查询任务非常有帮助。</p><h2 id="八、聚合函数" tabindex="-1">八、聚合函数 <a class="header-anchor" href="#八、聚合函数" aria-label="Permalink to &quot;八、聚合函数&quot;">​</a></h2>`,572),L=[b];function v(N,T,S,C,A,R){return n(),a("div",null,L)}const O=s(u,[["render",v]]);export{k as __pageData,O as default};
