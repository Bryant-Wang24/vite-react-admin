import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Typography,
  Card,
  Button,
  Table,
  Switch,
  Form,
  Input,
  Modal,
  Message,
  Spin,
  Popconfirm,
} from '@arco-design/web-react';
import { addTag, deleteTag, fetchTags, updateTag } from '@/api/login';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { TagListProps } from '@/interface/interface';
const FormItem = Form.Item;
function Label() {
  // const [data, setData] = useState(allData);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    // sizeCanChange: true,
    showTotal: true,
    total: 96,
    pageSize: 10,
    current: 1,
    // pageSizeChangeResetCurrent: true,
  });
  const [form] = Form.useForm();
  const { getFieldValue, setFieldValue } = form;
  const [state, setState] = useState({
    title: '添加标签',
    visible: false,
    id: '',
  });
  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState();
  useEffect(() => {
    getTagsList();
  }, []);

  const getTagsList = async (data?) => {
    setLoading(true);
    fetchTags(data)
      .then((res) => {
        setTagList(res.data.list);
        setPagination({
          ...pagination,
          total: res.data.totalCount,
          current: res.data.page,
          pageSize: res.data.pageSize,
        });
        setState({
          ...state,

          visible: false,
        });

        setLoading(false);
      })
      .catch((err) => {
        new Message(err);
      });
  };

  const onAddTag = async () => {
    setLoading(true);
    await addTag({ name: getFieldValue('name') });
    getTagsList();
    setState({ ...state, visible: false });
  };

  const onModifyTag = async () => {
    setLoading(true);
    await updateTag({
      id: state.id,
      name: getFieldValue('name'),
    });
    await getTagsList();
  };
  const onDeleteTag = async (id: string) => {
    setLoading(true);
    await deleteTag(id);
    getTagsList();
  };

  const onOk = async () => {
    try {
      await form.validate(['name']);
      state.title === '添加标签' ? onAddTag() : onModifyTag();
    } catch (e) {
      Message.error('至少输入2个字符');
    }
  };
  const onChangeTable = (pagination) => {
    const { current, pageSize } = pagination;
    setLoading(true);
    setTimeout(() => {
      getTagsList({ pageSize, page: current });
      setPagination((pagination) => ({
        ...pagination,
        current,
        pageSize,
      }));
      setLoading(false);
    }, 1000);
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
      render: (_, record) => {
        return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: (_, record) => {
        return dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '标签状态',
      dataIndex: 'status',
      render: (_, record) => (
        <>
          <Switch
            onChange={(value) => {
              console.log('status', value);
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
            onClick={() => {
              setState({
                ...state,
                visible: true,
                id: record._id,
                title: '修改标签',
              });
              setFieldValue('name', record.name);
            }}
            type="primary"
            style={{ marginRight: '10px' }}
          >
            修改
          </Button>
          <Popconfirm
            title="是否确认删除标签？"
            onOk={() => {
              onDeleteTag(record._id);
            }}
          >
            <Button type="primary" status="danger">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Spin style={{ width: '100%' }} size={30} loading={loading}>
      <Card style={{ height: '84vh' }}>
        <Typography.Title heading={6}>
          <Button
            type="primary"
            onClick={() => {
              setState({ ...state, visible: true, title: '添加标签' });
              setFieldValue('name', '');
            }}
          >
            添加标签
          </Button>
        </Typography.Title>
        <Typography.Text>
          <Table
            rowKey="_id"
            columns={columns}
            data={tagList}
            pagination={pagination}
            onChange={onChangeTable}
            // rowSelection={{
            //   selectedRowKeys,
            //   onChange: (selectedRowKeys, selectedRows) => {
            //     console.log('selectedRowKeys', selectedRowKeys);
            //     console.log('selectedRows', selectedRows);
            //     setSelectedRowKeys(selectedRowKeys);
            //   },
            // }}
          />
        </Typography.Text>
        <Modal
          maskClosable={false}
          title={state.title}
          visible={state.visible}
          onOk={onOk}
          onCancel={() => setState({ ...state, visible: false })}
        >
          <Form form={form}>
            <FormItem
              label="标签名称"
              field="name"
              required
              rules={[
                {
                  validator(value, cb) {
                    if (!value || value.length < 2)
                      return cb('至少输入2个字符');
                  },
                },
              ]}
            >
              <Input
                minLength={2}
                maxLength={20}
                placeholder="请输入标签名称"
              />
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </Spin>
  );
}

export default Label;
