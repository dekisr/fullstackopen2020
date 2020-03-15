![Exercise 0.6](https://i.imgur.com/ywvX8vl.png)
```
title Exercise 0.6
note over Browser
from spa.js:
- form.onsubmit()
- push new note to notes array
- reset input
- redrawNotes()
- send the new note to server
end note
Browser->Server:HTTP POST: .../new_note_spa
Server-->Browser: {"message":"note created"}
```