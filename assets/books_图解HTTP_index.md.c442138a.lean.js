import{_ as a,c as e,o as s,a as p}from"./app.fe64fb30.js";var n="/assets/tcp_ip.177a82fe.png",l="/assets/tcp_ip_02.6c81a871.png",t="/assets/tcp_ip_03.8adba650.png",r="/assets/three_wayhandshaking.9851d61a.png",o="/assets/dns.37dbeeaf.png",i="/assets/protocol.4b35067c.png",c="/assets/uri.aaf42814.png",h="/assets/req_res.6dc04f3c.png",d="/assets/req.2b626498.png",T="/assets/res.2ebe6f34.png";const H=JSON.parse('{"title":"\u56FE\u89E3 HTTP","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E00\u3001Web \u53CA\u7F51\u7EDC\u57FA\u7840","slug":"\u4E00\u3001web-\u53CA\u7F51\u7EDC\u57FA\u7840"},{"level":3,"title":"1. HTTP \u4E0E Web","slug":"_1-http-\u4E0E-web"},{"level":3,"title":"2. HTTP \u8BDE\u751F","slug":"_2-http-\u8BDE\u751F"},{"level":3,"title":"3. TCP/IP \u57FA\u7840","slug":"_3-tcp-ip-\u57FA\u7840"},{"level":3,"title":"4. IP\u3001TCP \u548C DNS","slug":"_4-ip\u3001tcp-\u548C-dns"},{"level":3,"title":"5. \u5404\u79CD\u534F\u8BAE\u4E0E HTTP \u534F\u8BAE\u7684\u5173\u7CFB","slug":"_5-\u5404\u79CD\u534F\u8BAE\u4E0E-http-\u534F\u8BAE\u7684\u5173\u7CFB"},{"level":3,"title":"6. URI \u548C URL","slug":"_6-uri-\u548C-url"},{"level":2,"title":"\u4E8C\u3001\u7B80\u5355\u7684 HTTP \u534F\u8BAE","slug":"\u4E8C\u3001\u7B80\u5355\u7684-http-\u534F\u8BAE"},{"level":3,"title":"\u5BA2\u6237\u7AEF/\u670D\u52A1\u7AEF\u901A\u4FE1","slug":"\u5BA2\u6237\u7AEF-\u670D\u52A1\u7AEF\u901A\u4FE1"},{"level":3,"title":"\u901A\u8FC7\u8BF7\u6C42\u548C\u54CD\u5E94\u7684\u4EA4\u6362\u8FBE\u6210\u901A\u4FE1","slug":"\u901A\u8FC7\u8BF7\u6C42\u548C\u54CD\u5E94\u7684\u4EA4\u6362\u8FBE\u6210\u901A\u4FE1"},{"level":3,"title":"URI \u5B9A\u4F4D\u8D44\u6E90","slug":"uri-\u5B9A\u4F4D\u8D44\u6E90"},{"level":3,"title":"HTTP \u65E0\u72B6\u6001\u534F\u8BAE","slug":"http-\u65E0\u72B6\u6001\u534F\u8BAE"},{"level":3,"title":"HTTP \u65B9\u6CD5","slug":"http-\u65B9\u6CD5"},{"level":3,"title":"HTTP1.0\u3001HTTP1.1 \u65B9\u6CD5\u5BF9\u6BD4","slug":"http1-0\u3001http1-1-\u65B9\u6CD5\u5BF9\u6BD4"},{"level":3,"title":"\u6301\u4E45\u8FDE\u63A5\u8282\u7701\u901A\u4FE1\u91CF","slug":"\u6301\u4E45\u8FDE\u63A5\u8282\u7701\u901A\u4FE1\u91CF"},{"level":3,"title":"Cookie \u72B6\u6001\u7BA1\u7406","slug":"cookie-\u72B6\u6001\u7BA1\u7406"},{"level":2,"title":"\u4E09\u3001HTTP \u62A5\u6587\u4FE1\u606F","slug":"\u4E09\u3001http-\u62A5\u6587\u4FE1\u606F"},{"level":3,"title":"HTTP \u62A5\u6587","slug":"http-\u62A5\u6587"},{"level":3,"title":"\u8BF7\u6C42\u62A5\u6587\u53CA\u54CD\u5E94\u62A5\u6587\u7684\u7ED3\u6784","slug":"\u8BF7\u6C42\u62A5\u6587\u53CA\u54CD\u5E94\u62A5\u6587\u7684\u7ED3\u6784"},{"level":3,"title":"\u7F16\u7801\u63D0\u5347\u4F20\u8F93\u901F\u7387","slug":"\u7F16\u7801\u63D0\u5347\u4F20\u8F93\u901F\u7387"},{"level":3,"title":"\u53D1\u9001\u591A\u79CD\u6570\u636E\u7684\u591A\u90E8\u5206\u5BF9\u8C61\u96C6\u5408","slug":"\u53D1\u9001\u591A\u79CD\u6570\u636E\u7684\u591A\u90E8\u5206\u5BF9\u8C61\u96C6\u5408"},{"level":3,"title":"\u8303\u56F4\u8BF7\u6C42\u83B7\u53D6\u90E8\u5206\u5185\u5BB9","slug":"\u8303\u56F4\u8BF7\u6C42\u83B7\u53D6\u90E8\u5206\u5185\u5BB9"},{"level":3,"title":"\u5185\u5BB9\u534F\u5546\u8FD4\u56DE\u6700\u5408\u9002\u5185\u5BB9","slug":"\u5185\u5BB9\u534F\u5546\u8FD4\u56DE\u6700\u5408\u9002\u5185\u5BB9"},{"level":2,"title":"\u56DB\u3001HTTP \u72B6\u6001\u7801","slug":"\u56DB\u3001http-\u72B6\u6001\u7801"},{"level":3,"title":"\u54CD\u5E94\u7C7B\u522B","slug":"\u54CD\u5E94\u7C7B\u522B"},{"level":3,"title":"2xx \u6210\u529F","slug":"_2xx-\u6210\u529F"},{"level":3,"title":"3XX \u91CD\u5B9A\u5411","slug":"_3xx-\u91CD\u5B9A\u5411"},{"level":3,"title":"4XX \u5BA2\u6237\u7AEF\u9519\u8BEF","slug":"_4xx-\u5BA2\u6237\u7AEF\u9519\u8BEF"},{"level":3,"title":"5XX \u670D\u52A1\u5668\u9519\u8BEF","slug":"_5xx-\u670D\u52A1\u5668\u9519\u8BEF"},{"level":2,"title":"\u4E94\u3001\u4E0E HTTP \u534F\u4F5C\u7684 Web \u670D\u52A1\u5668","slug":"\u4E94\u3001\u4E0E-http-\u534F\u4F5C\u7684-web-\u670D\u52A1\u5668"},{"level":3,"title":"\u5355\u53F0\u865A\u62DF\u4E3B\u673A\u5B9E\u73B0\u591A\u4E2A\u57DF\u540D","slug":"\u5355\u53F0\u865A\u62DF\u4E3B\u673A\u5B9E\u73B0\u591A\u4E2A\u57DF\u540D"},{"level":3,"title":"\u901A\u4FE1\u6570\u636E\u8F6C\u53D1\u7A0B\u5E8F","slug":"\u901A\u4FE1\u6570\u636E\u8F6C\u53D1\u7A0B\u5E8F"},{"level":3,"title":"\u4FDD\u5B58\u8D44\u6E90\u7684\u7F13\u5B58","slug":"\u4FDD\u5B58\u8D44\u6E90\u7684\u7F13\u5B58"},{"level":2,"title":"\u516D\u3001HTTP \u9996\u90E8","slug":"\u516D\u3001http-\u9996\u90E8"},{"level":3,"title":"1. HTTP \u62A5\u6587\u9996\u90E8","slug":"_1-http-\u62A5\u6587\u9996\u90E8"},{"level":3,"title":"2. HTTP \u9996\u90E8\u5B57\u6BB5","slug":"_2-http-\u9996\u90E8\u5B57\u6BB5"},{"level":3,"title":"3. HTTP/1.1 \u901A\u7528\u9996\u90E8\u5B57\u6BB5","slug":"_3-http-1-1-\u901A\u7528\u9996\u90E8\u5B57\u6BB5"}],"relativePath":"books/\u56FE\u89E3HTTP/index.md"}'),C={name:"books/\u56FE\u89E3HTTP/index.md"},y=p("",471),u=[y];function D(P,A,b,F,g,m){return s(),e("div",null,u)}var f=a(C,[["render",D]]);export{H as __pageData,f as default};
