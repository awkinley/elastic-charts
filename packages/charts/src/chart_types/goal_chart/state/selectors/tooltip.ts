/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TooltipInfo } from '../../../../components/tooltip/types';
import { createCustomCachedSelector } from '../../../../state/create_selector';
import { getSpecOrNull } from './goal_spec';
import { getPickedShapes } from './picked_shapes';

const EMPTY_TOOLTIP = Object.freeze({
  header: null,
  values: [],
});

/** @internal */
export const getTooltipInfoSelector = createCustomCachedSelector(
  [getSpecOrNull, getPickedShapes],
  (spec, pickedShapes): TooltipInfo => {
    if (!spec) {
      return EMPTY_TOOLTIP;
    }

    const tooltipInfo: TooltipInfo = {
      header: null,
      values: [],
    };

    pickedShapes.forEach((shape) => {
      tooltipInfo.values.push({
        label: 'Actual',
        color: 'white',
        isHighlighted: false,
        isVisible: true,
        seriesIdentifier: {
          specId: spec.id,
          key: spec.id,
        },
        value: shape.actual,
        formattedValue: `${shape.actual}`,
        datum: shape.actual,
      });
    });

    return tooltipInfo;
  },
);
