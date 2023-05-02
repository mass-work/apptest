import React from "react";
import styled from "styled-components";

const item_list = [
  "プログラミング(修正)",
  "プログラミング(作成)",
  "WEBデザイン",
  "リサーチ",
  "数学",
  "質問",
  "メール",
  "レポート",
  "会話",
];

const ItemSelect = ({ value, onChange }) => {
  return (
    <ItemContainer>
      <div>
        <label>テンプレート:</label>
      </div>
      <SelectContainer value={value} onChange={onChange}>
        {item_list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </SelectContainer>
    </ItemContainer>
  );
};
export default ItemSelect;
const ItemContainer = styled.div`
  margin-bottom: 1rem;
`;

const SelectContainer = styled.select`
  font-size: 1rem;
  padding: 0.4rem;
  border: none;
  background-color: rgb(40, 40, 40);
  color: rgb(210, 210, 210);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(60, 60, 60);
  }
`;
