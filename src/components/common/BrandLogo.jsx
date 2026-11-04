import React from 'react';
import { StructureLogo, StructureIcon } from './StructureLogo';

/**
 * Re-export StructureLogo and StructureIcon as BrandLogo and BrandIcon
 * to unify branding across all modules with the unique structural pattern logo.
 */
export const BrandIcon = StructureIcon;
export const BrandLogo = StructureLogo;

export default BrandLogo;
