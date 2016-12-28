import React,{PropTypes} from 'react';
import {Table,Pagination,Popconfirm,Button} from 'antd';

const CommonList=({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
  columns,
  onRowChange,
  onRowSelect,
  onRowsSelectAll,
  onRowClick,
  type
})=>{
  //默认都带有操作按钮
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

  const rowSelection={
    onChange:onRowChange,
    onSelect:onRowSelect,
    onSelectAll: onRowsSelectAll,
    type,
  }

  return (
    <div >
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowSelection={rowSelection}
        onRowClick={onRowClick}
        //bordered
        rowKey={record=>record.key}
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

CommonList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
  columns:PropTypes.array,
};

export default CommonList;
