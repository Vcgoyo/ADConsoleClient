import React,{PropTypes} from 'react';
import {routerRedux} from 'dva/router';
import {Table,Pagination,Popconfirm} from 'antd';

const UserList=({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
  columns,
})=>{

  let baseColoumns=[
    {
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
    }]
  let isPush=1;
  for (var i = 0; i < columns.length; i++) {
       if(baseColoumns[0].title==columns[i].title){
          isPush=-1;
       }
  }
  if(isPush>0){
    columns.push(baseColoumns[0]);
  }
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
  columns:PropTypes.array,
};

export default UserList;
