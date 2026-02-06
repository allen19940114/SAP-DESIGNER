import { componentRegistry } from './registry'
import { sapButtonDefinition } from './basic/SAPButton'
import { sapTextDefinition } from './basic/SAPText'
import { sapInputDefinition } from './input/SAPInput'

// Register all components
componentRegistry.register(sapButtonDefinition)
componentRegistry.register(sapTextDefinition)
componentRegistry.register(sapInputDefinition)

export { componentRegistry }
