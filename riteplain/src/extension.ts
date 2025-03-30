import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log('RitePlain extension is now active!')

  // ユーティリティ関数
  function isAtLineStart(
    editor: vscode.TextEditor,
    position: vscode.Position,
  ): boolean {
    return (
      position.character === 0 ||
      editor.document
        .getText(
          new vscode.Range(new vscode.Position(position.line, 0), position),
        )
        .trim() === ''
    )
  }

  // 選択範囲の前後に特定のテキストを挿入する関数
  function surroundSelection(
    editor: vscode.TextEditor,
    prefix: string,
    suffix: string,
  ) {
    const selection = editor.selection
    const text = editor.document.getText(selection)

    editor.edit(editBuilder => {
      editBuilder.replace(selection, prefix + text + suffix)
    })
  }

  // 行の先頭に特定のテキストを挿入する関数（行頭でない場合は改行してから挿入）
  function insertAtLineStart(editor: vscode.TextEditor, text: string) {
    const selection = editor.selection
    const position = selection.active

    editor.edit(editBuilder => {
      if (isAtLineStart(editor, position)) {
        editBuilder.insert(position, text)
      } else {
        editBuilder.insert(position, `\n${text}`)
      }
    })
  }

  // 見出しレベル1の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertHeading1', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      if (selection.isEmpty) {
        insertAtLineStart(editor, '# ')
      } else {
        const text = editor.document.getText(selection)
        editor.edit(editBuilder => {
          const lines = text.split('\n')
          const newLines = lines.map(line => {
            if (line.trim() === '') return line
            if (line.match(/^#{1,3}\s+/)) {
              return line.replace(/^#{1,3}\s+/, '# ')
            }
            return `# ${line}`
          })
          editBuilder.replace(selection, newLines.join('\n'))
        })
      }
    }),
  )

  // 見出しレベル2の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertHeading2', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      if (selection.isEmpty) {
        insertAtLineStart(editor, '## ')
      } else {
        const text = editor.document.getText(selection)
        editor.edit(editBuilder => {
          const lines = text.split('\n')
          const newLines = lines.map(line => {
            if (line.trim() === '') return line
            if (line.match(/^#{1,3}\s+/)) {
              return line.replace(/^#{1,3}\s+/, '## ')
            }
            return `## ${line}`
          })
          editBuilder.replace(selection, newLines.join('\n'))
        })
      }
    }),
  )

  // 見出しレベル3の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertHeading3', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      if (selection.isEmpty) {
        insertAtLineStart(editor, '### ')
      } else {
        const text = editor.document.getText(selection)
        editor.edit(editBuilder => {
          const lines = text.split('\n')
          const newLines = lines.map(line => {
            if (line.trim() === '') return line
            if (line.match(/^#{1,3}\s+/)) {
              return line.replace(/^#{1,3}\s+/, '### ')
            }
            return `### ${line}`
          })
          editBuilder.replace(selection, newLines.join('\n'))
        })
      }
    }),
  )

  // 太字の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertBold', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      if (selection.isEmpty) {
        editor
          .edit(editBuilder => {
            editBuilder.insert(selection.active, '[[]]')
          })
          .then(() => {
            const position = new vscode.Position(
              selection.active.line,
              selection.active.character + 2,
            )
            editor.selection = new vscode.Selection(position, position)
          })
      } else {
        const text = editor.document.getText(selection)
        const boldMatch = text.match(/^\[\[(.*)\]\]$/)

        if (boldMatch) {
          // すでに太字になっている場合、太字を解除
          editor.edit(editBuilder => {
            editBuilder.replace(selection, boldMatch[1])
          })
        } else {
          // 太字化
          editor.edit(editBuilder => {
            editBuilder.replace(selection, `[[${text}]]`)
          })
        }
      }
    }),
  )

  // 順序なしリストの挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertUnorderedList', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      if (selection.isEmpty) {
        insertAtLineStart(editor, '* ')
      } else {
        const text = editor.document.getText(selection)
        editor.edit(editBuilder => {
          const lines = text.split('\n')
          const newLines = lines.map(line => {
            if (line.trim() === '') return line
            const listMatch = line.match(/^(\s*)(\*+|\.+)(\s+)(.*)$/)

            if (listMatch) {
              // すでにリストの場合、*を追加または削除
              if (listMatch[2].startsWith('*')) {
                // *で始まるリストの場合、*を追加
                return `${listMatch[1]}*${listMatch[2]}${listMatch[3]}${listMatch[4]}`
              }
              return `${listMatch[1]}*${listMatch[3]}${listMatch[4]}`
            }
            return `* ${line}`
          })
          editBuilder.replace(selection, newLines.join('\n'))
        })
      }
    }),
  )

  // 順序付きリストの挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertOrderedList', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      if (selection.isEmpty) {
        insertAtLineStart(editor, '. ')
      } else {
        const text = editor.document.getText(selection)
        editor.edit(editBuilder => {
          const lines = text.split('\n')
          const newLines = lines.map(line => {
            if (line.trim() === '') return line
            const listMatch = line.match(/^(\s*)(\*+|\.+)(\s+)(.*)$/)

            if (listMatch) {
              // すでにリストの場合、.を追加または削除
              if (listMatch[2].startsWith('.')) {
                // .で始まるリストの場合、.を追加
                return `${listMatch[1]}.${listMatch[2]}${listMatch[3]}${listMatch[4]}`
              }
              return `${listMatch[1]}.${listMatch[3]}${listMatch[4]}`
            }
            return `. ${line}`
          })
          editBuilder.replace(selection, newLines.join('\n'))
        })
      }
    }),
  )

  // リンクの挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertLink', async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const text = editor.document.getText(selection)

      const url = await vscode.window.showInputBox({
        placeHolder: 'https://example.com',
        prompt: 'Enter URL',
        value: text.startsWith('http') ? text : 'https://',
      })

      if (!url) return

      const linkText = await vscode.window.showInputBox({
        placeHolder: 'Link text',
        prompt: 'Enter link text (optional)',
        value: text.startsWith('http') ? '' : text,
      })

      const position = selection.active
      const atLineStart = isAtLineStart(editor, position)

      editor.edit(editBuilder => {
        if (linkText) {
          const linkMarkup = `link:${url}[${linkText}]`
          if (atLineStart) {
            editBuilder.replace(selection, linkMarkup)
          } else {
            editBuilder.replace(selection, `\n${linkMarkup}`)
          }
        } else {
          const linkMarkup = `link:${url}`
          if (atLineStart) {
            editBuilder.replace(selection, linkMarkup)
          } else {
            editBuilder.replace(selection, `\n${linkMarkup}`)
          }
        }
      })
    }),
  )

  // 画像の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertImage', async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const slotNumber = await vscode.window.showInputBox({
        placeHolder: '1',
        prompt: 'Enter image slot number',
        validateInput: value => {
          return /^\d+$/.test(value) ? null : 'Please enter a valid number'
        },
      })

      if (!slotNumber) return

      const caption = await vscode.window.showInputBox({
        placeHolder: 'Caption',
        prompt: 'Enter image caption (optional)',
      })

      const position = editor.selection.active
      const atLineStart = isAtLineStart(editor, position)

      editor.edit(editBuilder => {
        let imageMarkup: string
        if (caption) {
          imageMarkup = `image::slot-${slotNumber}[${caption}]`
        } else {
          imageMarkup = `image::slot-${slotNumber}`
        }

        if (atLineStart) {
          editBuilder.insert(position, `${imageMarkup}\n`)
        } else {
          editBuilder.insert(position, `\n${imageMarkup}\n`)
        }
      })
    }),
  )

  // YouTube動画の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'riteplain.insertYoutubeVideo',
      async () => {
        const editor = vscode.window.activeTextEditor
        if (!editor) return

        const videoId = await vscode.window.showInputBox({
          placeHolder: 'dQw4w9WgXcQ',
          prompt: 'Enter YouTube video ID',
          validateInput: value => {
            return value.trim() !== '' ? null : 'Please enter a video ID'
          },
        })

        if (!videoId) return

        const videoCaption = await vscode.window.showInputBox({
          placeHolder: '動画キャプション（任意）',
          prompt: '動画のキャプションを入力（省略可）',
        })

        const position = editor.selection.active
        const atLineStart = isAtLineStart(editor, position)

        editor.edit(editBuilder => {
          let videoMarkup: string
          if (videoCaption) {
            videoMarkup = `video::youtube:${videoId}[${videoCaption}]`
          } else {
            videoMarkup = `video::youtube:${videoId}`
          }

          if (atLineStart) {
            editBuilder.insert(position, `${videoMarkup}\n`)
          } else {
            editBuilder.insert(position, `\n${videoMarkup}\n`)
          }
        })
      },
    ),
  )

  // 補足の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertSupplement', async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const text = editor.document.getText(selection)

      const supplementText = await vscode.window.showInputBox({
        placeHolder: 'Supplemental note',
        prompt: 'Enter supplement text',
        value: text,
      })

      if (!supplementText) return

      const position = selection.active
      const atLineStart = isAtLineStart(editor, position)

      editor.edit(editBuilder => {
        const supplementMarkup = `|${supplementText}`

        if (atLineStart) {
          editBuilder.replace(selection, supplementMarkup)
        } else {
          editBuilder.replace(selection, `\n${supplementMarkup}`)
        }
      })
    }),
  )

  // 水平線の挿入
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.insertHorizontalRule', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const position = editor.selection.active
      const atLineStart = isAtLineStart(editor, position)

      editor.edit(editBuilder => {
        if (atLineStart) {
          editBuilder.insert(position, '---\n')
        } else {
          editBuilder.insert(position, '\n---\n')
        }
      })
    }),
  )

  // リストレベルを増加
  context.subscriptions.push(
    vscode.commands.registerCommand('riteplain.increaseListLevel', () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const position = editor.selection.active
      const lineNumber = position.line
      const lineText = editor.document.lineAt(lineNumber).text
      
      // リスト行かどうかの判定
      const unorderedListMatch = lineText.match(/^(\s*)(\*+)(\s+)(.*)$/)
      const orderedListMatch = lineText.match(/^(\s*)(\.+)(\s+)(.*)$/)
      
      if (unorderedListMatch) {
        // 箇条書きリストの場合
        const indentation = unorderedListMatch[1]
        const listMarker = unorderedListMatch[2]
        const spacesAfter = unorderedListMatch[3]
        const content = unorderedListMatch[4]
        
        // *を一つ増やす
        const newListMarker = '*' + listMarker
        const newLine = `${indentation}${newListMarker}${spacesAfter}${content}`
        
        const range = new vscode.Range(
          new vscode.Position(lineNumber, 0),
          new vscode.Position(lineNumber, lineText.length)
        )
        
        editor.edit(editBuilder => {
          editBuilder.replace(range, newLine)
        })
      } else if (orderedListMatch) {
        // 連番リストの場合
        const indentation = orderedListMatch[1]
        const listMarker = orderedListMatch[2]
        const spacesAfter = orderedListMatch[3]
        const content = orderedListMatch[4]
        
        // .を一つ増やす
        const newListMarker = '.' + listMarker
        const newLine = `${indentation}${newListMarker}${spacesAfter}${content}`
        
        const range = new vscode.Range(
          new vscode.Position(lineNumber, 0),
          new vscode.Position(lineNumber, lineText.length)
        )
        
        editor.edit(editBuilder => {
          editBuilder.replace(range, newLine)
        })
      }
      // リスト行でない場合は何もしない
    }),
  )
}

export function deactivate() {}