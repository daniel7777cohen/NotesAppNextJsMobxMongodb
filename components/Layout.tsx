// import Head from "next/head";
// import Navbar from "./Navbar";
import { Layout as Wrapper, Menu, Breadcrumb } from "antd";
import Link from "next/link";

const Layout = ({ children }) => {
  const { Header, Footer, Sider, Content } = Wrapper;

  return (
    <>
      <Wrapper className="layout" style={{ height: "100%" }} >
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link href="/">
                <a>HOME</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              {" "}
              <Link href="/note/create-note">
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
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content"> {children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Wrapper>
      ,
    </>
  );
};

export default Layout;

/** try {
                const fetchedMovies = await axios.get(
                    "http://127.0.0.1:8000/api/movies/",
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );
                setData(fetchedMovies.data)
                setLoading(false);
            } catch (error) {
                setError(error.message)
            } */

/*
            export const loginUser = async (userDetails) => {
  try {
    const token = await axios.post(
      `http://127.0.0.1:8000/auth/`,
      userDetails
    );

    return token

  } catch (error) {
    return null
  }


}
            */
