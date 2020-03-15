![Exercise 0.4](https://i.imgur.com/8iRxWBl.png)
```
title Exercise 0.4
Browser->Server:HTTP POST: .../new_notes
Server-->Browser: 302 Status Code / Redirect location (/notes)
Browser->Server:HTTP GET: .../notes
Server-->Browser: HTML
Browser->Server:HTTP GET: .../main.css
Server-->Browser: main.css
Browser->Server:HTTP GET: .../main.js
Server-->Browser: main.js
note left of Browser
from main.js:
end note
Browser->Server:HTTP GET: .../data.json
Server-->Browser: [{...},...]
```