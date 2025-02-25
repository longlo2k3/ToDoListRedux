import { Breadcrumb, Layout, theme } from "antd";
import CreateTodo from "../components/createTodo";
import TodoList from "../components/todoList";
import { Header } from "./header";
import { Content } from "antd/es/layout/layout";
import { Footer } from "./footer/Footer";

export function Todo() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header />
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1 className="text-3xl mb-10 text-gray-800 font-bold text-center">
            My To-Do-List
          </h1>
          <div className="flex flex-col gap-10">
            {/* <CreateTodo /> */}
            <TodoList />
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
