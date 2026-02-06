import { app } from 'electron'
import { join } from 'path'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'

export class FileService {
  private dataDir: string
  private currentProjectPath: string | null = null

  constructor() {
    this.dataDir = join(app.getPath('userData'), 'data')
    this.ensureDataDir()
  }

  private async ensureDataDir(): Promise<void> {
    if (!existsSync(this.dataDir)) {
      await mkdir(this.dataDir, { recursive: true })
    }
  }

  async saveProject(data: string): Promise<void> {
    await this.ensureDataDir()
    const path = this.currentProjectPath || join(this.dataDir, 'current-project.sapd')
    await writeFile(path, data, 'utf-8')
  }

  async loadProject(): Promise<string | null> {
    const path = join(this.dataDir, 'current-project.sapd')
    if (!existsSync(path)) return null
    return readFile(path, 'utf-8')
  }

  async saveProjectTo(filePath: string, data: string): Promise<void> {
    this.currentProjectPath = filePath
    await writeFile(filePath, data, 'utf-8')
  }

  async loadProjectFrom(filePath: string): Promise<string | null> {
    if (!existsSync(filePath)) return null
    this.currentProjectPath = filePath
    return readFile(filePath, 'utf-8')
  }

  async saveCustomTemplates(data: string): Promise<void> {
    await this.ensureDataDir()
    await writeFile(join(this.dataDir, 'custom-templates.json'), data, 'utf-8')
  }

  async loadCustomTemplates(): Promise<string | null> {
    const path = join(this.dataDir, 'custom-templates.json')
    if (!existsSync(path)) return null
    return readFile(path, 'utf-8')
  }

  async saveSettings(data: string): Promise<void> {
    await this.ensureDataDir()
    await writeFile(join(this.dataDir, 'settings.json'), data, 'utf-8')
  }

  async loadSettings(): Promise<string | null> {
    const path = join(this.dataDir, 'settings.json')
    if (!existsSync(path)) return null
    return readFile(path, 'utf-8')
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    await writeFile(filePath, content, 'utf-8')
  }
}
