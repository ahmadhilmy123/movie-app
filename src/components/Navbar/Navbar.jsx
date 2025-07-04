// disini kita tidak menggunakan lagi yang namanya Hero.module.css karena saya udah menggunakan Refactor styled components
import styled from "styled-components";

import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #4361ee;
  padding: 2rem;
  color: #fff;
  width : 100%;
  position : center;
`;



const Nav = styled.nav`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Brand = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const NavItem = styled.li`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

function Navbar() {
  return (
    <Container>
      <Nav>
        <div>
          <Brand>Movie App</Brand>
        </div>
        <div>
          <NavList>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/movie/create">Add Movie</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/movie/populars">Popular</Link>
            </NavItem>
            <NavItem>
              <Link to="/movie/now">Now Playing</Link>
            </NavItem>
            <NavItem>
              <NavLink to="/movie/top">Top Rated</NavLink>
            </NavItem>
          </NavList>
        </div>
      </Nav>
    </Container>
  );
}

export default Navbar;
