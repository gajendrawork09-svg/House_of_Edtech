"use client";

import React from 'react';
import { Button, Card, List, Typography, Space, Tag } from 'antd';
import { PlusOutlined, FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface DocumentItem {
  id: string;
  title: string;
  updatedAt: string;
}

interface DashboardUIProps {
  documents: DocumentItem[];
  onCreateDocument: () => void;
  onOpenDocument: (id: string) => void;
  isCreating: boolean;
}


const DashBoard = ({documents, 
  onCreateDocument, 
  onOpenDocument, 
  isCreating } : DashboardUIProps) => {
  return (
     <div className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Space size="middle">
          <FileTextOutlined className="text-blue-600 text-2xl" />
          <Title level={4} style={{ margin: 0, fontWeight: 600 }}>Docs Dashboard</Title>
        </Space>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          loading={isCreating}
          onClick={onCreateDocument}
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
        >
          New Document
        </Button>
      </header>

      {/* Main Content Dashboard Area */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Quick Start Panel (Like Google Docs top strip) */}
        <div className="mb-8">
          <Title level={5} className="text-gray-500 mb-4">Start a new document</Title>
          <Card 
            hoverable 
            className="w-40 h-48 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 hover:border-blue-500 transition-colors"
            onClick={onCreateDocument}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <PlusOutlined className="text-3xl text-blue-500" />
              <Text strong>Blank Doc</Text>
            </div>
          </Card>
        </div>

        {/* Recent Documents Section */}
        <div>
          <Title level={4} className="mb-4">Recent documents</Title>
          
          <Card style={{ padding: 0 }} className="shadow-sm border border-gray-200">
            <List
              itemLayout="horizontal"
              dataSource={documents}
              locale={{ emptyText: 'No documents found. Create one to get started!' }}
              renderItem={(doc) => (
                <List.Item 
                  className="hover:bg-gray-50 cursor-pointer transition-colors px-6 py-4"
                  onClick={() => onOpenDocument(doc.id)}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined className="text-blue-500 text-xl mt-1" />}
                    title={<Text className="font-medium hover:text-blue-600 text-base">{doc.title}</Text>}
                    description={
                      <Space className="text-xs text-gray-400 mt-1">
                        <ClockCircleOutlined />
                        <span>Opened {doc.updatedAt}</span>
                      </Space>
                    }
                  />
                  <Tag color="blue">Owner</Tag>
                </List.Item>
              )}
            />
          </Card>
        </div>

      </main>
    </div>
  )
}

export default DashBoard