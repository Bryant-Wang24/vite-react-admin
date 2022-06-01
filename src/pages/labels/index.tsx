import React, { useEffect, useState } from 'react';
import { Typography, Card,Button, Table ,Switch,Form, Input,Modal} from '@arco-design/web-react';
import { addTag, fetchTags } from '@/api/login';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { TagListProps } from '@/interface/interface';
const FormItem = Form.Item;
function Label() {
  const [visible,setVisible] = useState(false)
  const [name,setName] = useState('')
  const [tagList,setTagList] = useState()
  useEffect(()=>{
    fetchTags().then(res=>{
      setTagList(res.data.list)
    })
  },[])


  const columns:ColumnProps<TagListProps>[] = [
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
      render:(_,record)=>(
        <>
          <Switch onChange={(value)=>{console.log('value',value)}} defaultChecked={record.status}/>
        </>
      )
    },
  ];

  const onAddTag = ()=>{
    addTag({name:name}).then(res=>{
      console.log('res',res);
    })
  }

  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>
        <Button type='primary' onClick={()=>{setVisible(true)}}>添加标签</Button>
      </Typography.Title>
      <Typography.Text>
        <Table rowKey='_id' columns={columns} data={tagList} />
      </Typography.Text>
      <Modal
        title='添加标签'
        visible={visible}
        onOk={onAddTag}
        onCancel={() => setVisible(false)}>
      <Form >
        <FormItem label="标签名称">
          <Input onChange={(e:any)=>{setName(e)
          }} name='name'/>
        </FormItem>
      </Form>
    </Modal>
    </Card>
    
    
  );
}

export default Label;
