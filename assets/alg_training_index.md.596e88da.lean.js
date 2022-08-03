import{_ as n,c as a,o as l,a as p}from"./app.b84dd37e.js";var o="/notes/assets/outline.f2cee2b7.png",t="/notes/assets/big_O_chart.d34df809.png",e="/notes/assets/fib.12d57532.png",c="/notes/assets/master_theorem.1d70d3bf.png",s="/notes/assets/structure_operations.29668a57.png",r="/notes/assets/tree.7f05ec9f.png",y="/notes/assets/binary_search_tree.2ec2fd62.png",F="/notes/assets/trie.0f23c585.png",D="/notes/assets/trie_struct.376f9a96.png",i="/notes/assets/disjoint_set.53f4c6c6.png",C="/notes/assets/disjoint_set2.eff380e0.png",A="/notes/assets/disjoint_set3.7b6a348c.png",f="/notes/assets/bloom_filter.fceb853b.png",d="/notes/assets/LRU_Cache.00142e46.png",E="/notes/assets/sort.29fc28d7.png",u="/notes/assets/sort_compare.bf29140b.png";const q=JSON.parse('{"title":"\u7B97\u6CD5\u8BAD\u7EC3\u8425","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6982\u8FF0","slug":"\u6982\u8FF0"},{"level":3,"title":"\u5B66\u4E60\u65B9\u6CD5","slug":"\u5B66\u4E60\u65B9\u6CD5"},{"level":3,"title":"\u4E94\u6B65\u5237\u9898\u6CD5","slug":"\u4E94\u6B65\u5237\u9898\u6CD5"},{"level":3,"title":"\u73AF\u5883\u914D\u7F6E","slug":"\u73AF\u5883\u914D\u7F6E"},{"level":2,"title":"\u65F6\u95F4\u590D\u6742\u5EA6\u548C\u7A7A\u95F4\u590D\u6742\u5EA6","slug":"\u65F6\u95F4\u590D\u6742\u5EA6\u548C\u7A7A\u95F4\u590D\u6742\u5EA6"},{"level":3,"title":"Big O notation","slug":"big-o-notation"},{"level":3,"title":"Master Theorem","slug":"master-theorem"},{"level":3,"title":"\u7A7A\u95F4\u590D\u6742\u5EA6","slug":"\u7A7A\u95F4\u590D\u6742\u5EA6"},{"level":2,"title":"\u6570\u7EC4\u3001\u94FE\u8868\u3001\u8DF3\u8868","slug":"\u6570\u7EC4\u3001\u94FE\u8868\u3001\u8DF3\u8868"},{"level":3,"title":"\u6570\u7EC4 ArrayList","slug":"\u6570\u7EC4-arraylist"},{"level":3,"title":"\u94FE\u8868 LinkedList","slug":"\u94FE\u8868-linkedlist"},{"level":3,"title":"\u8DF3\u8868 Skip List","slug":"\u8DF3\u8868-skip-list"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE"},{"level":2,"title":"\u6808\u3001\u961F\u5217","slug":"\u6808\u3001\u961F\u5217"},{"level":2,"title":"\u54C8\u5E0C\u8868\u3001\u6620\u5C04\u3001\u96C6\u5408","slug":"\u54C8\u5E0C\u8868\u3001\u6620\u5C04\u3001\u96C6\u5408"},{"level":2,"title":"\u6811\u3001\u4E8C\u53C9\u6811\u3001\u4E8C\u53C9\u641C\u7D22\u6811","slug":"\u6811\u3001\u4E8C\u53C9\u6811\u3001\u4E8C\u53C9\u641C\u7D22\u6811"},{"level":2,"title":"\u5806\u3001\u4E8C\u53C9\u5806","slug":"\u5806\u3001\u4E8C\u53C9\u5806"},{"level":3,"title":"\u5B9A\u4E49","slug":"\u5B9A\u4E49"},{"level":3,"title":"\u4E8C\u53C9\u5806\u6027\u8D28","slug":"\u4E8C\u53C9\u5806\u6027\u8D28"},{"level":3,"title":"\u4E8C\u53C9\u5806\u5B9E\u73B0\u7EC6\u8282","slug":"\u4E8C\u53C9\u5806\u5B9E\u73B0\u7EC6\u8282"},{"level":3,"title":"\u4EE3\u7801\u5B9E\u73B0","slug":"\u4EE3\u7801\u5B9E\u73B0"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-1"},{"level":2,"title":"\u56FE\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u56FE\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":2,"title":"\u9012\u5F52\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u9012\u5F52\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":2,"title":"\u5206\u6CBB\u3001\u56DE\u6EAF\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u5206\u6CBB\u3001\u56DE\u6EAF\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":3,"title":"\u5206\u6CBB Divide & Conquer","slug":"\u5206\u6CBB-divide-conquer"},{"level":3,"title":"\u56DE\u6EAF Backtracking","slug":"\u56DE\u6EAF-backtracking"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-2"},{"level":2,"title":"\u6DF1\u5EA6/\u5E7F\u5EA6 \u4F18\u5148\u641C\u7D22\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u6DF1\u5EA6-\u5E7F\u5EA6-\u4F18\u5148\u641C\u7D22\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":3,"title":"\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22","slug":"\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22"},{"level":3,"title":"\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22","slug":"\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-3"},{"level":2,"title":"\u8D2A\u5FC3\u7B97\u6CD5\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u8D2A\u5FC3\u7B97\u6CD5\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":2,"title":"\u4E8C\u5206\u67E5\u627E\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u4E8C\u5206\u67E5\u627E\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":2,"title":"\u52A8\u6001\u89C4\u5212\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u52A8\u6001\u89C4\u5212\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":3,"title":"\u9012\u5F52\u548C\u5206\u6CBB","slug":"\u9012\u5F52\u548C\u5206\u6CBB"},{"level":3,"title":"\u52A8\u6001\u89C4\u5212","slug":"\u52A8\u6001\u89C4\u5212"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-4"},{"level":2,"title":"Trie \u6811\u7684\u57FA\u672C\u5B9E\u73B0\u548C\u7279\u6027","slug":"trie-\u6811\u7684\u57FA\u672C\u5B9E\u73B0\u548C\u7279\u6027"},{"level":3,"title":"\u6811\u548C\u4E8C\u53C9\u641C\u7D22\u6811","slug":"\u6811\u548C\u4E8C\u53C9\u641C\u7D22\u6811"},{"level":3,"title":"Trie \u6811","slug":"trie-\u6811"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-5"},{"level":2,"title":"\u5E76\u67E5\u96C6\u7684\u57FA\u672C\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u5E76\u67E5\u96C6\u7684\u57FA\u672C\u5B9E\u73B0\u548C\u7279\u6027"},{"level":3,"title":"\u57FA\u672C\u64CD\u4F5C","slug":"\u57FA\u672C\u64CD\u4F5C"},{"level":3,"title":"\u5E76\u67E5\u96C6\u7ED3\u6784","slug":"\u5E76\u67E5\u96C6\u7ED3\u6784"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-6"},{"level":2,"title":"\u526A\u679D\u7684\u5B9E\u73B0\u548C\u7279\u6027","slug":"\u526A\u679D\u7684\u5B9E\u73B0\u548C\u7279\u6027"},{"level":3,"title":"\u521D\u7EA7\u641C\u7D22","slug":"\u521D\u7EA7\u641C\u7D22"},{"level":3,"title":"\u526A\u679D","slug":"\u526A\u679D"},{"level":3,"title":"\u56DE\u6EAF\u6CD5","slug":"\u56DE\u6EAF\u6CD5"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-7"},{"level":2,"title":"\u4F4D\u8FD0\u7B97","slug":"\u4F4D\u8FD0\u7B97"},{"level":3,"title":"\u4E3A\u4EC0\u4E48\u9700\u8981\u4F4D\u8FD0\u7B97","slug":"\u4E3A\u4EC0\u4E48\u9700\u8981\u4F4D\u8FD0\u7B97"},{"level":3,"title":"\u4F4D\u8FD0\u7B97\u7B26","slug":"\u4F4D\u8FD0\u7B97\u7B26"},{"level":3,"title":"\u5F02\u6216","slug":"\u5F02\u6216"},{"level":3,"title":"\u6307\u5B9A\u4F4D\u7F6E\u7684\u4F4D\u8FD0\u7B97","slug":"\u6307\u5B9A\u4F4D\u7F6E\u7684\u4F4D\u8FD0\u7B97"},{"level":3,"title":"\u4F4D\u8FD0\u7B97\u8981\u70B9","slug":"\u4F4D\u8FD0\u7B97\u8981\u70B9"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-8"},{"level":2,"title":"\u5E03\u9686\u8FC7\u6EE4\u5668\u3001LRU Cache","slug":"\u5E03\u9686\u8FC7\u6EE4\u5668\u3001lru-cache"},{"level":3,"title":"\u5E03\u9686\u8FC7\u6EE4\u5668\uFF08Bloom Filter\uFF09","slug":"\u5E03\u9686\u8FC7\u6EE4\u5668\uFF08bloom-filter\uFF09"},{"level":3,"title":"LRU Cache","slug":"lru-cache"},{"level":2,"title":"\u6392\u5E8F\u7B97\u6CD5","slug":"\u6392\u5E8F\u7B97\u6CD5"},{"level":3,"title":"\u6392\u5E8F\u7B97\u6CD5\u5206\u7C7B","slug":"\u6392\u5E8F\u7B97\u6CD5\u5206\u7C7B"},{"level":3,"title":"\u521D\u7EA7\u6392\u5E8F O(n^2)","slug":"\u521D\u7EA7\u6392\u5E8F-o-n-2"},{"level":3,"title":"\u9AD8\u7EA7\u6392\u5E8F O(N*LogN)","slug":"\u9AD8\u7EA7\u6392\u5E8F-o-n-logn"},{"level":3,"title":"\u7279\u6B8A\u6392\u5E8F O(n)","slug":"\u7279\u6B8A\u6392\u5E8F-o-n"},{"level":3,"title":"\u76F8\u5173\u9898\u76EE","slug":"\u76F8\u5173\u9898\u76EE-10"},{"level":2,"title":"\u5B57\u7B26\u4E32\u7B97\u6CD5","slug":"\u5B57\u7B26\u4E32\u7B97\u6CD5"},{"level":3,"title":"\u57FA\u7840\u5B57\u7B26\u4E32\u7B97\u6CD5","slug":"\u57FA\u7840\u5B57\u7B26\u4E32\u7B97\u6CD5"},{"level":3,"title":"\u9AD8\u7EA7\u5B57\u7B26\u4E32\u7B97\u6CD5","slug":"\u9AD8\u7EA7\u5B57\u7B26\u4E32\u7B97\u6CD5"},{"level":3,"title":"\u5B57\u7B26\u4E32\u5339\u914D\u7B97\u6CD5","slug":"\u5B57\u7B26\u4E32\u5339\u914D\u7B97\u6CD5"}],"relativePath":"alg/training/index.md"}'),h={name:"alg/training/index.md"},m=p("",707),g=[m];function b(v,B,k,x,j,w){return l(),a("div",null,g)}var S=n(h,[["render",b]]);export{q as __pageData,S as default};
