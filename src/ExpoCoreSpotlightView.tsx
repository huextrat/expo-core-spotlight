import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoCoreSpotlightViewProps } from './ExpoCoreSpotlight.types';

const NativeView: React.ComponentType<ExpoCoreSpotlightViewProps> =
  requireNativeView('ExpoCoreSpotlight');

export default function ExpoCoreSpotlightView(props: ExpoCoreSpotlightViewProps) {
  return <NativeView {...props} />;
}
