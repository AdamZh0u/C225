import { useState } from "react";
import { MouseEvent } from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  $isactive: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.$isactive ? "blue" : "none" )};
`;

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  //   items = []; // 让 items 数组为空用于测试
  // Hook
  const [selectedIndex, setSelectedIndex] = useState(0);
  //   const [name, setName] = useState("")

  // event handler function
  const handleClick = (event: MouseEvent, item: string, index: number) => {
    setSelectedIndex(index);
    onSelectItem(item);
    console.log(event.target);
  };

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items to display.</p>}
      <List>
        {items.map((item, index) => (
          <ListItem
            key={item}
            $isactive={selectedIndex === index}
            onClick={(event) => handleClick(event, item, index)}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListGroup;
