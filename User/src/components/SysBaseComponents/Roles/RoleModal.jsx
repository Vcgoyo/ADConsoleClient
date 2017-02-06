import React from 'react';
import {Form,Input,Modal,Tree} from 'antd'
const FormItem= Form.Item;
const TreeNode=Tree.TreeNode;

const RoleModal=({
  visible,
  item={},
  onOk,
  allMenusList,
  onCancel,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  }
})=>{
  let powerItemschecked;
  function handleOk() {
    validateFields((errors)=>{
      if(errors){
        return;
      }
      const data={...getFieldsValue(),id:item.id,poweritemids:powerItemschecked};
      onOk(data);
    })
  }
//填充Tree
 function forEachFillTree(treeList) {
   let newTree;
   newTree =treeList.map(item=>{
     if(item.children){
       let childrenTree;
       childrenTree=forEachFillTree(item.children);
       return <TreeNode title={item.itemname} key={item.id}>{childrenTree}</TreeNode>
     }else {
       return <TreeNode title={item.itemname} key={item.id} />
     }
   })
   return newTree;
 }
  const TreeNodes=forEachFillTree(allMenusList);
  function checkKey(nodes) {
    powerItemschecked=nodes;
  }
  let powerItemscheckValue=[];
  if(item.rolepoweritems){
    item.rolepoweritems.forEach((e,i)=>{
      powerItemscheckValue.push(e.id+'');
    })
  }
  //debugger;
  const modalOpts={
    title:'编辑角色',
    visible,
    onOk:handleOk,
    onCancel,
    width:400
  }
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="角色名称：" hasFeedback >
          {getFieldDecorator('rolename',{
            initialValue:item.rolename,

          })(
            <Input type='text'/>
          )}
        </FormItem>
        <FormItem label="角色编码：" hasFeedback>
            {getFieldDecorator('rolecode',{
              initialValue:item.rolecode,

            })(
              <Input type='text'/>
            )}
        </FormItem>
        <FormItem>
          //每次都重新加载，需要改善
            <Tree key={Math.random()} checkable multiple showLine onCheck={checkKey} defaultCheckedKeys={powerItemscheckValue}>
               {TreeNodes}
            </Tree>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(RoleModal)
