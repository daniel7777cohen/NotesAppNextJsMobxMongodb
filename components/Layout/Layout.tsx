import { Layout as Wrapper, Menu } from "antd";
import Link from "next/link";
import { FooterStyled } from "../../styled-components";
import { observer } from "mobx-react-lite";
const Layout = observer(({ children }: { children?: React.ReactNode }) => {
  const { Header, Content } = Wrapper;

  return (
    <>
      <Wrapper className="layout" style={{ height: "100%" }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              backgroundColor: "#031529",
            }}
          >
            <Menu.Item
              key="1"
              style={{
                backgroundColor: "#031529",
              }}
            >
              <Link href="/">
                <a>HOME</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{
                backgroundColor: "#031529",
              }}
            >
              {" "}
              <Link href="/note/create">
                <a>ADD NOTE</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            paddingLeft: "38px",
            paddingRight: "50px",
            marginBottom: "5rem",
            backgroundColor: "#f0f2f5",
          }}
        >
          <div className="site-layout-content"> {children}</div>
          <FooterStyled>Notes App written by DC</FooterStyled>
        </Content>
      </Wrapper>
    </>
  );
});

export default Layout;
