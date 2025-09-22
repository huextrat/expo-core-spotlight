import * as React from 'react';

import { ExpoCoreSpotlightViewProps } from './ExpoCoreSpotlight.types';

export default function ExpoCoreSpotlightView(props: ExpoCoreSpotlightViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
