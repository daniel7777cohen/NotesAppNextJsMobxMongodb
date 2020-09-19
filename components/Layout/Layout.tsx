import { Layout as Wrapper, Menu, Breadcrumb } from "antd";
import Link from "next/link";
import { FooterStyled } from "../../styled-components";
import { observer } from "mobx-react-lite";

const Layout = observer(({ children }: { children?: React.ReactNode }) => {
  const { Header, Footer, Sider, Content } = Wrapper;

  return (
    <>
      <Wrapper className="layout" style={{ height: "100%" }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link href="/">
                <a>HOME</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              {" "}
              <Link href="/note/create">
                <a>ADD NOTE</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              {" "}
              <Link href="/about/">
                <a>ABOUT</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            paddingLeft:"38px",
            paddingRight: "50px",
            marginBottom: "5rem",
            backgroundColor: "#f0f2f5",
          }}
        >
          <div className="site-layout-content"> {children}</div>
          <FooterStyled >
            Notes App written by DC
          </FooterStyled>
        </Content>
      </Wrapper>
    </>
  );
});

export default Layout;
