import React from 'react';
import { DrizzleContext } from 'drizzle-react';
// import Workplace from './Workplace';

class WorkplaceContainer extends React.Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          // const { drizzle, drizzleState, initialized } = drizzleContext;

          const { initialized } = drizzleContext;

          console.log(drizzleContext);
          if (!initialized) {
            return 'Loading...';
          }

          console.log('value of initialized: ');
          console.log(initialized);

          return <div>hello world</div>;
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default WorkplaceContainer;
