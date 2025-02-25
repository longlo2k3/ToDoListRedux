import { Layout, Menu } from "antd";

export function Header() {
  const { Header } = Layout;

  const submenu = ["Home", "About", "Contact"];

  const items = submenu.map((_, index) => ({
    key: index + 1,
    label: submenu[index++],
  }));
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
