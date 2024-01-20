import { React, useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Map from './Pages/Home';
import AppRoute from "./Routes";
import { ConfigProvider } from "antd";
import { UserProvider } from "./Context/UserProfile";

const { BaseLayer } = LayersControl;
function App() {
  return(
    <div>
    <UserProvider>

     <ConfigProvider
       theme={{
      token: {
        colorPrimary: '#44AE26',
        colorBgBase:'#f2f4f5',
        controlOutlineWidth:0,
        lineWidth:2,
        lineHeight:	1.8,
        colorBorder:'#d1d5db',
      },
      components:{
        Select:{
          lineWidth:2,
          colorBgBase:'#f7f8fa',
        },
        Upload:{
          colorPrimaryActive:'#d40000',
        },
        Button:{
        primaryColor:'#5C6BC0',
        colorBgBase:'#5C6BC0',

        },
        DatePicker:{
          fontWeightStrong:800,
          fontFamily:'monospace',
        },
        Popover:{
          zIndexPopup:30,
        },
        Segmented:{
          itemSelectedBg:'rgba(33,150,243,.1)',
          itemSelectedColor:'#2196f3',
        }
      }
       }}
      >

      <AppRoute/>
      </ConfigProvider>
    </UserProvider>
    </div>
  )

}

export default App;
