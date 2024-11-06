import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup/ListGroup";
import { useState } from "react";
function App() {
  let items = ["New York", "London", "Paris", "Tokyo", "Sydney"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertState, setAlertState] = useState(false);

  const onClose = () => {
    setAlertState(false);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      {alertState && <Alert onClose={() => onClose()}>Hello <span> alert!</span></Alert>}
      <Button color = "danger" onClick={() => setAlertState(true)}> My Button </Button>
    </div>
  );
}

export default App;
