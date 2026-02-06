import { v4 as uuidv4 } from 'uuid'

export function generateId(): string {
  return uuidv4()
}

export function generateFieldId(index: number): string {
  return String(index + 1).padStart(3, '0')
}
