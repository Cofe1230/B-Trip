import React from 'react';
import {ReChartBar,ReChartScatter} from '../main/ChartComponent';

const TestPage = () => {
  const data1 = [
    {
      name : "1월",
      2021 : 58397,
      2022 : 81851,
      2023 : 434429
    },
    {
      name : "2월",
      2021 : 65582,
      2022 : 99999,
      2023 : 479248
    },
    {
      name : "3월",
      2021 : 74604,
      2022 : 96768,
      2023 : 800575
    },
    {
      name : "4월",
      2021 : 70112,
      2022 : 127919,
      2023 : 888776
    },
    {
      name : "5월",
      2021 : 74463,
      2022 : 175922,
      2023 : 867130
    },
    {
      name : "6월",
      2021 : 77029,
      2022 : 227713,
      2023 : 960683
    },
    {
      name : "7월",
      2021 : 83005,
      2022 : 263986,
      2023 : 1032188
    },
    {
      name : "8월",
      2021 : 97087,
      2022 : 310945,
      2023 : 1089133
    },
    {
      name : "9월",
      2021 : 89800,
      2022 : 337638,
    },
    {
      name : "10월",
      2021 : 92416,
      2022 : 476097,
    },
    {
      name : "11월",
      2021 : 94358,
      2022 : 459906
    },
    {
      name : "12월",
      2021 : 90150,
      2022 : 539873
    },
  ]
  const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  return (
    <div>
    <div className='home'>
      <div className='track1'>
        <span>
          HAEUNDAE BEACH 
          | GWANGALLI BEACH 
          | GAMCHEON CULTURE VILLAGE 
          | MOONTAN ROAD
          | MILLAK WATERSIDE PARK 
          | BIFF SQUARE 
          | JAGALCHI MARKET
          | TAEJONGDAE 
          | JEONPO CAFE STREET 
          | SONGDO BEACH 
          | GUKJE MARKET 
          | DADAEPO BEACH 
          | GALMAETGIL 
          </span>
      </div>
      <div className='track2'>
        <span>
          BEXCO 
          | X THE SKY 
          | BUSAN CINEMA CENTER 
          | DIAMOND TOWER 
          | GWANGAN BRIDGE 
          | BEOMEOSA 
          | NURIMARU APEC HOUSE 
          | HAEDONG YONGGNUNGSA 
          | NATIONAL MARITIME MUSEUM 
          | MUSEUM OF CONTEMPORARY ART BUSAN 
          </span>
      </div>
      <div className='track3'>
        <span>
          G-STAR 
          | BUSAN INTERNATIONAL FILM FESTIVAL 
          | BUSAN BIENNALE 
          | BUSAN INTERNATIONAL ROCK FESTIVAL 
          | BUSAN FIREWORKS FESTIVAL 
          | BUSAN ONEASIA FESTIVAL 
          | BUSAN HIPHOP FESTIVAL 
          </span>
      </div>
      <div className='track4'>
        <span>
          LANDSCAPE
          | FOOD/GOURMET 
          | SHOPPING 
          | CULTURE 
          | FESTIVAL 
          | HISTORY 
          | YACHT 
          | SKY CAPSULE 
          | SURFING 
          | CABLE CAR 
          | HIKING 
          </span>
      </div>
      <div className='track5'>
        <span>
          GWANGALLI 
          | SEOMYEON 
          | HAEUNDAE 
          | YOUNGDO 
          | NAMPODONG 
          | JEONPO
          | CENTUM CITY 
          | MARINE CITY
          </span>
      </div>
    </div>
    <div className='enter'>
      <p><a href='/overview'>ENTER</a></p>
    </div>
  </div>
  );
  );
};


export default TestPage;