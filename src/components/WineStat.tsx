import React from 'react'

interface WineData {
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


interface WineStatProps {
  data: WineData[];
}

const WineStat: React.FC<WineStatProps> = ({data}) => {

    //Creating a custom method to calculate mean of an array
    const calculateMean = (array: number[]): number => {
      const sum = array.reduce((acc, value)=> acc + value, 0)
      return sum / array.length
    }

    //Creating a custom method to calculate median of an array
    const calculateMedian = (array: number[]): number => {
      const sortedArr = array.sort((a, b)=> a - b)
      return sortedArr.length%2 === 0? (sortedArr[sortedArr.length/2 - 1] + sortedArr[sortedArr.length/2])/2 : sortedArr[Math.floor(sortedArr.length/2)]
    }

    //Creating a custom method to calculate median of an array
    const calculateMode = (array: number[]): number => {
      let counts: { [key: number]: number } = {};
      let maxCount = 0
      let mode: number | null = null

      array.forEach((value)=>{
        counts[value] = (counts[value] + 1 || 0) + 1

        if(counts[value] > maxCount){
          maxCount = counts[value]
          mode = value
        }
      })
      return mode !== null? mode : 0 
    }

    // Filter and map data for specific "Alcohol" classes
    const alcoholClasses = [1, 2, 3];

    // Calculate statistics for "Flavanoids" in different "Alcohol" classes
    const statisticsByAlcohol = alcoholClasses.map((alcoholClass) => {
      const valuesForFlavanoids = data
        .filter((item) => item.Alcohol === alcoholClass)
        .map((item) => item.Flavanoids);

      const mean = calculateMean(valuesForFlavanoids);
      const median = calculateMedian(valuesForFlavanoids);
      const mode = calculateMode(valuesForFlavanoids);

      return {
        alcoholClass,
        mean,
        median,
        mode,
      };
    });

    // Calculate statistics for "Gamma" in different "Alcohol" classes
    const statisticsGammaByAlcohol = alcoholClasses.map((alcoholClass) => {
      const valuesForGamma = data
        .filter((item) => item.Alcohol === alcoholClass)
        .map((item) => item.Gamma)
        .filter((value)=> typeof value === 'number');

      const mean = calculateMean(valuesForGamma);
      const median = calculateMedian(valuesForGamma);
      const mode = calculateMode(valuesForGamma);

      return {
        alcoholClass,
        mean,
        median,
        mode,
      };
    });


    return (
        <div>
          <h1 style={{marginTop: "90px"}}>A Summaryfor Flavanoids Data Statistics</h1>
          <table width="80%" style={{border: "2", marginBottom: "140px"}} cellSpacing="0">
            <thead>
              <tr>
                <th>Measure</th>
                {statisticsByAlcohol.map((alcoholClass)=>(
                  <th key={alcoholClass.alcoholClass}>Class {alcoholClass.alcoholClass}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            <tr>
            <td>Flavanoids (Mean)</td>
            {statisticsByAlcohol.map((alcoholClass) => (
              <td key={alcoholClass.mean.toFixed(3)}>{alcoholClass.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids (Median)</td>
            {statisticsByAlcohol.map((alcoholClass) => (
              <td key={alcoholClass.median.toFixed(3)}>{alcoholClass.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids (Mode)</td>
            {statisticsByAlcohol.map((alcoholClass) => (
              <td key={alcoholClass.mode.toFixed(3)}>{alcoholClass.mode.toFixed(3)}</td>
            ))}
          </tr>
          </tbody>
          </table>

          <h1>A Summaryfor Gamma Data Statistics</h1>
          <table width="80%" style={{border: "2"}} cellSpacing="0">
            <thead>
              <tr>
                <th>Measure</th>
                {statisticsGammaByAlcohol.map((alcoholClass)=>(
                  <th key={alcoholClass.alcoholClass}>Class {alcoholClass.alcoholClass}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            <tr>
            <td>Gamma (Mean)</td>
            {statisticsGammaByAlcohol.map((alcoholClass) => (
              <td key={alcoholClass.mean.toFixed(3)}>{alcoholClass.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma (Median)</td>
            {statisticsGammaByAlcohol.map((alcoholClass) => (
              <td key={alcoholClass.median.toFixed(3)}>{alcoholClass.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma (Mode)</td>
            {statisticsGammaByAlcohol.map((alcoholClass) => (
              <td key={alcoholClass.mode.toFixed(3)}>{alcoholClass.mode.toFixed(3)}</td>
            ))}
          </tr>
          </tbody>
          </table>
        </div>
      );
    
}

export default WineStat