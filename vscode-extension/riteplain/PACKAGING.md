# RitePlain VS Code Extension Packaging Guide

このファイルでは、RitePlain VS Code拡張機能を開発、デバッグ、およびパッケージ化する方法について説明します。

## 開発環境のセットアップ

必要な依存関係をインストールします。

```bash
cd vscode-extension/riteplain
npm install
```

## 拡張機能のビルド

拡張機能をビルドするには、以下のコマンドを実行します。

```bash
npm run compile
```

変更を監視して自動的に再コンパイルするには、以下のコマンドを使用します。

```bash
npm run watch
```

## デバッグ

VS Codeでフォルダを開いて、F5キーを押すと、拡張機能が読み込まれた新しいVS Codeウィンドウが起動します。このウィンドウで拡張機能をテストできます。

## パッケージング

リリース用にVSIXパッケージを作成するには、Visual Studio Code Extension Managerをインストールして使用します。

```bash
# VS Code Extensionsパッケージャーをインストール
npm install -g @vscode/vsce

# パッケージを作成
vsce package
```

このコマンドは、拡張機能のルートディレクトリに`.vsix`ファイルを生成します。

## インストール

生成された`.vsix`ファイルをVS Codeにインストールするには、以下の方法があります。

1. VS Codeの拡張機能ビューを開く
2. ビューの右上にある「...」メニューをクリック
3. 「VSIXからインストール...」を選択
4. 生成した`.vsix`ファイルを選択

## リリース

拡張機能をVS Code Marketplaceに公開するには：

1. [VS Code Marketplace](https://marketplace.visualstudio.com/vscode)にパブリッシャーとして登録します。
2. Personal Access Token（PAT）を取得します。
3. 次のコマンドを使用して拡張機能を公開します。

```bash
vsce publish -p <your_PAT>
```

## アイコンの更新

`icon.png`ファイルを拡張機能に含めることで、カスタムアイコンを設定できます。アイコンは128x128ピクセル以上のPNG形式が推奨されています。