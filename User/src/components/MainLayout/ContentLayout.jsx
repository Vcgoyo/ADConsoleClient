import React, { PropTypes } from 'react';
import styles from './ContentLayout.less';


const ContentLayout=({children })=>{
  return (
    <div className={styles.normal}>
        <div className={styles.content}>
        <div className={styles.main}>
          {children}
          </div>
        </div>
    </div>
  )
}

ContentLayout.propTypes={
  children: PropTypes.element.isRequired,
}

export default ContentLayout;
