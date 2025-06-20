
import React, { useState, useEffect } from "react";
import { Grid,Button, Card } from "@mui/material";

import "./style1.css";
import MemoryChart from "./memory"

import MyChart from "./MyChart";


interface MainContent {
  item: Application;
}
interface MidCardLeft {
  item1: CpuUtil;
  item2: MemoryUtil;
}
interface Application {
  id: number;
  name: string;
  status: string;
  version: number;
  updatedAt: number;
  desiredVersion: number;
}
interface CpuUtil {
  id: number;
  timestamp: string
  applicationId: string;
  cpuUtilization: string;
}
interface MemoryUtil {
  id: number;
  timestamp: string
  applicationId: string;
  cpuUtilization: string;
}


type MidCardLeftProps = {
  itemId: number;
};

interface DynamicContentGridProps {
  selectedItem?: Application;
}

const DynamicContentGrid: React.FC<DynamicContentGridProps> = ({ selectedItem }) => {
   return (
    <>
      <Grid sx={{paddingLeft:"15px",paddingRight:"20px"}} >

        <Card sx={{ Padding: "10px", margin: "10px", height: "150px" }}>
          <div className="pd-lf" style={{ display: "flex", flexDirection: "row" }}>
            <div>
              Servicer Info
            </div>
            <div style={{ right: "15px", paddingLeft: "14px", position: "absolute",paddingRight:"20px" }}>
              <select name="drop_down" id="1" style={{
                height: "21px",
                border: " none"
              }}></select>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>

            <div >
              <div className="pd-lf">
                some current
              </div>
              <div className="pd-lf">
                {/* {item.version} */}
                {selectedItem?.version}
              </div>


            </div>
            <div style={{ paddingLeft: "154px", position: "absolute" }}>
              <div>
                desired version

              </div>
              <div>
                {/* {item.desiredVersion} */}
                {selectedItem?.desiredVersion}
              </div>
            </div>
          </div>
          <br></br>
          <div style={{ display: "flex", flexDirection: "row", bottom: "0" }}>

            <div style={{ marginLeft: "20px", paddingLeft: "0" }}>
              <Button variant="contained" color="success"> Deploy</Button>
            </div>
            <div style={{ right: "15px",paddingRight:"30px", paddingLeft: "14px", position: "absolute" }}>
              last update 5 hours ago
            </div>
          </div>




        </Card>
      </Grid>
      <Grid container sx={{ height: "50vh", flexDirection: "row", padding: "10px" ,paddingLeft:"25px",paddingRight:"30px"}} spacing={2} >
        <Grid size={{ xs: 12, md: 7 }}>
          {selectedItem && <FourthRow item={selectedItem} />}
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <MidCardRight />
        </Grid>
      </Grid>
    </>
  );
};

const FourthRow: React.FC<MainContent> = ({ item }) => {




  return (

    <>
      <MidCardLeft itemId={item.id} />
    </>
  )
}
const MidCardRight = () => {




  return (


    <Card variant="outlined" style={{ padding: "10px" }}>

      <b>Event History</b>

      <table>
        <thead>
          <tr>
            <td><b>  Event</b></td>
            <td ><b>Vesion</b></td>
            <td><b>Status</b></td>
          </tr>
        </thead>
        <tbody>
          <tr> <td>  <tr> <tr>Deployed</tr><tr>2hours ago</tr></tr> </td><td>2</td> <td> <Button variant="outlined" color="warning">In progress </Button> </td></tr>
          <tr> <td><tr> <tr>Deployed</tr><tr>2hours ago</tr></tr></td><td>2</td> <td> <Button variant="outlined" color="success">successful</Button> </td></tr>
          <tr> <td><tr> <tr>Deployed</tr><tr>2hours ago</tr></tr></td><td>2</td> <td><Button variant="outlined" color="error">failed</Button> </td></tr>
          <tr> <td><tr> <tr>Deployed</tr><tr>2hours ago</tr></tr></td><td>2</td> <td><Button variant="outlined" color="error">failed</Button> </td></tr>
          <i style={
            { textDecoration: "underline" }
          }>
            view more

          </i>
        </tbody>

      </table>



    </Card>

  )
}





const MidCardLeft: React.FC<MidCardLeftProps> = () => {

  const [selectedComponent, setSelectedComponent] = useState<"A" | "B">("A");
  const styles = {
    button: (selected: boolean) => ({
      padding: "10px",
      margin: "5px",
      width: "50%",

      cursor: "pointer",
      border: selected ? "2px solid blue" : "1px solid gray",
      background: selected ? "#e0e0ff" : "#fff",
    }),
    component: { padding: "20px", border: "2px solid blue", marginTop: "10px" },
  };


  // Fetch data from API
  useEffect(() => {
    fetch("https://retoolapi.dev/Ymxfa2/cpuutilization")
      .then((response) => response.json())

      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    fetch("https://retoolapi.dev/ybFVVH/memoryutilization")
      .then((response) => response.json())
   
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  // const Memclick = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //       setSelectedId1(Number(event.target.value));

  // };
  // const Cpuclick = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedId2(Number(event.target.value));
  // };
  // const selectedItem1 = data1.find((item1) => Number(item1.applicationId) === selectedId1);
  // const selectedItem2 = data2.find((item2) => Number(item2.applicationId) === selectedId2);


  return (


    <Card sx={{ padding: "10px" }}>



      <b> System metrics</b>
      <div style={{ width: "100%" }}>



        {/* <button onClick={() => setSelectedId1(itemId)}> */}
        {/* CPU {itemId} */}
        <div style={{ display: "flex" }}>

          <button style={styles.button(selectedComponent === "B")} onClick={() => setSelectedComponent("B")}>
            CPU
            {/* {data1.map((item1) => (
          
          {item1.applicationId}
          
          ))} */}


          </button>


          <button style={styles.button(selectedComponent === "A")} onClick={() => setSelectedComponent("A")}>


            Memory
            {/* {data1.map((item2) => (
          
          {item1.applicationId}
          
          ))} */}
          </button>
        </div>
        <div>

        </div>
        <div style={{ width: "100%", height: "350px !important" }}>
          {/* <MyStockChart /> */}


          <div style={{ height: "270px" }}>{selectedComponent === "A" ? <MemoryChart /> : <MyChart />}</div>

        </div>


      </div>


    </Card>

  )
}

export default DynamicContentGrid;