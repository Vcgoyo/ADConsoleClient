import React,{PropTypes} from 'react';

import {Table,Pagination,Popconfirm} from 'antd';

const MenuList=({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
})=>{
  const columns=[{
    title:'菜单名称',
    dataIndex:'name',
    key:'name',
  //  render:(text)=><a href="#">{text}</a>,
  },{
    title:"URL",
    dataIndex:"age",
    key:'age',
  },{
    title:'操作',
    key:'operation',
    render:(text,record)=>(
      <p>
        <a onClick={()=>onEditItem(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗?" onConfirm={() => onDeleteItem(record.id)}>
        <a>删除</a>
        </Popconfirm>
      </p>
    )
  }];

  return (
    <div >
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record=>record.id}
        pagination={false}
        size="middle"
      />
      <Pagination className='ant-table-pagination'
      total={total}
      current={current}
      pageSize={10}
      onChange={onPageChange}
       />
    </div>
  );
}

UserList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default MenuList;
