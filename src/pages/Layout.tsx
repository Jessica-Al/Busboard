import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useLocation } from 'react-router-dom'

const pages: Page[] = [{route: "/", title: "Bus timetable"}, {route: "/information", title: "information"}]

interface Page {
  route: string,
  title: string
}

const NavigationButtons = styled.button<{ $active1?: boolean; }>`
  display: flex;
  background-color: #000000;
  color: white;
  border-radius: 10px;
  margin:10px;
  ${props =>
    props.$active1 &&
    `
    background-color: gray;
    color: white;
    `};
`;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let start: string;
  console.log(location.pathname);
  
  switch (location.pathname) {
    case "/":
      {start = "Bus timetable"; break;}
    case "/information":
      {start = "information"; break;}
    default: 
      {start = ""}
  }
  const [active, setActive] = useState(start)
  

  const RouteChange = (page: Page) => {
    setActive(page.title);
    navigate(page.route);
  }

  return (
    <>
      <nav>
        <ul>
          {pages.map((page) => (
            <NavigationButtons onClick={() => RouteChange(page)}
            value = {page.title}
            $active1={active === page.title}>
              {page.title}
              
            </NavigationButtons>
          ))}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;