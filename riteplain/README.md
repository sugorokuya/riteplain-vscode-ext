# RitePlain Extension for VS Code

RitePlain markup language support for Visual Studio Code.

## Features

- Syntax highlighting for RitePlain markup
- Snippets for common RitePlain elements
- Commands for inserting RitePlain syntax elements
- Keyboard shortcuts for common operations

## Syntax Elements

### Headings

```
# Heading Level 1
## Heading Level 2
### Heading Level 3
```

### Bold Text

```
[[Bold Text]]
```

### Lists

Unordered list (bullet points):

```
* Item 1
* Item 2
** Nested Item
```

Ordered list (numbered):

```
. Item 1
. Item 2
.. Nested Item
```

### Links

```
link:https://example.com
link:https://example.com[Link Text]
```

### Images

```
image::slot-1
image::slot-1[Caption]
image::slot-1[Caption, size=small]
```

### YouTube Videos

```
video::VIDEO_ID[youtube]
```

### Supplements (Notes)

```
|This is a supplemental note.
```

### Horizontal Rule

```
---
```

## Keyboard Shortcuts

- `Cmd+1` / `Ctrl+1`: Insert Heading 1
- `Cmd+2` / `Ctrl+2`: Insert Heading 2
- `Cmd+3` / `Ctrl+3`: Insert Heading 3
- `Cmd+B` / `Ctrl+B`: Insert Bold
- `Cmd+Shift+U` / `Ctrl+Shift+U`: Insert Unordered List
- `Cmd+K` / `Ctrl+K`: Insert Link

## Requirements

- VS Code 1.60.0 or higher

## Extension Settings

This extension contributes the following settings:

* `riteplain.enableFormatting`: Enable/disable auto-formatting for RitePlain files

## Release Notes

### 0.1.0

Initial release of RitePlain extension.
