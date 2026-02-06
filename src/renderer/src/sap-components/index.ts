import { componentRegistry } from './registry'

// Basic
import { sapButtonDefinition } from './basic/SAPButton'
import { sapTextDefinition } from './basic/SAPText'
import { sapIconDefinition } from './basic/SAPIcon'

// Input
import { sapInputDefinition } from './input/SAPInput'
import { sapRangeInputDefinition } from './input/SAPRangeInput'
import { sapDropdownDefinition } from './input/SAPDropdown'
import { sapSearchBoxDefinition } from './input/SAPSearchBox'
import { sapTextAreaDefinition } from './input/SAPTextArea'
import { sapCheckboxDefinition } from './input/SAPCheckbox'
import { sapRadioButtonDefinition } from './input/SAPRadioButton'
import { sapSwitchDefinition } from './input/SAPSwitch'

// Layout
import { sapCardDefinition } from './layout/SAPCard'
import { sapTableDefinition } from './layout/SAPTable'
import { sapFormDefinition } from './layout/SAPForm'
import { sapSectionDefinition } from './layout/SAPSection'
import { sapTabDefinition } from './layout/SAPTab'
import { sapGroupBoxDefinition } from './layout/SAPGroupBox'
import { sapToolbarDefinition } from './layout/SAPToolbar'

// Flow
import { sapProcessBoxDefinition } from './flow/SAPProcessBox'
import { sapBannerDefinition } from './flow/SAPBanner'
import { sapArrowRightDefinition, sapArrowLeftDefinition, sapArrowUpDefinition, sapArrowDownDefinition } from './flow/SAPArrow'
import { sapRectangleDefinition, sapDiamondDefinition, sapTerminatorDefinition } from './flow/SAPShapes'
import { sapLineDefinition, sapDashedLineDefinition, sapPolylineDefinition, sapPolylineArrowDefinition, sapDashedArrowDefinition } from './flow/SAPLines'

// Register all
const allDefinitions = [
  sapButtonDefinition, sapTextDefinition, sapIconDefinition,
  sapInputDefinition, sapRangeInputDefinition, sapDropdownDefinition, sapSearchBoxDefinition,
  sapTextAreaDefinition, sapCheckboxDefinition, sapRadioButtonDefinition, sapSwitchDefinition,
  sapCardDefinition, sapTableDefinition, sapFormDefinition, sapSectionDefinition,
  sapTabDefinition, sapGroupBoxDefinition, sapToolbarDefinition,
  sapProcessBoxDefinition, sapBannerDefinition,
  sapArrowRightDefinition, sapArrowLeftDefinition, sapArrowUpDefinition, sapArrowDownDefinition,
  sapRectangleDefinition, sapDiamondDefinition, sapTerminatorDefinition,
  sapLineDefinition, sapDashedLineDefinition, sapPolylineDefinition, sapPolylineArrowDefinition, sapDashedArrowDefinition
]

for (const def of allDefinitions) {
  componentRegistry.register(def)
}

export { componentRegistry }
