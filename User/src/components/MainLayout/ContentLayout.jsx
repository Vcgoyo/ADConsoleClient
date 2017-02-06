import React, { PropTypes } from 'react';
import styles from './ContentLayout.less';


const ContentLayout=({children })=>{
  return (
    <div >
        <div className={styles.main}>
          {children}
          </div>
    </div>
  )
}

ContentLayout.propTypes={
  children: PropTypes.element.isRequired,
}

export default ContentLayout;
