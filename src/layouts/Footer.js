import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'House Care Work',
          title: 'House Care',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: '/',
          blankTarget: true,
        },
        {
          key: 'HCMUT Blockchain Labs',
          title: 'HCMUT Blockchain Labs',
          href: '/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 HCMUT Blockchain Labs
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
