import busImage from '../../src/London_Bus.jpg';
import styled from "styled-components";
import { useState } from 'react';

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
`;

const BusImage = () => {
    return (<img src={busImage} alt="bus" width="300"/>)
}

const BusInfo = () => {
    return (
    <div>
        Buses have been a mode of transport in London since 1829
    </div>)
}

const BusStats = () => {
    return (
    <div>
        <li>
            London has 675 bus routes
        </li>
        <li>
            There are over 8,600 buses
        </li>
        <li>
            Over 1,100 are battery-electric and hydrogen fuel cell buses
        </li>
        
    </div>)
}


const ButtonGroup = styled.div`
  display: flex;
`;
const types = ["Fun picture", "Bus info", "Bus stats"];
function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <ButtonGroup>
        {types.map((type) => (
          <Tab
            key={type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <p> {chooseResult(active)} </p>
    </>
  );
}

const chooseResult = (active: string) => {
    switch (active) {
        case 'Fun picture': {
            return (<> {BusImage()} </>)
        }
        case 'Bus stats': {
            return (<> {BusStats()} </>)
        }
        case 'Bus info': {
            return (<> {BusInfo()} </>)
        }
    }
}

const Information = () => {
    return (
    <>
        <h1>Information</h1>
        {TabGroup()}
    </>)
  };

export default Information;