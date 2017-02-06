import React from 'react';
import styles from './TableWapper.less'

const TableWapper=({children})=>{
  return (
    <div className={styles.table_wapper}>
      {children}
    </div>
  )
}
export default TableWapper;
