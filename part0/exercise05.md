![Exercise 0.5](https://i.imgur.com/QWox5Bm.png)
```
title Exercise 0.5
Browser->Server:HTTP GET: .../spa
Server-->Browser: HTML
Browser->Server:HTTP GET: .../main.css
Server-->Browser: main.css
Browser->Server:HTTP GET: .../spa.js
Server-->Browser: spa.js
note left of Browser
from spa.js:
end note
Browser->Server:HTTP GET: .../data.json
Server-->Browser: [{...},...]
```