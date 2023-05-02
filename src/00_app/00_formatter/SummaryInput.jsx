import React, { useEffect } from "react";
import styled from "styled-components";

const summaryTexts = {
  // -------------------------------------------
  "プログラミング(修正)": `<概要>
プログラムの修正をして下さい。

<言語/フレームワーク>
・コードより判断

<修正/追加項目>
1.
2.

<エラーメッセージ>

<出力要件>
1.プログラムはコードブロックで出力してください。
2.各プログラムごとにコードブロックを分割して出力してください。
3.出力が多い場合は、重要なプログラム部分を優先して出力してください。

<出力>
###説明
説明文
###コード
コードブロックでプログラムを出力

<コード>
`,
  // -------------------------------------------
  "プログラミング(作成)": `<概要>
xxを行うプログラムの作成をして下さい。

<言語/フレームワーク>
・

<仕様>
1.
2.

<出力要件>
1.プログラムはコードブロックで出力してください。
2.各プログラムごとにコードブロックを分割して出力してください。
3.出力が多い場合は、重要なプログラム部分を優先して出力してください。

<出力>
###説明
説明文
###コード
コードブロックでプログラムを出力
`,
  // -------------------------------------------
  WEBデザイン: `<概要>
要件に沿ったデザインを作成してください。
<スタイル>
・
<カラー>
・背景:
・文字:
<フォント>
・
<デバイス>
・PC/スマートフォン
<その他>
1.
2.
<出力要件>
1.プログラムはコードブロックで出力してください。
2.各プログラムごとにコードブロックを分割して出力してください。
3.出力が多い場合は、CSS部分を優先して出力してください。

<出力>
###説明
説明文
###コード
コードブロックでプログラムを出力

<コード>
`,
  // -------------------------------------------
  数学: `<概要>
数学の問題について解説して下さい。

<問題>
・〇〇の解き方を教えて下さい。

<出力>
###解説
説明文を記載
###例題
例題を記載
###補足
補足を記載
###参考資料
参考資料があれば記載
`,
  // -------------------------------------------
  質問: `<概要>
・
<質問の背景>
・
<試したこと>
・〇〇で調べてみた/聞いてみた
<期待する回答>
・
`,
  // -------------------------------------------
  メール: `<概要>
メールのテンプレートを作成して下さい。
<内容>
・〇〇について
<送信相手との関係>
・
<スタイル>
・フォーマル/カジュアル
<フォーマット>
挨拶文
本文
結び
<出力>
・フォーマットの項目、コメントはメールの本文中に記載しない。
`,
  // -------------------------------------------
  レポート: `<概要>
〇〇についてレポートを作成して下さい。
<出力形式>
[タイトル]
[目次]
  1.
  2.
  3.
[本文]
  1. セクション
    ・
    ・
  2. セクション
    ・
    ・
[結論]
 ・
 ・
[参考文献]
 ・
`,
  // -------------------------------------------
  リサーチ: `<概要>
調査対象について調べたのち、文章にまとめて下さい。
<調査対象>
・〇〇について
<出力形式>
[結論]
・
・
[調査結果]
1. 結果
    ・
    ・
2. 結果
    ・
    ・
[分析・考察]
・
[参考資料]
・
`,
  // -------------------------------------------
  会話: `<シチュエーション>
・
・
<登場人物>
・
・
<会話>
A: 
B: 
A: 
B: 
A: 
B: 
`,
};

const SummaryInput = ({ value, onChange, selectedItem, setInputPrompt }) => {
  const template = summaryTexts[selectedItem];

  useEffect(() => {
    if (!value) {
      onChange({ target: { value: template } });
    }
  }, [selectedItem, value, onChange, template]);

  const handleInputChange = (e) => {
    onChange(e);
    setInputPrompt(e.target.value);
  };

  return (
    <ItemContainer>
      <div>
        <label>プロンプト:</label>
      </div>
      <TextBox type="text" value={value} onChange={handleInputChange} />
    </ItemContainer>
  );
};

export default SummaryInput;

const ItemContainer = styled.div`
  margin-bottom: 1rem;
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 1rem;
  border: none;
  background-color: rgb(40, 40, 40);
  color: rgb(210, 210, 210);
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px 3px #4f4f4f;
  }
`;
