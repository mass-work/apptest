import React, { useState } from 'react';
import styled from "styled-components";

const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfUse, setShowTermsOfUse] = useState(false);

  const handlePrivacyPolicy = () => {
    setShowPrivacyPolicy(true);
  };

  const handleTermsOfUse = () => {
    setShowTermsOfUse(true);
  };

  return (
    <FooterContainer>
      <PrivacyPolicy onClick={handlePrivacyPolicy}>プライバシーポリシー</PrivacyPolicy>
      <TermsOfUse onClick={handleTermsOfUse}>利用規約</TermsOfUse>
      <CopyrightContainer>
        Copyright © 2023 mass
      </CopyrightContainer>
      {showPrivacyPolicy && (
        <Modal>
          <ModalTitle></ModalTitle>
          <ModalContent>
          <h2>プライバシーポリシー</h2>
          <h3>個人情報の取り扱い</h3>
                <p>本アプリケーションでは、ユーザーがアップロードしたデータは一切データベースに保存されません。</p>
                <p>処理が完了した後、アプリケーションはアップロードされたデータを破棄します。</p>
            <h3>Cookie（クッキー）の利用</h3>
                <p>本アプリケーションでは、ユーザーの利便性向上やアクセス解析のために、Cookie（クッキー）を使用する場合があります。</p>
                <p>ユーザーはブラウザの設定により、Cookie（クッキー）を無効にすることができます。</p>
                <p>ただし、Cookie（クッキー）を無効にした場合、本アプリケーションの一部の機能が正常に動作しない可能性があります。</p>
            <h3>アクセス解析</h3>
                <p>本アプリケーションでは、サイトの利便性向上やサービスの改善のために、Googleが提供している「Googleアナリティクス」を利用しています。</p>
                <p>このサービスは、トラフィックデータの収集のためにCookie（クッキー）を使用しています。トラフィックデータは匿名で収集されています。</p>
            <CloseButton onClick={() => setShowPrivacyPolicy(false)}>閉じる</CloseButton>
          </ModalContent>

        </Modal>
      )}
      {showTermsOfUse && (
        <Modal>
          <ModalTitle></ModalTitle>
          <ModalContent>
            <h2>利用規約</h2>
            <h3>1.利用規約への同意</h3>
                <p>ユーザーは、本アプリケーションを使用することにより、本利用規約に同意したものとみなされます。</p>
            <h3>1.テキストデータの利用</h3>
                <p>ユーザーは、本アプリケーションで生成されたテキストデータを自由にコピーして利用できます。</p>
                <p>アプリケーション自体の複製は使用しているライブラリに準じます。</p>
                <p>詳細はライセンスを確認して下さい。</p>
            <h3>3.違法なコンテンツのアップロードの禁止</h3>
                <p>本アプリケーションは、テキストファイル、PDFファイル、画像ファイルのアップロードを受け付けますが</p>
                <p>違法なコンテンツや他人の著作権を侵害するコンテンツのアップロードは禁止します。</p>
            <h3>4.免責事項</h3>
                <p>本アプリケーションの提供者は、アプリケーションの利用によって生じたいかなる損害についても一切の責任を負いません。</p> 
                <p>ユーザーは自己責任で本アプリケーションを使用するものとします。</p>
            <h3>5.利用規約の変更</h3>
                <p>本利用規約は、予告なく変更されることがあります。</p>
                <p>変更後の利用規約は、本アプリケーションに掲載された時点で効力を生じます。ユーザーは定期的に本利用規約を確認することが推奨されます。</p>
            <h3>6.知的財産権</h3>
                <p>本アプリケーションおよびそのコンテンツに関する知的財産権は、本アプリケーションの提供者または第三者に帰属します。</p>
                <p>ユーザーは、本アプリケーションを利用することにより、これらの知的財産権を侵害する行為を行ってはなりません。</p>
            <CloseButton onClick={() => setShowTermsOfUse(false)}>閉じる</CloseButton>
          </ModalContent>
          
        </Modal>
      )}
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  text-align: center;
  background-color: rgb(60, 60, 60);
  margin: 0% 0% -100% 0%;
  padding: 0% 0% 100% 0%;
`;

const PrivacyPolicy = styled.button`
  color: rgb(210, 210, 210);
  text-decoration: none;
  font-size: 0.8rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const TermsOfUse = styled.button`
  color: rgb(210, 210, 210);;
  text-decoration: none;
  font-size: 0.8rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ModalContent = styled.div`
background-color: rgb(40, 40, 40);
text-align: left;
  font-size: 1rem;
  line-height: 1;
  margin: 1rem;
  padding: 2%;
  border-radius: 20px;
`;

const CloseButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem
`
const CopyrightContainer = styled.div`
    
`