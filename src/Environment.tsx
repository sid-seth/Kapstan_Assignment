import { useState, useEffect } from "react";
import { Button, Card } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DataItem {
  key: string;
  value: string;
}

const Env: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataList, setDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataList") || "[]") as DataItem[];
    setDataList(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(dataList));
  }, [dataList]);

  const addData = (newKey: string, newValue: string) => {
    setDataList([...dataList, { key: newKey, value: newValue }]);
  };

  const removeItem = (index: number) => {
    const updatedList = dataList.filter((_, i) => i !== index);
    setDataList(updatedList);
  };

  const RightPanel: React.FC = () => (
    <div>
      <button style={{ fontStyle: "none" }} onClick={() => setIsVisible(true)}>
        +
      </button>
      {isVisible && (
        <Card>
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50%",
              height: "100vh",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2>Right Side Panel</h2>
            <p>This panel takes up half of the screen.</p>
            <InputForm addData={addData} />
          </div>
        </Card>
      )}
    </div>
  );

  const ListComponent: React.FC<{ dataList: DataItem[]; removeItem: (index: number) => void }> = ({
    dataList,
    removeItem,
  }) => (
    <div>
      <h2>Saved Items</h2>
      <ul>
        {dataList.map((item, index) => (
          <div key={index}>
            <Card sx={{ width: "180px", padding: "10px", alignContent: "center", justifyContent: "center" }}>
              <strong style={{ color: "black" }}>{item.key}</strong>
              <strong>
                <span style={{ color: "black", paddingLeft: "50px" }}> {item.value}</span>
              </strong>
              <span style={{ fontSize: "14px", float: "right", cursor: "pointer" }} onClick={() => removeItem(index)}>
                <DeleteOutlineIcon />
              </span>
            </Card>
          </div>
        ))}
      </ul>
    </div>
  );

  const InputForm: React.FC<{ addData: (newKey: string, newValue: string) => void }> = ({ addData }) => {
    const [key, setKey] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!key.trim() || !value.trim()) return;

      addData(key, value);
      setKey("");
      setValue("");
    };

    return (
      <Card sx={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <span>Key</span>
          <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter key..." />
          <span style={{ paddingLeft: "30px" }}>Value</span>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value..." />
          <br />
          <div style={{ flexDirection: "row-reverse", display: "flex" }}>
            <Button type="submit">Submit</Button>
            <Button onClick={() => setIsVisible(false)}>Close</Button>
          </div>
        </form>
      </Card>
    );
  };

  return (
    <div>
      <Card sx={{ padding: "10px", margin: "10px", height: "400px" }}>
        <div className="pd-lf" style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <b>Environment variables</b>
            <br />
            No Environment variable created
            <ListComponent dataList={dataList} removeItem={removeItem} />
          </div>
          <div style={{ right: "15px", paddingLeft: "14px", position: "absolute" }}>
            <RightPanel />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Env;
