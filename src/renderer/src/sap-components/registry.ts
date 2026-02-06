import type { ComponentType, ComponentCategory, SAPComponentDefinition } from '@/types/component'

class ComponentRegistry {
  private definitions = new Map<ComponentType, SAPComponentDefinition>()

  register(definition: SAPComponentDefinition): void {
    this.definitions.set(definition.type, definition)
  }

  get(type: ComponentType): SAPComponentDefinition {
    const def = this.definitions.get(type)
    if (!def) throw new Error(`Unknown component type: ${type}`)
    return def
  }

  getByCategory(category: ComponentCategory): SAPComponentDefinition[] {
    return Array.from(this.definitions.values()).filter((d) => d.category === category)
  }

  getAll(): SAPComponentDefinition[] {
    return Array.from(this.definitions.values())
  }
}

export const componentRegistry = new ComponentRegistry()
