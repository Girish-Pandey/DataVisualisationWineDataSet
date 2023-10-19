import React from 'react';
import './App.css';
import WineStat from './components/WineStat';
import wineData from './components/wineData.json';

// define data model to communicate with api data
interface WineDataItem {
  Alcohol: number;
  Flavanoids: number;
  Ash: number;
  Hue: number;
  Magnesium: number;
  "Malic Acid": number;
  "Alcalinity of ash": number;
  "Total phenols": number;
  "Nonflavanoid phenols": number;
  Proanthocyanins: number;
  "Color intensity": number;
  "OD280/OD315 of diluted wines": number;
  Unknown: number;
  Gamma: number;
}

// Your WineData type is now an array of WineDataItem objects
type WineData = WineDataItem[];


//Implement helper function to add new property "Gamma" in array objects
function addGammaPropertyToWineData(data: WineData): WineData{
  return data.map((item)=>({
    ...item, 
    Gamma: (item.Ash * item.Hue) / item.Magnesium,
  })
  )
}


function App() {

  //Append new "Gamma property on each point in wine json array data"
  const wineGammaData = addGammaPropertyToWineData(wineData as any);

  return (
    <div className="App">
        <WineStat data={wineGammaData as any} />
    </div>
  );
}

export default App;
