
import React, { useState, useEffect } from "react";
import { Grid, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import Divider from '@mui/material/Divider';
import myButtonImage from './assets/kapstan_logo.png';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import "./style1.css";
import Env from "./Environment"
import DynamicContentGrid from "./Dynamic_content_grid";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,

} from "react-router-dom";


interface MainContent {
  item: Application;
}

interface Application {
  id: number;
  name: string;
  status: string;
  version: number;
  updatedAt: number;
  desiredVersion: number;
}





const SecondRow: React.FC<MainContent> = ({ item }) => {




  return (


    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "10px",paddingRight:"30px",alignItems:"center" }}>

      <Box>

        {item.name}
      </Box>
      <Box>
        <Button variant="outlined" color="success">

          {item.status}
        </Button>

      </Box>





    </div>

  )
}





const SidebarLayout: React.FC = () => {








  const [data, setData] = useState<Application[]>([]);
  const [selectedId, setSelectedId] = useState<number | null >(null);

  // Fetch data from API
  useEffect(() => {
    fetch("https://retoolapi.dev/71NNjB/applications")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(Number(event.target.value));
  };

  const selectedItem = data.find((item) => item.id === selectedId) || data.find((item) => item.id === 1);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Grid container sx={{ height: { xs: "151vh", md: "100vh" }, boxSizing: "border-box", width: "100vw" }}>
      {/* Sidebar */}
      <Grid size={{ md: isExpanded ? 1.8 : .4, xs: isExpanded ? 3 : .4 }} sx={{
        border: "10px",
        backgroundColor: "#6e27d5",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8px",
        transition: "width 0.3s ease",
        minWidth: "50px",





      }}
      >
        <Box>


          <tr ><td  style={{width:"7%",paddingLeft:"5px", fontSize: "2rem"}} >  <div onClick={() => setIsExpanded(!isExpanded)} style={{ width: '30px',
    height: '30px',
    backgroundImage: `url(${myButtonImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: 'none',
    cursor: 'pointer',
    borderRadius:"100%"}} >  </div>
            
             </td><td onClick={() => setIsExpanded(!isExpanded)} className="hov" style={{fontSize:"34px",paddingLeft:"10px"}}>Kapstan </td> </tr>
          <div >
        <Box sx={{ flexDirection: "column", marginTop: "0", display: "flex", position: "sticky", bottom: "0", overflow: "hidden" }}>

            <ul >
                <Divider/>

              <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{width:"2%", fontSize: "2rem", paddingLeft: "8px" }}>  <GridViewOutlinedIcon /> </td><td className="pd-lf" >Applications </td> </tr> </li>
                <Divider/>
              <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{ width:"2%",fontSize: "2rem", paddingLeft: "8px", overflow: "hidden" }}> <ShieldOutlinedIcon /> </td><td className="pd-lf" >Connection </td> </tr> </li>
              <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{width:"2%", fontSize: "2rem", paddingLeft: "8px", cursor: "auto" }}> <AttachMoneyIcon /> </td><td className="pd-lf" >Cost</td> </tr> </li>
              <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{width:"2%", fontSize: "2rem", paddingLeft: "8px" }}>  <InsertLinkOutlinedIcon /> </td><td className="pd-lf" >Security </td> </tr> </li>
                <Divider/>
            </ul>
        </Box>





          </div>


        </Box>

        {/* Bottom Buttons */}
        <Box sx={{ flexDirection: "column", marginTop: "0", display: "flex", position: "sticky", bottom: "0", overflow: "hidden" }}>
          <ul>

            <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{ width:"2%",fontSize: "2rem", paddingLeft: "8px", }}><BookmarkBorderOutlinedIcon /> </td><td className="pd-lf" >Admin </td> </tr> </li>
       
            <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{ width:"2%",fontSize: "2rem", paddingLeft: "8px" }}><PersonOutlineOutlinedIcon /> </td><td className="pd-lf" >Docs </td> </tr> </li>
                <Divider/>
       
            <li onClick={() => setIsExpanded(!isExpanded)}> <tr><td style={{width:"2%", fontSize: "2rem", paddingLeft: "8px" }}><KeyboardDoubleArrowLeftOutlinedIcon /> </td><td className="pd-lf" >  </td> </tr> </li>

          </ul>
        </Box>


      </Grid>
      <Grid size={"grow"} sx={{ backgroundColor: "#f8f8f8" }}>
        <Router>
          <Grid sx={{ height: "5vh", paddingLeft: "30px" }}>
            <div className="top_left" style={{ display: "flex", justifyContent: "space-between" }}>
              <Box>

                <div>
                  Applications
                </div>
                <div>
                  <select style={{border:"0",background:"none",fontSize:"1rem",marginLeft:"-4px"}} name="dowpdown" id="1" onChange={handleChange}>
                    {data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}

                  </select>
                </div>
              </Box>
              <div style={{ display: "flex", flexDirection: "row", right: "20px",paddingRight:"33px" }}>
                JOhn Doe
                <select name="drop_down" id="1" style={{
                  height: "21px",
                  border: " none"
                }}></select>
              </div>

            </div>
          </Grid>
          <Grid sx={{ height: "auto", paddingLeft: "30px",paddingBottom:"10px" }} >
            {selectedItem && <SecondRow item={selectedItem} />}
           
          </Grid>
          <Grid sx={{ height: {xs:"120px",md:"23px"}, paddingLeft: "30px" }}>

            <nav>
              <Grid container sx={{ flexDirection: { xs: "column", md: "row" } }}>

                <Grid size={{ xs: 1.3, md: 1 }}>


            
                      <Link    to="/overview"  style={{display:"flex",fontSize:"16px"}}>< DesktopWindowsOutlinedIcon />Overview</Link>
                    
              
                </Grid>
                <Grid size={{ xs: 3, md: 2 }}>

                  <Link to="/envvar"  style={{display:"flex"}}><HistoryOutlinedIcon />Environment Variables</Link>

                </Grid>
                <Grid size={.8}>
                  <Link to="/envvar" style={{display:"flex"}}><ReportProblemOutlinedIcon />Alerts</Link>


                </Grid>
                <Grid size={"auto"}>
                  <Link to="/envvar" style={{display:"flex"}}><HistoryOutlinedIcon />Event history</Link>


                </Grid>
              </Grid>
            </nav>
            <br />
          </Grid>
          <Routes>
            <Route
              path="/overview"
              element={<DynamicContentGrid selectedItem={selectedItem} />}
            />
            <Route path="/envvar" element={<Env />} />
          </Routes>
        </Router>
      </Grid>

    </Grid>
  );
};

export default SidebarLayout;
