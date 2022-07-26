import fs from 'fs'
import path from 'path'

const entry = process.cwd()
const output = path.resolve(entry, 'docs')

interface MdNode {
  name: string;
  path: string;
  mark: boolean;
  parent?: MdNode,
  children?: MdNode[]
}

const cleanDocs = (entry: string) => {
  const dirs = fs.readdirSync(entry)

  dirs.forEach(dir => {
    const newPath = path.join(entry, dir)
    const stat = fs.statSync(newPath)
    const needRemove = dir !== '.vitepress' && dir !== 'public'

    if (stat.isDirectory()) {
      // recursion
      needRemove && cleanDocs(newPath)
    } else {
      // remove file
      fs.unlinkSync(newPath)
    }
  })

  // remove dir
  const needRemove = !/docs$/.test(entry)
  needRemove && fs.rmdirSync(entry)
}

const buildModule = (entry: string): MdNode => {
  let ans: MdNode 
  
  const removeNodes: MdNode[] = []

  const isMarkdown = (path: string) => path.includes('README.md')
  const validFiles = ['.git', '.vscode', 'node_modules', 'build', 'docs', 'books']
  const isValid = (dir: string) => 
    // valid files and max files
    !validFiles.some(_ => dir.includes(_) || /vue_source/.test(dir))

  const getFileName = (entry: string) => entry.split(path.sep).at(-1) as string

  const getModules = (entry: string, layer: number, parent?: MdNode) => {
    const module: MdNode = {
      name: getFileName(entry),
      path: entry,
      mark: false,
      parent,
      children: []
    }
      
    const dirs = fs.readdirSync(entry)
  
    dirs.forEach(dir => {
      const _entry = path.resolve(entry, dir)
      const stat = fs.statSync(_entry)
  
      if (stat.isDirectory() && isValid(_entry)) {
        const needRemove = layer >= 2
        const child = getModules(_entry, layer + 1, module)

        if (needRemove) {
          child.mark = false
        }
        
        module.children?.push(child)
        return
      }
      
      if(isMarkdown(_entry)) {
        let m = module
        while (m && m.parent) {
          m.mark = true
          m = m.parent
        }
        module.children?.push({
          name: dir,
          mark: false,
          path: _entry
        })
        return
      }
      
      removeNodes.push(module)
    })

    return module
  }

  ans = getModules(entry, 0)

  removeNodes.forEach(m => {
    while (m && m.parent) {
      if (!m.mark) {
        m.parent.children = m.parent.children?.filter((item) => item.path != m.path)
      }
      m = m.parent
    }
  })
  
  return ans
}

interface Sidebar {
  text: string;
  link?: string;
  items?: Sidebar[]
  collapsible?: boolean;
}

const generateDocs = (module: MdNode) => {
  const sidebar: Sidebar = {
    text: module.name
  }

  const currentDir = module.path.replace(entry, output)

  const copyImgs = () => {
    const dir = path.resolve(module.path, 'images')
    const destDir = dir.replace(entry, output)

    const copy = (dir: string, destDir: string) => {
      if (fs.existsSync(dir)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir)
        }
        
        const files = fs.readdirSync(dir)
        files.forEach(file => {
          const source = path.join(dir, file)
          const target = path.join(destDir, file)
          const stat = fs.statSync(source)
          
          if (stat.isFile()) {
            const readStream = fs.createReadStream(source)
            const writeStream = fs.createWriteStream(target)
            readStream.pipe(writeStream);
          } else {
            copy(source, target)
          }
        })
      }
    }

    copy(dir, destDir)
  }
  const normalizeText = (name: string) => name.replace(/README.md/, 'index.md')

  if (Array.isArray(module.children)) {
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir)
    }

    copyImgs()

    const items = module.children.map(generateDocs)

    if (items.length) {
      sidebar.items = items
    }
  } else {
    fs.copyFileSync(module.path, normalizeText(currentDir))
    sidebar.link = normalizeText(
      module.path
      .replace(entry, '')
      .replace(/\\/g, '/')
    )
  }

  return sidebar
}

const genrateSidebarConfig = (sideber: Sidebar) => {
  let config = sideber.items

  // remove root 
  config = config?.filter(node => node.text !== 'README.md')

  const clear = (_sidebar: Sidebar) => {
    if (Array.isArray(_sidebar.items)) {
      _sidebar.items.forEach(item => {
        if (item.text === 'README.md' || item.text === 'index.md') {
          _sidebar.link = item.link
          item.text = _sidebar.text
        }
      })
    }
    _sidebar.items?.forEach(clear)
  }

  clear(sideber)

  fs.writeFileSync(
    path.resolve(output, '.vitepress/sidebar.json'),
    JSON.stringify(config)
  )
}

const buildEntry = (entry: string) => {
  cleanDocs(output)

  const modules = buildModule(entry)
  const sidebar = generateDocs(modules)

  genrateSidebarConfig(sidebar)
}


buildEntry(entry)
