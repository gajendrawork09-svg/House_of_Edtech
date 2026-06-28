"use client";

import { Divider } from "antd";

import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  UndoOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  LinkOutlined,
  PictureOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import ToolbarButton from "../Button/ToolbarButton";



const EditorToolbar = () => {
  return (
    <div className="sticky top-16 z-40 flex items-center gap-2 border-b bg-white px-4 py-2 shadow-sm">

      {/* Undo / Redo */}

      <ToolbarButton
        title="Undo"
        icon={<UndoOutlined />}
      />

      <ToolbarButton
        title="Redo"
        icon={<RedoOutlined />}
      />

      {/* <Divider type="vertical" /> */}
      <div className="mx-2 h-5 w-px bg-gray-300" />

      {/* Formatting */}

      <ToolbarButton
        title="Bold"
        icon={<BoldOutlined />}
      />

      <ToolbarButton
        title="Italic"
        icon={<ItalicOutlined />}
      />

      <ToolbarButton
        title="Underline"
        icon={<UnderlineOutlined />}
      />

      <ToolbarButton
        title="Strike"
        icon={<StrikethroughOutlined />}
      />

      {/* <Divider type="vertical" /> */}
      <div className="mx-2 h-5 w-px bg-gray-300" />

      {/* Lists */}

      <ToolbarButton
        title="Bullet List"
        icon={<UnorderedListOutlined />}
      />

      <ToolbarButton
        title="Numbered List"
        icon={<OrderedListOutlined />}
      />

      {/* <Divider type="vertical" /> */}
      <div className="mx-2 h-5 w-px bg-gray-300" />

      {/* Link */}

      <ToolbarButton
        title="Insert Link"
        icon={<LinkOutlined />}
      />

      {/* Image */}

      <ToolbarButton
        title="Insert Image"
        icon={<PictureOutlined />}
      />

      {/* Code */}

      <ToolbarButton
        title="Code Block"
        icon={<CodeOutlined />}
      />

    </div>
  );
};

export default EditorToolbar;