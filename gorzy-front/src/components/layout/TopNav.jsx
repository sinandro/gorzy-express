import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Icon, Dropdown } from 'rsuite'

const Component = () => {
  const [activeKey, setActiveKey] = useState(null)

  return (
    <Navbar className="shadow-sm">
      <div className="container flexed">
        <Navbar.Header className="unfloat">
          <h1 className="font-16 bold">
            <a href="/" className="p-3 blocked">
              گرزی
            </a>
          </h1>
        </Navbar.Header>

        <Navbar.Body className="flex-1 flexed justify-between">
          <Nav className="unfloat" onSelect={eventKey => setActiveKey(eventKey)} activeKey={activeKey}>
            <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
              Home
          </Nav.Item>
            <Nav.Item eventKey="2">News</Nav.Item>
            <Nav.Item eventKey="3">Products</Nav.Item>
            <Dropdown title="About">
              <Dropdown.Item eventKey="4">Company</Dropdown.Item>
              <Dropdown.Item eventKey="5">Team</Dropdown.Item>
              <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
            </Dropdown>
          </Nav>

          <Nav>
            <Nav.Item icon={<Icon className="m-0 ml-1" icon="cog" />}>تنظیمات</Nav.Item>
          </Nav>
        </Navbar.Body>
      </div>
    </Navbar>
  )
}

export default Component