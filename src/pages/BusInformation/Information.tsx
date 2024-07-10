import busImage from './London_Bus.jpg';
import styled from "styled-components";
import React, { useState } from 'react';

const Tab = styled.button<{ $active1?: boolean; }>`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${props =>
    props.$active1 &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
    `};
`;

const BusImage : React.FC = () => <img src={busImage} alt="bus" width="300"/>

const BusInfo : React.FC = () => {
    return (
    <div>
        Buses have been a mode of transport in London since 1829
    </div>)
}

const BusStats : React.FC = () => {
  const stats = ['London has 675 bus routes', 'There are over 8,600 buses', 'Over 1,100 are battery-electric and hydrogen fuel cell buses']
    return (
    <div>
      {stats.map((stat) => (
        <li>
            {stat}
        </li>
      ))}
        
    </div>)
}

const ButtonGroup = styled.div`
  display: flex;
`;
const types = ["Fun picture", "Bus info", "Bus stats"];
let active1: boolean;
function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <ButtonGroup>
        {types.map((type) => (
          <Tab
            key={type}
            $active1={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <ChooseResult active={active} />
    </>
  );
}

interface Props {
  active: string;
}

const ChooseResult: React.FC<Props> = ({active}) => {
    switch (active) {
        case 'Fun picture': {
            return <BusImage />
        }
        case 'Bus stats': {
            return <BusStats/>
        }
        case 'Bus info': {
            return <BusInfo/>
        }
        default:
          return null
    }
}

const Information = () => {
    return (
    <>
        <h1>Information</h1>
        <TabGroup/>
    </>)
  };

export default Information;