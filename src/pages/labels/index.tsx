import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Button,
  Table,
  Switch,
  Form,
  Input,
  Modal,
} from '@arco-design/web-react';
import { addTag, deleteTag, fetchTags, updateTag } from '@/api/login';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { TagListProps } from '@/interface/interface';
const FormItem = Form.Item;
function Label() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [tagList, setTagList] = useState();
  useEffect(() => {
    getTagsList();
  }, []);

  const getTagsList = () => {
    fetchTags().then((res) => {
      setTagList(res.data.list);
    });
  };

  const onAddTag = async () => {
    await addTag({ name: name });
    getTagsList();
    setVisible(false);
  };

  const onModifyTag = async (id: string) => {
    await updateTag({ id: id, name: '55555' });
    getTagsList();
  };
  const onDeleteTag = async (id: string) => {
    await deleteTag(id);
    getTagsList();
  };
  const columns: ColumnProps<TagListProps>[] = [
    {
      title: '标签ID',
      dataIndex: '_id',
    },
    {
      title: '标签名字',
      dataIndex: 'name',
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '标签状态',
      dataIndex: 'status',
      render: (_, record) => (
        <>
          <Switch
            onChange={(value) => {
              console.log('value', value);
            }}
            defaultChecked={record.status}
          />
        </>
      ),
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button
            onClick={() => onModifyTag(record._id)}
            type="primary"
            style={{ marginRight: '10px' }}
          >
            修改
          </Button>
          <Button
            onClick={() => onDeleteTag(record._id)}
            type="primary"
            status="danger"
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          添加标签
        </Button>
      </Typography.Title>
      <Typography.Text>
        <Table rowKey="_id" columns={columns} data={tagList} />
      </Typography.Text>
      <Modal
        title="添加标签"
        visible={visible}
        onOk={onAddTag}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <FormItem label="标签名称">
            <Input
              onChange={(e: string) => {
                setName(e);
              }}
            />
          </FormItem>
        </Form>
      </Modal>
    </Card>
  );
}

export default Label;
