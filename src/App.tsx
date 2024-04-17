import { useState } from "react";
import { Button, Space } from "antd";
import { SpotifyOutlined, YoutubeOutlined } from "@ant-design/icons";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "0 24px" }}>
      <Space>
        <SpotifyOutlined style={{ fontSize: "64px" }} />
        <YoutubeOutlined style={{ fontSize: "82px" }} />
        <Button type="primary">Primary Button</Button>
      </Space>
    </div>
  );
}

export default App;
