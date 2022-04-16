import React from 'react';
import { Typography, Card } from '@arco-design/web-react';

function Article() {
  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>文章管理</Typography.Title>
      <Typography.Text>You can add content here :)</Typography.Text>
    </Card>
  );
}

export default Article;
